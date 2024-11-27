const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const fsExtra = require("fs-extra");
const stripAnsi = require("strip-ansi");

const ENCODING_TYPE = "utf8";

const { rootFolder, logsFolder } = require("./paths");

const writeStreams = {};

const getWriteStream = (filePath) => {
  if (!writeStreams[filePath]) {
    fsExtra.ensureDirSync(logsFolder);
    writeStreams[filePath] = fs.createWriteStream(filePath, { flags: "w" });
  }
  return writeStreams[filePath];
};

const getLogger = (options = {}) => {
  let writeStream;
  if (options.writeLogsToFile) {
    writeStream = getWriteStream(path.resolve(logsFolder, options.writeLogsToFile));
  }
  return (log) => {
    const cleanLog = log.trim();
    if (cleanLog.length) {
      console.log(cleanLog);
      if (writeStream) {
        const strippedAnsi = stripAnsi(cleanLog);
        writeStream.write(
          options.writeLogsParser ? options.writeLogsParser(strippedAnsi) : strippedAnsi
        );
      }
    }
  };
};

const npmRun = (commands, envVars, options = {}) => {
  const logData = getLogger(options);
  let npmProcess;
  const promise = new Promise((resolve, reject) => {
    const commandsArray = Array.isArray(commands) ? commands : [commands];
    npmProcess = childProcess.spawn("npm", ["run"].concat(commandsArray), {
      cwd: rootFolder,
      env: {
        FORCE_COLOR: true,
        ...process.env,
        ...envVars,
      },
    });

    npmProcess.stdin.setEncoding(ENCODING_TYPE);
    npmProcess.stdout.setEncoding(ENCODING_TYPE);
    npmProcess.stderr.setEncoding(ENCODING_TYPE);
    npmProcess.stdout.on("data", logData);
    npmProcess.stderr.on("data", logData);

    npmProcess.on("close", (code) => {
      if (code !== 0) {
        reject();
      } else {
        resolve();
      }
    });
  });

  if (options.getProcess) {
    return new Promise((resolve) => {
      resolve({
        promise,
        process: npmProcess,
      });
    });
  }

  return promise;
};

module.exports = {
  npmRun,
};

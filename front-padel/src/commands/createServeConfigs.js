const path = require("path");

const chalk = require("chalk");
const fsExtra = require("fs-extra");

const { getDeployedAppServeFolder } = require("./utils/paths");
const { getAppsData } = require("./utils/apps");
const serveBaseConfig = require("./templates/serve.json");

const LOG_NAMESPACE = "[Serve config] ->";

const createAppConfig = (app) => {
  console.log(
    `${chalk.cyan(`${LOG_NAMESPACE} Creating serve config for app`)} ${
      app.name
    } in "deploy/public/${app.name}"`
  );
  const outputFolder = getDeployedAppServeFolder(app.name);
  const output = path.resolve(outputFolder, "serve.json");
  console.log(`${chalk.cyan(`${LOG_NAMESPACE} Output is ${output}`)}`);
  return fsExtra.ensureDir(outputFolder).then(() => {
    const rewrites = [...serveBaseConfig.rewrites];
    if (app.envVars.PUBLIC_URL && app.envVars.PUBLIC_URL !== "/") {
      rewrites[0] = {
        ...serveBaseConfig.rewrites[0],
        destination: `${app.envVars.PUBLIC_URL}${serveBaseConfig.rewrites[0].destination}`,
        source: `${app.envVars.PUBLIC_URL}/**`,
      };
    }
    console.log(`${chalk.cyan(`${LOG_NAMESPACE} Writing json to ${output}`)}`);
    return fsExtra.writeJson(output, {
      ...serveBaseConfig,
      public: `deploy/public/${app.name}`,
      rewrites,
    });
  });
};

const createAppsConfigs = () => {
  return getAppsData()
    .then((apps) => {
      return Promise.all(apps.map(createAppConfig));
    })
    .catch((error) => {
      console.log(chalk.red(`${LOG_NAMESPACE} Error creating serve configs`));
      console.log(error);
      process.exit(1);
    });
};

createAppsConfigs();

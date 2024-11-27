const path = require("path");

const chalk = require("chalk");
const fsExtra = require("fs-extra");
const handlebars = require("handlebars");

const { deployFolder } = require("./utils/paths");
const { getAppsData } = require("./utils/apps");

const LOG_NAMESPACE = "[Nginx config] ->";

let readTemplatePromise;

const readTemplate = () => {
  if (!readTemplatePromise) {
    const template = path.resolve(__dirname, "templates", "nginx.conf.hbs");
    readTemplatePromise = fsExtra.readFile(template, {
      encoding: "utf8",
    });
  }
  return readTemplatePromise;
};

const getApiHost = (apiUrl) => {
  return apiUrl.split("/")[0];
};

const createAppConfig = (app) => {
  console.log(`${chalk.cyan(`${LOG_NAMESPACE} Creating nginx config for app`)} ${app.name}`);
  const outputFolder = path.resolve(deployFolder, "nginx", app.name);
  const output = path.resolve(outputFolder, "nginx.conf");
  return readTemplate().then((content) => {
    const nginxConfig = handlebars.compile(content)({
      PUBLIC_URL: app.envVars.PUBLIC_URL.length > 1 ? app.envVars.PUBLIC_URL : "",
      PROTOCOL: app.envVars.REACT_APP_PROTOCOL,
      API_HOST: getApiHost(app.envVars.REACT_APP_API),
      SERVICE_API_HOST: getApiHost(app.envVars.REACT_APP_API),
      SERVICE_ORCHESTRATOR_HOST: getApiHost(app.envVars.REACT_APP_ORCHESTRATOR_API),
      FIVEG_S3_BUCKET_NAME: app.envVars.FIVEG_S3_BUCKET_NAME,
      AWS_DEFAULT_REGION: app.envVars.AWS_DEFAULT_REGION,
    });
    return fsExtra.ensureDir(outputFolder).then(() => {
      return fsExtra.writeFile(output, nginxConfig, {
        encoding: "utf8",
      });
    });
  });
};

const createAppsConfigs = () => {
  return getAppsData()
    .then((apps) => {
      return Promise.all(apps.map(createAppConfig));
    })
    .catch((error) => {
      console.log(chalk.red(`${LOG_NAMESPACE} Error creating nginx configs`));
      console.log(error);
      process.exit(1);
    });
};

createAppsConfigs();

const path = require("path");

const SERVE_CONFIG_FILE = "serve.json";

const rootFolder = path.resolve(__dirname, "..", "..");
const reportsFile = path.resolve(rootFolder, "reports", "index.html");
const srcFolder = path.resolve(rootFolder, "src");
const publicFolder = path.resolve(rootFolder, "public");
const tempFolder = path.resolve(rootFolder, ".tmp");
const tempStorage = path.resolve(rootFolder, ".tmp-storage");
const buildFolder = path.resolve(rootFolder, "build");
const buildStorybookFolder = path.resolve(rootFolder, "build-storybook");
const deployFolder = path.resolve(rootFolder, "deploy");
const deployPublicFolder = path.resolve(deployFolder, "public");
const storybookDeployFolder = path.resolve(rootFolder, "deploy-storybook");
const storybookDeployPublicFolder = path.resolve(storybookDeployFolder, "public");
const serveConfig = path.resolve(rootFolder, SERVE_CONFIG_FILE);
const cypressParallelContext = path.resolve(tempStorage, "cypress-parallel-context.json");
const logsFolder = path.resolve(rootFolder, ".logs");
const localesFolder = path.resolve(srcFolder, "translations");

const getDeployedAppServeFolder = (appName) => {
  return path.resolve(rootFolder, deployFolder, "serve", appName);
};

const getDeployedAppServeConfig = (appName) => {
  return path.resolve(getDeployedAppServeFolder(appName), SERVE_CONFIG_FILE);
};

module.exports = {
  rootFolder,
  reportsFile,
  srcFolder,
  tempFolder,
  tempStorage,
  publicFolder,
  buildFolder,
  buildStorybookFolder,
  deployFolder,
  deployPublicFolder,
  storybookDeployFolder,
  storybookDeployPublicFolder,
  serveConfig,
  cypressParallelContext,
  logsFolder,
  getDeployedAppServeFolder,
  getDeployedAppServeConfig,
  localesFolder,
};

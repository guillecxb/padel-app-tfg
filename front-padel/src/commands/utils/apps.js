const path = require("path");

const chalk = require("chalk");
const fsExtra = require("fs-extra");

const appsJson = require("../../apps.json");

const { buildFolder, deployFolder, deployPublicFolder } = require("./paths");
const { npmRun } = require("./npm");

const LOG_NAMESPACE = "[App] ->";
const LOG_CONFIG_NAMESPACE = "[Apps config] ->";

const getAppEnvVarsFromAppData = (appData) => {
  console.log(
    `${LOG_NAMESPACE} Environment variables for environment "${appData.environment}" and app "${appData.name}"`
  );
  console.log(appData.envVars);
  return appData.envVars;
};

const cleanDeploy = () => {
  console.log(chalk.cyan(`${LOG_NAMESPACE} Cleaning deploy folder`));
  return fsExtra.emptyDir(deployFolder);
};

const cleanBuild = () => {
  console.log(chalk.cyan(`${LOG_NAMESPACE} Cleaning build folder`));
  return fsExtra.emptyDir(buildFolder);
};

const deployApp = (appName, publicUrl, customBuildFolder) => {
  const appDeployFolder = path.resolve(deployPublicFolder, publicUrl.replace("/", ""), appName);
  console.log(
    `${chalk.cyan(
      `${LOG_NAMESPACE} Copying app "${appName}" to "deploy" folder: `
    )}${appDeployFolder}`
  );
  return fsExtra
    .copy(
      customBuildFolder || buildFolder,
      path.resolve(deployPublicFolder, appName, publicUrl.replace("/", ""))
    )
    .then(() => {
      console.log(chalk.green(`${LOG_NAMESPACE} App "${appName}" copied to deploy folder`));
      return Promise.resolve();
    });
};

const addEnvVars = (envVars, appName) => {
  const normalizedAppName = appName.replace(/-/g, "_");
  Object.keys(envVars).forEach((varName) => {
    if (process.env.hasOwnProperty(varName)) {
      console.log(
        chalk.yellow(
          `${LOG_CONFIG_NAMESPACE} Overwriting environment variable "${varName}" with value of "${varName}" found in process.env`
        )
      );
      envVars[varName] = process.env[varName];
    }
    if (process.env.hasOwnProperty(`${normalizedAppName}_${varName}`)) {
      console.log(
        chalk.yellow(
          `${LOG_CONFIG_NAMESPACE} Overwriting environment variable "${varName}" for app "${appName}" with value of "${normalizedAppName}_${varName}" found in process.env`
        )
      );
      envVars[varName] = process.env[`${normalizedAppName}_${varName}`];
    }
  });

  return envVars;
};

const getAppsDataSync = () => {
  const environment = process.env.ENVIRONMENT;
  const baseAppsData = appsJson._base;
  const environmentAppsData = appsJson[environment] || {};
  const baseEnvironmentAppsData = environmentAppsData && environmentAppsData._base;
  if (!environment) {
    console.log(chalk.yellow(`[Apps config] -> ENVIRONMENT not defined. Using only _base config`));
  } else {
    console.log(
      chalk.yellow(`[Apps config] -> Reading variables for environment "${environment}"`)
    );
  }
  const config = Object.keys(baseAppsData).reduce((currentConfig, appName) => {
    if (appName === "_base") {
      return currentConfig;
    }
    const appConfig = {
      envVars: addEnvVars(
        {
          ...baseAppsData._base,
          ...baseAppsData[appName],
          ...baseEnvironmentAppsData,
          ...environmentAppsData[appName],
        },
        appName
      ),
      name: appName,
      environment,
    };
    currentConfig.push(appConfig);
    return currentConfig;
  }, []);
  return config;
};

const getAppsData = () => {
  return Promise.resolve(getAppsDataSync());
};

const getAppEnvVars = (appName) => {
  const appsData = getAppsDataSync();
  const appData = appsData.find((app) => app.name === appName);
  if (!appData) {
    throw new Error(`Data for app ${appName} not found`);
  }
  return getAppEnvVarsFromAppData(appData);
};

const runNpmCommandWithAppConfig = (npmCommand, app, customBuildFolder) => {
  console.log(
    chalk.cyan(
      `${LOG_NAMESPACE} Running npm command "${npmCommand}" with app config "${app.name}"...`
    )
  );

  const envVars = getAppEnvVarsFromAppData(app);

  return cleanBuild()
    .then(() => {
      return npmRun(npmCommand, envVars)
        .catch((err) => {
          console.log(
            chalk.red(
              `${LOG_NAMESPACE} Error executing npm command "${npmCommand}" with app config "${app.name}"`
            )
          );
          return Promise.reject(err);
        })
        .then(() => {
          console.log(
            chalk.green(
              `${LOG_NAMESPACE} Successfully executed npm command "${npmCommand}" with app config "${app.name}"`
            )
          );
          return Promise.resolve();
        });
    })
    .then(() => {
      return deployApp(app.name, envVars.PUBLIC_URL, customBuildFolder);
    });
};

const runNpmCommandWithAppsConfig = (npmCommand, apps, customBuildFolder, appIndex = 0) => {
  if (appIndex === apps.length) {
    return Promise.resolve();
  }
  return runNpmCommandWithAppConfig(npmCommand, apps[appIndex], customBuildFolder).then(() => {
    return runNpmCommandWithAppsConfig(npmCommand, apps, customBuildFolder, appIndex + 1);
  });
};

// If NPM command to run must always include the "build" one, as the built files are automatically done after executing it

const getAppsAndRunNpmCommand = (npmCommand, customBuildFolder) => {
  const log = `[Apps npm command] -> `;
  return cleanDeploy().then(() => {
    return getAppsData().then((apps) => {
      console.log(chalk.cyan(`${log} Running command "${npmCommand}" with every apps config`));
      return runNpmCommandWithAppsConfig(npmCommand, apps, customBuildFolder)
        .then(() => {
          console.log(
            chalk.green(
              `${log} Command "${npmCommand}" successfully executed with every apps config`
            )
          );
        })
        .catch((err) => {
          console.log(err);
          console.log(chalk.red(`${log} Command failed`));
          process.exit(1);
        });
    });
  });
};

module.exports = {
  getAppEnvVars,
  getAppsData,
  getAppsAndRunNpmCommand,
};

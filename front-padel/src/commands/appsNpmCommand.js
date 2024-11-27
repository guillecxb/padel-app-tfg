// Este script se encarga de ejecutar un comando de npm para múltiples aplicaciones. El comando se define mediante una opción de línea de comandos.

const commander = require("commander");

const { getAppsAndRunNpmCommand } = require("./utils/apps");

commander.storeOptionsAsProperties(true);

commander.option("--run <command>", "Npm command to run");
commander.option("--buildFolder <buildFolder>", "Build folder of the NPM command");

const { run, buildFolder } = commander.parse(process.argv);

getAppsAndRunNpmCommand(run, buildFolder).catch((error) => {
  console.error(error);
  process.exit(1);
});

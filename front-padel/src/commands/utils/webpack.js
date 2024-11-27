const path = require("path");

const webpack = require("webpack");
const fsExtra = require("fs-extra");
const chalk = require("chalk");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const babelConfig = require("../../babel.config");

const { srcFolder, publicFolder, rootFolder, reportsFile } = require("./paths");

process.env.REACT_APP_VERSION =
  process.env.REACT_APP_VERSION || require("../../package.json").version;

process.env.REACT_APP_RELEASE_TIMESTAMP = new Date().getTime();
process.env.REACT_APP_API_VERSIONS = JSON.stringify(require("../../api-versions.json"));

// Helpers

const isProduction = (env) => env === "production";

const getBabelAbsoluteAliases = (aliases) => {
  return Object.keys(aliases).reduce((absoluteAliases, aliasName) => {
    absoluteAliases[aliasName] = path.resolve(rootFolder, aliases[aliasName]);
    return absoluteAliases;
  }, {});
};

const customFolder = (baseFolder, envVar) => {
  const envVarValue = process.env[envVar];
  const subRoute = [baseFolder, envVarValue];
  const customPath = path.resolve.apply(null, [srcFolder].concat("custom").concat(subRoute));
  if (!fsExtra.pathExistsSync(customPath)) {
    console.log(
      chalk.red(
        `Custom folder "${customPath}" does not exists. Please check the ${envVar} environment variable`
      )
    );
    throw new Error("Invalid configuration");
  } else {
    console.log(
      `${chalk.cyan(`[App customization] -> Loading ${baseFolder} from `)}${customPath}`
    );
  }
  return customPath;
};

const customThemeFolder = customFolder("themes", "REACT_APP_THEME");
const customAssetsFolder = customFolder("assets", "REACT_APP_ASSETS");
const customSettingsFolder = customFolder("settings", "REACT_APP_SETTINGS");

const customSettings = require(customSettingsFolder);

const findHtmlWebpackPlugin = (plugins) => {
  return plugins.find((plugin) => {
    plugin.constructor.name === "HtmlWebpackPlugin" && console.log(plugin);
    return !!(
      plugin.constructor.name === "HtmlWebpackPlugin" &&
      plugin.userOptions &&
      plugin.userOptions.template
    );
  });
};

const getCustomAlias = () => {
  return {
    "custom/theme": customThemeFolder,
    "custom/assets": customAssetsFolder,
    "custom/settings": customSettingsFolder,
  };
};

// Add brand dependant aliases to webpack config
const addResolveAlias = (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    ...getBabelAbsoluteAliases(babelConfig.plugins[0][1].alias),
    ...getCustomAlias(),
  };
  return config;
};

// Remove eslint execution for hot reloading, as lint command has been added to githook and pipeline
const removeEslintPlugin = (config) => {
  let eslintPluginIndex;
  config.plugins.forEach((plugin, pluginIndex) => {
    if (plugin instanceof EslintPlugin) {
      eslintPluginIndex = pluginIndex;
    }
  });
  if (eslintPluginIndex) {
    config.plugins.splice(eslintPluginIndex, 1);
  }
  return config;
};

// Make custom settings available to index.html template
const addCustomHTMLTemplateParameters = (config) => {
  const pluginConfig = findHtmlWebpackPlugin(config.plugins);
  pluginConfig.userOptions = { ...pluginConfig.userOptions, ...customSettings };
  return config;
};

const addPolyfill = (config) => {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    process: require.resolve("process/browser"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
      crypto: "crypto-browserify",
    }),
  ]);
  return config;
};

// Generate bundle size analysis
const addBundleAnalyzer = (config) => {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: reportsFile,
    })
  );
  return config;
};

// Copy brand dependant assets to public folder, and generate a custom manifest.json file
const copyRootAssets = (config) => {
  const manifest = require("../templates/manifest.json");
  manifest.short_name = customSettings.brandName;
  manifest.name = customSettings.appDescription;
  fsExtra.writeJSONSync(path.resolve(publicFolder, "manifest.json"), manifest);
  fsExtra.copySync(path.resolve(customAssetsFolder, "root"), publicFolder);
  return config;
};

// Create config.json file in root folder
const createConfigFile = (config) => {
  const configJson = require("../templates/config.json");
  configJson.version = process.env.REACT_APP_VERSION;
  fsExtra.writeJSONSync(path.resolve(publicFolder, "config.json"), configJson);
  return config;
};

// Avoid circular dependencies
const avoidCircularDependencies = (config) => {
  config.plugins.push(
    new CircularDependencyPlugin({
      failOnError: true,
      exclude: /node_modules/,
      include: /src/,
      cwd: process.cwd(),
    })
  );
  return config;
};

module.exports = {
  isProduction,
  removeEslintPlugin,
  getCustomAlias,
  addResolveAlias,
  addCustomHTMLTemplateParameters,
  addBundleAnalyzer,
  copyRootAssets,
  createConfigFile,
  avoidCircularDependencies,
  addPolyfill,
};

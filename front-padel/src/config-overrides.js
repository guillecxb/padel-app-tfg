const {
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
} = require("./commands/utils/webpack");

module.exports = {
  webpack: (config, env) => {
    copyRootAssets(config);
    createConfigFile(config);
    removeEslintPlugin(config);
    addResolveAlias(config);
    addCustomHTMLTemplateParameters(config);
    avoidCircularDependencies(config);
    addPolyfill(config);
    // Add Bundle analyzer for production environments
    if (isProduction(env)) {
      addBundleAnalyzer(config);
    }
    return config;
  },
  jest: (config) => {
    const customAliases = getCustomAlias();
    Object.keys(customAliases).forEach((alias) => {
      config.moduleNameMapper[`^${alias}(.*)`] = `${customAliases[alias]}$1`;
    });
    // config.testMatch = ["**/src/helpers/permissions/fields.test.js"];
    return config;
  },
};

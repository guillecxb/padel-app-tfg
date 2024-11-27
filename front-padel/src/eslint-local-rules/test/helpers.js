const RuleTester = require("eslint").RuleTester;

const settings = {};

const createRuleTester = (extendSettings) => {
  const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2015, sourceType: "module" },
    settings: {
      ...settings,
      ...extendSettings,
    },
  });

  return ruleTester;
};

module.exports = {
  createRuleTester,
};

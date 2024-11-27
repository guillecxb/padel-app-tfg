module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          // App
          domain: "./src/domain",
          // Cypress
          "cypress/support": "./cypress/support",
          "cypress/selectors": "./cypress/selectors",
          "cypress/bases": "./cypress/support/page-objects/bases",
          "cypress/components": "./cypress/support/page-objects/components",
          "cypress/pages": "./cypress/support/page-objects/pages",
          "cypress/modules": "./cypress/support/page-objects/modules",
          // Support
          support: "./src/support",
        },
      },
    ],
  ],
};

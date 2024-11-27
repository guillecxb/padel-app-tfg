const { createRuleTester } = require("../helpers");

const rule = require(`../../rules/no-should-inside-wait`);
const ruleTester = createRuleTester();

ruleTester.run("no-should-inside-wait", rule, {
  valid: [
    // Check methods can be used inside waitUntilCheck method
    {
      code: "cy.waitUntilCheck(() => foo.checkFoo());",
    },
    // Check methods can be used inside waitLongUntilCheck method
    {
      code: "cy.waitLongUntilCheck(() => foo.checkAgain());",
    },
    // Should methods can be used outside wait methods
    {
      code: "foo.var.shouldHaveLength(2)",
    },
  ],
  invalid: [
    // Should methods can't be used without being called
    {
      code: "foo.var.shouldHaveLength",
      errors: [
        {
          message: "shouldHaveLength must be executed",
          type: "Identifier",
        },
      ],
    },
    // Should methods can't be used inside a waitUntilCheck
    {
      code: "cy.waitUntilCheck(() => foo.shouldFoo());",
      errors: [
        {
          message: "shouldFoo must not be used inside waitUntilCheck",
          type: "Identifier",
        },
      ],
    },
    // Should methods can't be used inside a waitLongUntilCheck
    {
      code: "cy.waitLongUntilCheck(() => foo.shouldHaveText());",
      errors: [
        {
          message: "shouldHaveText must not be used inside waitLongUntilCheck",
          type: "Identifier",
        },
      ],
    },
  ],
});

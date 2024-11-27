const { createRuleTester } = require("../helpers");

const rule = require(`../../rules/no-check-outside-wait`);
const ruleTester = createRuleTester();

ruleTester.run("no-check-outside-wait", rule, {
  valid: [
    // Check methods can be used inside waitUntilCheck method
    {
      code: "cy.waitUntilCheck(() => foo.checkFoo());",
    },
    // Check methods can be used inside waitLongUntilCheck method
    {
      code: "cy.waitLongUntilCheck(() => foo.checkAgain());",
    },
  ],
  invalid: [
    // Check methods can't be used without being called
    {
      code: "foo.var.checkFoo",
      errors: [
        {
          message: "checkFoo must be executed",
          type: "Identifier",
        },
      ],
    },
    // Check methods can't be used ouside an arrow function
    {
      code: "foo.var.checkFoo();",
      errors: [
        {
          message: "checkFoo must be used inside an arrow function",
          type: "Identifier",
        },
      ],
    },
    // Check methods can't be used ouside a callback
    {
      code: "const a = () => foo.var.checkVar();",
      errors: [
        {
          message: "checkVar must be used inside an arrow function used as callback",
          type: "Identifier",
        },
      ],
    },
    // Check methods can't be used if wait methods are not members of a expression
    {
      code: "waitUntilCheck(() => foo.var.check());",
      errors: [
        {
          message: "check must be used inside: waitUntilCheck, waitLongUntilCheck",
          type: "Identifier",
        },
      ],
    },
    ,
    // Check methods can't be used inside a method different to waitUntilCheck or waitLongUntilCheck
    {
      code: "cy.waitUntil(() => foo.var.checkFoo());",
      errors: [
        {
          message: "checkFoo must be used inside: waitUntilCheck, waitLongUntilCheck",
          type: "Identifier",
        },
      ],
    },
  ],
});

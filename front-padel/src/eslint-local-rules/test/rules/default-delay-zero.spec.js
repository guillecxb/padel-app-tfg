const { createRuleTester } = require("../helpers");

const rule = require(`../../rules/default-delay-zero`);
const ruleTester = createRuleTester();

const ERROR_MESSAGE = "DEFAULT_DELAY must have value 0";

ruleTester.run("default-delay-zero", rule, {
  valid: [
    // Check methods can be used inside waitUntilCheck method
    {
      code: "const DEFAULT_DELAY=0;",
    },
    {
      code: "var DEFAULT_DELAY=0;",
    },
    {
      code: "let DEFAULT_DELAY=0;",
    },
    {
      code: "let DEFAULT_DELAY; DEFAULT_DELAY=0;",
    },
  ],
  invalid: [
    // Check methods can't be used without being called
    {
      code: "const DEFAULT_DELAY=1000;",
      errors: [
        {
          message: ERROR_MESSAGE,
          type: "VariableDeclarator",
        },
      ],
    },
    {
      code: "let DEFAULT_DELAY=1000;",
      errors: [
        {
          message: ERROR_MESSAGE,
          type: "VariableDeclarator",
        },
      ],
    },
    {
      code: "var DEFAULT_DELAY=1000;",
      errors: [
        {
          message: ERROR_MESSAGE,
          type: "VariableDeclarator",
        },
      ],
    },
    {
      code: "let DEFAULT_DELAY; DEFAULT_DELAY=1000;",
      errors: [
        {
          message: ERROR_MESSAGE,
          type: "AssignmentExpression",
        },
      ],
    },
  ],
});

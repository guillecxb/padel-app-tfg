const { createRuleTester } = require("../helpers");

const rule = require(`../../rules/no-wait-outside-it`);
const ruleTester = createRuleTester();

ruleTester.run("no-wait-outside-it", rule, {
  valid: [
    // waitUntilCheck method can be used inside an it
    {
      code: `it(() => {
        cy.waitUntilCheck(() => foo.checkFoo());   
      })`,
    },
    // waitLongUntilCheck method can be used inside an it
    {
      code: `it(() => {
        cy.waitLongUntilCheck(() => foo.checkFoo());   
      })`,
    },
    // waitUntilCheck method can be used inside a tag inside an it
    {
      code: `it(() => {
        tag(() => {
          cy.waitUntilCheck(() => foo.checkFoo());   
        });
      })`,
    },
    // waitLongUntilCheck method can be used inside a tag inside an it
    {
      code: `it(() => {
        tag(() => {
          cy.waitLongUntilCheck(() => foo.checkFoo());   
        });
      })`,
    },
  ],
  invalid: [
    // waitLongUntilCheck method can`t be used at first level
    {
      code: "cy.waitLongUntilCheck(() => foo.checkFoo());",
      errors: [
        {
          message: `waitLongUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitUntilCheck method can`t be used at first level
    {
      code: "cy.waitUntilCheck(() => foo.checkFoo());",
      errors: [
        {
          message: `waitUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitLongUntilCheck method can`t be used inside a before
    {
      code: `before(() => {
        cy.waitLongUntilCheck(() => foo.checkFoo());   
      })`,
      errors: [
        {
          message: `waitLongUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitUntilCheck method can`t be used inside a before
    {
      code: `before(() => {
        cy.waitUntilCheck(() => foo.checkFoo());   
      })`,
      errors: [
        {
          message: `waitUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitLongUntilCheck method can`t be used inside an after
    {
      code: `after(() => {
        cy.waitLongUntilCheck(() => foo.checkFoo());   
      })`,
      errors: [
        {
          message: `waitLongUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitUntilCheck method can`t be used inside an after
    {
      code: `after(() => {
        cy.waitUntilCheck(() => foo.checkFoo());   
      })`,
      errors: [
        {
          message: `waitUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitLongUntilCheck method can`t be used inside a tag inside a before
    {
      code: `before(() => {
        tag("@foo", () => {
          cy.waitLongUntilCheck(() => foo.checkFoo());   
        });  
      })`,
      errors: [
        {
          message: `waitLongUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
    // waitUntilCheck method can`t be used inside a tag inside a before
    {
      code: `before(() => {
        tag("@foo", () => {
          cy.waitUntilCheck(() => foo.checkFoo());
        });
      })`,
      errors: [
        {
          message: `waitUntilCheck must be used only inside an "it"`,
          type: "Identifier",
        },
      ],
    },
  ],
});

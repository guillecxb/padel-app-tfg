const { meta } = require("../helpers/rules");
const { ALLOWED_WAIT_METHODS } = require("../helpers/constants");

module.exports = {
  ...meta("Disallow usage of should methods inside waitUntilCheck"),
  create: function (context) {
    return {
      Identifier: function (node) {
        if (node.name.indexOf("should") === 0) {
          if (node.parent.parent.type !== "CallExpression") {
            context.report({
              node,
              message: `${node.name} must be executed`,
            });
            return;
          }
          if (
            node.parent.parent.parent.type === "ArrowFunctionExpression" &&
            node.parent.parent.parent.parent.type === "CallExpression" &&
            node.parent.parent.parent.parent.arguments[0] === node.parent.parent.parent &&
            node.parent.parent.parent.parent.callee.type === "MemberExpression" &&
            ALLOWED_WAIT_METHODS.includes(node.parent.parent.parent.parent.callee.property.name)
          ) {
            context.report({
              node,
              message: `${node.name} must not be used inside ${node.parent.parent.parent.parent.callee.property.name}`,
            });
          }
        }
      },
    };
  },
};

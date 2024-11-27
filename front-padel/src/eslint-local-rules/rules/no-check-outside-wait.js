const { meta } = require("../helpers/rules");
const { ALLOWED_WAIT_METHODS } = require("../helpers/constants");

module.exports = {
  ...meta("Disallow usage of check methods outside waitUntilCheck"),
  create: function (context) {
    return {
      Identifier: function (node) {
        if (node.name.indexOf("check") === 0) {
          if (node.parent.parent.type !== "CallExpression") {
            context.report({
              node,
              message: `${node.name} must be executed`,
            });
            return;
          }
          if (node.parent.parent.parent.type !== "ArrowFunctionExpression") {
            context.report({
              node,
              message: `${node.name} must be used inside an arrow function`,
            });
            return;
          }
          if (
            node.parent.parent.parent.parent.type !== "CallExpression" ||
            node.parent.parent.parent.parent.arguments[0] !== node.parent.parent.parent
          ) {
            context.report({
              node,
              message: `${node.name} must be used inside an arrow function used as callback`,
            });
            return;
          }
          if (
            node.parent.parent.parent.parent.callee.type !== "MemberExpression" ||
            !ALLOWED_WAIT_METHODS.includes(node.parent.parent.parent.parent.callee.property.name)
          ) {
            context.report({
              node,
              message: `${node.name} must be used inside: ${ALLOWED_WAIT_METHODS.join(", ")}`,
            });
            return;
          }
        }
      },
    };
  },
};

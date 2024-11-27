const { meta } = require("../helpers/rules");

const ERROR_MESSAGE = "DEFAULT_DELAY must have value 0";

module.exports = {
  ...meta("Ensure that DEFAULT_DELAY is not changed"),
  create: function (context) {
    return {
      VariableDeclarator: function (node) {
        if (node.id.name === "DEFAULT_DELAY" && node.init && node.init.value !== 0) {
          context.report({
            node,
            message: ERROR_MESSAGE,
          });
        }
      },
      AssignmentExpression: function (node) {
        if (node.left.name === "DEFAULT_DELAY" && node.right.value !== 0) {
          context.report({
            node,
            message: ERROR_MESSAGE,
          });
        }
      },
    };
  },
};

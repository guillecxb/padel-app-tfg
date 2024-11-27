const { meta } = require("../helpers/rules");
const { ALLOWED_WAIT_METHODS } = require("../helpers/constants");

module.exports = {
  ...meta("Disallow usage of wait methods outside it"),
  create: function (context) {
    return {
      Identifier: function (node) {
        const isWaitMethod = ALLOWED_WAIT_METHODS.reduce((anyIsWait, waitMethod) => {
          if (anyIsWait) {
            return true;
          }
          return node.name.indexOf(waitMethod) === 0;
        }, false);
        if (isWaitMethod) {
          const message = `${node.name} must be used only inside an "it"`;
          //console.log(node.parent.parent.parent.parent.parent.type);
          try {
            const blockParent = node.parent.parent.parent.parent.parent.parent;
            if (
              (blockParent.callee.name !== "it" && blockParent.callee.name !== "tag") ||
              (blockParent.callee.name === "tag" &&
                blockParent.parent.parent.parent.parent.callee.name !== "it")
            ) {
              context.report({
                node,
                message,
              });
            }
          } catch (err) {
            context.report({
              node,
              message,
            });
          }
        }
      },
    };
  },
};

const meta = (description, schema = []) => {
  return {
    meta: {
      type: "problem",
      docs: {
        description,
        category: "local-rules",
      },
      fixable: null,
      schema,
    },
  };
};

module.exports = {
  meta,
};

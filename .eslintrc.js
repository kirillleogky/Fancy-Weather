module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  rules: {
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
  },
};

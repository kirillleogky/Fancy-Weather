module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-console": 2,
    "no-implied-eval": 2,
    "no-empty-function": 2,
    "no-constructor-return": 2,
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
  },
};

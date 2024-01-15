module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  scripts: {
    lint: 'eslint .',
  },
  rules: { 'import/extensions': ['error', 'ignorePackages'] },
};

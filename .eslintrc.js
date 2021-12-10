module.exports = {
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
  },
};

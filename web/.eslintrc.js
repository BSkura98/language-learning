module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/semi': [2, 'always'],
    '@typescript-eslint/space-before-function-paren': [0],
    '@typescript-eslint/triple-slash-reference': [0],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/comma-dangle': [0],
    'comma-dangle': [0],
    'react/display-name': [0],
    semi: [0],
    '@typescript-eslint/member-delimiter-style': [0],
    '@typescript-eslint/strict-boolean-expressions': [0],
    '@typescript-eslint/no-extraneous-class': [0],
    '@typescript-eslint/no-confusing-void-expression': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
  },
};

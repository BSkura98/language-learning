module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/semi': [2, "always"],
    "@typescript-eslint/space-before-function-paren": [0],
    "@typescript-eslint/triple-slash-reference": [0]
  }
}

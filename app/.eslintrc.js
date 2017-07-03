module.exports = {
  extends: 'feathr',
  plugins: [
    'import'
  ],
  env: { 'es6': true },
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }]
  }
};

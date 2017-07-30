module.exports = {
  extends: 'feathr',
  plugins: [
    'import',
  ],
  env: { 'es6': true },
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }]
  },
  globals: {
    afterEach: false,
    beforeEach: false,
    describe: false,
    expect: false,
    it: false,
    sinon: false,
  },
};

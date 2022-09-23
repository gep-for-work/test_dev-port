module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 6,
    parserOptions: {
      requireConfigFile: false,
    },
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['plugin:vue/base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
  },
};

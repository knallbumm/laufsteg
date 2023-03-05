require('@rushstack/eslint-patch/modern-module-resolution');
const rootConfig = require('../../.eslintrc.cjs');

module.exports = {
  root: true,
  ...rootConfig,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    ...rootConfig.rules,
    'vue/multi-word-component-names': 0,
  },
};

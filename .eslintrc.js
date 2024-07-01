module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true, //defineProps를 더이상 사용하지 않게 되면서 eslint오류를 무시하기위함 조치
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier'],
  ignorePatterns: ['node_modules', 'dist', '*.d.ts', 'vendor'],
  rules: {
    'vue/multi-word-component-names': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: {},
    },
  },
};

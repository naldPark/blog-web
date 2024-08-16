module.exports = {
  root: true,

  parser: 'vue-eslint-parser', // Vue 파일의 구문을 이해할 수 있는 parser
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser', // TypeScript 구문을 이해하기 위한 parser
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2020: true,
    'vue/setup-compiler-macros': true, //defineProps를 더이상 사용하지 않게 되면서 eslint오류를 무시하기위함 조치
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier','plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['node_modules', 'dist', '*.d.ts', 'vendor','.eslintrc.cjs'],
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

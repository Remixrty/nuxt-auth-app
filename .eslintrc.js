module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
    'commonjs': true,
    'node': true,
    'es6': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // TODO после рефакторинга надо заменить на error, в идеале, надо отрефакторить и прийти к максимальной вложенности 6
    'complexity': ['warn', 10],
    'quotes': ['error', 'single'],
    // TODO после рефакторинга надо заменить на error
    'no-unsafe-optional-chaining': 'warn',
    'indent': ['error', 2],
    'no-extra-semi': 'error',
    'no-case-declarations': 'off',
    'object-curly-spacing': ['error', 'always'],
    'vue/no-multi-spaces': ['error'],
    'vue/script-indent': ['error', 2, { 'baseIndent': 0 }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-empty-component-block': ['error'],
    'vue/no-unused-properties': ['error'],
    'vue/mustache-interpolation-spacing': [2, 'always'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      // для библиотечных компонентов предпочтителен kebab
      'registeredComponentsOnly': true,
    }],
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': 'props' }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      }
    }
  ]
}

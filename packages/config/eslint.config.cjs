const parser = require('@typescript-eslint/parser');
const eslint = require('@eslint/js');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const sortImportPlugin = require('eslint-plugin-simple-import-sort');

module.exports = [
  eslint.configs.recommended,
  {
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: [
      'dist',
      'tsconfig.json',
      'node_modules',
      '.eslintrc.cjs',
      'esbuild.js',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      'simple-import-sort': sortImportPlugin,
    },
    rules: {
      'import/no-duplicates': 'error',
      'import/order': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/member-ordering': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/no-invalid-void-type': 'warn',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-includes': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': 'warn',
      '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
      '@typescript-eslint/promise-function-async': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-array-constructor': 'warn',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-loop-func': 'warn',
      '@typescript-eslint/no-redeclare': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/return-await': 'warn',
      '@typescript-eslint/require-await': 'warn',
    },
  },
];

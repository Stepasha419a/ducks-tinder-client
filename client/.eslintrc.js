module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'airbnb-base',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'import/prefer-default-export': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off', // takes up too large code space
    'operator-linebreak': 'off', // takes up too large code space
    '@typescript-eslint/indent': 'off', // requires big expressions inline
    'object-curly-newline': 'off', // temporary, needs to make prettierrc
    '@typescript-eslint/strict-boolean-expressions': 'off', // requires extra boolean in expressions
    'no-param-reassign': 'off',
    // bad practice, because requires to rewrite some functions to return instead of rewrite params
    '@typescript-eslint/no-misused-promises': 'off', // no need to await Promise<void>
    '@typescript-eslint/no-floating-promises': 'off',
    // no need to await or catch redux-thunk in a component layer
    '@typescript-eslint/promise-function-async': 'off',
    'react/no-unescaped-entities': 'off', // no need to use code as '&apos;' instead of ' or " mark
    'no-underscore-dangle': 'off', // if you use similar properties like _id and so on
    'consistent-return': 'off', // not every arrow function returns value
    '@typescript-eslint/return-await': 'off', // no need to return await
    '@typescript-eslint/consistent-type-assertions': 'off', // too difficult not to use 'as'
    'no-plusplus': 'off', // to use ++/--
    'comma-dangle': 'off', // prettier does it for me
    'arrow-body-style': 'off',
    'no-restricted-syntax': 'off', // needs to rewrite
    'no-await-in-loop': 'off', // needs to rewrite, for await
    'implicit-arrow-linebreak': 'off',
    // expects no linebreak with max line length 100 syms (there were 100+)
    'no-confusing-arrow': 'off', // too complicated arrow body
    'no-use-before-define': 'off',
    // no need to show much complicated function before exporting the main function
    'default-case': 'off', // not in every switch
    'guard-for-in': 'off', // requires using if(Object.hasOwn) check for every for in iteration},
  },
};

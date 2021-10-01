module.exports = {
  env: {
    'jest/globals': true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  rules: {
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off',
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: true,
        allow: [],
      },
    ],
    'consistent-return': 'off',
    'no-console': 'warn',
    'no-shadow': 'off',
    'operator-linebreak': 'off',
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.spec.js',
          '**/*.spec.ts',
          '**/*.test.js',
          '**/*.test.ts',
          'jest.*.js',
        ],
      },
    ],
    'import/no-mutable-exports': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
  },
};

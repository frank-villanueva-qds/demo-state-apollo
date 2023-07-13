module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint-config-standard-react',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  ignorePatterns: [
    'saleor/**/*.ts',
    'lib/auth/**/*.ts',
    'pnpm-lock.yaml',
    'graphql.schema.json',
  ],
}

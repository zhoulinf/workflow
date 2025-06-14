module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/jsx-runtime', 'airbnb', 'airbnb/hooks'],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Add any extensions you are using
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 禁止console
    'no-console': 'error',
    'no-unused-vars': 'off', // 关闭默认的 no-unused-vars
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    // react规则
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    // 模块引入
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',

    // 无障碍
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [], // 允许默认的 <label>
      },
    ],
    // typescript
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 允许非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],

    'arrow-body-style': ['error', 'as-needed'],
  },
};

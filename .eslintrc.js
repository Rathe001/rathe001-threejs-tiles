module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  plugins: ['sort-destructure-keys', 'sort-keys-fix'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-keys-fix/sort-keys-fix': 2,
  },
};

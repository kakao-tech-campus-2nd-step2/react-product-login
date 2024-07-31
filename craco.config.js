const { configure } = require('@testing-library/react');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      transform: {
        '^.+\\.tsx?$': 'babel-jest',
      },
    },
  },
};

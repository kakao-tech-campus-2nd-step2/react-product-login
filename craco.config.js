const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      testEnvironment: 'jsdom',
    },
  },
};

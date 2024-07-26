const path = require('path');

module.exports = {
  jest: {
    configure: {
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    },
  },

  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

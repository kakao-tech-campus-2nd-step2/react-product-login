const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^axios$': require.resolve('axios'),
      },
      transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
      },
      transformIgnorePatterns: [
        '/node_modules/(?!axios/)', // Ensure axios is transformed
      ],
    },
  },
};

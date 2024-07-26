const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    },
  },
};
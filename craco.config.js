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
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // 절대 경로 설정
      },
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Babel을 사용하여 JS 파일을 변환
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)', // axios 모듈을 변환 대상으로 포함
      ],
    },
  },
};

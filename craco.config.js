const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest', // ts-jest 프리셋
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // TypeScript 파일에 대한 ts-jest
        '^.+\\.js$': 'babel-jest', // JavaScript 파일에 대한 babel-jest
      },
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
      },
      transformIgnorePatterns: [
        '/node_modules/(?!(axios|@tanstack|react-query)/)', // 필요한 모듈에 대해서만 변환을 수행
      ],
      testEnvironment: 'jsdom', // React는 jsdom 환경에서 테스트
    },
  },
};

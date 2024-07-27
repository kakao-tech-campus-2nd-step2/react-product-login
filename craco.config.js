const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      // ts-jest를 사용하여 TypeScript 파일을 변환하도록 설정
      jestConfig.transform = {
        '^.+\\.(ts|tsx)$': 'ts-jest', // TypeScript 파일에 대해 ts-jest를 사용
        '^.+\\.js$': 'babel-jest', // JavaScript 파일에 대해 babel-jest를 사용
      };

      // CSS 파일을 모킹하도록 설정
      jestConfig.moduleNameMapper = {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
      };

      // transformIgnorePatterns 설정을 추가하여 필요한 모듈에 대해서만 변환을 수행하도록 설정
      jestConfig.transformIgnorePatterns = [
        '/node_modules/(?!(axios|@tanstack|react-query)/)', // 필요한 모듈에 대해서만 변환을 수행
      ];

      // 테스트 환경 설정
      jestConfig.testEnvironment = 'jsdom'; // React는 jsdom 환경에서 테스트

      return jestConfig;
    },
  },
};

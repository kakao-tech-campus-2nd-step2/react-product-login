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
      // Babel을 사용하여 JS 및 TS 파일을 변환하도록 설정
      jestConfig.transform = {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      };

      // 모듈 경로를 매핑
      jestConfig.moduleNameMapper = {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
      };

      // transformIgnorePatterns 설정을 추가하여 필요한 모듈에 대해서만 변환을 수행하도록 설정
      jestConfig.transformIgnorePatterns = [
        '/node_modules/(?!(axios|@tanstack|react-query)/)', // 여기서 필요한 모듈들을 나열
      ];

      return jestConfig;
    },
  },
};

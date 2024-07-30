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
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // 절대 경로 설정
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babel을 사용하여 JS/TS 파일을 변환
      },
      transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)', // axios 모듈을 변환 대상으로 포함
      ],
    },
  },
};

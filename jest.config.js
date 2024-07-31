module.exports = {
  // ts-jest 프리셋을 사용하여 TypeScript 파일을 트랜스파일
  preset: 'ts-jest',

  // jsdom 테스트 환경 설정
  testEnvironment: 'jsdom',

  // 테스트 실행 전에 setup 파일을 설정
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // 모듈 이름 매핑을 통해 @/ 경로 별칭을 src 디렉터리로 매핑
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
  },

  // Babel을 사용하여 .js, .jsx, .ts, .tsx 파일을 트랜스파일
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // node_modules 디렉터리 내의 파일을 변환하지 않도록 설정
  transformIgnorePatterns: [
    'node_modules/(?!axios)/', // axios는 변환
  ],
};

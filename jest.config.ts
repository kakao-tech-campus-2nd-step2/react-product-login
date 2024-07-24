export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

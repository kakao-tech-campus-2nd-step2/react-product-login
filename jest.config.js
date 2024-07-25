export const roots = ['<rootDir>/src'];
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};
export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];

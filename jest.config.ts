export default {
  moduleDirectories: ['./node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg)$':
      '<rootDir>/src/mocks/pollyfills/file.mock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.ts'],
};

module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^axios$': require.resolve('axios')
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)' 
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};

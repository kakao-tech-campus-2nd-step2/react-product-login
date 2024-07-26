module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
	  '^@/(.*)$': '<rootDir>/src/$1',
	  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	  transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	  },
	  transformIgnorePatterns: [
		'node_modules/(?!@babel/runtime)',
	  ],
  };
  
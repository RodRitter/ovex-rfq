import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  preset: 'ts-jest',
  bail: 1,
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: 'v8',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['**/tests/unit/**/*.[jt]s?(x)'],
      setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
          'babel-jest',
          { configFile: './jest-babel.config.cjs' },
        ],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
    {
      displayName: 'integration',
      testMatch: ['**/tests/integration/**/*.test.[jt]s?(x)'],
      setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
          'babel-jest',
          { configFile: './jest-babel.config.cjs' },
        ],
      },
    },
  ],
};

export default createJestConfig(config);

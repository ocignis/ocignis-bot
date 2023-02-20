import { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfigs/tsconfig.test.json' }],
  },
  collectCoverageFrom: ['src/**/*.{ts}', '!src/**/*.test.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

module.exports = jestConfig;

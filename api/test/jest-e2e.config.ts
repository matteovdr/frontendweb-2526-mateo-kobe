import type { Config } from 'jest';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  globalSetup: './test/jest.global-setup.ts',
  globalTeardown: './test/jest.global-teardown.ts',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
} satisfies Config
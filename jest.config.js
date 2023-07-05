/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};

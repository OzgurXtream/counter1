module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['tests/**/*.ts'],
  reporters: ['default', 'jest-junit'],
};
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  testTimeout: 60000,
  verbose: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>"
  }),
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  }
};

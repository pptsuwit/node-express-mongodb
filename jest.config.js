module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["dist"],
  moduleNameMapper: {
    "^@middlewares(.*)$": "<rootDir>/src/middlewares/$1",
    "^@controllers(.*)$": "<rootDir>/src/controllers/$1",
    "^@models(.*)$": "<rootDir>/src/models/$1",
    "^@services(.*)$": "<rootDir>/src/services/$1",
    "^@utils(.*)$": "<rootDir>/src/utils/$1",
    "^@config(.*)$": "<rootDir>/src/config/$1",
    "^@routes(.*)$": "<rootDir>/src/routes/$1",
  },
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	cacheDirectory: ".tmp/jestCache",
	testMatch: ["**/*.test.ts"]
};

import { pathsToModuleNameMapper } from "ts-jest";

export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
	coveragePathIgnorePatterns: ["/node_modules/"],
	moduleNameMapper: pathsToModuleNameMapper(
		{
			"@modules/*": ["modules/*"],
			"@shared/*": ["shared/*"]
		},
		{
			prefix: "<rootDir>/src/"
		}
	),
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.spec.ts"]
};

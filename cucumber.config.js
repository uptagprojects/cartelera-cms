module.exports = {
	default: {
		requireModule: ["ts-node/register"],
		require: ["tests/features/step_definitions/*.steps.ts", "test/features/**/*.steps.ts"],
		paths: ["tests/features/**/*.feature"],
		format: [
			"progress-bar",
			["junit", "coverage/junit.xml"],
			["html", "coverage/cucumber-report.html"]
		]
	},
	cda: {
		requireModule: ["ts-node/register"],
		require: [
			"tests/features/step_definitions/*.steps.ts",
			"test/features/cda/step_definitions/*.steps.ts"
		],
		paths: ["tests/features/cda/**/*.feature"],
		format: [
			"progress-bar",
			["junit", "coverage/junit.xml"],
			["html", "coverage/cucumber-report.html"]
		]
	},
	cma: {
		requireModule: ["ts-node/register"],
		require: [
			"tests/features/step_definitions/*.steps.ts",
			"test/features/cma/step_definitions/*.steps.ts"
		],
		paths: ["tests/features/cma/**/*.feature"],
		format: [
			"progress-bar",
			["junit", "coverage/junit.xml"],
			["html", "coverage/cucumber-report.html"]
		]
	}
};

const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000",
		specPattern: "./tests/e2e/**/*.cy.ts",
		setupNodeEvents() {},
		supportFile: "./tests/e2e/support/e2e.ts"
	},
	component: {
		devServer: {
			framework: "next",
			bundler: "webpack"
		},
		specPattern: "./tests/components/**/*.cy.tsx",
		supportFile: "./tests/components/support/components.ts",
		indexHtmlFile: "./tests/components/support/component-index.html"
	}
});

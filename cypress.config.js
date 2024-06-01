const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {},
    supportFile: "cypress/support/e2e.ts"
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: "cypress/components/**/*.cy.tsx",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html"
  }
});
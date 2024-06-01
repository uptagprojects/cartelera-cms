const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/apps/*/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {},
    supportFile: "tests/apps/shared/support/e2e.ts"
  },
  component: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/apps/*/components/**/*.cy.ts",
    setupNodeEvents(on, config) {},
    supportFile: "tests/apps/shared/support/component.ts"
  }
});
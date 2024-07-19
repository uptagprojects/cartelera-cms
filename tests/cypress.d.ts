/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
      mount(jsx: React__default.ReactNode, options?: MountOptions, rerenderKey?: string): Cypress.Chainable<MountReturn>
    }
  }
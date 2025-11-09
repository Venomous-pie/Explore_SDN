/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/')
  cy.get('[data-cy="sign-in-button"]').click()
  cy.get('[data-cy="signin-email"]').type(email)
  cy.get('[data-cy="signin-password"]').type(password)
  cy.get('[data-cy="signin-submit"]').click()
})

// Custom command for logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="user-menu-button"]').click()
  cy.get('[data-cy="sign-out-button"]').click()
})

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

export {}

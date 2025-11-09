describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open auth modal when clicking sign in', () => {
    cy.get('[data-cy="sign-in-button"]').click()
    cy.get('[data-cy="auth-modal"]').should('be.visible')
    cy.contains('Sign In').should('be.visible')
  })

  it('should switch between sign in and sign up', () => {
    cy.get('[data-cy="sign-in-button"]').click()
    cy.get('[data-cy="auth-modal"]').should('be.visible')
    
    // Switch to Sign Up
    cy.contains('Sign Up').click()
    cy.get('[data-cy="signup-name"]').should('be.visible')
    
    // Switch back to Sign In
    cy.contains('Sign In').click()
    cy.get('[data-cy="signin-email"]').should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('[data-cy="sign-in-button"]').click()
    cy.get('[data-cy="signin-submit"]').click()
    
    // HTML5 validation should prevent submission
    cy.get('[data-cy="signin-email"]:invalid').should('exist')
  })

  it('should register a new user', () => {
    const timestamp = Date.now()
    const testUser = {
      name: 'Test User',
      email: `test${timestamp}@example.com`,
      password: 'password123'
    }

    cy.get('[data-cy="sign-in-button"]').click()
    cy.contains('Sign Up').click()
    
    cy.get('[data-cy="signup-name"]').type(testUser.name)
    cy.get('[data-cy="signup-email"]').type(testUser.email)
    cy.get('[data-cy="signup-password"]').type(testUser.password)
    cy.get('[data-cy="signup-submit"]').click()
    
    // Should close modal and show user menu
    cy.get('[data-cy="auth-modal"]').should('not.exist')
    cy.get('[data-cy="user-menu-button"]').should('be.visible')
  })

  it('should login with existing user', () => {
    // Use the user created in backend/data/users.json
    cy.get('[data-cy="sign-in-button"]').click()
    
    cy.get('[data-cy="signin-email"]').type('email@gmail.com')
    cy.get('[data-cy="signin-password"]').type('HelloWorld')
    cy.get('[data-cy="signin-submit"]').click()
    
    // Should close modal and show user menu
    cy.get('[data-cy="auth-modal"]').should('not.exist')
    cy.get('[data-cy="user-menu-button"]').should('be.visible')
  })

  it('should logout successfully', () => {
    // Login first
    cy.get('[data-cy="sign-in-button"]').click()
    cy.get('[data-cy="signin-email"]').type('email@gmail.com')
    cy.get('[data-cy="signin-password"]').type('HelloWorld')
    cy.get('[data-cy="signin-submit"]').click()
    
    // Wait for login to complete
    cy.get('[data-cy="user-menu-button"]').should('be.visible')
    
    // Logout
    cy.logout()
    
    // Should show sign in button again
    cy.get('[data-cy="sign-in-button"]').should('be.visible')
  })

  it('should close modal when clicking close button', () => {
    cy.get('[data-cy="sign-in-button"]').click()
    cy.get('[data-cy="auth-modal"]').should('be.visible')
    cy.get('[data-cy="auth-modal-close"]').click()
    cy.get('[data-cy="auth-modal"]').should('not.exist')
  })
})

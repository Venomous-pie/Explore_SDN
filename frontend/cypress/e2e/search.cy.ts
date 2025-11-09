describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open search and display results', () => {
    cy.contains('Search').click()
    cy.get('input[placeholder*="Search"]').should('be.visible')
    
    // Type search query
    cy.get('input[placeholder*="Search"]').type('Cloud 9')
    
    // Wait for debounced search
    cy.wait(500)
    
    // Should show results
    cy.contains('Cloud 9').should('be.visible')
  })

  it('should show loading state while searching', () => {
    cy.contains('Search').click()
    cy.get('input[placeholder*="Search"]').type('Beach')
    
    // Loading indicator should appear briefly
    cy.contains('Searching').should('exist')
  })

  it('should clear search when closing', () => {
    cy.contains('Search').click()
    cy.get('input[placeholder*="Search"]').type('Siargao')
    
    // Close search
    cy.get('body').click(0, 0)
    
    // Reopen and check if cleared
    cy.contains('Search').click()
    cy.get('input[placeholder*="Search"]').should('have.value', '')
  })

  it('should navigate to place when clicking result', () => {
    cy.contains('Search').click()
    cy.get('input[placeholder*="Search"]').type('Cloud 9')
    cy.wait(500)
    
    // Click on a result
    cy.contains('Cloud 9').click()
    
    // Should navigate to the place detail or close search
    cy.url().should('not.equal', 'http://localhost:5173/')
  })
})

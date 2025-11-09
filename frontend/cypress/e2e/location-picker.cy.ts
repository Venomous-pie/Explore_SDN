describe('Location Picker', () => {
  beforeEach(() => {
    cy.visit('/explore')
  })

  it('should display location picker with municipalities', () => {
    cy.contains('Pick your place').should('be.visible')
    cy.contains('Select Area').should('be.visible')
    cy.contains('General Luna').should('be.visible')
  })

  it('should switch between municipalities', () => {
    // Click on a municipality
    cy.contains('General Luna').click()
    cy.contains('Places').should('be.visible')
    
    // Click on another municipality
    cy.contains('Siargao').click()
    cy.contains('Places').should('be.visible')
  })

  it('should display places for selected municipality', () => {
    cy.contains('General Luna').click()
    
    // Should show places list
    cy.contains('Places').should('be.visible')
    
    // Should show at least one place
    cy.get('[data-cy="place-item"]').should('have.length.greaterThan', 0)
  })

  it('should change displayed place when clicking on place', () => {
    cy.contains('General Luna').click()
    
    // Get first place name
    cy.get('[data-cy="place-item"]').first().invoke('text').then((firstPlace) => {
      // Click second place
      cy.get('[data-cy="place-item"]').eq(1).click()
      
      // Main display should update
      cy.get('[data-cy="current-place-name"]').should('not.contain', firstPlace)
    })
  })

  it('should navigate through images', () => {
    cy.contains('General Luna').click()
    
    // Hover over image to show navigation
    cy.get('[data-cy="image-carousel"]').trigger('mouseenter')
    
    // Click next image button
    cy.get('[aria-label="Next image"]').click()
    
    // Image should change (indicator should update)
    cy.get('.bg-white.w-8').should('exist')
  })

  it('should show place details', () => {
    cy.contains('General Luna').click()
    
    // Should show rating
    cy.get('.text-yellow-500').should('be.visible')
    
    // Should show description
    cy.get('.line-clamp-2').should('be.visible')
    
    // Should show tags
    cy.contains('destination').should('be.visible')
  })

  it('should have working CTA buttons', () => {
    cy.contains('General Luna').click()
    
    // Book Now button should be visible
    cy.contains('Book Now').should('be.visible')
    
    // Learn More button should be visible
    cy.contains('Learn More').should('be.visible')
  })
})

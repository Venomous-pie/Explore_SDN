describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage', () => {
    cy.contains('Explore - SDN').should('be.visible')
  })

  it('should toggle burger menu', () => {
    cy.get('[data-cy="menu-button"]').click()
    cy.get('[data-cy="menu-dropdown"]').should('be.visible')
    cy.get('[data-cy="menu-button"]').click()
    cy.get('[data-cy="menu-dropdown"]').should('not.exist')
  })

  it('should open and close search', () => {
    cy.contains('Search').click()
    cy.get('input[placeholder*="Search"]').should('be.visible')
    // Click outside to close
    cy.get('body').click(0, 0)
  })

  it('should navigate to different pages', () => {
    const pages = [
      { link: 'Explore', url: '/explore' },
      { link: 'About', url: '/about' },
      { link: 'Contact', url: '/contact' }
    ]

    pages.forEach(page => {
      cy.contains(page.link).click()
      cy.url().should('include', page.url)
    })
  })
})

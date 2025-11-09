describe('Full Website Screenshots', () => {
  // Configuration
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 },
  ]

  const pages = [
    { name: 'home', path: '/', waitFor: '[data-testid="carousel"], .carousel' },
    { name: 'places', path: '/places', waitFor: '.place-card, [data-testid="place-card"]' },
    { name: 'hotels', path: '/hotels', waitFor: '.hotel-card, [data-testid="hotel-card"]' },
    { name: 'culture', path: '/culture', waitFor: 'h1, .culture-section' },
    { name: 'blog', path: '/blog', waitFor: 'h1, .blog-section' },
    { name: 'plan-trip', path: '/plan-trip', waitFor: 'h1, .plan-section' },
  ]

  // Helper function to capture full page screenshot
  const captureFullPageScreenshot = (pageName: string, viewportName: string) => {
    // Scroll to bottom to trigger lazy loading
    cy.scrollTo('bottom', { duration: 1000 })
    cy.wait(1000)
    
    // Scroll to top
    cy.scrollTo('top', { duration: 500 })
    cy.wait(500)
    
    // Take full page screenshot
    cy.screenshot(`${viewportName}/${pageName}-full`, {
      capture: 'fullPage',
      overwrite: true,
    })
  }

  viewports.forEach((viewport) => {
    describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height)
      })

      pages.forEach((page) => {
        it(`should screenshot ${page.name} page`, () => {
          cy.visit(page.path)
          
          // Wait for page to load
          cy.wait(2000)
          
          // Try to wait for specific content (with fallback)
          if (page.waitFor) {
            cy.get('body').then(($body) => {
              const selectors = page.waitFor.split(', ')
              const exists = selectors.some(selector => $body.find(selector).length > 0)
              if (exists) {
                cy.get(selectors.find(s => $body.find(s).length > 0)!, { timeout: 10000 })
                  .should('be.visible')
              }
            })
          }
          
          // Additional wait for images and animations
          cy.wait(2000)
          
          // Capture screenshot
          captureFullPageScreenshot(page.name, viewport.name)
        })
      })

      // Screenshot individual place detail pages (sample)
      it('should screenshot place detail page', () => {
        cy.visit('/places')
        cy.wait(2000)
        
        // Click on first place card if it exists
        cy.get('body').then(($body) => {
          const cardSelectors = ['.place-card', '[data-testid="place-card"]', 'a[href*="/places/"]']
          const selector = cardSelectors.find(s => $body.find(s).length > 0)
          
          if (selector) {
            cy.get(selector).first().click()
            cy.wait(2000)
            captureFullPageScreenshot('place-detail', viewport.name)
          }
        })
      })

      // Screenshot hotel detail page (sample)
      it('should screenshot hotel detail page', () => {
        cy.visit('/hotels')
        cy.wait(2000)
        
        // Click on first hotel card if it exists
        cy.get('body').then(($body) => {
          const cardSelectors = ['.hotel-card', '[data-testid="hotel-card"]', 'a[href*="/hotels/"]']
          const selector = cardSelectors.find(s => $body.find(s).length > 0)
          
          if (selector) {
            cy.get(selector).first().click()
            cy.wait(2000)
            captureFullPageScreenshot('hotel-detail', viewport.name)
          }
        })
      })
    })
  })

  // Bonus: Capture specific sections or states
  describe('Special Screenshots', () => {
    it('should screenshot navbar menu open (mobile)', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(2000)
      
      // Try to open mobile menu
      cy.get('body').then(($body) => {
        const menuSelectors = ['.menu-button', '[data-testid="menu-button"]', 'button[aria-label*="menu"]']
        const selector = menuSelectors.find(s => $body.find(s).length > 0)
        
        if (selector) {
          cy.get(selector).click()
          cy.wait(500)
          cy.screenshot('mobile/navbar-menu-open', { capture: 'fullPage' })
        }
      })
    })

    it('should screenshot search results', () => {
      cy.viewport(1920, 1080)
      cy.visit('/')
      cy.wait(2000)
      
      // Try to interact with search
      cy.get('body').then(($body) => {
        const searchSelectors = ['input[type="search"]', 'input[placeholder*="Search"]', '.search-input']
        const selector = searchSelectors.find(s => $body.find(s).length > 0)
        
        if (selector) {
          cy.get(selector).type('beach')
          cy.wait(1000)
          cy.screenshot('desktop/search-results', { capture: 'fullPage' })
        }
      })
    })
  })
})

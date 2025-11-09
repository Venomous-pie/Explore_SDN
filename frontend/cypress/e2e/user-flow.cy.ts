describe('User Flow: Exploring Surigao Escapes Website', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.wait(2000) // Wait for initial load
  })

  it('should complete full user journey from homepage to booking', () => {
    // ============================================
    // STEP 1: Homepage - Hero Section
    // ============================================
    cy.log('📍 Step 1: Viewing Hero Section')
    
    // Check if carousel/hero is visible
    cy.get('body').then(($body) => {
      const heroSelectors = ['[data-testid="carousel"]', '.carousel', '.hero']
      const heroSelector = heroSelectors.find(s => $body.find(s).length > 0)
      
      if (heroSelector) {
        cy.get(heroSelector).should('be.visible')
        cy.wait(1000)
        
        // Try to interact with carousel navigation if available
        const nextButtonSelectors = ['[data-testid="carousel-next"]', '.carousel-next', 'button[aria-label*="next"]']
        const nextButtonSelector = nextButtonSelectors.find(s => $body.find(s).length > 0)
        if (nextButtonSelector) {
          cy.get(nextButtonSelector).first().click()
          cy.wait(1500)
        }
      }
    })

    // ============================================
    // STEP 2: Search Functionality
    // ============================================
    cy.log('🔍 Step 2: Testing Search')
    
    cy.get('body').then(($body) => {
      const searchSelectors = ['input[type="search"]', 'input[placeholder*="Search"]', '.search-input', '[data-testid="search-input"]']
      const searchSelector = searchSelectors.find(s => $body.find(s).length > 0)
      
      if (searchSelector) {
        cy.get(searchSelector).first().click().type('beach')
        cy.wait(1000)
        
        // Clear search
        cy.get(searchSelector).first().clear()
        cy.wait(500)
      }
    })

    // ============================================
    // STEP 3: Scroll Through Homepage Sections
    // ============================================
    cy.log('📜 Step 3: Scrolling Through Homepage')
    
    // Scroll to view featured places
    cy.scrollTo(0, 500, { duration: 1000 })
    cy.wait(1000)
    
    // Continue scrolling to see more content
    cy.scrollTo(0, 1000, { duration: 1000 })
    cy.wait(1000)
    
    // Scroll to bottom to trigger lazy loading
    cy.scrollTo('bottom', { duration: 2000 })
    cy.wait(1500)
    
    // Scroll back to top
    cy.scrollTo('top', { duration: 1500 })
    cy.wait(500)

    // ============================================
    // STEP 4: Navigate to Places Page
    // ============================================
    cy.log('🏖️ Step 4: Exploring Places')
    
    // Click on a place card or navigate via menu
    cy.get('body').then(($body) => {
      const placeCardSelectors = ['.place-card', '[data-testid="place-card"]', 'a[href*="/places"]']
      const placeSelector = placeCardSelectors.find(s => $body.find(s).length > 0)
      
      if (placeSelector) {
        cy.get(placeSelector).first().click()
        cy.wait(2000)
      } else {
        // Fallback: navigate directly
        cy.visit('/places')
        cy.wait(2000)
      }
    })
    
    // Verify we're on places page
    cy.url().should('include', '/places')
    
    // Scroll through places
    cy.scrollTo(0, 800, { duration: 1000 })
    cy.wait(1000)

    // ============================================
    // STEP 5: View Place Details
    // ============================================
    cy.log('📖 Step 5: Viewing Place Details')
    
    cy.get('body').then(($body) => {
      const detailSelectors = ['.place-card', '[data-testid="place-card"]', 'a[href*="/places/"]', '.card']
      const detailSelector = detailSelectors.find(s => $body.find(s).length > 0)
      
      if (detailSelector) {
        cy.get(detailSelector).first().click()
        cy.wait(2500)
        
        // Scroll through place details
        cy.scrollTo(0, 500, { duration: 1000 })
        cy.wait(1000)
        cy.scrollTo(0, 1000, { duration: 1000 })
        cy.wait(1000)
        
        // Look for "Book Now" or similar CTA
        const ctaSelectors = ['button:contains("Book")', 'a:contains("Book")', '[data-testid="book-button"]', '.book-button']
        const ctaSelector = ctaSelectors.find(s => $body.find(s).length > 0)
        
        if (ctaSelector) {
          cy.scrollTo('top', { duration: 1000 })
          cy.wait(500)
        }
      }
    })

    // ============================================
    // STEP 6: Navigate to Hotels
    // ============================================
    cy.log('🏨 Step 6: Exploring Hotels')
    
    cy.visit('/hotels')
    cy.wait(2000)
    
    // Scroll through hotels
    cy.scrollTo(0, 600, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo(0, 1200, { duration: 1000 })
    cy.wait(1000)

    // ============================================
    // STEP 7: View Hotel Details
    // ============================================
    cy.log('🛏️ Step 7: Viewing Hotel Details')
    
    cy.get('body').then(($body) => {
      const hotelSelectors = ['.hotel-card', '[data-testid="hotel-card"]', 'a[href*="/hotels/"]', '.card']
      const hotelSelector = hotelSelectors.find(s => $body.find(s).length > 0)
      
      if (hotelSelector) {
        cy.get(hotelSelector).first().click()
        cy.wait(2500)
        
        // Scroll through hotel details
        cy.scrollTo(0, 500, { duration: 1000 })
        cy.wait(1000)
        cy.scrollTo(0, 1000, { duration: 1000 })
        cy.wait(1000)
        cy.scrollTo('bottom', { duration: 1500 })
        cy.wait(1000)
      }
    })

    // ============================================
    // STEP 8: Explore Culture Page
    // ============================================
    cy.log('🎭 Step 8: Discovering Culture')
    
    cy.visit('/culture')
    cy.wait(2000)
    
    // Scroll through culture content
    cy.scrollTo(0, 800, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo(0, 1600, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo('bottom', { duration: 2000 })
    cy.wait(1000)

    // ============================================
    // STEP 9: Check Blog
    // ============================================
    cy.log('📝 Step 9: Reading Blog')
    
    cy.visit('/blog')
    cy.wait(2000)
    
    // Scroll through blog posts
    cy.scrollTo(0, 600, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo(0, 1200, { duration: 1000 })
    cy.wait(1000)
    
    // Try to interact with newsletter signup if available
    cy.get('body').then(($body) => {
      const newsletterSelectors = ['input[type="email"]', 'input[placeholder*="email"]', '[data-testid="newsletter-input"]']
      const newsletterSelector = newsletterSelectors.find(s => $body.find(s).length > 0)
      
      if (newsletterSelector) {
        cy.scrollTo('bottom', { duration: 1500 })
        cy.wait(500)
        cy.get(newsletterSelector).first().type('traveler@example.com')
        cy.wait(500)
      }
    })

    // ============================================
    // STEP 10: Plan Trip Page
    // ============================================
    cy.log('🗺️ Step 10: Planning Trip')
    
    cy.visit('/plan-trip')
    cy.wait(2000)
    
    // Explore trip planning content
    cy.scrollTo(0, 800, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo(0, 1600, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo('bottom', { duration: 2000 })
    cy.wait(1500)

    // ============================================
    // STEP 11: Test Mobile Menu (if on mobile)
    // ============================================
    cy.log('📱 Step 11: Testing Navigation')
    
    cy.visit('/')
    cy.wait(1500)
    
    // Try to open mobile menu
    cy.get('body').then(($body) => {
      const menuSelectors = ['.menu-button', '[data-testid="menu-button"]', 'button[aria-label*="menu"]', '.hamburger']
      const menuSelector = menuSelectors.find(s => $body.find(s).length > 0)
      
      if (menuSelector) {
        cy.get(menuSelector).click()
        cy.wait(1000)
        
        // Close menu
        cy.get(menuSelector).click()
        cy.wait(500)
      }
    })

    // ============================================
    // STEP 12: Return to Homepage
    // ============================================
    cy.log('🏠 Step 12: Returning Home')
    
    cy.visit('/')
    cy.wait(2000)
    
    // Final scroll to appreciate the full page
    cy.scrollTo('bottom', { duration: 3000 })
    cy.wait(1000)
    cy.scrollTo('top', { duration: 2000 })
    cy.wait(1000)

    cy.log('✅ User flow completed successfully!')
  })

  it('should handle mobile user flow', () => {
    // ============================================
    // Mobile-specific User Journey
    // ============================================
    cy.viewport(375, 667)
    cy.visit('/')
    cy.wait(2000)

    cy.log('📱 Mobile User Flow Started')

    // Open mobile menu
    cy.get('body').then(($body) => {
      const menuSelectors = ['.menu-button', '[data-testid="menu-button"]', 'button[aria-label*="menu"]']
      const menuSelector = menuSelectors.find(s => $body.find(s).length > 0)
      
      if (menuSelector) {
        cy.get(menuSelector).click()
        cy.wait(1000)
        
        // Navigate to places via menu
        const placesLinkSelectors = ['a[href="/places"]', 'a:contains("Places")']
        const placesLink = placesLinkSelectors.find(s => $body.find(s).length > 0)
        
        if (placesLink) {
          cy.get(placesLink).first().click()
          cy.wait(2000)
        }
      } else {
        cy.visit('/places')
        cy.wait(2000)
      }
    })

    // Scroll through places on mobile
    cy.scrollTo(0, 500, { duration: 1000 })
    cy.wait(1000)
    cy.scrollTo(0, 1000, { duration: 1000 })
    cy.wait(1000)

    // Click on a place
    cy.get('body').then(($body) => {
      const cardSelectors = ['.place-card', '[data-testid="place-card"]', 'a[href*="/places/"]']
      const cardSelector = cardSelectors.find(s => $body.find(s).length > 0)
      
      if (cardSelector) {
        cy.get(cardSelector).first().click()
        cy.wait(2000)
        
        // Scroll through details
        cy.scrollTo('bottom', { duration: 2000 })
        cy.wait(1000)
        cy.scrollTo('top', { duration: 1500 })
        cy.wait(500)
      }
    })

    // Navigate to hotels
    cy.visit('/hotels')
    cy.wait(2000)
    cy.scrollTo(0, 800, { duration: 1500 })
    cy.wait(1000)

    // Return home
    cy.visit('/')
    cy.wait(1500)

    cy.log('✅ Mobile user flow completed!')
  })

  it('should handle tablet user flow', () => {
    // ============================================
    // Tablet-specific User Journey
    // ============================================
    cy.viewport(768, 1024)
    cy.visit('/')
    cy.wait(2000)

    cy.log('📱 Tablet User Flow Started')

    // Quick navigation through main pages
    const pages = ['/places', '/hotels', '/culture', '/blog', '/plan-trip']
    
    pages.forEach((page, index) => {
      cy.log(`Visiting ${page}`)
      cy.visit(page)
      cy.wait(1500)
      
      // Scroll through each page
      cy.scrollTo(0, 600, { duration: 1000 })
      cy.wait(500)
      cy.scrollTo(0, 1200, { duration: 1000 })
      cy.wait(500)
      cy.scrollTo('top', { duration: 1000 })
      cy.wait(500)
    })

    cy.log('✅ Tablet user flow completed!')
  })
})

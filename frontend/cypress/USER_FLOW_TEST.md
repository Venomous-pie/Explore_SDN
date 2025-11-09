# User Flow Test Documentation

## Overview
Comprehensive end-to-end test simulating real user behavior exploring the Surigao Escapes website from top to bottom.

## Test File
`cypress/e2e/user-flow.cy.ts`

## Test Scenarios

### 1. **Desktop User Flow** (1920x1080)
Complete journey simulating a typical visitor:

1. **Homepage Hero Section** - Views carousel, interacts with navigation
2. **Search Functionality** - Tests search input, types query, clears
3. **Homepage Scrolling** - Scrolls through all sections, triggers lazy loading
4. **Places Page** - Navigates to places, browses listings
5. **Place Details** - Views detailed information, scrolls through content
6. **Hotels Page** - Explores hotel listings
7. **Hotel Details** - Views hotel information, checks amenities
8. **Culture Page** - Discovers local culture, festivals, cuisine
9. **Blog Page** - Reads travel stories, interacts with newsletter
10. **Plan Trip Page** - Reviews itineraries, budgets, travel tips
11. **Navigation Testing** - Tests menu functionality
12. **Return Home** - Completes journey back to homepage

**Duration**: ~60-90 seconds  
**Total Interactions**: 12 major steps with multiple sub-actions

### 2. **Mobile User Flow** (375x667)
Mobile-optimized journey:

- Opens mobile menu navigation
- Browses places and hotels
- Views detail pages with mobile layout
- Tests touch-friendly interactions
- Validates responsive design

**Duration**: ~30-40 seconds

### 3. **Tablet User Flow** (768x1024)
Quick navigation test across all pages:

- Visits all main pages sequentially
- Validates tablet layout
- Tests mid-range viewport behavior

**Duration**: ~20-30 seconds

## Running the Tests

### Interactive Mode
```bash
cd frontend
npm run dev  # Terminal 1 - Start dev server
npm run cypress  # Terminal 2 - Open Cypress
```

Then select `user-flow.cy.ts` from the test list.

### Headless Mode
```bash
npm run cypress:headless -- --spec "cypress/e2e/user-flow.cy.ts"
```

### Run Specific Test
```bash
# Desktop flow only
npm run cypress:headless -- --spec "cypress/e2e/user-flow.cy.ts" --grep "should complete full user journey"

# Mobile flow only
npm run cypress:headless -- --spec "cypress/e2e/user-flow.cy.ts" --grep "should handle mobile user flow"

# Tablet flow only
npm run cypress:headless -- --spec "cypress/e2e/user-flow.cy.ts" --grep "should handle tablet user flow"
```

## What the Test Validates

### ✅ Navigation
- Page routing works correctly
- Links navigate to proper destinations
- Back/forward navigation functions

### ✅ Interactivity
- Buttons and CTAs are clickable
- Forms accept input
- Search functionality works
- Carousel/slider navigation

### ✅ Content Loading
- Pages load without errors
- Images and assets load properly
- Lazy loading triggers correctly
- No broken links or 404s

### ✅ Responsive Design
- Desktop layout (1920x1080)
- Tablet layout (768x1024)
- Mobile layout (375x667)

### ✅ User Experience
- Smooth scrolling
- Appropriate wait times
- Natural interaction flow
- Realistic user behavior

## Test Strategy

### Resilient Selectors
The test uses multiple fallback selectors to handle:
- Different component implementations
- Data attributes vs class names
- Dynamic content loading

Example:
```typescript
const selectors = ['.place-card', '[data-testid="place-card"]', 'a[href*="/places/"]']
const selector = selectors.find(s => $body.find(s).length > 0)
```

### Graceful Degradation
- Tests don't fail if optional elements are missing
- Conditional checks before interactions
- Fallback navigation paths

### Realistic Timing
- Waits for content to load (2000ms for pages)
- Animation completion delays (500-1000ms)
- Natural scrolling speeds (1000-2000ms)

## Debugging

### View Test Execution
In Cypress interactive mode:
- Watch each step execute in real-time
- See console logs for each step
- Inspect DOM state at any point
- Time-travel through test steps

### Common Issues

**Test times out**: Increase wait times or check if dev server is running
```typescript
cy.wait(2000) // Increase if needed
```

**Element not found**: Check selector fallbacks or add new selector
```typescript
const selectors = ['.existing', '.new-fallback']
```

**Navigation fails**: Verify routes exist in Vue Router
```typescript
cy.visit('/places') // Check route is defined
```

## Extending the Test

### Add New Pages
```typescript
cy.visit('/new-page')
cy.wait(2000)
cy.scrollTo('bottom', { duration: 2000 })
```

### Add Interactions
```typescript
cy.get('button').click()
cy.get('input').type('text')
cy.get('select').select('option')
```

### Add Assertions
```typescript
cy.url().should('include', '/expected-path')
cy.get('.element').should('be.visible')
cy.get('.element').should('contain', 'Expected Text')
```

## Best Practices

1. **Always start dev server first** - Tests require running application
2. **Use interactive mode for development** - Easier debugging
3. **Use headless mode for CI/CD** - Faster, automated
4. **Keep waits reasonable** - Balance speed vs reliability
5. **Use semantic selectors** - Data attributes > classes > IDs
6. **Test real user behavior** - Not just technical functionality

## Success Criteria

✅ All 3 test scenarios pass  
✅ No console errors during execution  
✅ All pages load successfully  
✅ All interactions complete without timeout  
✅ Test completes in under 2 minutes (desktop flow)  

## Next Steps

- Add authentication flow tests
- Test booking/reservation process
- Add form validation tests
- Test error states and edge cases
- Add accessibility checks

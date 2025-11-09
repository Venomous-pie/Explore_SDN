# Cypress Testing Guide

## Overview
Cypress is set up for end-to-end (E2E) testing of the Explore SDN application.

## Installation
Cypress is already installed. If you need to reinstall:
```bash
npm install --save-dev cypress
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress
# or
npm run test:e2e:dev
```

### Run Tests in Headless Mode (CI/CD)
```bash
npm run cypress:headless
# or
npm run test:e2e
```

## Test Structure

### Test Files Location
- **E2E Tests**: `cypress/e2e/`
- **Fixtures**: `cypress/fixtures/`
- **Support Files**: `cypress/support/`

### Available Test Suites

1. **navigation.cy.ts** - Tests navigation and menu functionality
   - Homepage loading
   - Burger menu toggle
   - Search functionality
   - Page navigation

2. **auth.cy.ts** - Tests authentication flows
   - Sign in modal
   - User registration
   - User login
   - User logout
   - Form validation

3. **search.cy.ts** - Tests search functionality
   - Search results display
   - Loading states
   - Search clearing
   - Result navigation

4. **location-picker.cy.ts** - Tests location selection
   - Municipality selection
   - Place listing
   - Image carousel
   - Place details display
   - CTA buttons

## Custom Commands

### Login Command
```typescript
cy.login('email@example.com', 'password123')
```

### Logout Command
```typescript
cy.logout()
```

## Data Attributes for Testing

To make tests more reliable, add `data-cy` attributes to your components:

```vue
<!-- Example -->
<button data-cy="sign-in-button">Sign In</button>
<input data-cy="signin-email" type="email" />
<div data-cy="auth-modal">...</div>
```

### Required Data Attributes

Add these to your components:

**Navbar.vue:**
- `data-cy="menu-button"` - Burger menu button
- `data-cy="menu-dropdown"` - Menu dropdown
- `data-cy="sign-in-button"` - Sign in button
- `data-cy="user-menu-button"` - User profile button
- `data-cy="sign-out-button"` - Sign out button

**AuthModal.vue:**
- `data-cy="auth-modal"` - Modal container
- `data-cy="auth-modal-close"` - Close button
- `data-cy="signin-email"` - Sign in email input
- `data-cy="signin-password"` - Sign in password input
- `data-cy="signin-submit"` - Sign in submit button
- `data-cy="signup-name"` - Sign up name input
- `data-cy="signup-email"` - Sign up email input
- `data-cy="signup-password"` - Sign up password input
- `data-cy="signup-submit"` - Sign up submit button

**Location.vue:**
- `data-cy="image-carousel"` - Image carousel container
- `data-cy="current-place-name"` - Current place name
- `data-cy="place-item"` - Individual place items in list

## Configuration

### cypress.config.ts
```typescript
{
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  }
}
```

## Best Practices

1. **Use data-cy attributes** instead of classes or IDs for test selectors
2. **Wait for elements** to be visible before interacting
3. **Use custom commands** for repeated actions (login, logout)
4. **Clean up after tests** - logout, clear data
5. **Test user flows** not just individual features
6. **Use fixtures** for test data

## Running Before Tests

Make sure both servers are running:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Cypress
cd frontend
npm run cypress
```

## Debugging Tests

1. **Interactive Mode**: Use `npm run cypress` to see tests run in real browser
2. **Time Travel**: Click on commands in Cypress UI to see app state
3. **Screenshots**: Automatically taken on failure
4. **Console Logs**: Available in browser DevTools

## CI/CD Integration

For automated testing in CI/CD:

```yaml
# Example GitHub Actions
- name: Run Cypress tests
  run: |
    npm run dev &
    npm run test:e2e
```

## Troubleshooting

### Tests Failing
- Ensure backend is running on port 3000
- Ensure frontend is running on port 5173
- Check if data-cy attributes are added to components
- Clear browser cache and cookies

### Slow Tests
- Reduce `cy.wait()` times
- Use `cy.intercept()` to mock API calls
- Disable video recording in config

### Flaky Tests
- Add proper waits for async operations
- Use `cy.should()` instead of `cy.wait()`
- Ensure test isolation (clean state between tests)

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

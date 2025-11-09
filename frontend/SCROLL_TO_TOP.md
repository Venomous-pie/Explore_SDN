# Scroll to Top on Page Navigation

## Implementation

The application now automatically scrolls to the top whenever the user navigates to a different page.

## How It Works

### 1. **Router-Level Scroll Behavior** (`src/router/index.ts`)

The primary implementation uses Vue Router's built-in `scrollBehavior` function:

```typescript
scrollBehavior(to, from, savedPosition) {
  // If using browser back/forward buttons, restore previous scroll position
  if (savedPosition) {
    return savedPosition
  }
  
  // If navigating to a hash anchor (e.g., #section)
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
      top: 80, // Offset for fixed navbar
    }
  }
  
  // Always scroll to top when navigating to a new page
  return { top: 0, left: 0, behavior: 'instant' }
}
```

**Features:**
- ✅ Instant scroll to top on page navigation
- ✅ Preserves scroll position when using browser back/forward buttons
- ✅ Smooth scroll to hash anchors with navbar offset
- ✅ Works with all navigation methods (router-link, programmatic navigation)

### 2. **App-Level Route Watcher** (`src/App.vue`)

A backup implementation ensures scroll-to-top even if router behavior doesn't trigger:

```typescript
watch(() => route.path, () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })
})
```

**Why Both?**
- Router `scrollBehavior` is the standard approach
- App-level watcher provides redundancy for edge cases
- `requestAnimationFrame` ensures DOM is updated before scrolling

## Behavior Details

### ✅ Triggers Scroll to Top
- Clicking navigation links
- Programmatic navigation (`router.push()`)
- Route parameter changes (e.g., `/place/1` → `/place/2`)
- Query parameter changes

### ❌ Does NOT Scroll to Top
- Browser back/forward buttons (preserves scroll position)
- Same page hash navigation (scrolls to anchor instead)

## Testing

### Manual Testing
1. Navigate to homepage
2. Scroll down
3. Click any navigation link
4. **Expected:** Page loads at the top

### Browser Back Button
1. Navigate from Home → Places
2. Scroll down on Places page
3. Click browser back button
4. **Expected:** Returns to previous scroll position on Home

### Hash Navigation
1. Navigate to a page with anchors (e.g., `/about#team`)
2. **Expected:** Scrolls to the `#team` section with smooth behavior

## Configuration

### Adjust Navbar Offset
If your navbar height changes, update the offset in `router/index.ts`:

```typescript
if (to.hash) {
  return {
    el: to.hash,
    behavior: 'smooth',
    top: 80, // Change this value
  }
}
```

### Change Scroll Behavior
To make scroll-to-top smooth instead of instant:

```typescript
return { top: 0, left: 0, behavior: 'smooth' }
```

**Note:** Instant is recommended for better UX (users expect immediate page loads)

### Disable Scroll Position Restoration
To always scroll to top (even on back button):

```typescript
scrollBehavior(to, from, savedPosition) {
  // Always scroll to top, ignore savedPosition
  return { top: 0, left: 0, behavior: 'instant' }
}
```

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| `scrollBehavior` | ✅ | ✅ | ✅ | ✅ |
| `behavior: 'instant'` | ✅ | ✅ | ✅ | ✅ |
| `behavior: 'smooth'` | ✅ | ✅ | ✅ | ✅ |
| `requestAnimationFrame` | ✅ | ✅ | ✅ | ✅ |

## Common Issues

### Scroll Doesn't Work
**Cause:** CSS overflow issues or fixed positioning  
**Solution:** Ensure `<html>` and `<body>` are scrollable

### Scroll Happens Too Early
**Cause:** DOM not fully rendered  
**Solution:** Already handled with `requestAnimationFrame`

### Smooth Scroll Too Slow
**Cause:** Browser default smooth scroll duration  
**Solution:** Use `behavior: 'instant'` instead

## Related Components

- **BackToTop.vue** - Floating button for manual scroll to top
- **Navbar.vue** - Fixed navigation that may affect scroll offset
- **Router** - Handles all navigation and scroll behavior

## Future Enhancements

Possible improvements:
- [ ] Add scroll progress indicator
- [ ] Implement scroll memory for specific routes
- [ ] Add custom scroll animations
- [ ] Track scroll analytics

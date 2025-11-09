# Authentication System Guide

## Overview
A modular, reusable authentication system with black and white theme for the Explore SDN application.

## Architecture

### 1. **Composable: `useAuth.ts`**
Location: `src/composables/useAuth.ts`

Centralized authentication logic that can be used across all components.

**Features:**
- Shared authentication state (reactive across all components)
- Sign in and sign up methods
- Auto-initialization from localStorage
- User session management
- Sign out functionality

**Usage:**
```typescript
import { useAuth } from '@/composables/useAuth'

const { 
  isAuthenticated,  // Computed boolean
  currentUser,      // Computed User object or null
  isLoading,        // Computed boolean
  initAuth,         // Initialize from localStorage
  signIn,           // async (email, password) => Promise<{success, error?}>
  signUp,           // async (name, email, password) => Promise<{success, error?}>
  signOut,          // Clear session
  updateUser        // Update user profile
} = useAuth()
```

**User Interface:**
```typescript
interface User {
  id: string
  name: string
  email: string
  avatar: string
}
```

### 2. **Component: `AuthModal.vue`**
Location: `src/components/AuthModal.vue`

Reusable modal component with sign in/sign up tabs.

**Props:**
- `modelValue: boolean` - Controls modal visibility (v-model)
- `message?: string` - Optional custom message to display

**Events:**
- `update:modelValue` - Emitted when modal should close
- `success` - Emitted after successful authentication

**Usage:**
```vue
<template>
  <AuthModal 
    v-model="showAuthModal" 
    message="Sign in to access this feature"
    @success="handleAuthSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthModal from '@/components/AuthModal.vue'

const showAuthModal = ref(false)

const handleAuthSuccess = () => {
  console.log('User signed in successfully!')
}
</script>
```

## Theme
**Black and White Design:**
- Primary buttons: Black background, white text
- Hover states: Gray-800 background
- Borders: Gray-300
- Error backgrounds: Gray-100
- Text: Black for headings, gray-600/700 for body
- Focus rings: Black (2px)

## Implementation Example

### In Any Component:

```vue
<template>
  <div>
    <!-- Show auth modal when needed -->
    <AuthModal 
      v-model="showAuth" 
      message="Please sign in to continue"
      @success="onAuthSuccess"
    />
    
    <!-- Protected action -->
    <button 
      v-if="!isAuthenticated"
      @click="showAuth = true"
      class="bg-black text-white px-4 py-2 rounded-lg">
      Sign In
    </button>
    
    <!-- User info when authenticated -->
    <div v-else class="flex items-center gap-2">
      <img :src="currentUser?.avatar" class="w-8 h-8 rounded-full" />
      <span>{{ currentUser?.name }}</span>
      <button @click="handleSignOut" class="text-sm underline">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import AuthModal from '@/components/AuthModal.vue'

const { isAuthenticated, currentUser, signOut, initAuth } = useAuth()
const showAuth = ref(false)

// Initialize on mount
onMounted(() => {
  initAuth()
})

const onAuthSuccess = () => {
  console.log('User authenticated!')
  // Perform protected action
}

const handleSignOut = () => {
  signOut()
  // Clear any user-specific data
}
</script>
```

## Features

### Sign In
- Email validation
- Password minimum length (6 characters)
- Loading states
- Error handling
- Auto-close on success

### Sign Up
- Full name input
- Email validation
- Password minimum length (6 characters)
- Loading states
- Error handling
- Auto-close on success

### Session Management
- Automatic localStorage persistence
- Auto-login on page refresh
- Shared state across all components
- Clean sign out

## Demo Mode
The authentication is currently in demo mode:
- Accepts any email and password (min 6 chars for password)
- Generates random avatars
- Creates user name from email prefix

## Future Enhancements
When connecting to a real backend:
1. Replace mock authentication in `useAuth.ts` with actual API calls
2. Add token management
3. Add password reset functionality
4. Add email verification
5. Add OAuth providers (Google, Facebook, etc.)

## Files Created
- `src/composables/useAuth.ts` - Authentication composable
- `src/components/AuthModal.vue` - Reusable auth modal
- `src/composables/index.ts` - Updated with auth exports

## Files Modified
- `src/views/PlaceDetailView.vue` - Now uses new auth system

import { ref, computed } from 'vue'

// User interface
export interface User {
    id: string
    name: string
    email: string
    avatar: string
}

// Auth state (shared across all components)
const isAuthenticated = ref(false)
const currentUser = ref<User | null>(null)
const isLoading = ref(false)

// Storage keys
const AUTH_KEY = 'isAuthenticated'
const USER_KEY = 'currentUser'

/**
 * Authentication composable
 * Provides centralized authentication state and methods
 */
export function useAuth() {
    // Generate random avatar
    const getRandomAvatar = (): string => {
        const randomNum = Math.floor(Math.random() * 70) + 1
        return `https://i.pravatar.cc/150?img=${randomNum}`
    }

    // Initialize auth from localStorage
    const initAuth = () => {
        const savedAuth = localStorage.getItem(AUTH_KEY)
        const savedUser = localStorage.getItem(USER_KEY)

        if (savedAuth === 'true' && savedUser) {
            try {
                currentUser.value = JSON.parse(savedUser)
                isAuthenticated.value = true
            } catch (e) {
                console.error('Error loading user data:', e)
                // Clear invalid data
                localStorage.removeItem(AUTH_KEY)
                localStorage.removeItem(USER_KEY)
            }
        }
    }

    // Sign in method
    const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Basic validation
        if (!email.trim() || !password.trim()) {
            return { success: false, error: 'Please enter both email and password' }
        }

        if (!email.includes('@')) {
            return { success: false, error: 'Please enter a valid email address' }
        }

        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' }
        }

        isLoading.value = true

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock successful sign in
                const username = email.split('@')[0] || 'user'
                const user: User = {
                    id: Date.now().toString(),
                    name: username.charAt(0).toUpperCase() + username.slice(1),
                    email: email,
                    avatar: getRandomAvatar()
                }

                currentUser.value = user
                isAuthenticated.value = true

                // Save to localStorage
                localStorage.setItem(AUTH_KEY, 'true')
                localStorage.setItem(USER_KEY, JSON.stringify(user))

                isLoading.value = false
                resolve({ success: true })
            }, 800)
        })
    }

    // Sign up method
    const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            return { success: false, error: 'Please fill in all fields' }
        }

        if (!email.includes('@')) {
            return { success: false, error: 'Please enter a valid email address' }
        }

        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' }
        }

        if (name.length < 2) {
            return { success: false, error: 'Name must be at least 2 characters' }
        }

        isLoading.value = true

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock successful sign up
                const user: User = {
                    id: Date.now().toString(),
                    name: name.trim(),
                    email: email,
                    avatar: getRandomAvatar()
                }

                currentUser.value = user
                isAuthenticated.value = true

                // Save to localStorage
                localStorage.setItem(AUTH_KEY, 'true')
                localStorage.setItem(USER_KEY, JSON.stringify(user))

                isLoading.value = false
                resolve({ success: true })
            }, 800)
        })
    }

    // Sign out method
    const signOut = () => {
        isAuthenticated.value = false
        currentUser.value = null
        localStorage.removeItem(AUTH_KEY)
        localStorage.removeItem(USER_KEY)
    }

    // Update user profile
    const updateUser = (updates: Partial<User>) => {
        if (currentUser.value) {
            currentUser.value = { ...currentUser.value, ...updates }
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser.value))
        }
    }

    return {
        // State
        isAuthenticated: computed(() => isAuthenticated.value),
        currentUser: computed(() => currentUser.value),
        isLoading: computed(() => isLoading.value),

        // Methods
        initAuth,
        signIn,
        signUp,
        signOut,
        updateUser
    }
}

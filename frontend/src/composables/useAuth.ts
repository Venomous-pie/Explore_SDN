import { ref, computed } from 'vue'

const API_URL = 'http://localhost:3000/api'

// User interface
export interface User {
    id: number
    name: string
    email: string
    avatar?: string
}

// Auth state (shared across all components)
const isAuthenticated = ref(false)
const currentUser = ref<User | null>(null)
const isLoading = ref(false)
const authToken = ref<string | null>(null)

// Storage keys
const TOKEN_KEY = 'auth_token'

/**
 * Authentication composable with JWT and persistent login
 * Provides centralized authentication state and methods
 */
export function useAuth() {
    // Generate random avatar
    const getRandomAvatar = (): string => {
        const randomNum = Math.floor(Math.random() * 70) + 1
        return `https://i.pravatar.cc/150?img=${randomNum}`
    }

    // Initialize auth from token (persistent login)
    const initAuth = async () => {
        const token = localStorage.getItem(TOKEN_KEY)
        
        if (token) {
            authToken.value = token
            try {
                // Verify token with backend
                const response = await fetch(`${API_URL}/auth/verify`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        currentUser.value = {
                            ...data.data,
                            avatar: getRandomAvatar()
                        }
                        isAuthenticated.value = true
                        return
                    }
                }
                
                // Token invalid, clear it
                localStorage.removeItem(TOKEN_KEY)
                authToken.value = null
            } catch (error) {
                console.error('Auth verification failed:', error)
                localStorage.removeItem(TOKEN_KEY)
                authToken.value = null
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

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok && data.success) {
                // Save token
                authToken.value = data.data.token
                localStorage.setItem(TOKEN_KEY, data.data.token)

                // Set user
                currentUser.value = {
                    ...data.data.user,
                    avatar: getRandomAvatar()
                }
                isAuthenticated.value = true

                isLoading.value = false
                return { success: true }
            } else {
                isLoading.value = false
                return { success: false, error: data.error || 'Login failed' }
            }
        } catch (error) {
            console.error('Login error:', error)
            console.error('Error details:', {
                message: error instanceof Error ? error.message : 'Unknown error',
                type: typeof error,
                error: error
            })
            isLoading.value = false
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Network error. Please check if backend is running on http://localhost:3000' 
            }
        }
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

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name, email, password })
            })

            const data = await response.json()

            if (response.ok && data.success) {
                // Save token
                authToken.value = data.data.token
                localStorage.setItem(TOKEN_KEY, data.data.token)

                // Set user
                currentUser.value = {
                    ...data.data.user,
                    avatar: getRandomAvatar()
                }
                isAuthenticated.value = true

                isLoading.value = false
                return { success: true }
            } else {
                isLoading.value = false
                return { success: false, error: data.error || 'Registration failed' }
            }
        } catch (error) {
            console.error('Registration error:', error)
            console.error('Error details:', {
                message: error instanceof Error ? error.message : 'Unknown error',
                type: typeof error,
                error: error
            })
            isLoading.value = false
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Network error. Please check if backend is running on http://localhost:3000' 
            }
        }
    }

    // Sign out method
    const signOut = async () => {
        try {
            // Call logout endpoint
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${authToken.value}`
                }
            })
        } catch (error) {
            console.error('Logout error:', error)
        }

        // Clear local state
        isAuthenticated.value = false
        currentUser.value = null
        authToken.value = null
        localStorage.removeItem(TOKEN_KEY)
    }

    // Update user profile
    const updateUser = (updates: Partial<User>) => {
        if (currentUser.value) {
            currentUser.value = { ...currentUser.value, ...updates }
        }
    }

    return {
        // State
        isAuthenticated: computed(() => isAuthenticated.value),
        currentUser: computed(() => currentUser.value),
        isLoading: computed(() => isLoading.value),
        authToken: computed(() => authToken.value),

        // Methods
        initAuth,
        signIn,
        signUp,
        signOut,
        updateUser
    }
}

<template>
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative animate-fade-in">
            <!-- Close Button -->
            <button @click="close" 
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Modal Header -->
            <div class="text-center mb-5">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 class="text-lg font-bold text-gray-900 mb-1">
                    {{ isSignUp ? 'Create Account' : 'Welcome Back' }}
                </h2>
                <p class="text-xs text-gray-600">
                    {{ message || (isSignUp ? 'Sign up to leave reviews and more' : 'Sign in to continue') }}
                </p>
            </div>

            <!-- Tab Switcher -->
            <div class="flex gap-2 mb-4 bg-gray-100 p-1 rounded-md">
                <button 
                    @click="isSignUp = false"
                    :class="['flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all',
                             !isSignUp ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900']">
                    Sign In
                </button>
                <button 
                    @click="isSignUp = true"
                    :class="['flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all',
                             isSignUp ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900']">
                    Sign Up
                </button>
            </div>

            <!-- Sign In Form -->
            <form v-if="!isSignUp" @submit.prevent="handleSignIn" class="space-y-3">
                <!-- Email Input -->
                <div>
                    <label for="signin-email" class="block text-xs font-medium text-gray-900 mb-1">Email</label>
                    <input 
                        v-model="signInEmail"
                        type="email" 
                        id="signin-email"
                        placeholder="your@email.com"
                        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs"
                        required
                    />
                </div>

                <!-- Password Input -->
                <div>
                    <label for="signin-password" class="block text-xs font-medium text-gray-900 mb-1">Password</label>
                    <input 
                        v-model="signInPassword"
                        type="password" 
                        id="signin-password"
                        placeholder="••••••••"
                        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs"
                        required
                    />
                </div>

                <!-- Error Message -->
                <div v-if="error" class="p-2 bg-gray-100 border border-gray-300 rounded-md">
                    <p class="text-xs text-gray-900 flex items-center gap-2">
                        <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                        {{ error }}
                    </p>
                </div>

                <!-- Sign In Button -->
                <button 
                    type="submit"
                    :disabled="isLoading"
                    :class="['w-full py-2.5 rounded-md font-medium text-xs transition-all',
                             isLoading 
                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                : 'bg-black text-white hover:bg-gray-800 hover:shadow-sm']">
                    <span v-if="isLoading" class="flex items-center justify-center gap-2">
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                    </span>
                    <span v-else>Sign In</span>
                </button>
            </form>

            <!-- Sign Up Form -->
            <form v-else @submit.prevent="handleSignUp" class="space-y-3">
                <!-- Name Input -->
                <div>
                    <label for="signup-name" class="block text-xs font-medium text-gray-900 mb-1">Full Name</label>
                    <input 
                        v-model="signUpName"
                        type="text" 
                        id="signup-name"
                        placeholder="John Doe"
                        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs"
                        required
                    />
                </div>

                <!-- Email Input -->
                <div>
                    <label for="signup-email" class="block text-xs font-medium text-gray-900 mb-1">Email</label>
                    <input 
                        v-model="signUpEmail"
                        type="email" 
                        id="signup-email"
                        placeholder="your@email.com"
                        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs"
                        required
                    />
                </div>

                <!-- Password Input -->
                <div>
                    <label for="signup-password" class="block text-xs font-medium text-gray-900 mb-1">Password</label>
                    <input 
                        v-model="signUpPassword"
                        type="password" 
                        id="signup-password"
                        placeholder="••••••••"
                        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs"
                        required
                    />
                    <p class="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="p-2 bg-gray-100 border border-gray-300 rounded-md">
                    <p class="text-xs text-gray-900 flex items-center gap-2">
                        <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                        {{ error }}
                    </p>
                </div>

                <!-- Sign Up Button -->
                <button 
                    type="submit"
                    :disabled="isLoading"
                    :class="['w-full py-2.5 rounded-md font-medium text-xs transition-all',
                             isLoading 
                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                : 'bg-black text-white hover:bg-gray-800 hover:shadow-sm']">
                    <span v-if="isLoading" class="flex items-center justify-center gap-2">
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                    </span>
                    <span v-else>Create Account</span>
                </button>
            </form>

            <!-- Demo Note -->
            <div class="mt-3 p-2 bg-gray-100 border border-gray-200 rounded-md">
                <p class="text-xs text-gray-700">
                    <strong class="font-medium">Demo:</strong> Enter any {{ isSignUp ? 'name, ' : '' }}email and password (min 6 chars) to {{ isSignUp ? 'sign up' : 'sign in' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'

interface Props {
    modelValue: boolean
    message?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'success': []
}>()

const { signIn, signUp, isLoading } = useAuth()

// Form state
const isSignUp = ref(false)
const error = ref('')

// Sign In form
const signInEmail = ref('')
const signInPassword = ref('')

// Sign Up form
const signUpName = ref('')
const signUpEmail = ref('')
const signUpPassword = ref('')

// Handle sign in
const handleSignIn = async () => {
    error.value = ''
    const result = await signIn(signInEmail.value, signInPassword.value)
    
    if (result.success) {
        // Reset form
        signInEmail.value = ''
        signInPassword.value = ''
        emit('success')
        close()
    } else {
        error.value = result.error || 'Sign in failed'
    }
}

// Handle sign up
const handleSignUp = async () => {
    error.value = ''
    const result = await signUp(signUpName.value, signUpEmail.value, signUpPassword.value)
    
    if (result.success) {
        // Reset form
        signUpName.value = ''
        signUpEmail.value = ''
        signUpPassword.value = ''
        emit('success')
        close()
    } else {
        error.value = result.error || 'Sign up failed'
    }
}

// Close modal
const close = () => {
    emit('update:modelValue', false)
    error.value = ''
}

// Reset form when switching tabs
watch(isSignUp, () => {
    error.value = ''
})

// Reset form when modal closes
watch(() => props.modelValue, (newValue) => {
    if (!newValue) {
        signInEmail.value = ''
        signInPassword.value = ''
        signUpName.value = ''
        signUpEmail.value = ''
        signUpPassword.value = ''
        error.value = ''
        isSignUp.value = false
    }
})
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
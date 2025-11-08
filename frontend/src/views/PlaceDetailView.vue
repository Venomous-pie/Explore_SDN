<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Auth Modal -->
        <AuthModal v-model="showAuthModal" message="You need to be signed in to leave a review"
            @success="handleAuthSuccess" />

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <div class="i-mdi-loading animate-spin text-4xl mb-3 text-gray-400"></div>
                <p class="text-sm text-gray-600">Loading place details...</p>
            </div>
        </div>

        <!-- Content Section -->
        <div v-else-if="place" class="max-w-6xl mx-auto px-4 py-6">
            <div class="flex flex-col md:flex-row gap-6 mt-12 mb-6">
                <div class="flex-1">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ place.name }}</h1>
                    <div class="flex items-center gap-2">
                        <!-- Stacked Profile Pictures -->
                        <div class="flex -space-x-2">
                            <img src="https://i.pravatar.cc/150?img=1" alt="Reviewer 1"
                                class="w-5 h-5 rounded-full border-2 border-white object-cover" />
                            <img src="https://i.pravatar.cc/150?img=2" alt="Reviewer 2"
                                class="w-5 h-5 rounded-full border-2 border-white object-cover" />
                            <img src="https://i.pravatar.cc/150?img=3" alt="Reviewer 3"
                                class="w-5 h-5 rounded-full border-2 border-white object-cover" />
                        </div>
                        <div class="i-mdi-star w-4 h-4 text-yellow-500"></div>
                        <span class="text-xs font-semibold text-gray-900">{{ place.rating }}</span>
                        <span class="text-xs text-gray-500">({{ place.totalRatings }} reviews)</span>
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-xs text-gray-600 leading-relaxed">{{ place.description }}</p>
                </div>
            </div>

            <!-- Full-Width Place Image -->
            <div class="mb-4">
                <img :src="getImageSrc(place.images[0])" :alt="place.name"
                    class="w-full h-72 object-cover rounded-lg shadow-sm" />
            </div>

            <!-- Wikipedia Information Section -->
            <div class="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
                <p class="text-xs text-gray-700 leading-relaxed mb-2">
                    {{ wikipediaInfo }}
                </p>
                <p class="text-xs text-gray-500 italic">- Wikipedia</p>
            </div>

            <!-- Nearby Dining Section -->
            <div class="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
                <h2 class="text-base font-bold text-gray-900 mb-3">Dining near here</h2>

                <!-- Horizontal Scroll Container -->
                <div v-if="nearbyDining.length > 0" class="overflow-x-auto scrollbar-hover">
                    <div class="flex gap-3 pb-2">
                        <a v-for="restaurant in nearbyDining" :key="restaurant.id"
                            :href="restaurant.contact?.website || restaurant.bookingUrl || getGoogleSearchUrl(restaurant.name, restaurant.municipality)" target="_blank"
                            class="flex-shrink-0 w-56 bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200 cursor-pointer">
                            <img :src="getImageSrc(restaurant.images[0])" :alt="restaurant.name"
                                class="w-full h-32 object-cover" />
                            <div class="p-3">
                                <h3 class="font-semibold text-xs text-gray-900 mb-1 line-clamp-1">{{ restaurant.name }}
                                </h3>
                                <p class="text-xs text-gray-600 mb-2 line-clamp-1" >{{ restaurant.cuisine }}</p>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center gap-1">
                                        <svg class="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span class="text-xs font-semibold">{{ restaurant.rating }}</span>
                                    </div>
                                    <span class="text-xs text-gray-500">{{ restaurant.priceRange }}</span>
                                </div>
                                <div class="text-center bg-black text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-gray-800 transition-colors">
                                    {{ restaurant.contact?.website || restaurant.bookingUrl ? 'Visit Website' : 'Search on Google' }}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>  
                <div v-else class="text-center py-6 text-gray-500">
                    <p class="text-xs">No dining options found in this area</p>
                </div>
            </div>

            <!-- Places to Stay Section -->
            <div class="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
                <h2 class="text-base font-bold text-gray-900 mb-3">Places to stay near this place</h2>

                <!-- Horizontal Scroll Container -->
                <div v-if="nearbyHotels.length > 0" class="overflow-x-auto scrollbar-hover">
                    <div class="flex gap-3 pb-2">
                        <a v-for="hotel in nearbyHotels" :key="hotel.id"
                            :href="hotel.bookingUrl || hotel.contact?.website || getGoogleSearchUrl(hotel.name, hotel.municipality)" target="_blank"
                            class="flex-shrink-0 w-56 bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200 cursor-pointer">
                            <img :src="getImageSrc(hotel.images[0])" :alt="hotel.name"
                                class="w-full h-32 object-cover" />
                            <div class="p-3">
                                <h3 class="font-semibold text-xs text-gray-900 mb-1 line-clamp-1">{{ hotel.name }}</h3>
                                <p class="text-xs text-gray-600 mb-2">{{ hotel.type }}</p>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center gap-1">
                                        <svg class="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span class="text-xs font-semibold">{{ hotel.rating }}</span>
                                    </div>
                                    <span class="text-xs text-gray-500">{{ hotel.priceRange }}</span>
                                </div>
                                <div class="text-center bg-black text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-gray-800 transition-colors">
                                    {{ hotel.bookingUrl || hotel.contact?.website ? 'Check Availability' : 'Search on Google' }}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div v-else class="text-center py-6 text-gray-500">
                    <p class="text-xs">No accommodations found in this area</p>
                </div>
            </div>

            <!-- Review Section -->
            <div class="flex flex-col bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-lg font-bold text-gray-900 mb-1">Leave a review</h2>
                        <p class="text-xs text-gray-600">Enjoy the place?</p>
                    </div>

                    <!-- Success Message -->
                    <div v-if="showSuccessMessage"
                        class="mb-4 p-3 bg-green-50 border border-green-200 rounded-md animate-fade-in">
                        <p class="text-xs text-green-800 flex items-center gap-2">
                            <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg>
                            Review posted successfully!
                        </p>
                    </div>

                    <!-- Validation Error -->
                    <div v-if="validationError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p class="text-xs text-red-800 flex items-center gap-2">
                            <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ validationError }}
                        </p>
                    </div>
                    <!-- Star Rating Selector -->
                    <div class="flex items-center gap-4">
                        <p v-if="selectedRating > 0" class="text-xs text-gray-600 mt-2">
                            {{ selectedRating === 5 ? 'Excellent!' : selectedRating === 4 ? 'Great!' : selectedRating
                                === 3
                                ? 'Good' : selectedRating === 2 ? 'Fair' : 'Poor' }}
                        </p>
                        <div class="flex gap-1">
                            <div v-for="star in 5" :key="star" type="button" @click="selectedRating = star"
                                @mouseenter="hoveredRating = star" @mouseleave="hoveredRating = 0"
                                class="transition-transform hover:scale-110 focus:outline-none">
                                <svg class="w-8 h-8 transition-colors"
                                    :class="star <= (hoveredRating || selectedRating) ? 'text-yellow-500' : 'text-gray-300'"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Review Text Area -->
                <div class="mb-3 relative">
                    <label for="review-text" class="block text-xs font-medium text-gray-900 mb-2">Your Review</label>
                    <textarea id="review-text" v-model="reviewText" rows="4" :maxlength="maxCharacters"
                        placeholder="Share your experience at this place..."
                        class="w-full py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs resize-none"
                        :class="{ 'border-red-300 focus:ring-red-400': isOverLimit }"></textarea>
                    
                    <!-- Emoji Picker Button and Dropdown -->
                    <div class="absolute bottom-5 right-1">
                        <div @click="showEmojiPicker = !showEmojiPicker"
                            class="p-1.5 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                            title="Add emoji">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        
                        <!-- Emoji Picker Dropdown -->
                        <div v-if="showEmojiPicker" v-on-click-outside="() => showEmojiPicker = false"
                            class="absolute right-0 bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 animate-fade-in">
                            <div class="flex gap-1">
                                <div v-for="emoji in emojis" :key="emoji"
                                    @click="addEmoji(emoji)"
                                    class="text-xl hover:bg-gray-100 rounded p-1 transition-colors cursor-pointer">
                                    {{ emoji }}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Character Counter -->
                    <div class="flex items-center justify-end mt-1">
                        <span class="text-xs" :class="isOverLimit ? 'text-red-600 font-medium' : 'text-gray-500'">
                            {{ characterCount }}/{{ maxCharacters }}
                        </span>
                    </div>
                </div>

                <!-- Post Button -->
                <button type="button" @click="submitReview" :disabled="isSubmitting || isOverLimit" :class="[
                    'w-full py-2.5 rounded-md font-medium text-xs transition-all',
                    isSubmitting || isOverLimit
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800 hover:shadow-sm'
                ]">
                    <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Posting...
                    </span>
                    <span v-else>
                        {{ isAuthenticated ? 'Post Review' : 'Sign in to Post Review' }}
                    </span>
                </button>
            </div>

            <!-- Review List + Filter -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <h2 class="text-base font-bold text-gray-900">Reviews</h2>
                        <span class="text-xs text-gray-500">({{ mockReviews.length }})</span>
                    </div>

                    <!-- Filter Menu -->
                    <select v-model="reviewFilter"
                        class="px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                        <option value="latest">Latest</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                    </select>
                </div>

                <!-- Review Cards -->
                <div class="space-y-3">
                    <div v-for="review in filteredReviews" :key="review.id"
                        class="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <!-- Profile Picture -->
                        <img :src="review.avatar" :alt="review.name"
                            class="w-8 h-8 rounded-full object-cover flex-shrink-0" />

                        <!-- Review Content -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h4 class="font-semibold text-xs text-gray-900">{{ review.name }}</h4>
                                <span class="text-xs text-gray-500">{{ review.timestamp }}</span>
                            </div>

                            <!-- Star Rating -->
                            <div class="flex gap-0.5 mb-1">
                                <svg v-for="star in 5" :key="star" class="w-3 h-3"
                                    :class="star <= review.rating ? 'text-yellow-500' : 'text-gray-300'"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>

                            <p class="text-xs text-gray-700 line-clamp-2">{{ review.comment }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Not Found State -->
        <div v-else class="max-w-4xl mx-auto px-4 py-20 text-center">
            <div class="i-mdi-map-search text-gray-300 text-6xl mb-4"></div>
            <h1 class="text-2xl font-bold text-gray-900 mb-3">Place Not Found</h1>
            <p class="text-sm text-gray-600 mb-6">The place you're looking for doesn't exist or has been removed.</p>
            <router-link to="/"
                class="inline-block bg-black text-white font-medium text-xs py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Back to Home
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { vOnClickOutside } from '@vueuse/components'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'
import { useAuth } from '@/composables/useAuth'
import AuthModal from '@/components/AuthModal.vue'

const route = useRoute()
const dataStore = useDataStore()
const { getImageSrc } = useImages()
const { isAuthenticated, currentUser, signOut, initAuth } = useAuth()

const loading = ref(true)
const selectedRating = ref(0)
const hoveredRating = ref(0)
const reviewText = ref('')
const showEmojiPicker = ref(false)
const reviewFilter = ref('latest')
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const validationError = ref('')
const maxCharacters = 500

// Auth modal state
const showAuthModal = ref(false)

const placeId = computed(() => Number(route.params.id))

const place = computed(() => {
    return dataStore.places.find(p => p.id === placeId.value)
})

// Wikipedia info - uses actual place data
const wikipediaInfo = computed(() => {
    if (!place.value) return ''

    // Use the actual description from the backend
    let info = place.value.description

    // Add location context
    info += ` Located in ${place.value.municipality}, ${place.value.island}, this ${place.value.category.toLowerCase()} destination`

    // Add rating context if highly rated
    if (place.value.rating >= 4.5) {
        info += ` has earned an impressive ${place.value.rating} rating from ${place.value.totalRatings} visitors`
    } else {
        info += ` has been reviewed by ${place.value.totalRatings} visitors`
    }

    // Add best time to visit if available
    if (place.value.bestTimeToVisit) {
        info += `. Best time to visit: ${place.value.bestTimeToVisit}`
    }

    // Add entry fee info if available
    if (place.value.entryFee && place.value.entryFee !== 'Varies') {
        info += `. Entry fee: ${place.value.entryFee}`
    }

    info += '.'

    return info
})

// Review interface
interface Review {
    id: number
    name: string
    avatar: string
    rating: number
    comment: string
    timestamp: string
    date: Date
}

// Load reviews from localStorage or use default reviews
const loadReviews = (): Review[] => {
    const storageKey = `reviews_place_${placeId.value}`
    const stored = localStorage.getItem(storageKey)

    if (stored) {
        try {
            const parsed = JSON.parse(stored)
            // Convert date strings back to Date objects
            return parsed.map((r: any) => ({
                ...r,
                date: new Date(r.date)
            }))
        } catch (e) {
            console.error('Error loading reviews:', e)
        }
    }

    // Default reviews if nothing in localStorage
    return [
        {
            id: 1,
            name: 'Maria Santos',
            avatar: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            comment: 'Absolutely stunning place! The views were breathtaking and the experience was unforgettable. Highly recommend visiting during sunset.',
            timestamp: '2d ago',
            date: new Date('2024-11-05')
        },
        {
            id: 2,
            name: 'John Cruz',
            avatar: 'https://i.pravatar.cc/150?img=2',
            rating: 4,
            comment: 'Great spot for families. Kids loved it! A bit crowded on weekends though.',
            timestamp: '5d ago',
            date: new Date('2024-11-02')
        },
        {
            id: 3,
            name: 'Ana Reyes',
            avatar: 'https://i.pravatar.cc/150?img=3',
            rating: 5,
            comment: 'Perfect getaway from the city. So peaceful and beautiful!',
            timestamp: '1w ago',
            date: new Date('2024-10-31')
        },
        {
            id: 4,
            name: 'Carlos Diaz',
            avatar: 'https://i.pravatar.cc/150?img=4',
            rating: 3,
            comment: 'Nice place but a bit overrated. Still worth a visit if you\'re in the area.',
            timestamp: '2w ago',
            date: new Date('2024-10-24')
        },
        {
            id: 5,
            name: 'Sofia Garcia',
            avatar: 'https://i.pravatar.cc/150?img=5',
            rating: 5,
            comment: 'Amazing experience! The staff were friendly and the place was well-maintained.',
            timestamp: '3w ago',
            date: new Date('2024-10-17')
        }
    ]
}

// Initialize reviews
const mockReviews = ref<Review[]>(loadReviews())

// Nearby dining - fetch from data store
const nearbyDining = computed(() => {
    if (!place.value) return []
    // Get dining options from the same municipality
    return dataStore.dining
        .filter(d => d.municipality === place.value!.municipality)
        .slice(0, 6)
})

// Nearby hotels - fetch from data store
const nearbyHotels = computed(() => {
    if (!place.value) return []
    // Get hotels from the same municipality
    return dataStore.hotels
        .filter(h => h.municipality === place.value!.municipality)
        .slice(0, 6)
})

// Filtered reviews based on selected filter
const filteredReviews = computed(() => {
    const reviews = [...mockReviews.value]

    switch (reviewFilter.value) {
        case 'highest':
            return reviews.sort((a, b) => b.rating - a.rating)
        case 'lowest':
            return reviews.sort((a, b) => a.rating - b.rating)
        case 'latest':
        default:
            return reviews.sort((a, b) => b.date.getTime() - a.date.getTime())
    }
})

// Emoji picker options
const emojis = ['😊', '😍', '🤩', '😎', '🥰', '😃', '👍', '❤️', '🔥', '✨', '🌟', '💯', '🎉', '🙌', '👏', '🤗']

// Character count
const characterCount = computed(() => reviewText.value.length)
const isOverLimit = computed(() => characterCount.value > maxCharacters)

// Save reviews to localStorage
const saveReviews = () => {
    const storageKey = `reviews_place_${placeId.value}`
    localStorage.setItem(storageKey, JSON.stringify(mockReviews.value))
}

// Get relative time
const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    const diffWeeks = Math.floor(diffMs / 604800000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffWeeks < 4) return `${diffWeeks}w ago`
    return date.toLocaleDateString()
}

// Generate random avatar
const getRandomAvatar = (): string => {
    const randomNum = Math.floor(Math.random() * 70) + 1
    return `https://i.pravatar.cc/150?img=${randomNum}`
}

// Methods

const getGoogleSearchUrl = (name: string, municipality: string): string => {
    const searchQuery = `${name} ${municipality} Surigao del Norte Philippines`
    return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
}

const addEmoji = (emoji: string) => {
    reviewText.value += emoji
    showEmojiPicker.value = false
}

const submitReview = () => {
    // Check if user is authenticated
    if (!isAuthenticated.value) {
        showAuthModal.value = true
        return
    }

    // Clear previous errors
    validationError.value = ''

    // Validation
    if (selectedRating.value === 0) {
        validationError.value = 'Please select a rating'
        return
    }

    if (!reviewText.value.trim()) {
        validationError.value = 'Please write a review'
        return
    }

    if (reviewText.value.trim().length < 10) {
        validationError.value = 'Review must be at least 10 characters'
        return
    }

    if (isOverLimit.value) {
        validationError.value = `Review must not exceed ${maxCharacters} characters`
        return
    }

    // Start submitting
    isSubmitting.value = true

    // Simulate API delay for better UX
    setTimeout(() => {
        // Add new review to the list
        const newReview: Review = {
            id: Date.now(), // Use timestamp as unique ID
            name: currentUser.value?.name || 'Anonymous',
            avatar: currentUser.value?.avatar || getRandomAvatar(),
            rating: selectedRating.value,
            comment: reviewText.value.trim(),
            timestamp: 'Just now',
            date: new Date()
        }

        mockReviews.value.unshift(newReview)

        // Save to localStorage
        saveReviews()

        // Reset form
        reviewText.value = ''
        selectedRating.value = 0
        hoveredRating.value = 0
        isSubmitting.value = false

        // Show success message
        showSuccessMessage.value = true
        setTimeout(() => {
            showSuccessMessage.value = false
        }, 3000)
    }, 500)
}

// Handle successful authentication
const handleAuthSuccess = () => {
    // Modal will close automatically
    // User can now post review
}

// Handle sign out
const handleSignOut = () => {
    signOut()
    // Clear review form
    reviewText.value = ''
    selectedRating.value = 0
    hoveredRating.value = 0
}

onMounted(async () => {
    // Initialize authentication
    initAuth()

    // Ensure data is loaded
    if (dataStore.places.length === 0) {
        await dataStore.fetchAllData()
    }

    loading.value = false

    if (!place.value) {
        console.warn(`Place with ID ${placeId.value} not found`)
    }

    // Update timestamps periodically
    setInterval(() => {
        mockReviews.value = mockReviews.value.map(review => ({
            ...review,
            timestamp: getRelativeTime(review.date)
        }))
    }, 60000) // Update every minute
})
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hover {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    transition: scrollbar-color 0.3s ease;
}

.scrollbar-hover:hover {
    scrollbar-color: #9ca3af #f3f4f6;
}

.scrollbar-hover::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-hover::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
}

.scrollbar-hover::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
    transition: background 0.3s ease;
}

.scrollbar-hover:hover::-webkit-scrollbar-track {
    background: #f3f4f6;
}

.scrollbar-hover:hover::-webkit-scrollbar-thumb {
    background: #9ca3af;
}

.scrollbar-hover:hover::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}

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
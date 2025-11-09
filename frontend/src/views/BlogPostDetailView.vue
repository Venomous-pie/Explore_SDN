<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Auth Modal -->
        <AuthModal v-model="showAuthModal" message="You need to be signed in to leave a review"
            @success="handleAuthSuccess" />

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <div class="i-mdi-loading animate-spin text-4xl mb-3 text-gray-400"></div>
                <p class="text-sm text-gray-600">Loading blog post...</p>
            </div>
        </div>

        <!-- Content Section -->
        <div v-else-if="blogPost" class="max-w-6xl mx-auto px-4 py-6">
            <div class="flex flex-col gap-6 mt-12 mb-6">
                <!-- Blog Post Title -->
                <div>
                    <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{{ blogPost.title }}</h1>
                    
                    <!-- Author Info -->
                    <div class="flex items-center gap-4">
                        <img :src="getAuthorAvatar(blogPost.author)" :alt="blogPost.author"
                            class="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="font-semibold text-sm text-gray-900">{{ blogPost.author }}</span>
                                <span class="text-xs font-bold uppercase tracking-wide text-gray-900">
                                    {{ blogPost.category }}
                                </span>
                            </div>
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <span>📅 {{ blogPost.date }}</span>
                                <span>⏱️ {{ blogPost.readTime }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Full-Width Blog Image -->
            <div class="mb-6">
                <img :src="blogPost.image" :alt="blogPost.title"
                    class="w-full h-96 object-cover rounded-lg shadow-sm" />
            </div>

            <!-- Blog Content -->
            <div class="bg-white rounded-lg p-6 shadow-sm mb-6 border border-gray-200">
                <div class="prose prose-sm max-w-none">
                    <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {{ blogContent }}
                    </p>
                </div>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                    <span v-for="tag in blogPost.tags" :key="tag" 
                          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">
                        #{{ tag }}
                    </span>
                </div>
            </div>

            <!-- Review Section -->
            <div class="flex flex-col bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-lg font-bold text-gray-900 mb-1">Leave a comment</h2>
                        <p class="text-xs text-gray-600">Share your thoughts and experiences with this place</p>
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
                        {{ isAuthenticated ? 'Post' : 'Sign in to Post' }}
                    </span>
                </button>
            </div>

            <!-- Review List + Filter -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <h2 class="text-base font-bold text-gray-900">Comments</h2>
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
                            <p class="text-xs text-gray-700 line-clamp-2">{{ review.comment }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Not Found State -->
        <div v-else class="max-w-4xl mx-auto px-4 py-20 text-center">
            <div class="text-6xl mb-4">📝</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-3">Blog Post Not Found</h1>
            <p class="text-sm text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <router-link to="/blog"
                class="inline-block bg-black text-white font-medium text-xs py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Back to Blog
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

// Blog Post Interface
interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  categoryColor: string
  image: string
  date: string
  readTime: string
  author: string
  tags: string[]
  content?: string
  featured?: boolean
}

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

// Blog posts data (same as BlogView.vue)
const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'Sohoton Cove: A Journey Through Enchanted Waters',
    excerpt: 'Explore the mystical beauty of Sohoton Cove National Park, where emerald lagoons, ancient caves, and bioluminescent waters create an otherworldly experience.',
    category: 'Travel Guide',
    categoryColor: 'blue',
    image: 'https://www.journeyera.com/wp-content/uploads/2018/01/sohoton-cove-national-park-socorro-01707.jpg',
    date: 'November 8, 2025',
    readTime: '8 min read',
    author: 'Maria Santos',
    tags: ['Sohoton Cove', 'Nature', 'Adventure'],
    featured: true
  },
  {
    id: 2,
    title: 'Cloud 9: The Legendary Surf Break of Siargao',
    excerpt: 'Dive into the world-famous surf scene at Cloud 9. Whether you\'re a seasoned surfer or a curious beginner, learn everything about riding the perfect wave.',
    category: 'Adventure',
    categoryColor: 'orange',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
    date: 'November 6, 2025',
    readTime: '10 min read',
    author: 'Jake Rodriguez',
    tags: ['Siargao', 'Surfing', 'Cloud 9']
  },
  {
    id: 3,
    title: 'Island Hopping Guide: Three Islands Tour in Siargao',
    excerpt: 'Experience the ultimate island hopping adventure visiting Naked Island, Daku Island, and Guyam Island.',
    category: 'Travel Guide',
    categoryColor: 'blue',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/04/0b/e7.jpg',
    date: 'November 5, 2025',
    readTime: '12 min read',
    author: 'Maria Santos',
    tags: ['Island Hopping', 'Siargao', 'Beaches']
  },
  {
    id: 4,
    title: 'Magpupungko Rock Pools: Nature\'s Infinity Pools',
    excerpt: 'Discover the perfect timing and best practices for visiting Magpupungko Rock Pools.',
    category: 'Travel Guide',
    categoryColor: 'blue',
    image: 'https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/02/Magpupungko-Pools-Pilar-Siargao.png?w=940&ssl=1',
    date: 'November 3, 2025',
    readTime: '6 min read',
    author: 'Carlos Mendoza',
    tags: ['Magpupungko', 'Natural Pools', 'Photography']
  },
  {
    id: 5,
    title: 'Authentic Surigaonon Cuisine: A Food Lover\'s Journey',
    excerpt: 'From fresh seafood to traditional Filipino dishes with a local twist, explore the rich culinary heritage of Surigao del Norte.',
    category: 'Food & Dining',
    categoryColor: 'red',
    image: 'https://cdn.prod.website-files.com/66ae64945e072e8cb3d0c8e6/683fa2283bf970eb359a3eb2_sfood.webp',
    date: 'November 1, 2025',
    readTime: '9 min read',
    author: 'Chef Elena Cruz',
    tags: ['Food', 'Cuisine', 'Restaurants']
  },
  {
    id: 6,
    title: 'Sugba Lagoon: Kayaking Through Paradise',
    excerpt: 'Paddle through the crystal-clear waters of Sugba Lagoon, surrounded by towering limestone cliffs and lush mangroves.',
    category: 'Adventure',
    categoryColor: 'orange',
    image: 'https://www.thecoastalcampaign.com/wp-content/uploads/2019/12/DJI_0167-1024x682.jpg',
    date: 'October 28, 2025',
    readTime: '7 min read',
    author: 'Jake Rodriguez',
    tags: ['Sugba Lagoon', 'Kayaking', 'Nature']
  },
  {
    id: 7,
    title: 'Tinuy-an Falls: The Niagara of the Philippines',
    excerpt: 'Visit the majestic three-tiered Tinuy-an Falls, one of the most beautiful waterfalls in the Philippines.',
    category: 'Travel Guide',
    categoryColor: 'blue',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/12/71/df/the-beauty-of-tinuy-an.jpg?w=900&h=500&s=1',
    date: 'October 25, 2025',
    readTime: '8 min read',
    author: 'Maria Santos',
    tags: ['Tinuy-an Falls', 'Waterfalls', 'Nature']
  },
  {
    id: 8,
    title: 'Sustainable Tourism in Surigao: Travel Responsibly',
    excerpt: 'Learn how to minimize your environmental impact while exploring Surigao del Norte.',
    category: 'Local Culture',
    categoryColor: 'green',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhoKvRpkflBLu9mWMucvZJ4XtzF6NUlzptQjwLll176MxUkd9yDcSGRut7rNHRNfKV9VZV2INaFoCM2uMUT6u6jWBVJCnySe8R6Oh7fGEMyLF0IBBvDbSFxPPQEwDt8dh9b0oef62wrLK6JrAB4YkWt4sd3xIe5X1-7ltdpzAoPmBqasGO6UMzRs23d7CE/s960/Siargao%20Featured%20Photo%20%E2%80%94%20Sustainable%20Siargao.png',
    date: 'October 22, 2025',
    readTime: '7 min read',
    author: 'Maria Santos',
    tags: ['Sustainability', 'Eco-Tourism', 'Conservation']
  },
  {
    id: 9,
    title: 'Best Budget Accommodations in Siargao',
    excerpt: 'Traveling on a budget? Discover affordable hostels, guesthouses, and homestays that offer great value.',
    category: 'Travel Guide',
    categoryColor: 'blue',
    image: 'https://cf.bstatic.com/static/img/theme-index/bg_budget/1f0cae2bfb9297cd985477db58019139683b1aa5.jpg',
    date: 'October 18, 2025',
    readTime: '8 min read',
    author: 'Carlos Mendoza',
    tags: ['Budget Travel', 'Accommodations', 'Hotels']
  }
])

const blogPostId = computed(() => Number(route.params.id))

const blogPost = computed(() => {
    return blogPosts.value.find(p => p.id === blogPostId.value)
})

// Helper methods
const getAuthorAvatar = (authorName: string): string => {
    const avatarMap: Record<string, string> = {
        'Maria Santos': 'https://i.pravatar.cc/150?img=5',
        'Jake Rodriguez': 'https://i.pravatar.cc/150?img=12',
        'Carlos Mendoza': 'https://i.pravatar.cc/150?img=33',
        'Chef Elena Cruz': 'https://i.pravatar.cc/150?img=47'
    }
    return avatarMap[authorName] || 'https://i.pravatar.cc/150?img=1'
}

const getCategoryColorClass = (color: string) => {
    const colors: Record<string, string> = {
        blue: 'text-blue-600',
        orange: 'text-orange-600',
        green: 'text-green-600',
        red: 'text-red-600'
    }
    return colors[color] || 'text-gray-600'
}

// Blog content - full article text
const blogContent = computed(() => {
    if (!blogPost.value) return ''
    
    // Generate rich content based on the blog post
    return `${blogPost.value.excerpt}\n\nThis is where the full blog post content would appear. The article would include detailed information, personal experiences, practical tips, and beautiful descriptions of the destination.\n\nStay tuned for the complete article!`
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
    const storageKey = `reviews_blog_${blogPostId.value}`
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
    const storageKey = `reviews_blog_${blogPostId.value}`
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

    if (!blogPost.value) {
        console.warn(`Blog post with ID ${blogPostId.value} not found`)
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
<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-8">
          <h1 class="text-5xl md:text-7xl font-serif font-bold mb-4">Surigao Stories</h1>
          <p class="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Discover hidden gems, local culture, and unforgettable adventures in Surigao del Norte
          </p>
        </div>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mt-8">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search articles, destinations, or topics..."
              class="w-full px-6 py-4 pl-14 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-gray-400 shadow-xl"
            />
            <div class="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </div>
            <div v-if="searchQuery" 
                 @click="searchQuery = ''"
                 class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer text-xl">
              ✕
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Featured Post -->
      <div v-if="featuredPost" class="mb-16">
        <div class="flex items-center gap-3 mb-8" data-aos="fade-right">
          <div class="text-3xl">⭐</div>
          <h2 class="text-3xl font-bold">Featured Story</h2>
        </div>
        <div @click="$router.push(`/blog/${featuredPost.id}`)" class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group" data-aos="fade-up">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="h-96 lg:h-auto bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                 :style="`background-image: url('${featuredPost.image}')`">
            </div>
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <div class="text-sm font-bold mb-2 uppercase tracking-wide text-gray-900">
                ⭐ {{ featuredPost.category }}
              </div>
              <h3 class="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-gray-600 transition-colors">
                {{ featuredPost.title }}
              </h3>
              <p class="text-gray-600 mb-6 leading-relaxed text-lg">
                {{ featuredPost.excerpt }}
              </p>
              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span>📅 {{ featuredPost.date }}</span>
                <span>⏱️ {{ featuredPost.readTime }}</span>
                <span>✍️ {{ featuredPost.author }}</span>
              </div>
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in featuredPost.tags" :key="tag" 
                      class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  #{{ tag }}
                </span>
              </div>
              <button class="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors self-start group-hover:scale-105 transition-transform">
                Read Full Story →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Categories -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6" data-aos="fade-right">
          <div class="text-2xl">📂</div>
          <h3 class="text-2xl font-bold">Browse by Category</h3>
        </div>
        <div class="flex flex-wrap gap-3" data-aos="fade-up">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="[
              'px-6 py-3 rounded-full font-semibold transition-all duration-300',
              selectedCategory === category.id 
                ? 'bg-black text-white shadow-lg scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:scale-105'
            ]">
            {{ category.name }}
            <span class="ml-2 text-sm opacity-75">({{ category.count }})</span>
          </button>
        </div>
      </div>
      
      <!-- Search Results Info -->
      <div v-if="searchQuery" class="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
        <p class="text-gray-900">
          <span class="font-semibold">{{ filteredPosts.length }}</span> 
          {{ filteredPosts.length === 1 ? 'article' : 'articles' }} found for 
          <span class="font-semibold">"{{ searchQuery }}"</span>
        </p>
      </div>

      <!-- Blog Posts Grid -->
      <div v-if="filteredPosts.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold mb-2">No articles found</h3>
        <p class="text-gray-600 mb-6">Try adjusting your search or browse all categories</p>
        <button 
          @click="searchQuery = ''; selectedCategory = 'all'"
          class="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
          View All Posts
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="(post, index) in displayedPosts" 
          :key="post.id"
          @click="$router.push(`/blog/${post.id}`)"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          data-aos="fade-up"
          :data-aos-delay="(index % 3) * 100">
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div class="p-6">
            <div class="text-xs font-bold mb-2 uppercase tracking-wide text-gray-900">
              {{ post.category }}
            </div>
            <h3 class="text-xl font-bold mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in post.tags.slice(0, 2)" :key="tag" 
                    class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                #{{ tag }}
              </span>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ post.date.split(',')[0] }}</span>
              <span>{{ post.readTime }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMorePosts" class="text-center mt-12">
        <button 
          @click="loadMorePosts"
          class="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 border border-gray-300 hover:scale-105">
          Load More Posts ({{ filteredPosts.length - visiblePosts }} remaining)
        </button>
      </div>

      <!-- Newsletter Signup -->
      <div class="mt-16 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white shadow-2xl" data-aos="fade-up">
        <div class="text-5xl mb-4">📧</div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Surigao Stories</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          Get the latest travel tips, destination guides, and exclusive stories delivered to your inbox every week
        </p>
        
        <div v-if="subscribeStatus === 'success'" class="max-w-md mx-auto p-4 bg-green-500 rounded-full text-white font-semibold mb-4">
          ✓ Successfully subscribed! Check your inbox.
        </div>
        
        <div v-else-if="subscribeStatus === 'error'" class="max-w-md mx-auto p-4 bg-red-500 rounded-full text-white font-semibold mb-4">
          ✕ Please enter a valid email address
        </div>
        
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input 
            v-model="email"
            type="email" 
            placeholder="Enter your email address" 
            @keyup.enter="handleSubscribe"
            :disabled="subscribeStatus === 'loading'"
            class="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white disabled:opacity-50"
          />
          <button 
            @click="handleSubscribe"
            :disabled="subscribeStatus === 'loading'"
            class="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 hover:scale-105 whitespace-nowrap">
            {{ subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </div>
        
        <p class="text-sm text-gray-400 mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
  featured?: boolean
}

const selectedCategory = ref('all')
const searchQuery = ref('')
const email = ref('')
const subscribeStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'Sohoton Cove: A Journey Through Enchanted Waters',
    excerpt: 'Explore the mystical beauty of Sohoton Cove National Park, where emerald lagoons, ancient caves, and bioluminescent waters create an otherworldly experience. Discover why this hidden gem is called the "Enchanted River of Surigao."',
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
    excerpt: 'Dive into the world-famous surf scene at Cloud 9. Whether you\'re a seasoned surfer or a curious beginner, learn everything about riding the perfect wave at the Philippines\' surfing capital.',
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
    excerpt: 'Experience the ultimate island hopping adventure visiting Naked Island, Daku Island, and Guyam Island. Complete guide with tips, costs, and what to expect from this iconic Siargao tour.',
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
    excerpt: 'Discover the perfect timing and best practices for visiting Magpupungko Rock Pools. Learn about tide schedules, safety tips, and how to capture the perfect Instagram shot at these natural wonders.',
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
    excerpt: 'From fresh seafood to traditional Filipino dishes with a local twist, explore the rich culinary heritage of Surigao del Norte. Must-try dishes, best restaurants, and food market recommendations.',
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
    excerpt: 'Paddle through the crystal-clear waters of Sugba Lagoon, surrounded by towering limestone cliffs and lush mangroves. A complete guide to one of Siargao\'s most serene destinations.',
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
    excerpt: 'Visit the majestic three-tiered Tinuy-an Falls, one of the most beautiful waterfalls in the Philippines. Learn about bamboo rafting, swimming spots, and the best time to see the rainbow.',
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
    excerpt: 'Learn how to minimize your environmental impact while exploring Surigao del Norte. Tips for eco-friendly travel, supporting local communities, and preserving natural wonders for future generations.',
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
    excerpt: 'Traveling on a budget? Discover affordable hostels, guesthouses, and homestays that offer great value without compromising comfort. Complete guide with prices and booking tips.',
    category: 'Travel Guide',
    categoryColor: 'blue',
    image: 'https://cf.bstatic.com/static/img/theme-index/bg_budget/1f0cae2bfb9297cd985477db58019139683b1aa5.jpg',
    date: 'October 18, 2025',
    readTime: '8 min read',
    author: 'Carlos Mendoza',
    tags: ['Budget Travel', 'Accommodations', 'Hotels']
  }
])

const categories = [
  { id: 'all', name: 'All Posts', count: computed(() => blogPosts.value.length) },
  { id: 'travel-guide', name: 'Travel Guides', count: computed(() => blogPosts.value.filter(p => p.category === 'Travel Guide').length) },
  { id: 'local-culture', name: 'Local Culture', count: computed(() => blogPosts.value.filter(p => p.category === 'Local Culture').length) },
  { id: 'food-dining', name: 'Food & Dining', count: computed(() => blogPosts.value.filter(p => p.category === 'Food & Dining').length) },
  { id: 'adventure', name: 'Adventure', count: computed(() => blogPosts.value.filter(p => p.category === 'Adventure').length) }
]

const featuredPost = computed(() => blogPosts.value.find(post => post.featured))

const filteredPosts = computed(() => {
  let posts = blogPosts.value.filter(post => !post.featured)
  
  if (selectedCategory.value !== 'all') {
    const categoryName = categories.find(c => c.id === selectedCategory.value)?.name
    posts = posts.filter(post => post.category === categoryName)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return posts
})

const visiblePosts = ref(6)

const displayedPosts = computed(() => {
  return filteredPosts.value.slice(0, visiblePosts.value)
})

const hasMorePosts = computed(() => visiblePosts.value < filteredPosts.value.length)

const loadMorePosts = () => {
  visiblePosts.value += 6
}

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  visiblePosts.value = 6
}

const handleSubscribe = async () => {
  if (!email.value || !email.value.includes('@')) {
    subscribeStatus.value = 'error'
    setTimeout(() => subscribeStatus.value = 'idle', 3000)
    return
  }
  
  subscribeStatus.value = 'loading'
  
  setTimeout(() => {
    subscribeStatus.value = 'success'
    email.value = ''
    setTimeout(() => subscribeStatus.value = 'idle', 3000)
  }, 1500)
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

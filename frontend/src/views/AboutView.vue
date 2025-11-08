<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Hero Section -->
    <div class="relative h-[60vh] bg-black overflow-hidden">
      <div class="absolute inset-0 bg-black/50 z-1"></div>
      
      <img
        src="https://ik.imgkit.net/3vlqs5axxjf/TW-Asia/uploadedImages/Industry/Marketing/philippines-new-tourism-campaign-love-it-or-hate-it.jpg?tr=w-1200%2Cfo-auto"
        alt="Surigao del Norte"
        class="w-full h-full object-cover opacity-70"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
        <div class="text-center text-white px-6 z-2">
          <h1 class="text-6xl font-serif mb-6">About Explore SDN</h1>
          <p class="text-2xl text-gray-200 max-w-3xl mx-auto">
            Your gateway to discovering the hidden paradise of Surigao del Norte
          </p>
        </div>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-5xl font-serif text-gray-900 mb-6">Our Mission</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Surigao Escapes is dedicated to showcasing the breathtaking beauty and rich culture of Surigao del Norte. 
            We believe that this corner of the Philippines deserves to be explored, celebrated, and preserved for generations to come.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Our platform connects travelers with authentic experiences, from world-class surfing spots to hidden waterfalls, 
            pristine beaches, and vibrant local communities. We're here to make your journey unforgettable while supporting 
            sustainable tourism practices.
          </p>
          <div class="flex gap-4">
            <div class="text-center">
              <div class="text-4xl font-bold text-black mb-2">{{ dataStore.places.length }}+</div>
              <div class="text-sm text-gray-600">Destinations</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-black mb-2">{{ municipalityCount }}+</div>
              <div class="text-sm text-gray-600">Municipalities</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-black mb-2">1000+</div>
              <div class="text-sm text-gray-600">Happy Travelers</div>
            </div>
          </div>
        </div>
        <div class="relative">
          <img
            src="https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/10/2-1.jpg?w=940&ssl=1"
            alt="Cloud 9 Siargao"
            class="rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-white py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl font-serif text-gray-900 text-center mb-16">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div class="i-mdi-earth text-blue-600 text-4xl"></div>
            </div>
            <h3 class="text-2xl font-bold mb-4">Sustainability</h3>
            <p class="text-gray-700">
              We promote eco-friendly tourism practices that protect the natural beauty of Surigao del Norte 
              for future generations.
            </p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div class="i-mdi-account-group text-green-600 text-4xl"></div>
            </div>
            <h3 class="text-2xl font-bold mb-4">Community</h3>
            <p class="text-gray-700">
              We support local businesses and communities, ensuring that tourism benefits the people who call 
              these islands home.
            </p>
          </div>
          <div class="text-center">
            <div class="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div class="i-mdi-star text-yellow-600 text-4xl"></div>
            </div>
            <h3 class="text-2xl font-bold mb-4">Authenticity</h3>
            <p class="text-gray-700">
              We showcase genuine experiences and honest reviews, helping you discover the real Surigao del Norte 
              beyond the tourist facade.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Story Section -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1">
          <img
            src="https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/02/Magpupungko-Pools-Pilar-Siargao.png?w=940&ssl=1"
            alt="Magpupungko Rock Pools"
            class="rounded-2xl shadow-2xl"
          />
        </div>
        <div class="order-1 lg:order-2">
          <h2 class="text-5xl font-serif text-gray-900 mb-6">Our Story</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Surigao Escapes was born from a deep love for the islands of Surigao del Norte. After countless visits 
            to this paradise, we realized that many travelers were missing out on incredible experiences simply 
            because they didn't know where to look.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            We created this platform to bridge that gap—to share insider knowledge, connect travelers with local 
            experts, and make it easier than ever to plan the perfect island adventure. Whether you're a surfer 
            chasing the perfect wave, a nature lover seeking hidden waterfalls, or a foodie exploring local cuisine, 
            we're here to guide you.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
            Join us in discovering why Surigao del Norte is truly one of the Philippines' best-kept secrets.
          </p>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="bg-black text-white py-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-5xl font-serif mb-6">Meet Our Team</h2>
        <p class="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
          We're a passionate group of travelers, locals, and adventure seekers dedicated to sharing the beauty of Surigao del Norte
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div class="i-mdi-account text-gray-400 text-6xl"></div>
            </div>
            <h3 class="text-xl font-bold mb-2">Travel Experts</h3>
            <p class="text-gray-400 text-sm">Curating the best experiences</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div class="i-mdi-account text-gray-400 text-6xl"></div>
            </div>
            <h3 class="text-xl font-bold mb-2">Local Guides</h3>
            <p class="text-gray-400 text-sm">Sharing insider knowledge</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div class="i-mdi-account text-gray-400 text-6xl"></div>
            </div>
            <h3 class="text-xl font-bold mb-2">Content Creators</h3>
            <p class="text-gray-400 text-sm">Capturing the beauty</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div class="i-mdi-account text-gray-400 text-6xl"></div>
            </div>
            <h3 class="text-xl font-bold mb-2">Support Team</h3>
            <p class="text-gray-400 text-sm">Here to help you</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 class="text-5xl font-serif text-gray-900 mb-6">Ready to Explore?</h2>
      <p class="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
        Start planning your adventure to Surigao del Norte today. Discover hidden gems, book accommodations, 
        and create memories that will last a lifetime.
      </p>
      <div class="flex gap-4 justify-center">
        <router-link
          to="/explore"
          class="bg-black text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors text-lg"
        >
          Explore Destinations
        </router-link>
        <router-link
          to="/contact"
          class="bg-white text-gray-900 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors text-lg"
        >
          Contact Us
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const municipalityCount = computed(() => {
  const municipalities = new Set<string>()
  dataStore.places.forEach(place => {
    if (place.municipality) municipalities.add(place.municipality)
  })
  return municipalities.size
})
</script>

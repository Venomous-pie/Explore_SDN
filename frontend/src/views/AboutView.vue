<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative h-[70vh] bg-black overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10"></div>
      
      <img
        src="https://ik.imgkit.net/3vlqs5axxjf/TW-Asia/uploadedImages/Industry/Marketing/philippines-new-tourism-campaign-love-it-or-hate-it.jpg?tr=w-1200%2Cfo-auto"
        alt="Surigao del Norte"
        class="w-full h-full object-cover opacity-60 animate-subtle-zoom"
      />
      <div class="absolute inset-0 z-20 flex items-center justify-center">
        <div class="text-center text-white px-6 max-w-5xl animate-fade-in-up">
          <div class="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/30">
            <span class="text-sm font-semibold tracking-wider">DISCOVER PARADISE</span>
          </div>
          <h1 class="text-6xl md:text-7xl font-bold mb-6 tracking-tight">About Explore SDN</h1>
          <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Your gateway to discovering the hidden paradise of Surigao del Norte
          </p>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-6 animate-fade-in">
          <div class="inline-block">
            <span class="text-sm font-bold text-black tracking-widest uppercase border-b-2 border-black pb-1">Our Purpose</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold text-black leading-tight">Our Mission</h2>
          <p class="text-lg text-gray-700 leading-relaxed">
            Explore SDN is dedicated to showcasing the breathtaking beauty and rich culture of Surigao del Norte. 
            We believe that this corner of the Philippines deserves to be explored, celebrated, and preserved for generations to come.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
            Our platform connects travelers with authentic experiences, from world-class surfing spots to hidden waterfalls, 
            pristine beaches, and vibrant local communities. We're here to make your journey unforgettable while supporting 
            sustainable tourism practices.
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 pt-8">
            <div class="text-center p-6 bg-black rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div class="text-4xl font-bold text-white mb-2">{{ dataStore.places.length }}+</div>
              <div class="text-sm font-medium text-gray-300">Destinations</div>
            </div>
            <div class="text-center p-6 bg-gray-900 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div class="text-4xl font-bold text-white mb-2">{{ municipalityCount }}+</div>
              <div class="text-sm font-medium text-gray-300">Municipalities</div>
            </div>
            <div class="text-center p-6 bg-gray-800 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div class="text-4xl font-bold text-white mb-2">1000+</div>
              <div class="text-sm font-medium text-gray-300">Happy Travelers</div>
            </div>
          </div>
        </div>
        
        <div class="relative group animate-fade-in-right">
          <div class="absolute -inset-1 bg-black rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          <img
            src="https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/10/2-1.jpg?w=940&ssl=1"
            alt="Cloud 9 Siargao"
            class="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border-4 border-black"
          />
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-gray-50 py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <span class="text-sm font-bold text-black tracking-widest uppercase border-b-2 border-black pb-1">What We Stand For</span>
          <h2 class="text-5xl md:text-6xl font-bold text-black mt-4 mb-6">Our Values</h2>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            Principles that guide everything we do
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black hover:-translate-y-2">
            <div class="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0v-.5a1.5 1.5 0 011.5-1.5c.526 0 .988.27 1.256.68a6.012 6.012 0 011.912 2.706v.001a1 1 0 01-.633 1.268l-.84.28a1 1 0 01-.633 0l-.84-.28A6.97 6.97 0 0110 11a6.97 6.97 0 01-4.722-.585l-.84.28a1 1 0 01-.633 0l-.84-.28A1 1 0 013.332 9v-.001z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-center text-black">Sustainability</h3>
            <p class="text-gray-700 text-center leading-relaxed">
              We promote eco-friendly tourism practices that protect the natural beauty of Surigao del Norte 
              for future generations.
            </p>
          </div>
          
          <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black hover:-translate-y-2">
            <div class="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-center text-black">Community</h3>
            <p class="text-gray-700 text-center leading-relaxed">
              We support local businesses and communities, ensuring that tourism benefits the people who call 
              these islands home.
            </p>
          </div>
          
          <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black hover:-translate-y-2">
            <div class="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-center text-black">Authenticity</h3>
            <p class="text-gray-700 text-center leading-relaxed">
              We showcase genuine experiences and honest reviews, helping you discover the real Surigao del Norte 
              beyond the tourist facade.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Story Section -->
    <div class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div class="relative group order-2 lg:order-1 animate-fade-in-left">
          <div class="absolute -inset-1 bg-black rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          <img
            src="https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/02/Magpupungko-Pools-Pilar-Siargao.png?w=940&ssl=1"
            alt="Magpupungko Rock Pools"
            class="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border-4 border-black"
          />
        </div>
        
        <div class="space-y-6 order-1 lg:order-2 animate-fade-in">
          <div class="inline-block">
            <span class="text-sm font-bold text-black tracking-widest uppercase border-b-2 border-black pb-1">How It Started</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold text-black leading-tight">Our Story</h2>
          <p class="text-lg text-gray-700 leading-relaxed">
            Explore SDN was born from a deep love for the islands of Surigao del Norte. After countless visits 
            to this paradise, we realized that many travelers were missing out on incredible experiences simply 
            because they didn't know where to look.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
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
    <div class="bg-black text-white py-24 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <span class="text-sm font-bold text-gray-300 tracking-widest uppercase border-b-2 border-white pb-1 inline-block">The People</span>
        <h2 class="text-5xl md:text-6xl font-bold mb-6 mt-6">Meet Our Team</h2>
        <p class="text-xl text-gray-300 mb-20 max-w-3xl mx-auto leading-relaxed">
          We're a passionate group of travelers, locals, and adventure seekers dedicated to sharing the beauty of Surigao del Norte
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="group text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
            <div class="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Travel Experts</h3>
            <p class="text-gray-400 text-sm">Curating the best experiences</p>
          </div>
          
          <div class="group text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
            <div class="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Local Guides</h3>
            <p class="text-gray-400 text-sm">Sharing insider knowledge</p>
          </div>
          
          <div class="group text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
            <div class="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Content Creators</h3>
            <p class="text-gray-400 text-sm">Capturing the beauty</p>
          </div>
          
          <div class="group text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
            <div class="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Support Team</h3>
            <p class="text-gray-400 text-sm">Here to help you</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="max-w-7xl mx-auto px-6 py-24 text-center">
      <div class="bg-black rounded-3xl p-16 shadow-2xl relative overflow-hidden border-4 border-black">
        <div class="relative z-10">
          <h2 class="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p class="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Start planning your adventure to Surigao del Norte today. Discover hidden gems, book accommodations, 
            and create memories that will last a lifetime.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/explore"
              class="bg-white text-black font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Explore Destinations
            </router-link>
            <router-link
              to="/contact"
              class="bg-transparent text-white font-bold py-4 px-10 rounded-xl border-2 border-white hover:bg-white hover:text-black transition-all duration-300 text-lg hover:-translate-y-1"
            >
              Contact Us
            </router-link>
          </div>
        </div>
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

<style scoped>
@keyframes subtle-zoom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-subtle-zoom {
  animation: subtle-zoom 20s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-right {
  animation: fade-in-right 1s ease-out;
}

.animate-fade-in-left {
  animation: fade-in-left 1s ease-out;
}
</style>
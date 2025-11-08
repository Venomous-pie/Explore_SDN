<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Hero Section -->
    <div class="bg-black text-white py-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-6xl font-serif mb-6">Dining & Restaurants</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the best restaurants in Surigao del Norte. Browse reviews, menus, and make reservations through trusted platforms.
        </p>
      </div>
    </div>

    <!-- Restaurant Platforms Section -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl font-serif text-gray-900 text-center mb-12">Find Restaurants</h2>
      
      <!-- Platform Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <!-- TripAdvisor -->
        <a
          href="https://www.tripadvisor.com/Restaurants-g298460-Surigao_del_Norte_Province_Mindanao.html"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-owl text-green-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">TripAdvisor</h3>
          <p class="text-gray-600 mb-6">Read reviews and ratings</p>
          <div class="inline-flex items-center gap-2 text-green-600 font-semibold">
            <span>Browse</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Google Maps -->
        <a
          href="https://www.google.com/maps/search/restaurants+in+Surigao+del+Norte"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-map text-blue-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Google Maps</h3>
          <p class="text-gray-600 mb-6">Find nearby restaurants</p>
          <div class="inline-flex items-center gap-2 text-blue-600 font-semibold">
            <span>Search</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Zomato -->
        <a
          href="https://www.zomato.com/philippines/surigao-city-restaurants"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-food text-red-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Zomato</h3>
          <p class="text-gray-600 mb-6">Menus and delivery</p>
          <div class="inline-flex items-center gap-2 text-red-600 font-semibold">
            <span>Explore</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Facebook -->
        <a
          href="https://www.facebook.com/search/top?q=restaurants%20in%20surigao%20del%20norte"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-facebook text-indigo-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Facebook</h3>
          <p class="text-gray-600 mb-6">Local restaurant pages</p>
          <div class="inline-flex items-center gap-2 text-indigo-600 font-semibold">
            <span>Discover</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>
      </div>

      <!-- Popular Dining Areas -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Popular Dining Areas</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-mdi-silverware-fork-knife text-orange-500 text-xl flex-shrink-0 mt-1"></div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">General Luna, Siargao</h4>
              <p class="text-sm text-gray-600">Beach bars, cafes, and seafood restaurants</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-mdi-silverware-fork-knife text-orange-500 text-xl flex-shrink-0 mt-1"></div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Surigao City</h4>
              <p class="text-sm text-gray-600">Filipino cuisine and local favorites</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-mdi-silverware-fork-knife text-orange-500 text-xl flex-shrink-0 mt-1"></div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Del Carmen</h4>
              <p class="text-sm text-gray-600">Fresh seafood and island dining</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="bg-white py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="i-mdi-fish text-blue-500 text-5xl mb-4 mx-auto"></div>
            <h3 class="text-xl font-bold mb-2">Fresh Seafood</h3>
            <p class="text-gray-600 text-sm">Enjoy the freshest catch from the surrounding waters</p>
          </div>
          <div>
            <div class="i-mdi-food-variant text-orange-500 text-5xl mb-4 mx-auto"></div>
            <h3 class="text-xl font-bold mb-2">Local Flavors</h3>
            <p class="text-gray-600 text-sm">Experience authentic Filipino and regional cuisine</p>
          </div>
          <div>
            <div class="i-mdi-star-circle text-yellow-500 text-5xl mb-4 mx-auto"></div>
            <h3 class="text-xl font-bold mb-2">Highly Rated</h3>
            <p class="text-gray-600 text-sm">All restaurants are reviewed by real diners</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No data fetching needed - redirecting to external restaurant platforms
</script>

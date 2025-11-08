<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Hero Section -->
    <div class="bg-black text-white py-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-6xl font-serif mb-6">Hotels & Accommodations</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Find your perfect stay in Surigao del Norte. Browse trusted booking platforms for the best deals on hotels, resorts, and accommodations.
        </p>
      </div>
    </div>

    <!-- Booking Platforms Section -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl font-serif text-gray-900 text-center mb-12">Book Your Stay</h2>
      
      <!-- Booking Platform Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- Booking.com -->
        <a
          href="https://www.booking.com/searchresults.html?ss=Surigao+del+Norte%2C+Philippines"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-bed text-blue-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Booking.com</h3>
          <p class="text-gray-600 mb-6">Browse thousands of hotels, resorts, and vacation rentals</p>
          <div class="inline-flex items-center gap-2 text-blue-600 font-semibold">
            <span>Search Hotels</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Agoda -->
        <a
          href="https://www.agoda.com/search?city=18810&checkIn=2025-01-01&checkOut=2025-01-02"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-home-city text-red-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Agoda</h3>
          <p class="text-gray-600 mb-6">Find exclusive deals on hotels and accommodations</p>
          <div class="inline-flex items-center gap-2 text-red-600 font-semibold">
            <span>View Deals</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Airbnb -->
        <a
          href="https://www.airbnb.com/s/Surigao-del-Norte--Philippines/homes"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-home-heart text-pink-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Airbnb</h3>
          <p class="text-gray-600 mb-6">Discover unique homes and local experiences</p>
          <div class="inline-flex items-center gap-2 text-pink-600 font-semibold">
            <span>Explore Stays</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Hotels.com -->
        <a
          href="https://www.hotels.com/search.do?destination=Surigao+del+Norte%2C+Philippines"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-office-building text-purple-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Hotels.com</h3>
          <p class="text-gray-600 mb-6">Earn rewards with every booking</p>
          <div class="inline-flex items-center gap-2 text-purple-600 font-semibold">
            <span>Find Hotels</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- Expedia -->
        <a
          href="https://www.expedia.com/Hotel-Search?destination=Surigao+del+Norte%2C+Philippines"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-airplane text-yellow-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Expedia</h3>
          <p class="text-gray-600 mb-6">Bundle flights and hotels for extra savings</p>
          <div class="inline-flex items-center gap-2 text-yellow-600 font-semibold">
            <span>Book Now</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>

        <!-- TripAdvisor -->
        <a
          href="https://www.tripadvisor.com/Hotels-g298460-Surigao_del_Norte_Province_Mindanao-Hotels.html"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center group"
        >
          <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <div class="i-mdi-owl text-green-600 text-4xl"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">TripAdvisor</h3>
          <p class="text-gray-600 mb-6">Read reviews and compare prices</p>
          <div class="inline-flex items-center gap-2 text-green-600 font-semibold">
            <span>Compare Prices</span>
            <div class="i-mdi-arrow-right group-hover:translate-x-1 transition-transform"></div>
          </div>
        </a>
      </div>

      <!-- Popular Destinations -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Popular Areas to Stay</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-mdi-map-marker text-red-500 text-xl flex-shrink-0 mt-1"></div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">General Luna, Siargao</h4>
              <p class="text-sm text-gray-600">Close to Cloud 9 and nightlife</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-mdi-map-marker text-red-500 text-xl flex-shrink-0 mt-1"></div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Del Carmen, Siargao</h4>
              <p class="text-sm text-gray-600">Perfect for island hopping</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-mdi-map-marker text-red-500 text-xl flex-shrink-0 mt-1"></div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Surigao City</h4>
              <p class="text-sm text-gray-600">Gateway to the province</p>
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
            <div class="i-mdi-shield-check text-blue-500 text-5xl mb-4 mx-auto"></div>
            <h3 class="text-xl font-bold mb-2">Verified Properties</h3>
            <p class="text-gray-600 text-sm">All accommodations are verified and reviewed by real travelers</p>
          </div>
          <div>
            <div class="i-mdi-cash-multiple text-green-500 text-5xl mb-4 mx-auto"></div>
            <h3 class="text-xl font-bold mb-2">Best Price Guarantee</h3>
            <p class="text-gray-600 text-sm">We ensure you get the best rates for your stay</p>
          </div>
          <div>
            <div class="i-mdi-headset text-purple-500 text-5xl mb-4 mx-auto"></div>
            <h3 class="text-xl font-bold mb-2">24/7 Support</h3>
            <p class="text-gray-600 text-sm">Our team is always here to help with your booking</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No data fetching needed - redirecting to external booking platforms
</script>

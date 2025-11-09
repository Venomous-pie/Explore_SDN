<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-black text-white py-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-serif font-bold mb-4">Plan Your Trip</h1>
        <p class="text-xl max-w-2xl mx-auto">Everything you need to create the perfect Surigao del Norte adventure</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Trip Planning Steps -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Plan in 4 Easy Steps</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Step 1 -->
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">📅</span>
            </div>
            <h3 class="text-xl font-bold mb-2">1. Choose Dates</h3>
            <p class="text-gray-600 text-sm">
              Select your travel dates based on weather and festivals
            </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🏖️</span>
            </div>
            <h3 class="text-xl font-bold mb-2">2. Pick Destinations</h3>
            <p class="text-gray-600 text-sm">
              Choose from beaches, islands, and natural attractions
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🏨</span>
            </div>
            <h3 class="text-xl font-bold mb-2">3. Book Accommodation</h3>
            <p class="text-gray-600 text-sm">
              Find the perfect place to stay within your budget
            </p>
          </div>

          <!-- Step 4 -->
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">✈️</span>
            </div>
            <h3 class="text-xl font-bold mb-2">4. Arrange Transport</h3>
            <p class="text-gray-600 text-sm">
              Book flights, ferries, and local transportation
            </p>
          </div>
        </div>
      </div>

      <!-- Best Time to Visit -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Best Time to Visit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Dry Season -->
          <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-green-500">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">☀️</span>
              <div>
                <h3 class="text-xl font-bold">Dry Season</h3>
                <p class="text-sm text-gray-600">March - May</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              Perfect weather for beach activities, island hopping, and surfing. Expect sunny days and calm seas.
            </p>
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm font-semibold text-green-800">Best for: Surfing, Swimming, Diving</p>
            </div>
          </div>

          <!-- Wet Season -->
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">🌧️</span>
              <div>
                <h3 class="text-xl font-bold">Wet Season</h3>
                <p class="text-sm text-gray-600">June - November</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              Occasional rain showers, fewer tourists, and lower prices. Still possible to enjoy most activities.
            </p>
            <div class="bg-blue-50 rounded-lg p-3">
              <p class="text-sm font-semibold text-blue-800">Best for: Budget Travel, Waterfalls</p>
            </div>
          </div>

          <!-- Cool Season -->
          <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-500">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">🌤️</span>
              <div>
                <h3 class="text-xl font-bold">Cool Season</h3>
                <p class="text-sm text-gray-600">December - February</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              Pleasant temperatures, ideal for outdoor activities. Peak tourist season with vibrant atmosphere.
            </p>
            <div class="bg-blue-50 rounded-lg p-3">
              <p class="text-sm font-semibold text-blue-800">Best for: All Activities, Festivals</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sample Itineraries -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Sample Itineraries</h2>
        <div class="space-y-6">
          <!-- 3-Day Itinerary -->
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-green-100 px-4 py-2 rounded-full">
                <span class="font-bold text-green-800">3 Days</span>
              </div>
              <h3 class="text-2xl font-bold">Siargao Island Essentials</h3>
            </div>
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 1: Arrival & Cloud 9</h4>
                  <p class="text-gray-600 text-sm">Arrive in Siargao, check-in, visit Cloud 9 boardwalk, sunset at the pier</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 2: Island Hopping Tour</h4>
                  <p class="text-gray-600 text-sm">Naked Island, Daku Island, Guyam Island - full day tour with lunch</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 3: Magpupungko & Departure</h4>
                  <p class="text-gray-600 text-sm">Morning visit to Magpupungko Rock Pools, afternoon departure</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 5-Day Itinerary -->
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-blue-100 px-4 py-2 rounded-full">
                <span class="font-bold text-blue-800">5 Days</span>
              </div>
              <h3 class="text-2xl font-bold">Complete Surigao del Norte Experience</h3>
            </div>
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 1-2: Siargao Highlights</h4>
                  <p class="text-gray-600 text-sm">Cloud 9, island hopping, Sugba Lagoon, local food tour</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 3: Sohoton Cove</h4>
                  <p class="text-gray-600 text-sm">Explore the enchanting lagoons, caves, and jellyfish sanctuary</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 4: Mainland Adventures</h4>
                  <p class="text-gray-600 text-sm">Waterfalls, cultural sites, and local markets in Surigao City</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h4 class="font-bold mb-1">Day 5: Relaxation & Departure</h4>
                  <p class="text-gray-600 text-sm">Beach time, souvenir shopping, departure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Budget Guide -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Budget Guide</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💰</span>
              Budget Traveler
            </h3>
            <div class="text-3xl font-bold text-green-600 mb-4">₱2,000-3,500</div>
            <p class="text-sm text-gray-600 mb-4">per person/day</p>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• Hostel/budget accommodation</li>
              <li>• Local eateries & street food</li>
              <li>• Shared tours & public transport</li>
              <li>• Basic activities</li>
            </ul>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-500">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💎</span>
              Mid-Range
            </h3>
            <div class="text-3xl font-bold text-blue-600 mb-4">₱4,000-7,000</div>
            <p class="text-sm text-gray-600 mb-4">per person/day</p>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• Comfortable hotels/resorts</li>
              <li>• Mix of local & tourist restaurants</li>
              <li>• Private tours available</li>
              <li>• Most activities included</li>
            </ul>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>✨</span>
              Luxury
            </h3>
            <div class="text-3xl font-bold text-purple-600 mb-4">₱8,000+</div>
            <p class="text-sm text-gray-600 mb-4">per person/day</p>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• Luxury resorts & villas</li>
              <li>• Fine dining experiences</li>
              <li>• Private tours & transfers</li>
              <li>• Premium activities & spa</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Essential Tips -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Essential Travel Tips</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
              <span>📱</span>
              Connectivity
            </h3>
            <p class="text-gray-700 text-sm">
              Mobile signal is available in most tourist areas. Purchase a local SIM card for data. 
              WiFi is common in hotels and restaurants.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
              <span>💵</span>
              Money
            </h3>
            <p class="text-gray-700 text-sm">
              Bring cash as ATMs are limited outside main towns. Major establishments accept cards. 
              Exchange money in Surigao City for better rates.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
              <span>🎒</span>
              What to Pack
            </h3>
            <p class="text-gray-700 text-sm">
              Sunscreen, insect repellent, waterproof bag, reef-safe sunscreen, light clothing, 
              swimwear, and a good camera for memories.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
              <span>🏥</span>
              Health & Safety
            </h3>
            <p class="text-gray-700 text-sm">
              Bring basic medications. Travel insurance recommended. Stay hydrated and use sun protection. 
              Follow local guidelines for water activities.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-black rounded-2xl p-12 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Ready to Start Planning?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Explore our destinations and book your perfect Surigao del Norte adventure
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/explore">
            <button class="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Browse Destinations
            </button>
          </router-link>
          <router-link to="/hotels">
            <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Find Accommodation
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Trip planning page with itineraries, budgets, and travel tips
</script>

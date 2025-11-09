<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative h-96 bg-cover bg-center" 
         style="background-image: url('https://www.journeyera.com/wp-content/uploads/2017/12/alegria-beach-siargao-02192-1.jpg')">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 class="text-5xl md:text-6xl font-serif font-bold mb-4 text-center">Culture & Heritage</h1>
        <p class="text-xl text-center max-w-2xl">Discover the rich traditions and vibrant culture of Surigao del Norte</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Introduction -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-6">The Surigaonon Heritage</h2>
        <p class="text-gray-700 text-lg leading-relaxed mb-4">
          Surigao del Norte is home to a rich tapestry of cultural traditions, shaped by indigenous communities, 
          Spanish colonial influence, and modern Filipino identity. The province's culture is deeply rooted in 
          respect for nature, strong family values, and vibrant celebrations.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          From traditional festivals to indigenous crafts, the people of Surigao del Norte have preserved their 
          heritage while embracing progress, creating a unique cultural landscape that welcomes visitors with 
          warmth and hospitality.
        </p>
      </div>

      <!-- Festivals Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Festivals & Celebrations</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Bonok-Bonok Festival -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div class="text-white text-center">
                <div class="text-6xl mb-2">🎭</div>
                <h3 class="text-xl font-bold">Bonok-Bonok Festival</h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-sm text-gray-600 mb-2">September 9</p>
              <p class="text-gray-700">
                A colorful street dancing festival celebrating the feast of San Nicolas de Tolentino, 
                featuring traditional music, dance, and vibrant costumes.
              </p>
            </div>
          </div>

          <!-- Siargao International Surfing Cup -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <div class="text-white text-center">
                <div class="text-6xl mb-2">🏄</div>
                <h3 class="text-xl font-bold">Surfing Cup</h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-sm text-gray-600 mb-2">September-October</p>
              <p class="text-gray-700">
                World-class surfing competition that attracts international surfers to ride the famous 
                Cloud 9 waves, celebrating surf culture and island lifestyle.
              </p>
            </div>
          </div>

          <!-- Kaliguan Festival -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <div class="text-white text-center">
                <div class="text-6xl mb-2">🌾</div>
                <h3 class="text-xl font-bold">Kaliguan Festival</h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-sm text-gray-600 mb-2">Various Dates</p>
              <p class="text-gray-700">
                Harvest festival celebrating the province's agricultural bounty, featuring traditional 
                dances, music, and thanksgiving rituals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Traditional Crafts -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Traditional Crafts & Arts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
              <span class="text-3xl">🧺</span>
              Weaving & Handicrafts
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Indigenous communities in Surigao del Norte are known for their intricate weaving techniques, 
              creating beautiful mats, baskets, and textiles using natural materials like pandan and abaca. 
              These crafts are passed down through generations, preserving ancient patterns and methods.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
              <span class="text-3xl">🎨</span>
              Indigenous Art
            </h3>
            <p class="text-gray-700 leading-relaxed">
              The Mamanwa people, one of the oldest indigenous groups in the Philippines, maintain their 
              artistic traditions through wood carving, beadwork, and traditional body art. Their creations 
              reflect deep spiritual connections to nature and ancestral wisdom.
            </p>
          </div>
        </div>
      </div>

      <!-- Cuisine Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Local Cuisine</h2>
        <div class="bg-white rounded-xl p-8 shadow-lg">
          <p class="text-gray-700 text-lg leading-relaxed mb-6">
            Surigaonon cuisine is a delightful blend of fresh seafood, tropical fruits, and traditional Filipino 
            flavors. The province's coastal location provides abundant marine resources, while its fertile lands 
            yield coconuts, rice, and various vegetables.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-5xl mb-3">🦀</div>
              <h4 class="font-bold mb-2">Fresh Seafood</h4>
              <p class="text-sm text-gray-600">Crabs, prawns, fish, and shellfish prepared in traditional styles</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3">🥥</div>
              <h4 class="font-bold mb-2">Coconut Dishes</h4>
              <p class="text-sm text-gray-600">Kinilaw, laing, and other coconut-based delicacies</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3">🍜</div>
              <h4 class="font-bold mb-2">Local Specialties</h4>
              <p class="text-sm text-gray-600">Sutukil, tinola, and regional variations of Filipino classics</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 bg-black rounded-2xl p-12 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Experience the Culture</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Immerse yourself in the rich traditions and warm hospitality of Surigao del Norte
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/explore">
            <button class="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Explore Destinations
            </button>
          </router-link>
          <router-link to="/contact">
            <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Plan Your Visit
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Culture page showcasing the heritage and traditions of Surigao del Norte
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Hero Section -->
    <div class="bg-black text-white py-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-6xl font-serif mb-6">Frequently Asked Questions</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Find answers to common questions about traveling to Surigao del Norte
        </p>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="max-w-4xl mx-auto px-6 -mt-8">
      <div class="bg-white rounded-2xl shadow-2xl p-4">
        <div class="flex items-center gap-3">
          <div class="i-mdi-magnify text-gray-400 text-xl"></div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for answers..."
            class="flex-1 border-none focus:outline-none text-lg"
          />
        </div>
      </div>
    </div>

    <!-- FAQ Categories -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex flex-wrap gap-3 justify-center mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-6 py-3 rounded-full font-semibold transition-colors text-sm',
            selectedCategory === category
              ? 'bg-black text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-4 max-w-4xl mx-auto">
        <div
          v-for="(faq, index) in filteredFAQs"
          :key="index"
          class="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div
            @click="toggleFAQ(index)"
            class="w-full px-8 py-6 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div class="flex-1 pr-6">
              <span class="text-lg font-bold text-gray-900 block mb-1">{{ faq.question }}</span>
                <span class="text-xs text-gray-500 font-medium">{{ faq.category }}</span>
            </div>
            <svg
              :class="[
                'w-6 h-6 text-gray-500 flex-shrink-0 transition-transform',
                openFAQs.includes(index) ? 'rotate-180' : ''
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openFAQs.includes(index)" class="px-8 pb-6 border-t border-gray-100">
              <p class="text-base text-gray-600 leading-relaxed pt-4">{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredFAQs.length === 0" class="text-center py-20">
        <div class="i-mdi-help-circle-outline text-6xl text-gray-300 mx-auto mb-6"></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">No Questions Found</h2>
        <p class="text-base text-gray-600 mb-8">Try adjusting your search or browse all categories</p>
        <button
          @click="clearSearch"
          class="bg-black text-white text-sm font-semibold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
        >
          Clear Search
        </button>
      </div>
    </div>

    <!-- Still Have Questions -->
    <div class="bg-white border-t border-gray-200 py-20 px-6 mt-12">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-serif text-gray-900 mb-4">Still Have Questions?</h2>
        <p class="text-lg text-gray-600 mb-8">
          Can't find what you're looking for? Our team is here to help!
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-black text-white text-base font-semibold py-4 px-10 rounded-full hover:bg-gray-800 transition-colors no-underline"
        >
          Contact Us
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('All')
const openFAQs = ref<number[]>([])

const categories = ['All', 'General', 'Travel', 'Booking', 'Activities', 'Safety']

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the best time to visit Surigao del Norte?',
    answer: 'The best time to visit is during the dry season from March to October. However, Siargao\'s famous Cloud 9 surf break is best from September to November when the swells are biggest. The wet season (November to February) can still be enjoyable with fewer crowds and lower prices.',
    category: 'Travel'
  },
  {
    question: 'How do I get to Surigao del Norte?',
    answer: 'You can fly directly to Siargao Airport (IAO) from Manila or Cebu. Alternatively, fly to Surigao City and take a ferry or fast craft to Siargao Island. From Surigao City, you can also explore the mainland destinations by land transportation.',
    category: 'Travel'
  },
  {
    question: 'Do I need a visa to visit the Philippines?',
    answer: 'Citizens of most countries can enter the Philippines visa-free for up to 30 days. Some nationalities are eligible for visa-free entry for up to 59 days. Check with the Philippine embassy or consulate in your country for specific requirements.',
    category: 'General'
  },
  {
    question: 'Is Surigao del Norte safe for tourists?',
    answer: 'Yes, Surigao del Norte is generally safe for tourists. The locals are friendly and welcoming. However, always practice common sense safety measures: keep valuables secure, avoid isolated areas at night, and follow local guidelines, especially when engaging in water activities.',
    category: 'Safety'
  },
  {
    question: 'What currency is used and can I use credit cards?',
    answer: 'The Philippine Peso (PHP) is the official currency. While major hotels and restaurants accept credit cards, many local establishments, tour operators, and smaller shops only accept cash. ATMs are available in main towns like General Luna and Surigao City.',
    category: 'General'
  },
  {
    question: 'What should I pack for my trip?',
    answer: 'Pack light, breathable clothing, swimwear, reef-safe sunscreen, insect repellent, waterproof phone case, beach sandals, and a light rain jacket. Don\'t forget your snorkeling gear if you have it, though rentals are available. Bring cash as ATMs can be limited in remote areas.',
    category: 'Travel'
  },
  {
    question: 'Can I book accommodations through your platform?',
    answer: 'Currently, we provide information and recommendations for accommodations. Booking functionality is coming soon! For now, we recommend contacting hotels directly or using established booking platforms. Our team can also assist with recommendations.',
    category: 'Booking'
  },
  {
    question: 'What are the must-visit places in Surigao del Norte?',
    answer: 'Top destinations include Cloud 9 Surfing Area, Magpupungko Rock Pools, Sohoton Cove, Sugba Lagoon, Naked Island, Daku Island, and Guyam Island. Each offers unique experiences from surfing to island hopping and exploring mystical caves.',
    category: 'Activities'
  },
  {
    question: 'Do I need to know how to surf to enjoy Siargao?',
    answer: 'Not at all! While Siargao is famous for surfing, there are plenty of activities for non-surfers including island hopping, swimming in rock pools, exploring lagoons, diving, snorkeling, stand-up paddleboarding, and simply relaxing on beautiful beaches.',
    category: 'Activities'
  },
  {
    question: 'Are there medical facilities available?',
    answer: 'Basic medical facilities and pharmacies are available in General Luna and Surigao City. For serious medical emergencies, you may need to travel to Surigao City or even Cebu. We strongly recommend getting comprehensive travel insurance before your trip.',
    category: 'Safety'
  },
  {
    question: 'What is the internet connectivity like?',
    answer: 'Internet connectivity varies. Main tourist areas like General Luna have decent WiFi in hotels and cafes, though speeds may be slower than you\'re used to. Mobile data coverage is available but can be spotty in remote areas. Consider it a digital detox opportunity!',
    category: 'General'
  },
  {
    question: 'How much should I budget per day?',
    answer: 'Budget travelers can get by on ₱1,500-2,500 per day (hostels, local food, limited activities). Mid-range travelers should budget ₱3,000-6,000 per day. Luxury travelers can expect ₱8,000+ per day. This includes accommodation, food, activities, and transportation.',
    category: 'General'
  },
  {
    question: 'Can I rent a motorcycle or scooter?',
    answer: 'Yes, motorcycle and scooter rentals are widely available in Siargao and other tourist areas. Rates typically range from ₱300-500 per day. An international driving permit is technically required, though enforcement varies. Always wear a helmet and drive carefully on island roads.',
    category: 'Travel'
  },
  {
    question: 'What water activities are available?',
    answer: 'Popular water activities include surfing, island hopping, snorkeling, diving, stand-up paddleboarding, kayaking, swimming in rock pools and lagoons, and boat tours to various islands and coves. Equipment rentals and guided tours are readily available.',
    category: 'Activities'
  },
  {
    question: 'Is the water safe to drink?',
    answer: 'It\'s recommended to drink bottled or filtered water. Most hotels and restaurants use filtered water for drinking and ice. Bottled water is inexpensive and widely available. Avoid drinking tap water to prevent stomach issues.',
    category: 'Safety'
  },
  {
    question: 'What languages are spoken?',
    answer: 'The main languages are Filipino (Tagalog) and Surigaonon (local dialect). English is widely spoken in tourist areas, hotels, and restaurants. Learning a few basic Filipino phrases will be appreciated by locals!',
    category: 'General'
  },
  {
    question: 'How far in advance should I book my trip?',
    answer: 'For peak season (March-May and September-November), book accommodations and flights 2-3 months in advance. For off-peak season, 2-4 weeks is usually sufficient. Popular resorts and surf camps can fill up quickly during peak surf season.',
    category: 'Booking'
  },
  {
    question: 'Are there vegetarian/vegan food options?',
    answer: 'Yes, though options may be limited compared to major cities. Many restaurants can accommodate vegetarian requests. Siargao has several cafes and restaurants offering vegetarian and vegan options. Fresh tropical fruits and vegetables are abundant.',
    category: 'General'
  }
]

const filteredFAQs = computed(() => {
  let filtered = faqs

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const toggleFAQ = (index: number) => {
  const idx = openFAQs.value.indexOf(index)
  if (idx > -1) {
    openFAQs.value.splice(idx, 1)
  } else {
    openFAQs.value.push(index)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}
</script>

<style scoped>
.max-h-0 {
  max-height: 0;
  overflow: hidden;
}

.max-h-96 {
  max-height: 24rem;
  overflow: hidden;
}
</style>
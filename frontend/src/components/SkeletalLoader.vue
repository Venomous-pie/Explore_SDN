<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  minDisplayTime?: number // Minimum time to show loader in ms
}>()

const isVisible = ref(true)
const startTime = Date.now()

onMounted(() => {
  // Ensure loader shows for at least the minimum display time
  const minTime = props.minDisplayTime || 500
  const elapsed = Date.now() - startTime
  const remaining = Math.max(0, minTime - elapsed)
  
  setTimeout(() => {
    isVisible.value = false
  }, remaining)
})
</script>

<template>
  <div v-if="isVisible" class="skeletal-loader fixed inset-0 z-9999 bg-white">
    <div class="flex flex-col items-center justify-center h-screen">
      <!-- Logo/Brand Area -->
      <div class="mb-8 animate-pulse">
        <div class="w-48 h-16 bg-gray-200 rounded-lg"></div>
      </div>

      <!-- Main Content Skeleton -->
      <div class="w-full max-w-6xl px-4 space-y-6">
        <!-- Navigation Bar Skeleton -->
        <div class="flex justify-between items-center mb-8">
          <div class="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div class="flex gap-4">
            <div class="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div class="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div class="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Hero Section Skeleton -->
        <div class="w-full h-96 bg-gray-200 rounded-xl animate-pulse mb-8"></div>

        <!-- Cards Grid Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="space-y-3">
            <div class="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div class="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Loading Text -->
      <div class="mt-12 text-center">
        <div class="flex items-center gap-2 text-gray-500">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
        <p class="mt-4 text-sm text-gray-600">Loading Explore SDN...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeletal-loader {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Staggered animation for bounce effect */
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

<template>
    <div class="space-y-8">
        <div class="flex justify-center">
            <div class="text-center space-y-4" data-aos="fade-up">
                <h2 class="text-5xl md:text-6xl font-serif">Experience Surigao del Norte</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    Discover breathtaking landscapes, pristine beaches, and unforgettable adventures across our
                    beautiful islands. Each destination tells its own unique story.
                </p>
            </div>
        </div>
        <div class="w-screen">
            <ImageGrid />
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageGrid from './ImageGrid.vue'
</script>
<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import Experience from '@/components/Experience.vue';
import Highlight from '@/components/Highlight.vue';
import Location from '@/components/Location.vue';
import SDN from '@/components/SDN.vue';
</script>

<template>
  <div class="h-full">
    <Carousel />
    <Highlight />
    <div class="flex justify-center p-16">
      <Experience />
    </div>
    <div class="flex px-16">
      <Location />
    </div>
    <div class="flex justify-center mt-16">
      <SDN />
    </div>
  </div>
</template>
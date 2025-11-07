<template>
    <nav
        class="bg-white flex items-center justify-between my-3 mx-4 rounded-full px-4 top-0 left-0 right-0 z-50 relative h-10">
        <!-- Backdrop overlay when search is expanded -->
        <Transition name="fade">
            <div v-if="expanded" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" @click="closeSearch"></div>
        </Transition>

        <div class="flex items-center gap-2 flex-shrink-0" :class="{ 'opacity-0': expanded }">
            <div class="i-mdi-bag-personal text-md"></div>
            <span class="text-md font-diner">Explore - SDN</span>
        </div>

        <ul class="flex items-center gap-4 list-none flex-shrink-0 text-sm font-serif"
            :class="{ 'opacity-0': expanded }">
            <li>Explore</li>
            <li>About</li>
            <li>Contact</li>
        </ul>

        <div class="flex items-center gap-2 flex-shrink-0 rounded-full border-none">
            <!-- Search trigger -->
            <div class="flex flex-row gap-2 items-center cursor-pointer relative z-50" @click="toggleSearch"
                :class="{ 'opacity-0': expanded }">
                <div class="i-mdi-magnify"></div>
                <span class="text-sm">Search</span>
            </div>

            <!-- Sign in button -->
            <div class="bg-black text-white rounded-full text-sm px-3 py-1 cursor-pointer"
                :class="{ 'opacity-0': expanded }">
                <span>Sign in</span>
            </div>

            <!-- Expanded search container -->
            <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
                <div v-if="expanded"
                    class="fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4 max-h-[calc(100vh-2rem)]">
                    <!-- Search input -->
                    <div class="w-full max-w-2xl">
                        <div class="flex gap-3 items-center bg-white rounded-full shadow-xl px-6 h-10">
                            <div class="i-mdi-magnify text-gray-500 text-sm flex-shrink-0"></div>
                            <input ref="searchInput" v-model="searchQuery" type="text" name="search"
                                placeholder="Find your peace..."
                                class="flex-1 border-none focus:outline-none text-sm w-full bg-transparent"
                                @keydown.esc="closeSearch">
                            <div v-if="isLoading" class="i-mdi-loading animate-spin text-gray-400 flex-shrink-0">
                            </div>
                            <div v-else-if="searchQuery" @click="clearSearch"
                                class="m-1 p-1 hover:bg-gray-100 rounded-full transition-colors flex flex-shrink-0">
                                <div class="i-mdi-close text-gray-500 text-xs"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Search results -->
                    <Transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
                        <div v-if="showResults" v-on-click-outside="closeSearch"
                            class="w-full max-w-4xl mt-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-y-auto">
                            <!-- Loading state -->
                            <div v-if="isLoading" class="p-8 text-center text-gray-500">
                                <div class="i-mdi-loading animate-spin text-3xl mx-auto mb-3"></div>
                                <p>Searching amazing places...</p>
                            </div>

                            <!-- Error state -->
                            <div v-else-if="error" class="p-8 text-center text-red-500">
                                <div class="i-mdi-alert-circle text-3xl mx-auto mb-3"></div>
                                <p>{{ error }}</p>
                            </div>

                            <!-- No results -->
                            <div v-else-if="results.length === 0 && debouncedQuery"
                                class="p-8 text-center text-gray-500">
                                <div class="i-mdi-map-search text-3xl mx-auto mb-3"></div>
                                <p>No places found matching "{{ debouncedQuery }}"</p>
                            </div>

                            <!-- Results grid -->
                            <div v-else-if="results.length > 0"
                                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                <div v-for="place in results" :key="place.id"
                                    class="group relative rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                    @click="navigateToPlace(place.id)">
                                    <!-- Image -->
                                    <div class="aspect-[4/3] overflow-hidden">
                                        <img :src="place.images[0]" :alt="place.name"
                                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                                    </div>
                                    <!-- Overlay content -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                                        <h3 class="text-lg font-semibold line-clamp-2 mb-1">{{ place.name }}</h3>
                                        <div class="flex items-center gap-2 text-sm">
                                            <div class="flex items-center gap-1">
                                                <div class="i-carbon-star-filled text-yellow-400"></div>
                                                <span>{{ place.rating }}</span>
                                            </div>
                                            <span class="text-white/70">({{ place.totalRatings }})</span>
                                            <div class="flex items-center gap-1 ml-auto">
                                                <div class="i-mdi-map-marker text-red-400"></div>
                                                <span>{{ place.municipality }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Initial state hint -->
                            <div v-else class="p-8 text-center text-gray-500">
                                <div class="i-mdi-compass text-3xl mx-auto mb-3"></div>
                                <p>Start typing to discover amazing places</p>
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import type { Place } from '@/services/api';
import { useDebounceFn } from '@vueuse/core';

const router = useRouter();
const dataStore = useDataStore();
const expanded = ref(false);
const searchQuery = ref('');
const debouncedQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const error = ref('');
const results = ref<Place[]>([]);

// Only show results panel when expanded and either loading, has results, or has query
const showResults = computed(() =>
    expanded.value && (isLoading.value || results.value.length > 0 || debouncedQuery.value)
);

// Debounced search function using centralized store
const debouncedSearch = useDebounceFn(async (query: string) => {
    if (!query.trim()) {
        results.value = [];
        error.value = '';
        return;
    }

    try {
        isLoading.value = true;
        error.value = '';
        debouncedQuery.value = query;
        // Use centralized store search
        results.value = dataStore.searchPlaces(query);
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to search places';
        results.value = [];
    } finally {
        isLoading.value = false;
    }
}, 300);

// Watch for search query changes
watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
});

const toggleSearch = () => {
    expanded.value = !expanded.value;
    if (expanded.value) {
        // Focus the input after transition
        nextTick(() => {
            searchInput.value?.focus();
        });
    }
};

const closeSearch = () => {
    expanded.value = false;
    searchQuery.value = '';
    debouncedQuery.value = '';
    results.value = [];
    error.value = '';
};

const clearSearch = () => {
    searchQuery.value = '';
    searchInput.value?.focus();
};

const navigateToPlace = (id: number) => {
    closeSearch();
    router.push(`/place/${id}`);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Hide scrollbar but keep functionality */
.overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.overflow-y-auto::-webkit-scrollbar {
    display: none;
}
</style>
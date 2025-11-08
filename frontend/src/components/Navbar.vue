<template>
    <nav
        class="bg-white flex items-center justify-between my-3 mx-4 rounded-full px-4 top-0 left-0 right-0 z-50 relative h-10 shadow-lg">
        <!-- Backdrop overlay when search is expanded -->
        <Transition name="fade">
            <div v-if="expanded" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" @click="closeSearch"></div>
        </Transition>

        <div class="flex items-center gap-2 flex-shrink-0" :class="{ 'opacity-0': expanded }">
            <!-- Hamburger Menu Button with Animation -->
            <div 
                ref="menuButton"
                @click="toggleMenu"
                class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <Transition 
                    mode="out-in"
                    enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="rotate-90 opacity-0"
                    enter-to-class="rotate-0 opacity-100"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="rotate-0 opacity-100"
                    leave-to-class="-rotate-90 opacity-0"
                >
                    <div 
                        v-if="!menuOpen" 
                        :key="'menu'"
                        class="i-mdi-menu text-md text-gray-900"
                    ></div>
                    <div 
                        v-else 
                        :key="'close'"
                        class="i-mdi-close text-md text-gray-900"
                    ></div>
                </Transition>
            </div>
            <router-link to="/" class="text-sm font-diner">Explore - SDN</router-link>
        </div>

        <!-- Dropdown Menu -->
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
            <div v-if="menuOpen" v-on-click-outside="handleClickOutsideMenu"
                class="absolute top-14 left-4 bg-white rounded-2xl shadow-2xl py-4 px-2 w-64 z-50">
                <nav class="flex flex-col">
                    <router-link to="/explore" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold text-gray-900 no-underline">
                        <div class="i-mdi-compass text-blue-600 text-lg"></div>
                        <span>Destinations</span>
                    </router-link>

                    <router-link to="/about" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold text-gray-900 no-underline">
                        <div class="i-mdi-account-group text-purple-600 text-lg"></div>
                        <span>Culture</span>
                    </router-link>

                    <router-link to="/faq" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold text-gray-900 no-underline">
                        <div class="i-mdi-map-marker-path text-green-600 text-lg"></div>
                        <span>Plan Trip</span>
                    </router-link>

                    <router-link to="/about" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold text-gray-900 no-underline">
                        <div class="i-mdi-post text-orange-600 text-lg"></div>
                        <span>Blog</span>
                    </router-link>

                    <router-link to="/contact" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold text-gray-900 no-underline">
                        <div class="i-mdi-email text-red-600 text-lg"></div>
                        <span>Contact</span>
                    </router-link>

                    <div class="border-t border-gray-200 my-2"></div>

                    <router-link to="/hotels" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 bg-black text-white hover:bg-gray-800 rounded-xl transition-colors text-xs font-bold no-underline">
                        <div class="i-mdi-calendar-check text-lg"></div>
                        <span>Book Now</span>
                    </router-link>
                </nav>
            </div>
        </Transition>

        <ul class="flex items-center gap-4 list-none flex-shrink-0 text-sm font-serif"
            :class="{ 'opacity-0': expanded }">
            <li>
                <router-link to="/explore" class="no-underline text-gray-900 hover:text-gray-600 transition-colors">
                    Explore
                </router-link>
            </li>
            <li>
                <router-link to="/about" class="no-underline text-gray-900 hover:text-gray-600 transition-colors">
                    About
                </router-link>
            </li>
            <li>
                <router-link to="/contact" class="no-underline text-gray-900 hover:text-gray-600 transition-colors">
                    Contact
                </router-link>
            </li>
        </ul>

        <div class="flex items-center gap-2 flex-shrink-0 rounded-full border-none">
            <!-- Search trigger -->
            <div class="flex flex-row gap-2 items-center cursor-pointer relative z-50" @click="toggleSearch"
                :class="{ 'opacity-0': expanded }">
                <div class="i-mdi-magnify"></div>
                <span class="text-sm">Search</span>
            </div>

            <!-- Sign in button / User Profile Dropdown -->
            <div v-if="!isAuthenticated" 
                @click="showAuthModal = true"
                class="bg-black text-white rounded-full text-sm px-3 py-1 cursor-pointer hover:bg-gray-800 transition-colors"
                :class="{ 'opacity-0': expanded }">
                <span>Sign in</span>
            </div>
            <div v-else class="relative" :class="{ 'opacity-0': expanded }">
                <!-- User Profile Button -->
                <div ref="userMenuButton" @click="toggleUserMenu"
                    class="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 rounded-full px-2 py-1 transition-all duration-300">
                    <!-- Avatar -->
                    <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <div class="i-mdi-account text-gray-600 text-sm"></div>
                    </div>
                    <!-- Name -->
                    <span class="text-xs font-medium text-gray-900">{{ currentUser?.name || 'User' }}</span>
                    <!-- Animated Chevron -->
                    <Transition 
                        mode="out-in"
                        enter-active-class="transition-all duration-200 ease-out"
                        enter-from-class="rotate-180 opacity-0"
                        enter-to-class="rotate-0 opacity-100"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="rotate-0 opacity-100"
                        leave-to-class="rotate-180 opacity-0">
                        <div 
                            v-if="!userMenuOpen" 
                            :key="'down'"
                            class="i-mdi-chevron-down text-sm text-gray-600"></div>
                        <div 
                            v-else 
                            :key="'up'"
                            class="i-mdi-chevron-up text-sm text-gray-600"></div>
                    </Transition>
                </div>
                
                <!-- User Dropdown Menu -->
                <Transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2">
                    <div v-if="userMenuOpen" v-on-click-outside="handleClickOutsideUserMenu"
                        class="absolute right-0 top-10 bg-white rounded-2xl shadow-2xl py-2 px-2 w-56 z-50">
                        <!-- User Info Section -->
                        <div class="px-3 py-2 border-b border-gray-200">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                    <div class="i-mdi-account text-gray-600 text-xl"></div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs font-semibold text-gray-900 truncate">{{ currentUser?.name || 'User' }}</p>
                                    <p class="text-xs text-gray-500 truncate">{{ currentUser?.email || 'user@example.com' }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Sign Out Button -->
                        <div @click="handleSignOut"
                            class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 outline outline-1 outline-gray-500 rounded-xl transition-colors text-xs font-semibold text-red-600 mt-1">
                            <div class="i-mdi-logout text-base"></div>
                            <span>Sign out</span>
                    </div>
                    </div>
                </Transition>
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

    <!-- Auth Modal -->
    <AuthModal v-model="showAuthModal" />
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import { useAuth } from '@/composables/useAuth';
import AuthModal from './AuthModal.vue';
import type { Place } from '@/services/api';
import { useDebounceFn } from '@vueuse/core';

const router = useRouter();
const dataStore = useDataStore();
const { isAuthenticated, currentUser } = useAuth();
const expanded = ref(false);
const menuOpen = ref(false);
const userMenuOpen = ref(false);
const menuButton = ref<HTMLElement | null>(null);
const userMenuButton = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const debouncedQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const error = ref('');
const results = ref<Place[]>([]);
const showAuthModal = ref(false);

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

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
    menuOpen.value = false;
};

const handleClickOutsideMenu = (event: Event) => {
    // Check if the click is on the toggle button
    if (menuButton.value && menuButton.value.contains(event.target as Node)) {
        return; // Don't close if clicking the button
    }
    closeMenu();
};

const toggleUserMenu = () => {
    userMenuOpen.value = !userMenuOpen.value;
};

const closeUserMenu = () => {
    userMenuOpen.value = false;
};

const handleClickOutsideUserMenu = (event: Event) => {
    // Check if the click is on the toggle button
    if (userMenuButton.value && userMenuButton.value.contains(event.target as Node)) {
        return; // Don't close if clicking the button
    }
    closeUserMenu();
};

const handleSignOut = () => {
    const { signOut } = useAuth();
    signOut();
    closeUserMenu();
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
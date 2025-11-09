<template> 
    <div class="relative w-full h-screen overflow-hidden">
        <!-- Background Image -->
        <div 
            class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
            style="background-image: url('https://thefroggyadventures.com/wp-content/uploads/2024/10/magpupungko-rock-pools-high-tide.jpg')"
        />
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60" />
        
        <!-- Decorative Circular Images -->
        <div class="absolute inset-0 pointer-events-none">
            <!-- Large circles -->
            <div class="absolute top-20 left-10 w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://www.sunchasingtravelers.com/wp-content/uploads/2020/09/alegria-beach-drone-view-1024x683.jpg" 
                     alt="Alegria Beach" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute bottom-32 left-20 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://www.sunchasingtravelers.com/wp-content/uploads/2020/08/sugba-lagoon-siargao-boat-house.jpg" 
                     alt="Sugba Lagoon" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute top-32 right-16 w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://thefroggyadventures.com/wp-content/uploads/2024/10/naked-island-siargao-view.jpg" 
                     alt="Naked Island" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute bottom-20 right-24 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://www.journeyera.com/wp-content/uploads/2017/12/alegria-beach-siargao-02192-1.jpg" 
                     alt="Beach View" class="w-full h-full object-cover" />
            </div>
            
            <!-- Medium circles -->
            <div class="absolute top-1/3 left-1/4 w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://thefroggyadventures.com/wp-content/uploads/2024/10/pacifico-beach-siargao.jpg" 
                     alt="Pacifico Beach" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute bottom-1/3 right-1/4 w-44 h-44 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://www.jonnymelon.com/wp-content/uploads/2018/10/sugba-lagoon-15-e1539744206986.jpg" 
                     alt="Lagoon" class="w-full h-full object-cover" />
            </div>
            
            <!-- Small circles -->
            <div class="absolute top-1/4 right-1/3 w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://thefroggyadventures.com/wp-content/uploads/2024/12/pasikon-beach-siargao-feature.jpg" 
                     alt="Pasikon Beach" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://www.projectlupad.com/wp-content/uploads/2019/06/Magnificent-Kawhagan-Island-in-Siargao-Aerial-View-Copyright-to-Project-LUPAD-8.jpg" 
                     alt="Kawhagan Island" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute top-2/3 right-12 w-28 h-28 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://thefroggyadventures.com/wp-content/uploads/2024/12/pasikon-beach-siargao-white-sand-cove.jpg" 
                     alt="White Sand Cove" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute top-1/2 left-12 w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://www.jonnymelon.com/wp-content/uploads/2018/11/pacifico-siargao-4.jpg" 
                     alt="Siargao View" class="w-full h-full object-cover" />
            </div>
        </div>
        
        <!-- Content -->
        <div class="relative z-10 flex flex-col gap-8 justify-center items-center h-full px-4">
            <span class="text-4xl sm:text-5xl md:text-6xl font-serif text-white drop-shadow-2xl text-center">Surigao del Norte</span>
            <span class="text-base sm:text-lg text-white drop-shadow-lg text-center">Where paradise meets adventure</span>
            
            <!-- Tab Switcher -->
            <div class="relative inline-flex bg-white rounded-full p-1 shadow-lg border border-gray-200">
                <div @click="activeTab = 'go'" :class="[
                    'relative cursor-pointer z-10 font-semibold py-2.5 px-8 rounded-full transition-all duration-300 text-sm',
                    activeTab === 'go'
                        ? 'text-white'
                        : 'text-black hover:text-gray-700'
                ]">
                    Let's Go
                </div>
                <div @click="activeTab = 'price'" :class="[
                    'relative cursor-pointer z-10 font-semibold py-2.5 px-8 rounded-full transition-all duration-300 text-sm',
                    activeTab === 'price'
                        ? 'text-white'
                        : 'text-black hover:text-gray-700'
                ]">
                    Price
                </div>
                <!-- Sliding background -->
                <div :class="[
                    'absolute top-1 bottom-1 bg-black rounded-full transition-all duration-300 ease-in-out shadow-lg',
                    activeTab === 'go' ? 'left-1 right-[50%]' : 'left-[50%] right-1'
                ]" />
            </div>
            
            <!-- Tab Content -->
            <Transition 
                mode="out-in"
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4"
            >
                <!-- Let's Go Content -->
                <div v-if="activeTab === 'go'" key="go" class="mt-4 max-w-2xl text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">Start Your Adventure</h3>
                    <p class="text-white/90 mb-6 text-sm sm:text-base drop-shadow-md px-4">
                        Discover pristine beaches, world-class surfing spots, enchanting lagoons, and breathtaking natural wonders across the beautiful islands of Surigao del Norte.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <router-link to="/explore">
                            <button class="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-xl text-sm sm:text-base">
                                Explore Destinations
                            </button>
                        </router-link>
                        <router-link to="/about">
                            <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors shadow-xl text-sm sm:text-base">
                                Learn More
                            </button>
                        </router-link>
                    </div>
                    
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-3 gap-4 mt-8 max-w-xl mx-auto">
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div class="text-2xl sm:text-3xl font-bold text-white">50+</div>
                            <div class="text-xs sm:text-sm text-white/80">Destinations</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div class="text-2xl sm:text-3xl font-bold text-white">15+</div>
                            <div class="text-xs sm:text-sm text-white/80">Islands</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div class="text-2xl sm:text-3xl font-bold text-white">24/7</div>
                            <div class="text-xs sm:text-sm text-white/80">Support</div>
                        </div>
                    </div>
                </div>
                
                <!-- Price Content -->
                <div v-else key="price" class="mt-4 max-w-2xl text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">Affordable Paradise</h3>
                    <p class="text-white/90 mb-6 text-sm sm:text-base drop-shadow-md px-4">
                        Experience the beauty of Surigao del Norte with our budget-friendly tour packages and accommodation options.
                    </p>
                    
                    <!-- Pricing Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-left">
                            <div class="text-yellow-400 text-sm font-semibold mb-2">BUDGET</div>
                            <div class="text-3xl font-bold text-white mb-1">₱2,500</div>
                            <div class="text-white/70 text-xs mb-4">per person/day</div>
                            <ul class="space-y-2 text-sm text-white/90">
                                <li class="flex items-center gap-2">
                                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    Basic accommodation
                                </li>
                                <li class="flex items-center gap-2">
                                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    Island hopping tours
                                </li>
                                <li class="flex items-center gap-2">
                                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    Local transportation
                                </li>
                            </ul>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400/50 text-left relative overflow-hidden">
                            <div class="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">POPULAR</div>
                            <div class="text-yellow-400 text-sm font-semibold mb-2">PREMIUM</div>
                            <div class="text-3xl font-bold text-white mb-1">₱5,000</div>
                            <div class="text-white/70 text-xs mb-4">per person/day</div>
                            <ul class="space-y-2 text-sm text-white/90">
                                <li class="flex items-center gap-2">
                                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    Luxury resorts
                                </li>
                                <li class="flex items-center gap-2">
                                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    Private tours
                                </li>
                                <li class="flex items-center gap-2">
                                    <div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    All-inclusive meals
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <router-link to="/hotels">
                        <button class="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-xl text-sm sm:text-base">
                            View All Packages
                        </button>
                    </router-link>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'go' | 'price'>('go')
</script>
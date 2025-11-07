<template> 
    <div class="relative w-full h-screen overflow-hidden">
        <!-- Background Image -->
        <div 
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
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
        <div class="relative z-10 flex flex-col gap-8 justify-center items-center h-full">
            <span class="text-6xl font-serif text-white drop-shadow-2xl">Surigao del Norte</span>
            <span class="text-lg text-white drop-shadow-lg">Where paradise meets adventure</span>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'go' | 'price'>('go')
</script>
<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-black text-white py-16 px-6 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/30">
          <span class="text-xs font-semibold tracking-wider">WE'RE HERE TO HELP</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Get In Touch</h1>
        <p class="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Have questions about Surigao del Norte? We're here to help plan your perfect island adventure.
        </p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <!-- Contact Form -->
        <div class="bg-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-gray-200 overflow-hidden">
          <h2 class="text-2xl font-bold text-black mb-1">Send Us a Message</h2>
          <p class="text-sm text-gray-600 mb-4">Fill out the form below and we'll get back to you soon</p>
          
          <form @submit.prevent="handleSubmit" class="space-y-4 w-full">
            <!-- Name -->
            <div>
              <label for="name" class="block text-xs font-bold text-black mb-1">
                Full Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-white box-border"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-xs font-bold text-black mb-1">
                Email Address *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-white box-border"
                placeholder="juan@example.com"
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-xs font-bold text-black mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-white box-border"
                placeholder="+63 912 345 6789"
              />
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-xs font-bold text-black mb-1">
                Subject *
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-white box-border"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="booking">Booking Assistance</option>
                <option value="destinations">Destination Information</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="feedback">Feedback & Suggestions</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-xs font-bold text-black mb-1">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="4"
                class="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all resize-none bg-white box-border"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-black text-white font-bold py-2.5 px-4 text-sm rounded-lg hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>

            <!-- Success Message -->
            <transition name="fade">
              <div v-if="submitSuccess" class="bg-black text-white px-4 py-2.5 rounded-lg border-2 border-black">
                <p class="font-bold text-sm">✓ Message sent successfully!</p>
                <p class="text-xs text-gray-300 mt-0.5">We'll get back to you as soon as possible.</p>
              </div>
            </transition>

            <!-- Error Message -->
            <transition name="fade">
              <div v-if="submitError" class="bg-white text-black px-4 py-2.5 rounded-lg border-2 border-black">
                <p class="font-bold text-sm">✗ Failed to send message</p>
                <p class="text-xs text-gray-700 mt-0.5">Please try again or contact us directly via email.</p>
              </div>
            </transition>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <!-- Contact Details -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
            <h2 class="text-2xl font-bold text-black mb-4">Contact Information</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-3 group">
                <div class="bg-black w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-black mb-1 text-sm">Email</h3>
                  <p class="text-gray-700 text-xs">info@exploresdn.com</p>
                  <p class="text-gray-700 text-xs">support@exploresdn.com</p>
                </div>
              </div>

              <div class="flex items-start gap-3 group">
                <div class="bg-black w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-black mb-1 text-sm">Phone</h3>
                  <p class="text-gray-700 text-xs">+63 912 345 6789</p>
                  <p class="text-gray-700 text-xs">+63 917 123 4567</p>
                </div>
              </div>

              <div class="flex items-start gap-3 group">
                <div class="bg-black w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-black mb-1 text-sm">Office</h3>
                  <p class="text-gray-700 text-xs">Surigao City, Surigao del Norte</p>
                  <p class="text-gray-700 text-xs">Philippines, 8400</p>
                </div>
              </div>

              <div class="flex items-start gap-3 group">
                <div class="bg-black w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-black mb-1 text-sm">Business Hours</h3>
                  <p class="text-gray-700 text-xs">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p class="text-gray-700 text-xs">Saturday: 10:00 AM - 4:00 PM</p>
                  <p class="text-gray-700 text-xs">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-black text-white rounded-2xl shadow-lg p-6 border-2 border-black">
            <h2 class="text-2xl font-bold mb-2">Follow Us</h2>
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
              Stay updated with the latest destinations, travel tips, and special offers
            </p>
            <div class="flex gap-3">
              <a
                href="#"
                class="bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                class="bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                class="bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                class="bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- FAQ Link -->
          <div class="bg-gray-900 text-white rounded-2xl shadow-lg p-6 border-2 border-black">
            <h3 class="text-xl font-bold mb-2">Need Quick Answers?</h3>
            <p class="mb-4 text-gray-300 text-sm leading-relaxed">Check out our frequently asked questions for instant help</p>
            <router-link
              to="/faq"
              class="inline-block bg-white text-black font-bold py-2 px-6 text-sm rounded-lg hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              Visit FAQ →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="bg-gray-50 py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <span class="text-xs font-bold text-black tracking-widest uppercase border-b-2 border-black pb-1 inline-block">Location</span>
          <h2 class="text-3xl font-bold text-black mt-3">Find Us</h2>
        </div>
        <div class="bg-white border-4 border-black rounded-2xl h-64 flex items-center justify-center shadow-lg">
          <div class="text-center text-gray-600">
            <svg class="w-12 h-12 mx-auto mb-3 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <p class="text-base font-bold text-black">Map integration coming soon</p>
            <p class="text-gray-600 text-sm mt-1">Surigao City, Surigao del Norte</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = false

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, replace with actual API call:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value)
    // })

    submitSuccess.value = true
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    submitError.value = true
    console.error('Failed to submit form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
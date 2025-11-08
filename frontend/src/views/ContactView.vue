<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Hero Section -->
    <div class="bg-black text-white py-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-6xl font-serif mb-6">Get In Touch</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Have questions about Surigao del Norte? We're here to help plan your perfect island adventure.
        </p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <h2 class="text-3xl font-serif text-gray-900 mb-6">Send Us a Message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="juan@example.com"
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="+63 912 345 6789"
              />
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
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
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-black text-white font-semibold py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div class="i-mdi-loading animate-spin"></div>
                Sending...
              </span>
            </button>

            <!-- Success Message -->
            <div v-if="submitSuccess" class="bg-green-100 border-2 border-green-500 text-green-800 px-4 py-3 rounded-xl">
              <p class="font-semibold">Message sent successfully!</p>
              <p class="text-sm">We'll get back to you as soon as possible.</p>
            </div>

            <!-- Error Message -->
            <div v-if="submitError" class="bg-red-100 border-2 border-red-500 text-red-800 px-4 py-3 rounded-xl">
              <p class="font-semibold">Failed to send message</p>
              <p class="text-sm">Please try again or contact us directly via email.</p>
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Details -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-serif text-gray-900 mb-6">Contact Information</h2>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <div class="i-mdi-email text-blue-600 text-xl"></div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Email</h3>
                  <p class="text-gray-700">info@surigaoescapes.com</p>
                  <p class="text-gray-700">support@surigaoescapes.com</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <div class="i-mdi-phone text-green-600 text-xl"></div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Phone</h3>
                  <p class="text-gray-700">+63 912 345 6789</p>
                  <p class="text-gray-700">+63 917 123 4567</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <div class="i-mdi-map-marker text-purple-600 text-xl"></div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Office</h3>
                  <p class="text-gray-700">Surigao City, Surigao del Norte</p>
                  <p class="text-gray-700">Philippines, 8400</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <div class="i-mdi-clock text-yellow-600 text-xl"></div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Business Hours</h3>
                  <p class="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p class="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
                  <p class="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-black text-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-serif mb-6">Follow Us</h2>
            <p class="text-gray-300 mb-6">
              Stay updated with the latest destinations, travel tips, and special offers
            </p>
            <div class="flex gap-4">
              <a
                href="#"
                class="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <div class="i-mdi-facebook text-2xl"></div>
              </a>
              <a
                href="#"
                class="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <div class="i-mdi-instagram text-2xl"></div>
              </a>
              <a
                href="#"
                class="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <div class="i-mdi-twitter text-2xl"></div>
              </a>
              <a
                href="#"
                class="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <div class="i-mdi-youtube text-2xl"></div>
              </a>
            </div>
          </div>

          <!-- FAQ Link -->
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold mb-3">Need Quick Answers?</h3>
            <p class="mb-6">Check out our frequently asked questions for instant help</p>
            <router-link
              to="/faq"
              class="inline-block bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Visit FAQ
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section (Placeholder) -->
    <div class="bg-white py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-serif text-gray-900 text-center mb-12">Find Us</h2>
        <div class="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
          <div class="text-center text-gray-600">
            <div class="i-mdi-map text-6xl mb-4"></div>
            <p class="text-lg">Map integration coming soon</p>
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
  } catch (error) {
    submitError.value = true
    console.error('Failed to submit form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

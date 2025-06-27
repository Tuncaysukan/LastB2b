<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button @click="$emit('close')" class="text-white hover:bg-blue-800 rounded p-2 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h2 class="text-xl font-bold text-white">{{ tour.name }}</h2>
            <p class="text-blue-100 text-sm">Tur Kodu: {{ tour.code }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">
            {{ tour.supply_type }}
          </span>
          <span class="px-3 py-1 bg-green-500 rounded-full text-white text-sm">
            Aktif
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Main Info Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Left Column - Tour Images -->
        <div class="lg:col-span-2">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Görsel Galerisi</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img :src="tour.main_image" :alt="tour.name" 
                     class="w-full h-full object-cover hover:scale-105 transition-transform">
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="(image, index) in tour.gallery" :key="index" 
                     class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img :src="image" :alt="`${tour.name} ${index + 1}`" 
                       class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer">
                </div>
              </div>
            </div>
          </div>

          <!-- Tour Program -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Tur Programı</h3>
            <div class="space-y-3">
              <div v-for="(day, index) in tour.program" :key="index" 
                   class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">{{ day.title }}</h4>
                    <p class="text-gray-600 text-sm mt-1">{{ day.description }}</p>
                    <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {{ day.location }}
                      </span>
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {{ day.time }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Details -->
        <div class="space-y-6">
          <!-- Quick Info -->
          <div class="bg-blue-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Tur Bilgileri</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Süre:</span>
                <span class="font-semibold">{{ tour.duration }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Kalkış:</span>
                <span class="font-semibold">{{ tour.departure }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Ulaşım:</span>
                <span class="font-semibold">{{ tour.transportation }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tedarikçi:</span>
                <span class="font-semibold">{{ tour.provider }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Kapasite:</span>
                <span class="font-semibold">{{ tour.capacity }} kişi</span>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <div class="bg-green-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Fiyat Bilgileri</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Çift Kişilik Oda:</span>
                <span class="font-bold text-green-600">{{ tour.pricing?.double }}₺</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Tek Kişilik Oda:</span>
                <span class="font-bold text-green-600">{{ tour.pricing?.single }}₺</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Çocuk (2-12 yaş):</span>
                <span class="font-bold text-green-600">{{ tour.pricing?.child }}₺</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Bebek (0-2 yaş):</span>
                <span class="font-bold text-green-600">{{ tour.pricing?.infant }}₺</span>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-yellow-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Dahil Olan Hizmetler</h3>
            <div class="space-y-2">
              <div v-for="feature in tour.included_services" :key="feature" 
                   class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Excluded Services -->
          <div class="bg-red-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Dahil Olmayan Hizmetler</h3>
            <div class="space-y-2">
              <div v-for="excluded in tour.excluded_services" :key="excluded" 
                   class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-gray-700">{{ excluded }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="border-t border-gray-200 pt-6">
        <div class="flex justify-between items-center">
          <div class="flex space-x-3">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Düzenle
            </button>
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
              </svg>
              Kopyala
            </button>
            <button class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Yazdır
            </button>
          </div>
          <div class="flex space-x-3">
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Sil
            </button>
            <button @click="$emit('close')" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tour: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
</script> 
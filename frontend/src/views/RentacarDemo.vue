<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Rentacar Demo Sayfası</h1>
        <p class="text-gray-600 mt-2">Rentacar wizard ve liste bileşenlerini test edin</p>
      </div>

      <!-- Navigation Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button 
            @click="activeTab = 'list'"
            :class="activeTab === 'list' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Araç Listesi
          </button>
          <button 
            @click="activeTab = 'grid'"
            :class="activeTab === 'grid' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Ürün Grid (Rentacar)
          </button>
          <button 
            @click="activeTab = 'wizard'"
            :class="activeTab === 'wizard' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Wizard Test
          </button>
        </nav>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-sm">
        <!-- Rentacar List Tab -->
        <div v-if="activeTab === 'list'" class="p-6">
          <RentacarList />
        </div>

        <!-- Products Grid Tab -->
        <div v-if="activeTab === 'grid'" class="p-6">
          <ProductsGrid category="rentacar" />
        </div>

        <!-- Wizard Test Tab -->
        <div v-if="activeTab === 'wizard'" class="p-6">
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Rentacar Wizard Test</h3>
            <button 
              @click="showWizard = true"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Yeni Araç Ekle
            </button>
            
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium text-gray-900 mb-2">Wizard Özellikleri</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>✅ 8 Adımlı Form Yapısı</li>
                  <li>✅ Genel Bilgiler</li>
                  <li>✅ Araç Detayları</li>
                  <li>✅ Fiyat Bilgileri</li>
                  <li>✅ Şube Bilgileri</li>
                  <li>✅ Ek Hizmetler</li>
                  <li>✅ Sigorta Bilgileri</li>
                  <li>✅ Resim Yönetimi</li>
                  <li>✅ Özel Şartlar</li>
                </ul>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium text-gray-900 mb-2">Liste Özellikleri</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>✅ Filtreleme Sistemi</li>
                  <li>✅ Sayfalama</li>
                  <li>✅ Durum Yönetimi</li>
                  <li>✅ CRUD İşlemleri</li>
                  <li>✅ Responsive Tasarım</li>
                  <li>✅ Arama Fonksiyonu</li>
                  <li>✅ Sıralama</li>
                  <li>✅ Toplu İşlemler</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wizard Component -->
      <RentacarWizard 
        :isOpen="showWizard"
        @close="showWizard = false"
        @save="handleSave"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RentacarList from '@/components/RentacarList.vue'
import RentacarWizard from '@/components/RentacarWizard.vue'
import ProductsGrid from '@/components/ProductsGrid.vue'

// Reactive data
const activeTab = ref('list')
const showWizard = ref(false)

// Methods
const handleSave = (data) => {
  console.log('Araç kaydedildi:', data)
  showWizard.value = false
  
  // Başarı mesajı göster
  alert('Araç başarıyla kaydedildi!')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>

<template>
  <div class="bg-white rounded-xl shadow-soft">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Otel Listesi</h2>
        <div class="flex items-center space-x-3">
          <!-- Search -->
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Ara..."
              class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          
          <!-- Filters -->
          <button class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
            </svg>
            Filtrele
          </button>
          
          <ActionButtons 
            category="hotel"
            @new-item="openWizard"
            @market="openMarket"
          />
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <!-- Status Filter -->
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Durum:</span>
          <select v-model="selectedStatus" class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
            <option value="">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>

        <!-- Provider Filter -->
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Sağlayıcı:</span>
          <select v-model="selectedProvider" class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
            <option value="">Tümü</option>
            <option value="serhat-ay">Serhat AY</option>
            <option value="booking">Booking.com</option>
            <option value="hotelbeds">HotelBeds</option>
          </select>
        </div>


      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Otel İsmi</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yetkili</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasyon</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tedarik</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat Yayınla</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">B2C Yayınla</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="hotel in filteredHotels" :key="hotel.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ hotel.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ hotel.contact }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ hotel.phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ hotel.location }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ hotel.supplier }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :checked="hotel.pricePublished"
                  @change="togglePricePublish(hotel.id)"
                  class="sr-only"
                />
                <div :class="hotel.pricePublished ? 'bg-yellow-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                  <div :class="hotel.pricePublished ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :checked="hotel.b2cPublished"
                  @change="toggleB2cPublish(hotel.id)"
                  class="sr-only"
                />
                <div :class="hotel.b2cPublished ? 'bg-blue-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                  <div :class="hotel.b2cPublished ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :checked="hotel.active"
                  @change="toggleStatus(hotel.id)"
                  class="sr-only"
                />
                <div :class="hotel.active ? 'bg-green-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                  <div :class="hotel.active ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex items-center justify-center space-x-2">
                <button class="p-1 text-gray-400 hover:text-brand-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
                <button class="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          <span class="font-medium">{{ startItem }}</span> - <span class="font-medium">{{ endItem }}</span> arası, 
          toplam <span class="font-medium">{{ totalItems }}</span> kayıt
        </div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="setCurrentPage(page)"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors"
            :class="page === currentPage ? 
              'z-10 bg-brand-500 border-brand-500 text-white' : 
              'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Hotel Wizard Modal -->
    <HotelWizard 
      :isOpen="wizardOpen"
      @close="closeWizard"
      @save="handleHotelSave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HotelWizard from '@/components/HotelWizard.vue'
import ActionButtons from '@/components/ActionButtons.vue'

// Reactive data
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedProvider = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const wizardOpen = ref(false)

// Sample data
const hotels = ref([
  {
    id: 1,
    name: 'Crystal Admiral',
    contact: 'Serhat AY',
    phone: '0532 485 42 94',
    location: 'Antalya',
    supplier: 'Paximum',
    pricePublished: true,
    b2cPublished: false,
    active: true
  },
  {
    id: 2,
    name: 'Haydarpaşa Palace',
    contact: 'Serhat AY',
    phone: '0264 264 64 64',
    location: 'Alanya',
    supplier: 'HotelBeds',
    pricePublished: false,
    b2cPublished: true,
    active: true
  },
  {
    id: 3,
    name: 'Kırman Sidera',
    contact: 'Serhat AY',
    phone: '0532 532 32 32',
    location: 'Bodrum',
    supplier: 'Kplus',
    pricePublished: true,
    b2cPublished: true,
    active: false
  },
  {
    id: 4,
    name: 'Limak Arkadia',
    contact: 'Serhat AY',
    phone: '0532 532 32 32',
    location: 'Marmaris',
    supplier: 'Cyprus Royal',
    pricePublished: false,
    b2cPublished: false,
    active: true
  }
])

// Computed properties
const filteredHotels = computed(() => {
  let filtered = hotels.value

  if (searchQuery.value) {
    filtered = filtered.filter(hotel => 
      hotel.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(hotel => 
      selectedStatus.value === 'active' ? hotel.active : !hotel.active
    )
  }

  if (selectedProvider.value) {
    filtered = filtered.filter(hotel => 
      hotel.contact.toLowerCase().includes(selectedProvider.value.toLowerCase())
    )
  }

  return filtered
})

const totalItems = computed(() => filteredHotels.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const setCurrentPage = (page) => {
  currentPage.value = page
}

const openWizard = () => {
  wizardOpen.value = true
}

const closeWizard = () => {
  wizardOpen.value = false
}

const handleHotelSave = (hotelData) => {
  // Add new hotel to the list
  const newHotel = {
    id: hotels.value.length + 1,
    name: hotelData.hotelName,
    contact: hotelData.contactName,
    phone: hotelData.phone,
    location: hotelData.city,
    supplier: 'Manuel Eklendi',
    pricePublished: hotelData.pricePublish,
    b2cPublished: hotelData.b2cPublish,
    active: hotelData.isActive
  }
  
  hotels.value.unshift(newHotel)
  console.log('Yeni otel eklendi:', newHotel)
}

const openMarket = () => {
  console.log('Market sayfası açılıyor...')
  // Market sayfasına yönlendirme veya modal açma
}

// Toggle methods for switches
const togglePricePublish = (hotelId) => {
  const hotel = hotels.value.find(h => h.id === hotelId)
  if (hotel) {
    hotel.pricePublished = !hotel.pricePublished
    console.log(`Hotel ${hotel.name} fiyat yayın durumu: ${hotel.pricePublished}`)
  }
}

const toggleB2cPublish = (hotelId) => {
  const hotel = hotels.value.find(h => h.id === hotelId)
  if (hotel) {
    hotel.b2cPublished = !hotel.b2cPublished
    console.log(`Hotel ${hotel.name} B2C yayın durumu: ${hotel.b2cPublished}`)
  }
}

const toggleStatus = (hotelId) => {
  const hotel = hotels.value.find(h => h.id === hotelId)
  if (hotel) {
    hotel.active = !hotel.active
    console.log(`Hotel ${hotel.name} aktif durumu: ${hotel.active}`)
  }
}
</script> 
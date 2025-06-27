<template>
  <div class="bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Tur Listesi</h2>
        <div class="flex items-center space-x-3">
          <!-- Search -->
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Ara..."
              class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            category="tour"
            @new-item="openWizard"
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
          <select v-model="selectedStatus" class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>

        <!-- Tedarik Filter -->
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Tedarik:</span>
          <select v-model="selectedTourType" class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Tümü</option>
            <option value="charter">Charter</option>
            <option value="xmı">Xmı</option>
          </select>
        </div>

        <!-- Provider Filter -->
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Sağlayıcı:</span>
          <select v-model="selectedProvider" class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Tümü</option>
            <option value="pc-tur">PC Tur</option>
            <option value="viya-travel">Viya Travel</option>
            <option value="öfte-travel">Öfte Travel</option>
            <option value="cyprus-travel">Cyprus Travel</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="w-8 px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sıl</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tur İsmi</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tedarik</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ulaşım</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hareket</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sağlayıcı</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat Yayınla</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">B2C Yayınla</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="tour in paginatedTours" :key="tour.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-3 py-3 whitespace-nowrap text-center">
              <input 
                type="checkbox" 
                :value="tour.id"
                v-model="selectedTours"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div>
                <a href="#" @click.prevent="showTourDetail(tour)" class="text-sm font-medium text-blue-600 hover:text-blue-800">{{ tour.name }}</a>
                <div class="text-xs text-gray-500 mt-1">{{ tour.dates }}</div>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <span class="text-sm text-gray-900">{{ tour.supplier_type }}</span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <span class="text-sm text-gray-900">{{ tour.transportation }}</span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <span class="text-sm text-gray-900">{{ tour.departure_location }}</span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <span class="text-sm text-gray-900">{{ tour.supplier }}</span>
              <div class="text-xs text-gray-500">{{ tour.nights }}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :checked="tour.pricePublished"
                  @change="togglePricePublish(tour.id)"
                  class="sr-only"
                />
                <div :class="tour.pricePublished ? 'bg-yellow-500' : 'bg-gray-300'" class="relative w-10 h-5 bg-gray-200 rounded-full transition-colors">
                  <div :class="tour.pricePublished ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :checked="tour.b2cPublished"
                  @change="toggleB2cPublish(tour.id)"
                  class="sr-only"
                />
                <div :class="tour.b2cPublished ? 'bg-blue-500' : 'bg-gray-300'" class="relative w-10 h-5 bg-gray-200 rounded-full transition-colors">
                  <div :class="tour.b2cPublished ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :checked="tour.active"
                  @change="toggleStatus(tour.id)"
                  class="sr-only"
                />
                <div :class="tour.active ? 'bg-green-500' : 'bg-gray-300'" class="relative w-10 h-5 bg-gray-200 rounded-full transition-colors">
                  <div :class="tour.active ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <div class="flex items-center justify-center space-x-1">
                <!-- Facebook Icon -->
                <button class="w-6 h-6 text-blue-600 hover:text-blue-800" title="Facebook">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <!-- Twitter Icon -->
                <button class="w-6 h-6 text-blue-400 hover:text-blue-600" title="Twitter">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <!-- Instagram Icon -->
                <button class="w-6 h-6 text-pink-600 hover:text-pink-800" title="Instagram">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
                <!-- YouTube Icon -->
                <button class="w-6 h-6 text-red-600 hover:text-red-800" title="YouTube">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </button>
                <!-- Excel Icon -->
                <button class="w-6 h-6 text-green-600 hover:text-green-800" title="Excel">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.17 3.25q.33 0 .59.25q.24.24.24.58v15.84q0 .34-.24.58q-.26.25-.59.25H7.83q-.33 0-.59-.25Q7 20.25 7 19.91V4.08q0-.33.24-.58q.26-.25.59-.25zM1 6h5v2H1V6m0 3h5v2H1V9m0 3h5v2H1v-2m0 3h5v2H1v-2Z"/>
                  </svg>
                </button>
                <!-- PDF Icon -->
                <button class="w-6 h-6 text-red-500 hover:text-red-700" title="PDF">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v1h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
                  </svg>
                </button>
                <!-- Calendar Icon -->
                <button class="w-6 h-6 text-gray-600 hover:text-gray-800" title="Takvim">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
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
              'z-10 bg-blue-500 border-blue-500 text-white' : 
              'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Tour Wizard Modal -->
    <TourWizard 
      :isOpen="wizardOpen"
      @close="closeWizard"
      @save="handleTourSave"
    />

    <!-- Tour Detail Modal -->
    <div v-if="detailOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div 
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          @click="closeTourDetail"
        ></div>

        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <TourDetail 
            v-if="selectedTour"
            :tour="selectedTour"
            @close="closeTourDetail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TourWizard from '@/components/TourWizard.vue'
import TourDetail from '@/components/TourDetail.vue'
import ActionButtons from '@/components/ActionButtons.vue'

// Reactive data
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedTourType = ref('')
const selectedProvider = ref('')
const selectedTours = ref([])
const wizardOpen = ref(false)
const detailOpen = ref(false)
const selectedTour = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample tour data
const tours = ref([
  {
    id: 1,
    name: 'Görkem Sakarya Sapanca & Maşukiye Turu',
    dates: '22 Haziran 2024 Pazar / 23 Haziran 2024 Pazartesi (Paketi)',
    supplier_type: 'Charter',
    transportation: 'Otobüs',
    departure_location: 'İstanbul',
    supplier: 'PC Tur',
    nights: 'Toplam 20 & Satılan 15',
    pricePublished: true,
    b2cPublished: true,
    active: true
  },
  {
    id: 2,
    name: 'Kastamonu Boyabat Safranbolu Batı Tur',
    dates: '18 Mayıs 2024 - 20 Mayıs 2024',
    supplier_type: 'Xmı',
    transportation: 'Uçak',
    departure_location: 'Ankara',
    supplier: 'Viya Travel',
    nights: 'Gece 30',
    pricePublished: false,
    b2cPublished: true,
    active: true
  },
  {
    id: 3,
    name: 'Başkenttin Mısır Tur',
    dates: '19 Mayıs 2024 - 21 Mayıs 2024',
    supplier_type: 'Xmı',
    transportation: 'Uçak',
    departure_location: 'Bursa',
    supplier: 'Öfte Travel',
    nights: 'Gece 30',
    pricePublished: true,
    b2cPublished: false,
    active: true
  },
  {
    id: 4,
    name: 'Phuket & Pattaya & Bangkok Tur',
    dates: '20 Mayıs 2024 - 25 Mayıs 2024',
    supplier_type: 'Charter',
    transportation: 'Uçak',
    departure_location: 'Eskişehir',
    supplier: 'Cyprus Travel',
    nights: 'Gece 30',
    pricePublished: true,
    b2cPublished: true,
    active: true
  },
  {
    id: 5,
    name: 'Görkemli Tropikal Ada Bali Tur',
    dates: '21 Mayıs 2024 - 28 Mayıs 2024',
    supplier_type: 'Charter',
    transportation: 'Uçak',
    departure_location: 'İstanbul',
    supplier: 'PC Tur',
    nights: 'Gece 30',
    pricePublished: true,
    b2cPublished: true,
    active: true
  },
  {
    id: 6,
    name: 'Selanik Kavala Thassos Tur',
    dates: '22 Mayıs 2024 - 24 Mayıs 2024',
    supplier_type: 'Charter',
    transportation: 'Uçak',
    departure_location: 'İstanbul',
    supplier: 'PC Tur',
    nights: 'Gece 30',
    pricePublished: false,
    b2cPublished: true,
    active: true
  },
  {
    id: 7,
    name: 'Yunanistan İncirleri Tur',
    dates: '23 Mayıs 2024 - 25 Mayıs 2024',
    supplier_type: 'Charter',
    transportation: 'Uçak',
    departure_location: 'İstanbul',
    supplier: 'PC Tur',
    nights: 'Gece 30',
    pricePublished: true,
    b2cPublished: false,
    active: true
  },
  {
    id: 8,
    name: 'Büyük İspanya, Endülüs Tur',
    dates: '24 Mayıs 2024 - 30 Mayıs 2024',
    supplier_type: 'Xmı',
    transportation: 'Otobüs',
    departure_location: 'Ankara',
    supplier: 'Öfte Travel',
    nights: 'Gece 30',
    pricePublished: true,
    b2cPublished: true,
    active: true
  },
  {
    id: 9,
    name: 'Mega Orta Avrupa Tur',
    dates: '25 Mayıs 2024 - 2 Haziran 2024',
    supplier_type: 'Xmı',
    transportation: 'Otobüs',
    departure_location: 'Ankara',
    supplier: 'Öfte Travel',
    nights: 'Gece 30',
    pricePublished: false,
    b2cPublished: true,
    active: true
  },
  {
    id: 10,
    name: 'Espresso İtalya Tur',
    dates: '26 Mayıs 2024 - 1 Haziran 2024',
    supplier_type: 'Xmı',
    transportation: 'Otobüs',
    departure_location: 'Ankara',
    supplier: 'Öfte Travel',
    nights: 'Gece 30',
    pricePublished: true,
    b2cPublished: true,
    active: true
  }
])

// Computed properties
const filteredTours = computed(() => {
  let filtered = tours.value

  if (searchQuery.value) {
    filtered = filtered.filter(tour => 
      tour.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tour.supplier.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tour.departure_location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(tour => 
      selectedStatus.value === 'active' ? tour.active : !tour.active
    )
  }

  if (selectedTourType.value) {
    filtered = filtered.filter(tour => 
      tour.supplier_type.toLowerCase() === selectedTourType.value.toLowerCase()
    )
  }

  if (selectedProvider.value) {
    filtered = filtered.filter(tour => 
      tour.supplier.toLowerCase().includes(selectedProvider.value.toLowerCase())
    )
  }

  return filtered
})

const paginatedTours = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTours.value.slice(start, end)
})

const totalItems = computed(() => filteredTours.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const openWizard = () => {
  wizardOpen.value = true
}

const closeWizard = () => {
  wizardOpen.value = false
}

const setCurrentPage = (page) => {
  currentPage.value = page
}

const togglePricePublish = (tourId) => {
  const tour = tours.value.find(t => t.id === tourId)
  if (tour) {
    tour.pricePublished = !tour.pricePublished
  }
}

const toggleB2cPublish = (tourId) => {
  const tour = tours.value.find(t => t.id === tourId)
  if (tour) {
    tour.b2cPublished = !tour.b2cPublished
  }
}

const toggleStatus = (tourId) => {
  const tour = tours.value.find(t => t.id === tourId)
  if (tour) {
    tour.active = !tour.active
  }
}

const handleTourSave = (tourData) => {
  console.log('Tur kaydedildi:', tourData)
  closeWizard()
}

const showTourDetail = (tour) => {
  selectedTour.value = {
    ...tour,
    code: `TR-${tour.id.toString().padStart(4, '0')}`,
    duration: '7 Gün 6 Gece',
    departure: tour.departure_location,
    provider: tour.supplier,
    capacity: 40,
    main_image: '/api/placeholder/600/400',
    gallery: [
      '/api/placeholder/200/200',
      '/api/placeholder/200/200',
      '/api/placeholder/200/200',
      '/api/placeholder/200/200'
    ],
    program: [
      {
        title: '1. Gün - Kalkış',
        description: 'Havalimanında buluşma ve uçuşla destinasyona hareket.',
        location: tour.departure_location,
        time: '08:00'
      },
      {
        title: '2. Gün - Şehir Turu',
        description: 'Önemli turistik yerlerin gezilmesi ve öğle yemeği.',
        location: 'Merkez',
        time: '09:00'
      },
      {
        title: '3. Gün - Müze Ziyareti',
        description: 'Tarihi müzelerin ziyaret edilmesi ve rehberli tur.',
        location: 'Müze Bölgesi',
        time: '10:00'
      }
    ],
    pricing: {
      double: 2850,
      single: 3200,
      child: 1950,
      infant: 450
    },
    included_services: [
      'Uçak bileti (gidiş-dönüş)',
      'Havalimanı transferleri',
      'Otel konaklaması',
      'Sabah kahvaltısı',
      'Rehber hizmeti',
      'Geziler ve entreler'
    ],
    excluded_services: [
      'Öğle ve akşam yemekleri',
      'İçecekler',
      'Kişisel harcamalar',
      'Bahşişler',
      'Ek aktiviteler',
      'Seyahat sigortası'
    ]
  }
  detailOpen.value = true
}

const closeTourDetail = () => {
  detailOpen.value = false
  selectedTour.value = null
}
</script>
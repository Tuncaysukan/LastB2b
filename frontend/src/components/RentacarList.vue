<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Araç Kiralama Listesi</h2>
        <p class="text-sm text-gray-600 mt-1">{{ filteredRentacars.length }} araç bulundu</p>
      </div>
      
      <div class="flex items-center space-x-3">
        <!-- Action Buttons -->
        <ActionButtons 
          category="rentacar"
          @new-item="openWizard"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-soft p-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Şube</label>
          <select v-model="filters.branch" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="">Tümü</option>
            <option value="Atatürk Havalimanı">Atatürk Havalimanı</option>
            <option value="Sabiha Gökçen">Sabiha Gökçen</option>
            <option value="Taksim">Taksim</option>
            <option value="Kadıköy">Kadıköy</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Şehir/Yer</label>
          <select v-model="filters.city" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="">Tümü</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Antalya">Antalya</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Araç Grubu</label>
          <select v-model="filters.group" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="">Tümü</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Kompakt">Kompakt</option>
            <option value="Orta">Orta</option>
            <option value="Büyük">Büyük</option>
            <option value="Lüks">Lüks</option>
            <option value="SUV">SUV</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Marka Model</label>
          <select v-model="filters.brandModel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="">Tümü</option>
            <option value="Toyota Corolla">Toyota Corolla</option>
            <option value="Volkswagen Golf">Volkswagen Golf</option>
            <option value="Ford Focus">Ford Focus</option>
            <option value="Renault Clio">Renault Clio</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Plaka</label>
          <input 
            v-model="filters.plate" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
            placeholder="34 ABC 123"
          >
        </div>
      </div>
      
      <div class="flex justify-end mt-4">
        <button 
          @click="clearFilters"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors mr-3"
        >
          Filtreleri Temizle
        </button>
        <button 
          @click="applyFilters"
          class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Ara
        </button>
      </div>
    </div>

    <!-- Rentacar Table -->
    <div class="bg-white rounded-lg shadow-soft overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şehir/Yer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şube</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Araç Grubu</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marka</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seri</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yıl</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kapasite</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yakıt</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vites</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renk</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat Tipi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aks</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="rentacar in paginatedRentacars" :key="rentacar.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.city }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.branch }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.group }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.brand }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.model }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.series }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.year }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.capacity }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.fuel }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.transmission }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.color }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.priceType }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rentacar.actions }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(rentacar.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStatusText(rentacar.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="editRentacar(rentacar)" class="text-indigo-600 hover:text-indigo-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click="deleteRentacar(rentacar)" class="text-red-600 hover:text-red-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                  <button @click="toggleRentacarStatus(rentacar)" :class="rentacar.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'">
                    <svg v-if="rentacar.status === 'active'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-700">Sayfa başına:</span>
        <select v-model="itemsPerPage" class="border border-gray-300 rounded px-2 py-1 text-sm">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      
      <div class="flex items-center space-x-2">
        <button 
          @click="setCurrentPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Önceki
        </button>
        
        <span class="text-sm text-gray-700">
          {{ currentPage }} / {{ totalPages }} ({{ filteredRentacars.length }} kayıt)
        </span>
        
        <button 
          @click="setCurrentPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Sonraki
        </button>
      </div>
    </div>

    <!-- Rentacar Wizard -->
    <RentacarWizard 
      :isOpen="showWizard"
      @close="closeWizard"
      @save="saveRentacar"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ActionButtons from '@/components/ActionButtons.vue'
import RentacarWizard from '@/components/RentacarWizard.vue'

// Reactive data
const showWizard = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(25)

// Filters
const filters = ref({
  branch: '',
  city: '',
  group: '',
  brandModel: '',
  plate: ''
})

// Sample data - Bu gerçek uygulamada API'den gelecek
const rentacars = ref([
  {
    id: 1,
    city: 'İstanbul',
    branch: 'Atatürk Havalimanı',
    group: 'Ekonomi',
    brand: 'Toyota',
    model: 'Corolla',
    series: '1.6',
    year: 2023,
    capacity: 5,
    fuel: 'Benzin',
    transmission: 'Manuel',
    color: 'Beyaz',
    priceType: 'Sabit',
    actions: 'Aktif',
    status: 'active'
  },
  {
    id: 2,
    city: 'İstanbul',
    branch: 'Sabiha Gökçen',
    group: 'Kompakt',
    brand: 'Volkswagen',
    model: 'Golf',
    series: '1.4 TSI',
    year: 2022,
    capacity: 5,
    fuel: 'Benzin',
    transmission: 'Otomatik',
    color: 'Gri',
    priceType: 'Değişken',
    actions: 'Aktif',
    status: 'active'
  },
  {
    id: 3,
    city: 'Ankara',
    branch: 'Esenboğa Havalimanı',
    group: 'Orta',
    brand: 'Ford',
    model: 'Focus',
    series: '1.5 EcoBoost',
    year: 2023,
    capacity: 5,
    fuel: 'Benzin',
    transmission: 'Otomatik',
    color: 'Mavi',
    priceType: 'Sezonluk',
    actions: 'Pasif',
    status: 'inactive'
  }
])

// Computed properties
const filteredRentacars = computed(() => {
  let filtered = rentacars.value

  if (filters.value.branch) {
    filtered = filtered.filter(r => r.branch.includes(filters.value.branch))
  }
  if (filters.value.city) {
    filtered = filtered.filter(r => r.city === filters.value.city)
  }
  if (filters.value.group) {
    filtered = filtered.filter(r => r.group === filters.value.group)
  }
  if (filters.value.brandModel) {
    filtered = filtered.filter(r => `${r.brand} ${r.model}` === filters.value.brandModel)
  }
  if (filters.value.plate) {
    filtered = filtered.filter(r => r.plate && r.plate.toLowerCase().includes(filters.value.plate.toLowerCase()))
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredRentacars.value.length / itemsPerPage.value)
})

const paginatedRentacars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRentacars.value.slice(start, end)
})

// Methods
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-red-100 text-red-800'
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'inactive':
      return 'Pasif'
    case 'maintenance':
      return 'Bakımda'
    default:
      return 'Bilinmiyor'
  }
}

const setCurrentPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const clearFilters = () => {
  filters.value = {
    branch: '',
    city: '',
    group: '',
    brandModel: '',
    plate: ''
  }
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const openWizard = () => {
  showWizard.value = true
}

const closeWizard = () => {
  showWizard.value = false
}

const saveRentacar = (rentacarData) => {
  // Yeni araç ekleme işlemi
  const newRentacar = {
    id: rentacars.value.length + 1,
    city: rentacarData.city,
    branch: rentacarData.branchName,
    group: rentacarData.group,
    brand: rentacarData.brand,
    model: rentacarData.model,
    series: rentacarData.engineSize,
    year: rentacarData.year,
    capacity: rentacarData.seats,
    fuel: rentacarData.fuelType,
    transmission: rentacarData.transmission,
    color: rentacarData.color,
    priceType: rentacarData.priceType,
    actions: rentacarData.status ? 'Aktif' : 'Pasif',
    status: rentacarData.status ? 'active' : 'inactive'
  }
  
  rentacars.value.push(newRentacar)
  console.log('Yeni araç eklendi:', newRentacar)
}

const editRentacar = (rentacar) => {
  console.log('Araç düzenleniyor:', rentacar)
  // Düzenleme işlemi için wizard'ı aç
  showWizard.value = true
}

const deleteRentacar = (rentacar) => {
  if (confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
    const index = rentacars.value.findIndex(r => r.id === rentacar.id)
    if (index > -1) {
      rentacars.value.splice(index, 1)
      console.log('Araç silindi:', rentacar)
    }
  }
}

const toggleRentacarStatus = (rentacar) => {
  rentacar.status = rentacar.status === 'active' ? 'inactive' : 'active'
  rentacar.actions = rentacar.status === 'active' ? 'Aktif' : 'Pasif'
  console.log('Araç durumu değiştirildi:', rentacar)
}
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>

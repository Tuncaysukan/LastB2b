<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">{{ getCategoryTitle() }} Ürünleri</h2>
        <p class="text-sm text-gray-600 mt-1">{{ filteredProducts.length }} ürün bulundu</p>
      </div>
      
      <div class="flex items-center space-x-3">
        <!-- View Toggle -->
        <div class="flex items-center bg-gray-100 rounded-lg p-1">
          <button 
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-white shadow-sm' : ''"
            class="p-2 rounded-md transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
          </button>
          <button 
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-white shadow-sm' : ''"
            class="p-2 rounded-md transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Sort -->
        <select v-model="sortBy" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
          <option value="name">İsme göre</option>
          <option value="price">Fiyata göre</option>
          <option value="rating">Puana göre</option>
          <option value="date">Tarihe göre</option>
        </select>

        <!-- Action Buttons -->
        <ActionButtons 
          :category="category"
          @new-item="openWizard"
          @market="openMarket"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-soft p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı</label>
          <div class="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="Min" 
              v-model="filters.minPrice"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <span class="text-gray-500">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              v-model="filters.maxPrice"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Konum</label>
          <select v-model="filters.location" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
            <option value="">Tüm Konumlar</option>
            <option value="antalya">Antalya</option>
            <option value="bodrum">Bodrum</option>
            <option value="marmaris">Marmaris</option>
            <option value="alanya">Alanya</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Durum</label>
          <select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
            <option value="">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
            <option value="draft">Taslak</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Arama</label>
          <div class="relative">
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              v-model="searchQuery"
              class="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in paginatedProducts" 
        :key="product.id"
        :product="product"
        @edit="editProduct"
        @delete="deleteProduct"
        @toggle-status="toggleProductStatus"
      />
    </div>

    <!-- Products List -->
    <div v-else class="bg-white rounded-lg shadow-soft overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="product.image" :alt="product.name" class="w-12 h-12 rounded-lg object-cover">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ product.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryBadgeClass(product.category)">
                  {{ getCategoryTitle(product.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPrice(product.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusBadgeClass(product.status)">
                  {{ getStatusText(product.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editProduct(product)" class="text-brand-600 hover:text-brand-900 mr-4">Düzenle</button>
                <button @click="deleteProduct(product)" class="text-red-600 hover:text-red-900">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between bg-white rounded-lg shadow-soft px-6 py-4">
      <div class="text-sm text-gray-700">
        <span class="font-medium">{{ startItem }}</span> - <span class="font-medium">{{ endItem }}</span> arası, 
        toplam <span class="font-medium">{{ totalItems }}</span> ürün
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
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ActionButtons from '@/components/ActionButtons.vue'

const props = defineProps({
  category: {
    type: String,
    default: 'hotel'
  }
})

// Reactive data
const viewMode = ref('grid')
const sortBy = ref('name')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(12)

const filters = ref({
  minPrice: '',
  maxPrice: '',
  location: '',
  status: ''
})

// Sample products data
const products = ref([
  {
    id: 1,
    name: 'Crystal Admiral Resort',
    category: 'hotel',
    location: 'Antalya',
    price: 2500,
    status: 'active',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
    description: '5 yıldızlı lüks otel'
  },
  {
    id: 2,
    name: 'Kapadokya Turu',
    category: 'tour',
    location: 'Kapadokya',
    price: 750,
    status: 'active',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73b15?w=300&h=200&fit=crop',
    description: '3 günlük Kapadokya turu'
  },
  {
    id: 3,
    name: 'İstanbul - Antalya',
    category: 'flight',
    location: 'Antalya',
    price: 450,
    status: 'active',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop',
    description: 'Pegasus Airlines'
  },
  {
    id: 4,
    name: 'VIP Transfer',
    category: 'transfer',
    location: 'Antalya',
    price: 120,
    status: 'active',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop',
    description: 'Lüks araç transferi'
  },
  {
    id: 5,
    name: 'Toyota Corolla',
    category: 'rentacar',
    location: 'İstanbul',
    price: 250,
    status: 'active',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop',
    description: 'Ekonomi sınıfı araç'
  },
  {
    id: 6,
    name: 'BMW 3 Series',
    category: 'rentacar',
    location: 'Ankara',
    price: 450,
    status: 'active',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop',
    description: 'Lüks sınıf araç'
  }
])

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value

  // Kategori filtresi - 'all' ise tüm ürünleri göster
  if (props.category && props.category !== 'all') {
    filtered = filtered.filter(product => product.category === props.category)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filters.value.location) {
    filtered = filtered.filter(product => 
      product.location.toLowerCase() === filters.value.location.toLowerCase()
    )
  }

  if (filters.value.status) {
    filtered = filtered.filter(product => product.status === filters.value.status)
  }

  if (filters.value.minPrice) {
    filtered = filtered.filter(product => product.price >= parseInt(filters.value.minPrice))
  }

  if (filters.value.maxPrice) {
    filtered = filtered.filter(product => product.price <= parseInt(filters.value.maxPrice))
  }

  // Sort
  if (sortBy.value === 'price') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  }

  return filtered
})

const totalItems = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

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
const getCategoryTitle = (category = props.category) => {
  const titles = {
    hotel: 'Otel',
    tour: 'Tur',
    flight: 'Uçak',
    transfer: 'Transfer',
    activity: 'Aktivite',
    rentacar: 'Rent A Car',
    dynamic: 'Dinamik Paket',
    tailormade: 'Tailormade',
    visa: 'Vize',
    health: 'Sağlık',
    bus: 'Otobüs',
    all: 'Tüm Ürünler'
  }
  return titles[category] || 'Ürün'
}

const getCategoryBadgeClass = (category) => {
  const classes = {
    hotel: 'bg-red-100 text-red-800',
    tour: 'bg-blue-100 text-blue-800',
    flight: 'bg-green-100 text-green-800',
    transfer: 'bg-purple-100 text-purple-800',
    activity: 'bg-yellow-100 text-yellow-800',
    rentacar: 'bg-orange-100 text-orange-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    draft: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    active: 'Aktif',
    inactive: 'Pasif',
    draft: 'Taslak'
  }
  return texts[status] || 'Bilinmiyor'
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}

const setCurrentPage = (page) => {
  currentPage.value = page
}

const editProduct = (product) => {
  console.log('Edit product:', product)
}

const deleteProduct = (product) => {
  console.log('Delete product:', product)
}

const toggleProductStatus = (product) => {
  console.log('Toggle status:', product)
}

const openWizard = () => {
  console.log('Wizard açılıyor kategori:', props.category)
  // Kategori bazında farklı wizard'lar açılacak
}

const openMarket = () => {
  console.log('Market sayfası açılıyor kategori:', props.category)
  // Market sayfasına yönlendirme
}
</script> 
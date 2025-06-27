<template>
  <div class="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <!-- Status Badge -->
      <div class="absolute top-3 left-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusBadgeClass(product.status)">
          {{ getStatusText(product.status) }}
        </span>
      </div>

      <!-- Category Badge -->
      <div class="absolute top-3 right-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryBadgeClass(product.category)">
          {{ getCategoryTitle(product.category) }}
        </span>
      </div>

      <!-- Actions Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          <button 
            @click="$emit('edit', product)"
            class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-brand-600 hover:text-brand-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button 
            @click="$emit('delete', product)"
            class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-red-600 hover:text-red-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title & Location -->
      <div class="mb-3">
        <h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{{ product.name }}</h3>
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {{ product.location }}
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>

      <!-- Rating -->
      <div class="flex items-center mb-4">
        <div class="flex items-center">
          <svg v-for="star in 5" :key="star" 
               :class="star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
               class="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <span class="ml-2 text-sm text-gray-600">{{ product.rating }}</span>
      </div>

      <!-- Price & Actions -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-2xl font-bold text-brand-600">{{ formatPrice(product.price) }}</span>
          <span class="text-sm text-gray-500 ml-1">/ gece</span>
        </div>
        
        <!-- Status Toggle -->
        <label class="inline-flex items-center">
          <input 
            type="checkbox" 
            :checked="product.status === 'active'"
            @change="$emit('toggle-status', product)"
            class="sr-only"
          />
          <div class="relative">
            <div :class="product.status === 'active' ? 'bg-brand-600' : 'bg-gray-200'" 
                 class="block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out">
            </div>
            <div :class="product.status === 'active' ? 'translate-x-6' : 'translate-x-0'" 
                 class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out">
            </div>
          </div>
        </label>
      </div>

      <!-- Quick Actions -->
      <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <button class="flex items-center text-sm text-gray-600 hover:text-brand-600 transition-colors">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          Görüntüle
        </button>
        
        <button class="flex items-center text-sm text-gray-600 hover:text-brand-600 transition-colors">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
          </svg>
          Paylaş
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'toggle-status'])

// Helper methods
const getCategoryTitle = (category) => {
  const titles = {
    hotel: 'Otel',
    tour: 'Tur',
    flight: 'Uçak',
    transfer: 'Transfer',
    activity: 'Aktivite',
    rentacar: 'Rent A Car'
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
    rentacar: 'bg-indigo-100 text-indigo-800'
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
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 
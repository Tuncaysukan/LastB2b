<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-4xl bg-white rounded-lg shadow-xl transform transition-all">
        
        <!-- Header -->
        <div class="bg-orange-500 text-white px-6 py-4 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="text-2xl">👥</div>
              <div>
                <h3 class="text-xl font-semibold">Özel Tur Oluştur</h3>
                <p class="text-orange-100 text-sm mt-1">Kişiye özel tasarlanmış turlar</p>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:bg-orange-600 rounded p-1 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Özel Tur Adı</label>
              <input type="text" v-model="privateTourData.name" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="VIP İstanbul Turu">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tur Kategorisi</label>
              <select v-model="privateTourData.category" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>VIP Tur</option>
                <option>Aile Turu</option>
                <option>Romantik Tur</option>
                <option>Business Tur</option>
                <option>Lüks Tur</option>
                <option>Macera Turu</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Katılımcı</label>
              <input type="number" v-model="privateTourData.minGuests" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="1">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Maksimum Katılımcı</label>
              <input type="number" v-model="privateTourData.maxGuests" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="8">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tur Süresi</label>
              <select v-model="privateTourData.duration" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Yarım Gün (4 saat)</option>
                <option>Tam Gün (8 saat)</option>
                <option>2 Gün</option>
                <option>3 Gün</option>
                <option>Özel Düzenleme</option>
              </select>
            </div>
          </div>

          <!-- Özelleştirme Seçenekleri -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-700 mb-3">🎯 Özelleştirme Seçenekleri</h4>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex items-center space-x-2 mb-3">
                  <div class="text-lg">🚗</div>
                  <h5 class="font-medium">Özel Araç</h5>
                  <input type="checkbox" v-model="privateTourData.features.privateVehicle" class="ml-auto">
                </div>
                <div v-if="privateTourData.features.privateVehicle">
                  <select v-model="privateTourData.vehicle.type" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Lüks Sedan</option>
                    <option>SUV</option>
                    <option>Minivan</option>
                    <option>Limuzin</option>
                  </select>
                </div>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="flex items-center space-x-2 mb-3">
                  <div class="text-lg">👨‍🏫</div>
                  <h5 class="font-medium">Özel Rehber</h5>
                  <input type="checkbox" v-model="privateTourData.features.privateGuide" class="ml-auto">
                </div>
                <div v-if="privateTourData.features.privateGuide">
                  <select v-model="privateTourData.guide.expertise" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Tarih Uzmanı</option>
                    <option>Sanat Uzmanı</option>
                    <option>Gastronomi Uzmanı</option>
                    <option>Fotoğraf Uzmanı</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-yellow-50 p-4 rounded-lg">
                <div class="flex items-center space-x-2 mb-3">
                  <div class="text-lg">🍽️</div>
                  <h5 class="font-medium">Özel Yemek</h5>
                  <input type="checkbox" v-model="privateTourData.features.privateDining" class="ml-auto">
                </div>
                <div v-if="privateTourData.features.privateDining">
                  <select v-model="privateTourData.dining.type" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Michelin Restoran</option>
                    <option>Yerel Lezzetler</option>
                    <option>Vegan/Vejetaryen</option>
                    <option>Özel Diyet</option>
                  </select>
                </div>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg">
                <div class="flex items-center space-x-2 mb-3">
                  <div class="text-lg">🎭</div>
                  <h5 class="font-medium">Özel Aktivite</h5>
                  <input type="checkbox" v-model="privateTourData.features.specialActivity" class="ml-auto">
                </div>
                <div v-if="privateTourData.features.specialActivity">
                  <select v-model="privateTourData.activity.type" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Müze Özel Turu</option>
                    <option>Atölye Ziyareti</option>
                    <option>Özel Gösteri</option>
                    <option>Kişiye Özel Aktivite</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Rotalar -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-700 mb-3">🗺️ Özel Rota</h4>
            <div class="space-y-3">
              <div v-for="(stop, index) in privateTourData.customRoute" :key="index" class="bg-gray-50 p-3 rounded flex items-center space-x-3">
                <span class="w-6 h-6 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center">{{ index + 1 }}</span>
                <input type="text" v-model="stop.location" class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Lokasyon">
                <input type="time" v-model="stop.time" class="border border-gray-300 rounded px-2 py-2 text-sm">
                <input type="number" v-model="stop.duration" placeholder="60" class="w-20 border border-gray-300 rounded px-2 py-2 text-sm">
                <span class="text-xs text-gray-500">dk</span>
                <button @click="removeStop(index)" class="text-red-500 hover:text-red-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <button @click="addStop" class="text-orange-500 hover:text-orange-700 text-sm flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Durak Ekle</span>
              </button>
            </div>
          </div>

          <!-- Özel İstekler -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">💡 Özel İstekler ve Notlar</label>
            <textarea v-model="privateTourData.specialRequests" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Müşterinin özel istekleri, alerjiler, tercihler vb..."></textarea>
          </div>

          <!-- Fiyatlandırma -->
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 class="font-semibold text-gray-700 mb-3">💰 Özel Tur Fiyatlandırması</h4>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Temel Fiyat</label>
                <input type="number" v-model="privateTourData.pricing.basePrice" class="w-full border border-gray-300 rounded px-3 py-2" placeholder="2500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Kişi Başı Ek</label>
                <input type="number" v-model="privateTourData.pricing.perPersonExtra" class="w-full border border-gray-300 rounded px-3 py-2" placeholder="300">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Para Birimi</label>
                <select v-model="privateTourData.pricing.currency" class="w-full border border-gray-300 rounded px-3 py-2">
                  <option>TRY</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
            <div class="mt-3 text-sm text-gray-600">
              <p>* Temel fiyat ilk 2 kişi için geçerlidir. Ek kişiler için kişi başı ücret uygulanır.</p>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button @click="closeWizard" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              İptal
            </button>
            <button @click="saveWizard" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Özel Tur Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'save'])

// Private Tour Data
const privateTourData = ref({
  name: '',
  category: 'VIP Tur',
  minGuests: 1,
  maxGuests: 8,
  duration: 'Tam Gün (8 saat)',
  features: {
    privateVehicle: true,
    privateGuide: true,
    privateDining: false,
    specialActivity: false
  },
  vehicle: {
    type: 'Lüks Sedan'
  },
  guide: {
    expertise: 'Tarih Uzmanı'
  },
  dining: {
    type: 'Michelin Restoran'
  },
  activity: {
    type: 'Müze Özel Turu'
  },
  customRoute: [
    { location: '', time: '09:00', duration: 60 }
  ],
  specialRequests: '',
  pricing: {
    basePrice: 0,
    perPersonExtra: 0,
    currency: 'TRY'
  }
})

// Methods
const closeWizard = () => {
  // Reset form
  privateTourData.value = {
    name: '',
    category: 'VIP Tur',
    minGuests: 1,
    maxGuests: 8,
    duration: 'Tam Gün (8 saat)',
    features: {
      privateVehicle: true,
      privateGuide: true,
      privateDining: false,
      specialActivity: false
    },
    vehicle: {
      type: 'Lüks Sedan'
    },
    guide: {
      expertise: 'Tarih Uzmanı'
    },
    dining: {
      type: 'Michelin Restoran'
    },
    activity: {
      type: 'Müze Özel Turu'
    },
    customRoute: [
      { location: '', time: '09:00', duration: 60 }
    ],
    specialRequests: '',
    pricing: {
      basePrice: 0,
      perPersonExtra: 0,
      currency: 'TRY'
    }
  }
  emit('close')
}

const saveWizard = () => {
  emit('save', privateTourData.value)
  closeWizard()
}

const addStop = () => {
  privateTourData.value.customRoute.push({ location: '', time: '10:00', duration: 60 })
}

const removeStop = (index) => {
  if (privateTourData.value.customRoute.length > 1) {
    privateTourData.value.customRoute.splice(index, 1)
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style> 
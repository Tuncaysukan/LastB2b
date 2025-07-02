<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-7xl bg-white rounded-lg shadow-xl transform transition-all">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="text-2xl">📦</div>
              <div>
                <h3 class="text-xl font-semibold">Seyahat Paketi Oluştur</h3>
                <p class="text-purple-100 text-sm mt-1">Kombine tatil paketleri</p>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:bg-purple-600 rounded p-1 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="bg-gray-50 px-6 py-3 border-b">
          <div class="flex space-x-1 overflow-x-auto">
            <button 
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="activeTab = tab.id"
              class="px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors"
              :class="activeTab === tab.id ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'">
              {{ tab.title }}
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 min-h-[600px]">
          
          <!-- Genel Bilgiler Tab -->
          <div v-if="activeTab === 'general'">
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                <span class="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                Genel Bilgiler
              </h4>
              
              <div class="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">İsim Soyisim 🌟</label>
                  <input type="text" v-model="packageData.clientName" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Müşteri Adı">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tur Servis</label>
                  <select v-model="packageData.tourService" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Günce</option>
                    <option>7Gün</option>
                    <option>14Gün</option>
                    <option>21Gün</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                  <select v-model="packageData.language" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Türkçe</option>
                    <option>English</option>
                    <option>Русский</option>
                    <option>العربية</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Sistem Servis</label>
                  <select v-model="packageData.systemService" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Standart</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tur Bilgileri</label>
                <div class="mb-4">
                  <label class="block text-xs text-gray-600 mb-1">1- Tur Programı</label>
                  <textarea v-model="packageData.tourProgram" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Tur programı detayları..."></textarea>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Diğer Notları</label>
                <textarea v-model="packageData.notes" rows="6" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Ek notlar ve açıklamalar..."></textarea>
              </div>
            </div>
          </div>

          <!-- Kategori Bilgileri Tab -->
          <div v-if="activeTab === 'category'">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                <span class="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                Kategori Bilgileri
              </h4>
              
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kategori Cinsin ⭐</label>
                  <select v-model="packageData.categoryType" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-4">
                    <option>Seyahat Paketi</option>
                    <option>Günü Birlik Tur</option>
                    <option>Tatil Paketi</option>
                    <option>Özel Tur</option>
                  </select>
                  
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dinlence ⭐</label>
                  <select v-model="packageData.restType" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option>Aktif Dinlence</option>
                    <option>Sakin Dinlence</option>
                    <option>Karma Dinlence</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Seyahat</label>
                  <div class="space-y-3">
                    <label class="flex items-center space-x-2">
                      <input type="radio" v-model="packageData.travelType" value="domestic" class="text-purple-500">
                      <span>🟢 Yurtiçi</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" v-model="packageData.travelType" value="international" class="text-purple-500">
                      <span>🔴 Yurtdışı</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Yer Bilgileri Tab -->
          <div v-if="activeTab === 'location'">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-700 mb-4">Yer Bilgileri</h4>
              
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                  <input type="text" v-model="packageData.city" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="İstanbul">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
                  <input type="text" v-model="packageData.country" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Türkiye">
                </div>
              </div>
            </div>
          </div>

          <!-- Özet Alanları Tab -->
          <div v-if="activeTab === 'summary'">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-700 mb-4">Özet Alanları</h4>
              
              <div class="grid grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kısa-1</label>
                  <input type="text" v-model="packageData.summary1" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kısa-2</label>
                  <input type="text" v-model="packageData.summary2" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kısa-3</label>
                  <input type="text" v-model="packageData.summary3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Özet Sonuç</label>
                  <input type="text" v-model="packageData.summaryResult" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="6,5">
                </div>
              </div>
            </div>
          </div>

          <!-- Kişi Alanları Tab -->
          <div v-if="activeTab === 'people'">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-700 mb-4">Kişi Alanları</h4>
              
              <div class="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Büyük</label>
                  <input type="number" v-model="packageData.adultCount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Yaşlı</label>
                  <input type="number" v-model="packageData.elderlyCount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Çocuk</label>
                  <input type="number" v-model="packageData.childCount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bebek</label>
                  <input type="number" v-model="packageData.babyCount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                </div>
              </div>
            </div>
          </div>

          <!-- Harita Tab -->
          <div v-if="activeTab === 'map'">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-semibold text-gray-700">Harita</h4>
                <div class="flex space-x-2">
                  <button @click="addRoute" class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                    Rota Ekle
                  </button>
                  <button @click="clearMap" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Haritayı Sıl
                  </button>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-6">
                <!-- Harita Alanı -->
                <div class="bg-blue-100 h-80 rounded-lg flex items-center justify-center">
                  <div class="text-center text-gray-600">
                    <div class="text-4xl mb-2">🗺️</div>
                    <p>Harita Görünümü</p>
                    <p class="text-sm">Rotalar ve konumlar burada gösterilecek</p>
                  </div>
                </div>
                
                <!-- Rota Listesi -->
                <div>
                  <h5 class="font-medium text-gray-700 mb-3">Rota Bilgileri</h5>
                  <div class="space-y-2">
                    <div v-for="(route, index) in packageData.routes" :key="index" class="flex items-center justify-between bg-white p-2 rounded border">
                      <div class="flex items-center space-x-2">
                        <span class="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">{{ index + 1 }}</span>
                        <span class="text-sm">{{ route.name }}</span>
                      </div>
                      <button @click="removeRoute(index)" class="text-red-500 hover:text-red-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <button @click="addRoute" class="w-full bg-gray-200 text-gray-600 py-2 rounded hover:bg-gray-300 text-sm">
                      + Yeni Rota Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg border-t flex justify-between">
          <button 
            v-if="!isFirstTab"
            @click="previousStep()" 
            class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            🡸 Geri
          </button>
          <div v-else></div>
          
          <div class="flex space-x-3">
            <button 
              v-if="!isLastTab"
              @click="nextStep()" 
              class="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Kaydet ve İlerle 🡺
            </button>
            <button 
              v-else
              @click="saveWizard()" 
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              ✓ Seyahat Paketi Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const activeTab = ref('general')

const tabs = ref([
  { id: 'general', title: 'Genel Bilgiler' },
  { id: 'category', title: 'Kategori Bilgileri' },
  { id: 'location', title: 'Yer Bilgileri' },
  { id: 'summary', title: 'Özet Alanları' },
  { id: 'people', title: 'Kişi Alanları' },
  { id: 'map', title: 'Harita' }
])

const packageData = ref({
  clientName: '',
  tourService: 'Günce',
  language: 'Türkçe',
  systemService: 'Standart',
  tourProgram: '',
  notes: '',
  categoryType: 'Seyahat Paketi',
  restType: 'Aktif Dinlence',
  travelType: 'domestic',
  city: '',
  country: '',
  summary1: '',
  summary2: '',
  summary3: '',
  summaryResult: '',
  adultCount: 0,
  elderlyCount: 0,
  childCount: 0,
  babyCount: 0,
  routes: [
    { name: 'İstanbul Sabiha Gökçen Havalimanı' },
    { name: 'Sultanahmet Camii' },
    { name: 'Kapadokya Göreme Milli Parkı' }
  ]
})

const currentTabIndex = computed(() => {
  return tabs.value.findIndex(tab => tab.id === activeTab.value)
})

const isFirstTab = computed(() => {
  return currentTabIndex.value === 0
})

const isLastTab = computed(() => {
  return currentTabIndex.value === tabs.value.length - 1
})

const nextStep = () => {
  if (!isLastTab.value) {
    const nextIndex = currentTabIndex.value + 1
    activeTab.value = tabs.value[nextIndex].id
  }
}

const previousStep = () => {
  if (!isFirstTab.value) {
    const prevIndex = currentTabIndex.value - 1
    activeTab.value = tabs.value[prevIndex].id
  }
}

const closeWizard = () => {
  activeTab.value = 'general'
  emit('close')
}

const saveWizard = () => {
  emit('save', packageData.value)
  closeWizard()
}

const addRoute = () => {
  const routeName = prompt('Rota adını girin:')
  if (routeName) {
    packageData.value.routes.push({ name: routeName })
  }
}

const removeRoute = (index) => {
  packageData.value.routes.splice(index, 1)
}

const clearMap = () => {
  if (confirm('Haritayı temizlemek istediğinizden emin misiniz?')) {
    packageData.value.routes = []
  }
}
</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}
</style>

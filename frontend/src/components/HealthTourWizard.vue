<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-6xl bg-white rounded-lg shadow-xl transform transition-all">
        
        <!-- Simple Header -->
        <div class="bg-red-500 text-white px-6 py-4 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="text-2xl">⚕️</div>
              <div>
                <h3 class="text-xl font-semibold">Sağlık Paketi Oluştur</h3>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:bg-red-600 rounded p-1 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Simple Tab Navigation -->
        <div class="bg-gray-50 px-6 py-3 border-b">
          <div class="flex space-x-1 overflow-x-auto">
            <button 
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="activeTab = tab.id"
              class="px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors"
              :class="activeTab === tab.id ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'">
              {{ tab.title }}
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 min-h-[500px]">
          
          <!-- Genel Bilgiler Tab -->
          <div v-if="activeTab === 'general'">
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Paket Adı</label>
                <input type="text" v-model="healthData.packageName" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="VIP Saç Ekimi Paketi">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tedavi Türü</label>
                <select v-model="healthData.treatmentType" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>Saç Ekimi</option>
                  <option>Diş Tedavisi</option>
                  <option>Plastik Cerrahi</option>
                  <option>Göz Ameliyatı</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Süre (Gün)</label>
                <input type="number" v-model="healthData.duration" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="7">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                <input type="text" v-model="healthData.city" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="İstanbul">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Paket Fiyatı</label>
                <input type="number" v-model="healthData.price" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="2500">
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea v-model="healthData.description" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Paket açıklaması..."></textarea>
            </div>
          </div>

          <!-- Tur Programı Tab -->
          <div v-if="activeTab === 'tour-program'">
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-700">Günlük Program</h4>
                <button @click="addDay" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                  + Gün Ekle
                </button>
              </div>
              
              <div v-for="(day, index) in healthData.tourProgram" :key="index" class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between mb-3">
                  <h5 class="font-medium text-gray-700">{{ index + 1 }}. Gün</h5>
                  <button @click="removeDay(index)" class="text-red-500 hover:text-red-700" v-if="healthData.tourProgram.length > 1">
                    🗑️
                  </button>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tur Adı</label>
                    <input type="text" v-model="day.title" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="İstanbul Şehir Turu">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                    <select v-model="day.language" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option>Türkçe</option>
                      <option>İngilizce</option>
                      <option>Rusça</option>
                      <option>Arapça</option>
                    </select>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tur Başlığı</label>
                  <textarea v-model="day.description" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="1. Gün başlık..."></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                  <textarea v-model="day.content" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="1. Gün Ediçtor olacak..."></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Konaklama Tab -->
          <div v-if="activeTab === 'accommodation'">
            <div class="flex items-center space-x-3 mb-6">
              <input type="checkbox" v-model="healthData.includeAccommodation" class="w-5 h-5 text-red-600">
              <label class="text-lg font-medium text-gray-700">Konaklama Dahil</label>
            </div>

            <div v-if="healthData.includeAccommodation">
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Otel</label>
                  <input type="text" v-model="healthData.hotel" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Hilton Hotel">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Yıldız</label>
                  <select v-model="healthData.hotelStars" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gece Sayısı</label>
                  <input type="number" v-model="healthData.nights" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="6">
                </div>
              </div>
            </div>
          </div>

          <!-- Uçak Tab -->
          <div v-if="activeTab === 'flight'">
            <div class="flex items-center space-x-3 mb-6">
              <input type="checkbox" v-model="healthData.includeFlight" class="w-5 h-5 text-red-600">
              <label class="text-lg font-medium text-gray-700">Uçuş Dahil</label>
            </div>

            <div v-if="healthData.includeFlight">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Havayolu</label>
                  <select v-model="healthData.airline" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option>Turkish Airlines</option>
                    <option>Pegasus</option>
                    <option>SunExpress</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Sınıf</label>
                  <select v-model="healthData.flightClass" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option>Ekonomi</option>
                    <option>Business</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Transfer Tab -->
          <div v-if="activeTab === 'transfer'">
            <div class="flex items-center space-x-3 mb-6">
              <input type="checkbox" v-model="healthData.includeTransfer" class="w-5 h-5 text-red-600">
              <label class="text-lg font-medium text-gray-700">Transfer Dahil</label>
            </div>

            <div v-if="healthData.includeTransfer">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Araç Tipi</label>
                  <select v-model="healthData.transferType" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option>VIP Araç</option>
                    <option>Minibüs</option>
                    <option>Otobüs</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kapsam</label>
                  <select v-model="healthData.transferScope" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option>Havaalanı-Otel-Hastane</option>
                    <option>Sadece Havaalanı</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Ek Servis Tab -->
          <div v-if="activeTab === 'extra'">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <label class="flex items-center space-x-3">
                  <input type="checkbox" v-model="healthData.interpreter" class="w-5 h-5 text-red-600">
                  <span>Tercüman</span>
                </label>
                <label class="flex items-center space-x-3">
                  <input type="checkbox" v-model="healthData.companion" class="w-5 h-5 text-red-600">
                  <span>Refakatçi</span>
                </label>
                <label class="flex items-center space-x-3">
                  <input type="checkbox" v-model="healthData.visa" class="w-5 h-5 text-red-600">
                  <span>Vize İşlemleri</span>
                </label>
              </div>
              <div class="space-y-4">
                <label class="flex items-center space-x-3">
                  <input type="checkbox" v-model="healthData.insurance" class="w-5 h-5 text-red-600">
                  <span>Sağlık Sigortası</span>
                </label>
                <label class="flex items-center space-x-3">
                  <input type="checkbox" v-model="healthData.cityTour" class="w-5 h-5 text-red-600">
                  <span>Şehir Turu</span>
                </label>
                <label class="flex items-center space-x-3">
                  <input type="checkbox" v-model="healthData.medication" class="w-5 h-5 text-red-600">
                  <span>İlaç Desteği</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Sağlık Sigortası Tab -->
          <div v-if="activeTab === 'insurance'">
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sigorta Şirketi</label>
                <select v-model="healthData.insuranceCompany" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>Aksigorta</option>
                  <option>Allianz</option>
                  <option>Axa</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Teminat Tutarı</label>
                <input type="number" v-model="healthData.insuranceAmount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="50000">
              </div>
            </div>
          </div>

          <!-- Gerekli Belgeler Tab -->
          <div v-if="activeTab === 'documents'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gerekli Belgeler</label>
              <textarea v-model="healthData.requiredDocuments" rows="8" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="• Pasaport&#10;• Sağlık raporu&#10;• Kan tahlilleri&#10;• Alerji testleri"></textarea>
            </div>
          </div>

          <!-- Resim Tab -->
          <div v-if="activeTab === 'images'">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="mt-4">
                <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Resim Yükle
                </button>
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
              class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Kaydet ve İlerle 🡺
            </button>
            <button 
              v-else
              @click="saveWizard()" 
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              ✓ Sağlık Paketi Oluştur
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
  { id: 'tour-program', title: 'Tur Programı' },
  { id: 'accommodation', title: 'Konaklama' },
  { id: 'flight', title: 'Uçak' },
  { id: 'transfer', title: 'Transfer' },
  { id: 'extra', title: 'Ek Servis' },
  { id: 'insurance', title: 'Sağlık Sigortası' },
  { id: 'documents', title: 'Gerekli Belgeler' },
  { id: 'images', title: 'Resim' }
])

const healthData = ref({
  packageName: '',
  treatmentType: 'Saç Ekimi',
  duration: 7,
  city: 'İstanbul',
  price: 0,
  description: '',
  tourProgram: [
    {
      title: '',
      language: 'Türkçe',
      description: '',
      content: ''
    }
  ],
  includeAccommodation: true,
  hotel: '',
  hotelStars: '4',
  nights: 6,
  includeFlight: true,
  airline: 'Turkish Airlines',
  flightClass: 'Ekonomi',
  includeTransfer: true,
  transferType: 'VIP Araç',
  transferScope: 'Havaalanı-Otel-Hastane',
  interpreter: false,
  companion: false,
  visa: false,
  insurance: false,
  cityTour: false,
  medication: false,
  insuranceCompany: 'Aksigorta',
  insuranceAmount: 0,
  requiredDocuments: ''
})

// Computed properties for wizard navigation
const currentTabIndex = computed(() => {
  return tabs.value.findIndex(tab => tab.id === activeTab.value)
})

const isFirstTab = computed(() => {
  return currentTabIndex.value === 0
})

const isLastTab = computed(() => {
  return currentTabIndex.value === tabs.value.length - 1
})

// Navigation methods
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

// Tour Program methods
const addDay = () => {
  healthData.value.tourProgram.push({
    title: '',
    language: 'Türkçe',
    description: '',
    content: ''
  })
}

const removeDay = (index) => {
  if (healthData.value.tourProgram.length > 1) {
    healthData.value.tourProgram.splice(index, 1)
  }
}

const closeWizard = () => {
  activeTab.value = 'general'
  emit('close')
}

const saveWizard = () => {
  emit('save', healthData.value)
  closeWizard()
}
</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}
</style>
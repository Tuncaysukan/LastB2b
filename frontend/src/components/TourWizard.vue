<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-7xl bg-white rounded-lg shadow-xl transform transition-all">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="text-2xl">🚌</div>
              <div>
                <h3 class="text-xl font-semibold">Günübirlik Tur Oluştur</h3>
                <p class="text-blue-100 text-sm mt-1">Detaylı günübirlik tur paketi oluşturun</p>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:bg-blue-600 rounded p-1 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 bg-gray-50 px-6">
          <nav class="flex space-x-8">
            <button 
              v-for="(step, index) in steps" 
              :key="index"
              @click="currentStep = index"
              :class="[
                'py-3 px-1 text-sm font-medium border-b-2 transition-colors',
                currentStep === index 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ step }}
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div class="p-6 max-h-[600px] overflow-y-auto">
          
          <!-- Step 1: Genel Bilgiler -->
          <div v-if="currentStep === 0">
            <!-- Tur Bilgileri -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Tur Bilgileri</h4>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tur Adı</label>
                  <input type="text" v-model="formData.tourName" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Tur adını giriniz">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tur Süresi</label>
                  <div class="flex space-x-2">
                    <input type="number" v-model="formData.duration.days" class="w-1/2 border border-gray-300 rounded-lg px-3 py-2" placeholder="6">
                    <span class="self-center">Gece</span>
                    <input type="number" v-model="formData.duration.nights" class="w-1/2 border border-gray-300 rounded-lg px-3 py-2" placeholder="7">
                    <span class="self-center">Gün</span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                  <select v-model="formData.language" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Türkçe</option>
                    <option>İngilizce</option>
                    <option>Almanca</option>
                    <option>Rusça</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Kategori Bilgileri -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Kategori Bilgileri</h4>
              <div class="grid grid-cols-3 gap-4 items-end">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kategori Grubu</label>
                  <select v-model="formData.categoryGroup" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Yurtiçi Turlar</option>
                    <option>Yurtdışı Turlar</option>
                    <option>Günübirlik Turlar</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select v-model="formData.category" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Karadeniz Turları</option>
                    <option>Ege Turları</option>
                    <option>Akdeniz Turları</option>
                    <option>İç Anadolu Turları</option>
                  </select>
                </div>
                <div class="flex space-x-2">
                  <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    + Yeni Ekle
                  </button>
                  <button class="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    ✗
                  </button>
                </div>
              </div>
            </div>

            <!-- Seo Bilgileri -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Seo Bilgileri</h4>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input type="text" v-model="formData.seo.title" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input type="text" v-model="formData.seo.url" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <textarea v-model="formData.seo.keywords" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea v-model="formData.seo.description" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                </div>
              </div>
            </div>

            <!-- Kod Alanları -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Kod Alanları</h4>
              <div class="grid grid-cols-5 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-1</label>
                  <input type="text" v-model="formData.codes.code1" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-2</label>
                  <input type="text" v-model="formData.codes.code2" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-3</label>
                  <input type="text" v-model="formData.codes.code3" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-4</label>
                  <input type="text" v-model="formData.codes.code4" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Grup Kodu</label>
                  <input type="text" v-model="formData.codes.groupCode" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                </div>
              </div>
            </div>

            <!-- Harita -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Harita</h4>
              <div class="flex space-x-3 mb-4">
                <button @click="addRoute" class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  🎯 Rota Ekle
                </button>
                <button @click="removeRoute" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  ❌ Rota Sil
                </button>
              </div>
              <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <div class="text-4xl mb-2">🗺️</div>
                  <p>Harita Alanı</p>
                  <div class="mt-4">
                    <div class="text-sm">Sıra Listesi:</div>
                    <div class="mt-2" v-for="(route, index) in formData.routes" :key="index">
                      {{ index + 1 }}. {{ route.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Tur Programı -->
          <div v-if="currentStep === 1">
            <!-- Tur Programı Form -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                1. Tur Programı
                <span class="ml-2 bg-orange-500 text-white px-2 py-1 rounded text-sm">+ Yeni Ekle</span>
              </h4>
              
              <div class="bg-white p-4 rounded-lg">
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tur Programı Adı</label>
                    <input type="text" v-model="newProgram.name" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Türkiye, İngilizce, Rusça vb">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                    <select v-model="newProgram.language" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>Türkçe, İngilizce, Rusça vb</option>
                      <option>Türkçe</option>
                      <option>İngilizce</option>
                      <option>Rusça</option>
                    </select>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Üst Başlık</label>
                  <input type="text" v-model="newProgram.header" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Çık Gezdir olacak">
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <textarea v-model="newProgram.title" rows="6" class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                    <textarea v-model="newProgram.content" rows="6" class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 class="text-gray-800 font-medium mb-2 bg-gray-200 p-2 rounded">Fiyata Dahil Olan Hizmetler</h5>
                    <div class="space-y-2">
                      <div v-for="(service, index) in newProgram.includedServices" :key="index" class="flex items-center">
                        <span class="text-green-500 mr-2">✓</span>
                        <input type="text" v-model="newProgram.includedServices[index]" class="flex-1 border-0 bg-transparent" placeholder="Hizmet giriniz">
                      </div>
                      <button @click="addIncludedService" class="text-green-500 text-sm">+ Hizmet Ekle</button>
                    </div>
                  </div>
                  <div>
                    <h5 class="text-gray-800 font-medium mb-2 bg-gray-200 p-2 rounded">Fiyata Dahil Olmayan Hizmetler</h5>
                    <div class="space-y-2">
                      <div v-for="(service, index) in newProgram.excludedServices" :key="index" class="flex items-center">
                        <span class="text-red-500 mr-2">✗</span>
                        <input type="text" v-model="newProgram.excludedServices[index]" class="flex-1 border-0 bg-transparent" placeholder="Hizmet giriniz">
                      </div>
                      <button @click="addExcludedService" class="text-red-500 text-sm">+ Hizmet Ekle</button>
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <h5 class="text-gray-800 font-medium mb-2 bg-gray-200 p-2 rounded">Önemli Bilgiler</h5>
                  <textarea v-model="newProgram.importantInfo" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Tüm katılımcıların..."></textarea>
                </div>

                <div>
                  <h5 class="text-gray-800 font-medium mb-2 bg-gray-200 p-2 rounded">Vize ve Pasaport Bilgileri</h5>
                  <textarea v-model="newProgram.visaInfo" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Türk vatandaşları için vize gerekmez..."></textarea>
                </div>
              </div>
            </div>

            <!-- Ekstra Turlar Yönetimi -->
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Ekstra Turlar Yönetimi</h4>
              
              <div class="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Günler</label>
                  <div class="space-y-1">
                    <div v-for="day in 6" :key="day" class="text-sm">
                      {{ day }}. Gün
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ekstra Turlar</label>
                  <div class="space-y-1">
                    <div v-for="day in 6" :key="day">
                      <input type="text" class="w-full text-sm border border-gray-200 rounded px-2 py-1">
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Alış</label>
                  <div class="space-y-1">
                    <div v-for="day in 6" :key="day">
                      <input type="text" class="w-full text-sm border border-gray-200 rounded px-2 py-1">
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Satış</label>
                  <div class="space-y-1">
                    <div v-for="day in 6" :key="day">
                      <input type="text" class="w-full text-sm border border-gray-200 rounded px-2 py-1">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Kalkış Noktaları -->
          <div v-if="currentStep === 2">
            <div class="bg-gray-100 p-4 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Kalkış Noktaları</h4>
              <div class="space-y-4">
                <div v-for="point in formData.departurePoints" :key="point.id" class="bg-white p-3 rounded border">
                  <input type="text" v-model="point.name" class="w-full border-0 font-medium" placeholder="Kalkış noktası">
                  <input type="time" v-model="point.time" class="mt-2 border border-gray-300 rounded px-2 py-1">
                </div>
                <button @click="addDeparturePoint" class="text-blue-500">+ Kalkış Noktası Ekle</button>
              </div>
            </div>
          </div>

          <!-- Step 4: Ek Servis -->
          <div v-if="currentStep === 3">
            <div class="bg-gray-100 p-4 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Ekstra Hizmet Yönetimi</h4>
              <div class="grid grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ürün</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Vize, Sağlık Sigortası</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Zorunluluk</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>İsteğe Bağlı, Zorunlu</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">KDV</label>
                  <input type="number" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="%">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Acente Komisyonu</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Acente Komisyonu Dahil, Acente Komisyonu Dahil Değil</option>
                  </select>
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
              </div>
              <div class="mt-4 flex justify-end">
                <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  Kaydet / Yeni
                </button>
              </div>
            </div>
          </div>

          <!-- Step 5: Ekstra Turlar -->
          <div v-if="currentStep === 4">
            <div class="bg-gray-100 p-4 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">Ekstra Turlar</h4>
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border">
                  <input type="text" class="w-full border-0 font-medium mb-2" placeholder="Ekstra tur adı">
                  <textarea rows="3" class="w-full border border-gray-300 rounded px-3 py-2" placeholder="Açıklama"></textarea>
                  <div class="mt-2 grid grid-cols-2 gap-4">
                    <input type="number" class="border border-gray-300 rounded px-3 py-2" placeholder="Fiyat">
                    <select class="border border-gray-300 rounded px-3 py-2">
                      <option>Para Birimi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 6-10: Diğer adımlar basit placeholder -->
          <div v-if="currentStep >= 5">
            <div class="bg-gray-100 p-4 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">{{ steps[currentStep] }}</h4>
              <div class="text-center py-12 text-gray-500">
                <div class="text-4xl mb-4">🚧</div>
                <p>Bu bölüm geliştirme aşamasında...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-3 rounded-b-lg flex justify-between">
          <button @click="previousStep" :disabled="currentStep === 0" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
            🡸 Geri
          </button>
          <div class="space-x-3">
            <button @click="closeWizard" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              İptal
            </button>
            <button 
              v-if="currentStep < steps.length - 1"
              @click="nextStep" 
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Kaydet ve İlerle 🡺
            </button>
            <button 
              v-else
              @click="saveWizard" 
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              ✓ Günübirlik Tur Oluştur
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

// Steps
const steps = [
  'Genel Bilgiler',
  'Tur Programı', 
  'Kalkış Noktaları',
  'Ek Servis',
  'Ekstra Turlar',
  'Fiyat Grubu',
  'Tarih',
  'Fiyat',
  'İptal İade',
  'Resim'
]

const currentStep = ref(0)

// Form Data
const formData = ref({
  tourName: '',
  duration: {
    days: 6,
    nights: 7
  },
  language: 'Türkçe',
  categoryGroup: 'Günübirlik Turlar',
  category: 'Karadeniz Turları',
  seo: {
    title: '',
    url: '',
    keywords: '',
    description: ''
  },
  codes: {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    groupCode: ''
  },
  routes: [
    { name: 'Türkiye-İstanbul-Pendik' },
    { name: 'Türkiye-İstanbul-Kadıköy' },
    { name: 'Türkiye-Edirne-İpsala' },
    { name: 'Bulgaristan' },
    { name: 'İtalya-Lombardiya-...' },
    { name: 'Fransa-Alpes-...' },
    { name: 'Türkiye-İstanbul-...' }
  ],
  departurePoints: [
    { id: 1, name: '', time: '' }
  ]
})

// New Program Data
const newProgram = ref({
  name: '',
  language: 'Türkçe, İngilizce, Rusça vb',
  header: '',
  title: '',
  content: '',
  includedServices: [''],
  excludedServices: [''],
  importantInfo: '',
  visaInfo: ''
})

// Methods
const closeWizard = () => {
  currentStep.value = 0
  // Reset form data here if needed
  emit('close')
}

const saveWizard = () => {
  emit('save', formData.value)
  closeWizard()
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const addRoute = () => {
  formData.value.routes.push({ name: 'Yeni Rota' })
}

const removeRoute = () => {
  if (formData.value.routes.length > 1) {
    formData.value.routes.pop()
  }
}

const addDeparturePoint = () => {
  const newId = formData.value.departurePoints.length + 1
  formData.value.departurePoints.push({ id: newId, name: '', time: '' })
}

const addIncludedService = () => {
  newProgram.value.includedServices.push('')
}

const addExcludedService = () => {
  newProgram.value.excludedServices.push('')
}
</script>

<style scoped>
/* Custom styles if needed */
</style> 
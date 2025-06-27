<template>
  <div v-if="showDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">{{ flight?.flightCode }} - Uçuş Detayları</h2>
            <p class="text-green-100 mt-1">{{ flight?.route }}</p>
          </div>
          <div class="text-right">
            <div class="text-xl font-bold">{{ flight?.price }}</div>
            <div class="text-green-100">{{ flight?.date }}</div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[70vh]">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Flight Images -->
          <div class="lg:col-span-2">
            <div class="mb-6">
              <div class="relative">
                <img 
                  src="https://via.placeholder.com/800x400/10b981/ffffff?text=Boeing+737-800" 
                  alt="Uçak Resmi" 
                  class="w-full h-64 object-cover rounded-lg"
                >
                <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                  Ana Resim
                </div>
              </div>
              <div class="grid grid-cols-4 gap-2 mt-4">
                <img 
                  v-for="i in 4" 
                  :key="i"
                  :src="`https://via.placeholder.com/200x150/10b981/ffffff?text=Resim+${i}`" 
                  :alt="`Uçak Resmi ${i}`"
                  class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                >
              </div>
            </div>

            <!-- Flight Route -->
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Uçuş Güzergahı</h3>
              <div class="flex items-center justify-between">
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ flight?.airports?.split(' → ')[0] }}</div>
                  <div class="text-sm text-gray-600">{{ flight?.time?.split(' - ')[0] }}</div>
                  <div class="text-xs text-gray-500">Kalkış</div>
                </div>
                <div class="flex-1 mx-8">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t-2 border-green-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <div class="bg-white px-4">
                        <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    <div class="text-sm text-gray-600">{{ flight?.duration }}</div>
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ flight?.airports?.split(' → ')[1] }}</div>
                  <div class="text-sm text-gray-600">{{ flight?.time?.split(' - ')[1] }}</div>
                  <div class="text-xs text-gray-500">Varış</div>
                </div>
              </div>
            </div>

            <!-- Flight Information -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Uçuş Bilgileri</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">Genel Bilgiler</h4>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Havayolu: {{ flight?.airline }}</li>
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Uçak Tipi: Boeing 737-800</li>
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Kapasite: 189 Yolcu</li>
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Sınıf: Economy</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">Hizmet Bilgileri</h4>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Bagaj: 20kg</li>
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Yemek: İkram</li>
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>WiFi: Ücretsiz</li>
                    <li class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Eğlence: Kişisel Ekran</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Flight Details Panel -->
          <div class="lg:col-span-1">
            <div class="bg-green-50 p-4 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Uçuş Detayları</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Uçuş Kodu:</span>
                  <span class="font-medium">{{ flight?.flightCode }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tarih:</span>
                  <span class="font-medium">{{ flight?.date }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Süre:</span>
                  <span class="font-medium">{{ flight?.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Sağlayıcı:</span>
                  <span class="font-medium">{{ flight?.provider }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Durum:</span>
                  <span 
                    :class="[
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      flight?.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ flight?.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Pricing Information -->
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Fiyat Bilgileri</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Economy Sınıfı:</span>
                  <span class="font-medium">{{ flight?.price }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Business Sınıfı:</span>
                  <span class="font-medium">{{ flight?.price?.replace(/\d+/, (match) => parseInt(match) * 2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Çocuk (2-12 yaş):</span>
                  <span class="font-medium">{{ flight?.price?.replace(/\d+/, (match) => Math.round(parseInt(match) * 0.75)) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Bebek (0-2 yaş):</span>
                  <span class="font-medium">{{ flight?.price?.replace(/\d+/, (match) => Math.round(parseInt(match) * 0.1)) }}</span>
                </div>
              </div>
            </div>

            <!-- Services -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Dahil Hizmetler</h3>
              <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Havalimanı Transferi
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Bagaj Hakkı (20kg)
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Yemek İkramı
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  WiFi Hizmeti
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Sigorta
                </div>
              </div>

              <h4 class="text-lg font-semibold text-gray-900 mt-4 mb-2">Dahil Olmayan Hizmetler</h4>
              <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                  Ekstra Bagaj Ücreti
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                  Koltuk Seçimi
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                  Özel Yemek İsteği
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between">
        <button
          @click="closeDetail"
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          Kapat
        </button>
        <div class="flex space-x-3">
          <button
            @click="editFlight"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Düzenle
          </button>
          <button
            @click="copyFlight"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Kopyala
          </button>
          <button
            @click="printFlight"
            class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Yazdır
          </button>
          <button
            @click="deleteFlight"
            class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightDetail',
  props: {
    showDetail: {
      type: Boolean,
      default: false
    },
    flight: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeDetail() {
      this.$emit('close')
    },
    editFlight() {
      this.$emit('edit', this.flight)
    },
    copyFlight() {
      console.log('Uçuş kopyalanıyor:', this.flight?.flightCode)
    },
    printFlight() {
      window.print()
    },
    deleteFlight() {
      if (confirm(`${this.flight?.flightCode} kodlu uçuşu silmek istediğinizden emin misiniz?`)) {
        this.$emit('delete', this.flight)
        this.closeDetail()
      }
    }
  }
}
</script> 
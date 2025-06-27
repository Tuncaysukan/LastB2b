<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full bg-white rounded-lg shadow-xl transform transition-all" :class="selectedTourType ? 'max-w-6xl' : 'max-w-lg'">
        
        <!-- Header -->
        <div class="bg-red-500 text-white px-6 py-4 rounded-t-lg relative">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-semibold">Yeni Tur Ekle</h3>
              <p class="text-red-100 text-sm mt-1">Tur bilgilerini eksiksiz doldurun</p>
            </div>
            <button 
              @click="closeWizard"
              class="text-white hover:bg-red-600 rounded p-1 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div v-if="!selectedTourType" class="px-6 py-4">
          <!-- Tur Seçenekleri -->
          <div class="flex flex-wrap justify-center gap-3">
            <button 
              @click="selectTourType('gunubirlik-konaklamali')"
              class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Günübirlik / Konaklamalı
            </button>
            
            <button 
              @click="selectTourType('aktivite')"
              class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Aktivite
            </button>
            
            <button 
              @click="selectTourType('seyehat-paketi')"
              class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Seyehat Paketi
            </button>
            
            <button 
              @click="selectTourType('ozel-tur')"
              class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Özel Tur
            </button>
            
            <button 
              @click="selectTourType('saglik-paketleri')"
              class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Sağlık Paketleri
            </button>
          </div>
        </div>

        <!-- Wizard Formu -->
        <div v-else class="overflow-y-auto" style="max-height: calc(100vh - 200px);">
          <!-- Tab Navigation -->
          <div class="bg-gray-100 px-4 py-3 border-b">
            <div class="flex space-x-1 overflow-x-auto">
              <div 
                @click="activeTab = 'general'"
                class="px-4 py-2 rounded text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'general' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Genel Bilgiler
              </div>
              <div 
                @click="activeTab = 'program'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'program' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Tur Programı
              </div>
              <div 
                @click="activeTab = 'departure'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'departure' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Kalkış Noktaları
              </div>
              <div 
                @click="activeTab = 'service'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'service' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Ek Servis
              </div>
              <div 
                @click="activeTab = 'extraTours'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'extraTours' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Ekstra Turlar
              </div>
              <div 
                @click="activeTab = 'priceGroup'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'priceGroup' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Fiyat Grubu
              </div>
              <div 
                @click="activeTab = 'date'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'date' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Tarih
              </div>
              <div 
                @click="activeTab = 'pricing'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'pricing' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Fiyat
              </div>
              <div 
                @click="activeTab = 'cancellation'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'cancellation' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                İptal İade
              </div>
              <div 
                @click="activeTab = 'photos'"
                class="px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors"
                :class="activeTab === 'photos' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
              >
                Resim
              </div>
            </div>
          </div>

          <!-- Form Content -->
          <div class="p-6" style="background: linear-gradient(135deg, #fef7f7 0%, #fdf2f8 100%);">
            
            <!-- Genel Bilgiler Tab -->
            <div v-if="activeTab === 'general'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Genel Bilgiler</h3>
              
              <!-- Toggle Switches -->
              <div class="px-6 py-4 border-b bg-gray-50">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Durum</span>
                    <div class="relative">
                      <input type="checkbox" class="sr-only" v-model="formData.durum" />
                      <div 
                        @click="formData.durum = !formData.durum"
                        class="w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
                        :class="formData.durum ? 'bg-red-500' : 'bg-gray-300'"
                      >
                        <div 
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="formData.durum ? 'translate-x-5' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Yayınla</span>
                    <div class="relative">
                      <input type="checkbox" class="sr-only" v-model="formData.yayinla" />
                      <div 
                        @click="formData.yayinla = !formData.yayinla"
                        class="w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
                        :class="formData.yayinla ? 'bg-gray-400' : 'bg-gray-300'"
                      >
                        <div 
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="formData.yayinla ? 'translate-x-5' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">B2C Yayınla</span>
                    <div class="relative">
                      <input type="checkbox" class="sr-only" v-model="formData.b2cYayinla" />
                      <div 
                        @click="formData.b2cYayinla = !formData.b2cYayinla"
                        class="w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
                        :class="formData.b2cYayinla ? 'bg-green-500' : 'bg-gray-300'"
                      >
                        <div 
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="formData.b2cYayinla ? 'translate-x-5' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Fiyat Yayınla</span>
                    <div class="relative">
                      <input type="checkbox" class="sr-only" v-model="formData.fiyatYayinla" />
                      <div 
                        @click="formData.fiyatYayinla = !formData.fiyatYayinla"
                        class="w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
                        :class="formData.fiyatYayinla ? 'bg-gray-400' : 'bg-gray-300'"
                      >
                        <div 
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="formData.fiyatYayinla ? 'translate-x-5' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Önerilen Tur</span>
                    <div class="relative">
                      <input type="checkbox" class="sr-only" v-model="formData.onerilenTur" />
                      <div 
                        @click="formData.onerilenTur = !formData.onerilenTur"
                        class="w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
                        :class="formData.onerilenTur ? 'bg-purple-500' : 'bg-gray-300'"
                      >
                        <div 
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="formData.onerilenTur ? 'translate-x-5' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Yıldız Rating -->
              <div class="px-6 py-4 border-b">
                <label class="block text-sm font-medium text-gray-700 mb-3">Yıldız</label>
                <div class="flex items-center space-x-1">
                  <div 
                    v-for="star in 5" 
                    :key="star"
                    @click="setRating(star)"
                    class="cursor-pointer text-2xl transition-colors duration-200"
                    :class="star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'"
                  >
                    ★
                  </div>
                  <span class="ml-3 text-sm text-gray-600">({{ formData.rating }} yıldız)</span>
                </div>
              </div>

              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Sol Kolon -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Tur Getir <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input 
                        type="text" 
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Tur kodu"
                        v-model="formData.turKodu"
                      />
                      <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Sağlayıcı <span class="text-red-500">*</span>
                    </label>
                    <select 
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      v-model="formData.saglaYici"
                    >
                      <option value="">Tripadvisor</option>
                      <option value="booking">Booking.com</option>
                      <option value="expedia">Expedia</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ulaşım Tipi</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>Otobüs, Uçak, Gemi</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Hareket</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>İstanbul, Ankara, İzmir</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ülke Adı Yaş Alanı</label>
                    <input 
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <!-- Orta Kolon -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tip</label>
                    <div class="flex space-x-2">
                      <button 
                        @click="setTipType('resort')"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        :class="formData.tipType === 'resort' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                      >
                        🏖️
                      </button>
                      <button 
                        @click="setTipType('hotel')"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        :class="formData.tipType === 'hotel' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                      >
                        🏨
                      </button>
                      <button 
                        @click="setTipType('other')"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        :class="formData.tipType === 'other' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                      >
                        ⚫
                      </button>
                      <button 
                        @click="setTipType('moon')"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        :class="formData.tipType === 'moon' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                      >
                        🌙
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Vitrin Resmi</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
                      <div class="text-gray-400 mb-2">
                        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <button class="text-red-500 hover:text-red-600 font-medium text-sm">Dosya Seç</button>
                      <p class="text-xs text-gray-500 mt-1">Dosya seçilmedi</p>
                      <p class="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Konaklama</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>Otel kategorisi, İsimli Pansiyon vb</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Yaz Mevsim</label>
                    <input 
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <!-- Sağ Kolon -->
                <div class="space-y-4">
                  <div>
                    <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <span>Tarihler</span>
                      <span class="ml-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">!</span>
                    </label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>TRY</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <span>Para Birimi</span>
                      <span class="ml-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">?</span>
                    </label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>TRY</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Vize Dosyası</label>
                    <input 
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Market</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>Merkez, Anadolu, Veri</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Satış Kanalı</label>
                    <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>Acl Saha İnternet Merkezi Acenteleri</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tur Pasien 4</label>
                    <input 
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                </div>
                
                <!-- Gezi Notları -->
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gezi Notları</label>
                  <textarea 
                    rows="3"
                    class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="Gezi notları buraya yazılacak..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Tarih Tab -->
            <div v-if="activeTab === 'date'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Tarih</h3>
              
              <!-- Date Management Content -->
              <div class="p-6">
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Başlangıç Tarihi</label>
                    <input 
                      type="date" 
                      v-model="formData.startDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bitiş Tarihi</label>
                    <input 
                      type="date" 
                      v-model="formData.endDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                  </div>
                </div>
                
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tekrar Sıklığı</label>
                  <select 
                    v-model="formData.frequency"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="weekly">Haftalık</option>
                    <option value="biweekly">İki Haftada Bir</option>
                    <option value="monthly">Aylık</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- İptal İade Tab -->
            <div v-if="activeTab === 'cancellation'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">İptal İade</h3>
              
              <!-- Cancellation Policy Content -->
              <div class="p-6">
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">İptal Politikası</label>
                  <select 
                    v-model="formData.cancellationPolicy"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="flexible">Esnek İptal</option>
                    <option value="moderate">Orta İptal</option>
                    <option value="strict">Katı İptal</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İptal Süresi (Gün)</label>
                    <input 
                      type="number" 
                      v-model="formData.cancellationDays"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="7"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İptal Ücreti (%)</label>
                    <input 
                      type="number" 
                      v-model="formData.cancellationFee"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="10"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İade Süresi (Gün)</label>
                    <input 
                      type="number" 
                      v-model="formData.refundDays"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="14"
                    >
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">İptal Koşulları</label>
                  <textarea 
                    v-model="formData.cancellationTerms"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="İptal koşullarını yazınız..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Resim Tab -->
            <div v-if="activeTab === 'photos'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Resim</h3>
              
              <!-- Photo Upload Buttons -->
              <div class="px-6 py-4 border-b bg-gray-50">
                <div class="flex flex-wrap gap-3">
                  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium">
                    Galeriden Getir
                  </button>
                  <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium">
                    Fotoğraflar Ekle
                  </button>
                  <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium">
                    Yüklemeyi Başlat
                  </button>
                  <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium">
                    Vazgeç
                  </button>
                </div>
              </div>

              <!-- Photo Grid -->
              <div class="px-6 py-4">
                <div class="grid grid-cols-5 gap-4 mb-6">
                  <div v-for="n in 25" :key="n" class="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:border-red-400 transition-colors">
                    <div class="text-center">
                      <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <button class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">
                      ✕
                    </button>
                  </div>
                </div>

                <!-- Bottom Action Buttons -->
                <div class="flex justify-between pt-4 border-t">
                  <button class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium">
                    Tümünü Temizle
                  </button>
                  <button class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium">
                    Kaydet İlerle
                  </button>
                </div>
              </div>
            </div>

            <!-- Tur Programı Tab -->
            <div v-if="activeTab === 'program'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Tur Programı</h3>
              
              <!-- Tur Bilgileri Section -->
              <div class="px-6 py-4 border-b bg-gray-50">
                <h4 class="text-lg font-semibold text-gray-700 mb-4">Tur Bilgileri</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tur Adı</label>
                    <input 
                      type="text" 
                      v-model="formData.tourName"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Tur adını girin"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tur Süresi</label>
                    <input 
                      type="text" 
                      v-model="formData.tourDuration"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="6Gece"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Dili</label>
                    <input 
                      type="text" 
                      v-model="formData.tourLanguage"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Türkçe"
                    />
                  </div>
                </div>
              </div>

              <!-- Tur Programları Section -->
              <div class="px-6 py-4 border-b">
                <h4 class="text-lg font-semibold text-gray-700 mb-4">Tur Programları</h4>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">1. Tur Programı</label>
                    <div class="flex items-center space-x-2">
                      <input 
                        type="text" 
                        v-model="formData.tourProgram1"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Tur programı adı"
                      />
                      <button class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-green-600">
                        ✓
                      </button>
                      <button class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-600">
                        ◯
                      </button>
                      <button class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600">
                        ✕
                      </button>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Tur Programı Adı</label>
                      <input 
                        type="text" 
                        v-model="formData.tourProgramName"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Program adı"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Gün</label>
                      <select 
                        v-model="formData.tourDay"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Türkiye, İngiltere, Fransa, vb</option>
                        <option value="Türkiye">Türkiye</option>
                        <option value="İngiltere">İngiltere</option>
                        <option value="Fransa">Fransa</option>
                        <option value="İtalya">İtalya</option>
                        <option value="İspanya">İspanya</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Content Areas -->
              <div class="px-6 py-4 space-y-6">
                
                <!-- Üst Başlık -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Üst Başlık</label>
                  <textarea 
                    v-model="formData.topTitle"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="İstanbul Çıkışlı olarak..."
                  ></textarea>
                </div>

                <!-- Başlık -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Başlık 
                    <button class="ml-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                      ✕
                    </button>
                  </label>
                  <textarea 
                    v-model="formData.title"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="Bu Rotada Ortadoğu Çıkmazı Geçinirde..."
                  ></textarea>
                </div>

                <!-- İçerik -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                  <textarea 
                    v-model="formData.content"
                    rows="8"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="İçerik detayları..."
                  ></textarea>
                </div>

                <!-- Fiyata Dahil/Dahil Olmayan Services -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  <!-- Fiyata Dahil Olan Hizmetler -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-sm font-semibold text-gray-700 mb-3 bg-gray-400 text-white px-3 py-2 rounded">
                      Fiyata Dahil Olan Hizmetler
                    </h4>
                    <div class="space-y-3">
                      <div v-for="(service, index) in formData.includedServices" :key="index" class="flex items-center space-x-2">
                        <div class="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          v-model="formData.includedServices[index]"
                          class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
                          :placeholder="`Dahil hizmet ${index + 1}`"
                        />
                        <button 
                          @click="removeIncludedService(index)"
                          class="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                      <button 
                        @click="addIncludedService"
                        class="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-green-500 hover:text-green-500 text-sm"
                      >
                        + Yeni Hizmet Ekle
                      </button>
                    </div>
                  </div>

                  <!-- Fiyata Dahil Olmayan Hizmetler -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-sm font-semibold text-gray-700 mb-3 bg-gray-400 text-white px-3 py-2 rounded">
                      Fiyata Dahil Olmayan Hizmetler
                    </h4>
                    <div class="space-y-3">
                      <div v-for="(service, index) in formData.excludedServices" :key="index" class="flex items-center space-x-2">
                        <div class="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          v-model="formData.excludedServices[index]"
                          class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                          :placeholder="`Dahil olmayan hizmet ${index + 1}`"
                        />
                        <button 
                          @click="removeExcludedService(index)"
                          class="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                      <button 
                        @click="addExcludedService"
                        class="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-red-500 hover:text-red-500 text-sm"
                      >
                        + Yeni Hizmet Ekle
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Önemli Bilgiler -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 bg-gray-400 text-white px-3 py-2 rounded">
                    Önemli Bilgiler
                  </label>
                  <textarea 
                    v-model="formData.importantInfo"
                    rows="6"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="Önemli bilgiler ve notlar..."
                  ></textarea>
                </div>

                <!-- Vize ve Pasaport Bilgileri -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 bg-gray-400 text-white px-3 py-2 rounded">
                    Vize ve Pasaport Bilgileri
                  </label>
                  <textarea 
                    v-model="formData.visaPassportInfo"
                    rows="8"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="Bu Rotada Vize, Evisa,Kapıda Vize şartından bir veya birbirinden bağımsız olarak işçilikli olabılır. Seyahat öncesinde aykırıntısında oldurunuz hakkıyla şleyiniz."
                  ></textarea>
                </div>

              </div>
            </div>

            <!-- Hareket Noktaları Yönetimi Tab -->
            <div v-if="activeTab === 'departure'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Kalkış Noktaları</h3>
              
              <!-- Form Fields -->
              <div class="px-6 py-4 border-b bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ülke Seç</label>
                    <select 
                      v-model="formData.movementCountry"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Türkiye">Türkiye</option>
                      <option value="Bulgaristan">Bulgaristan</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ülke Seç</label>
                    <select 
                      v-model="formData.movementCity"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="İstanbul">İstanbul</option>
                      <option value="Ankara">Ankara</option>
                      <option value="Sakarya">Sakarya</option>
                      <option value="Kapitan Andreevo">Kapitan Andreevo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Kalkış Noktası</label>
                    <input 
                      type="text" 
                      v-model="formData.departurePoint"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Kalkış noktası"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Saat</label>
                    <input 
                      type="text" 
                      v-model="formData.departureTime"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="..........."
                    />
                  </div>
                  
                  <div>
                    <button 
                      @click="addMovementPoint"
                      class="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              <!-- Movement Points Table -->
              <div class="px-6 py-4">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="bg-gray-100">
                        <th class="px-3 py-2 text-left font-medium text-gray-700">Ülke</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700">İl</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700">Kalkış Noktası</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700">Saat</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(point, index) in formData.movementPoints" :key="index" class="border-t">
                        <td class="px-3 py-2">{{ point.country }}</td>
                        <td class="px-3 py-2">{{ point.city }}</td>
                        <td class="px-3 py-2">{{ point.departurePoint }}</td>
                        <td class="px-3 py-2">{{ point.time }}</td>
                        <td class="px-3 py-2">
                          <div class="flex space-x-2">
                            <button class="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600">
                              ○
                            </button>
                            <button 
                              @click="removeMovementPoint(index)"
                              class="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Ekstra Hizmet Yönetimi Tab -->
            <div v-if="activeTab === 'service'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Ek Servis</h3>
              
              <!-- Form Fields -->
              <div class="px-6 py-4 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Ürün 
                      <span class="inline-flex items-center">
                        <span class="w-4 h-4 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center ml-1">?</span>
                        <span class="w-4 h-4 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center ml-1">?</span>
                      </span>
                    </label>
                    <select 
                      v-model="formData.extraServiceProduct"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Vize, Sağlık Sigortası">Vize, Sağlık Sigortası</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Zorunluluk</label>
                    <select 
                      v-model="formData.extraServiceRequired"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="İsteğe Bağlı, Zorunlu">İsteğe Bağlı, Zorunlu</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">KDV</label>
                    <input 
                      type="text" 
                      v-model="formData.extraServiceVAT"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="%"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Acente Komisyonu</label>
                    <select 
                      v-model="formData.extraServiceCommission"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Acente Komisyonu Dahil, Acente Komisyonu Dahil Değil">Acente Komisyonu Dahil, Acente Komisyonu Dahil Değil</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                  <textarea 
                    v-model="formData.extraServiceDescription"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Açıklama giriniz..."
                  ></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input 
                      type="text" 
                      v-model="formData.extraServiceName"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Test Service"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Alış</label>
                    <input 
                      type="number" 
                      step="0.01"
                      v-model="formData.extraServiceBuyPrice"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Satış</label>
                    <input 
                      type="number" 
                      step="0.01"
                      v-model="formData.extraServiceSellPrice"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">İşlemler</label>
                    <div class="flex space-x-2">
                      <button class="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600">
                        +
                      </button>
                      <button class="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600">
                        ○
                      </button>
                      <button class="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600">
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="pt-4">
                  <button class="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium">
                    Kaydet / Yeni
                  </button>
                </div>
              </div>
            </div>

            <!-- Ekstra Turlar Yönetimi Tab -->
            <div v-if="activeTab === 'extraTours'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Ekstra Turlar</h3>
              
              <!-- Extra Tours Table -->
              <div class="px-6 py-4">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="bg-gray-100">
                        <th class="px-3 py-2 text-left font-medium text-gray-700 w-20">Günler</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700">Ekstra Turlar</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700 w-24">Alış</th>
                        <th class="px-3 py-2 text-left font-medium text-gray-700 w-24">Satış</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="day in 6" :key="day" class="border-t">
                        <td class="px-3 py-2 font-medium">{{ day }}.Gün</td>
                        <td class="px-3 py-2">
                          <input 
                            type="text" 
                            v-model="formData.extraTours[day-1].description"
                            class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            placeholder="Ekstra tur açıklaması"
                          />
                        </td>
                        <td class="px-3 py-2">
                          <input 
                            type="number" 
                            step="0.01"
                            v-model="formData.extraTours[day-1].buyPrice"
                            class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            placeholder="0.00"
                          />
                        </td>
                        <td class="px-3 py-2">
                          <input 
                            type="number" 
                            step="0.01"
                            v-model="formData.extraTours[day-1].sellPrice"
                            class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            placeholder="0.00"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Fiyat Grubu Tab -->
            <div v-if="activeTab === 'priceGroup'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Fiyat Grubu Listesi</h3>
              
              <!-- Price Group List -->
              <div class="px-6 py-4 border-b">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-medium text-gray-700">İsim</span>
                </div>
                <div class="bg-gray-50 p-3 rounded border flex items-center justify-between">
                  <span class="text-sm">3/4 Yıldızlı Oteller</span>
                  <div class="flex space-x-2">
                    <button class="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600">
                      ○
                    </button>
                    <button class="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600">
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              <!-- Price Group Form -->
              <div class="px-6 py-4">
                <h4 class="text-lg font-semibold text-gray-700 mb-4">Fiyat Grubu Ekleme</h4>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  <!-- Image Upload -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Resim</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                      <div class="text-gray-400">
                        <svg class="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 7v10h16V7H4zm8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Form Fields -->
                  <div class="lg:col-span-2 space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">İsim</label>
                      <input 
                        type="text" 
                        v-model="formData.priceGroupName"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="3/4 Yıldız Oteller"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                      <textarea 
                        v-model="formData.priceGroupDescription"
                        rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Açıklama giriniz..."
                      ></textarea>
                    </div>
                    
                    <div class="flex space-x-3">
                      <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium">
                        Yeni
                      </button>
                      <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium">
                        ✕
                      </button>
                      <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium">
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarih Tab -->
            <div v-if="activeTab === 'date'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Tarih</h3>
              
              <!-- Date Management Content -->
              <div class="p-6">
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Başlangıç Tarihi</label>
                    <input 
                      type="date" 
                      v-model="formData.startDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bitiş Tarihi</label>
                    <input 
                      type="date" 
                      v-model="formData.endDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                  </div>
                </div>
                
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tekrar Sıklığı</label>
                  <select 
                    v-model="formData.frequency"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="weekly">Haftalık</option>
                    <option value="biweekly">İki Haftada Bir</option>
                    <option value="monthly">Aylık</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Fiyat Tab -->
            <div v-if="activeTab === 'pricing'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Fiyat</h3>
              
              <!-- Price Management Form -->
              <div class="p-6">
                <div class="grid grid-cols-4 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Şirket Grubu</label>
                    <select 
                      v-model="formData.companyGroup"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Hepsi</option>
                      <option value="group1">Grup 1</option>
                      <option value="group2">Grup 2</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Satış Kanalları</label>
                    <select 
                      v-model="formData.salesChannel"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Hepsi</option>
                      <option value="online">Online</option>
                      <option value="office">Ofis</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Alt Şirket</label>
                    <select 
                      v-model="formData.subCompany"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Hepsi</option>
                      <option value="sub1">Alt Şirket 1</option>
                      <option value="sub2">Alt Şirket 2</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat Grubu</label>
                    <select 
                      v-model="formData.selectedPriceGroup"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="group1">3/4 Yıldızlı Oteller</option>
                      <option value="group2">5 Yıldızlı Oteller</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Çift Kişi Fiyatı</label>
                    <input 
                      type="number" 
                      v-model="formData.doublePrice"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="0.00"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tek Kişi Fiyatı</label>
                    <input 
                      type="number" 
                      v-model="formData.singlePrice"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="0.00"
                    >
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Çocuk Fiyatı (2-11 yaş)</label>
                    <input 
                      type="number" 
                      v-model="formData.childPrice"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="0.00"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bebek Fiyatı (0-2 yaş)</label>
                    <input 
                      type="number" 
                      v-model="formData.infantPrice"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="0.00"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- İptal İade Tab -->
            <div v-if="activeTab === 'cancellation'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">İptal İade</h3>
              
              <!-- Cancellation Policy Content -->
              <div class="p-6">
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">İptal Politikası</label>
                  <select 
                    v-model="formData.cancellationPolicy"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="flexible">Esnek İptal</option>
                    <option value="moderate">Orta İptal</option>
                    <option value="strict">Katı İptal</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İptal Süresi (Gün)</label>
                    <input 
                      type="number" 
                      v-model="formData.cancellationDays"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="7"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İptal Ücreti (%)</label>
                    <input 
                      type="number" 
                      v-model="formData.cancellationFee"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="10"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">İade Süresi (Gün)</label>
                    <input 
                      type="number" 
                      v-model="formData.refundDays"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="14"
                    >
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">İptal Koşulları</label>
                  <textarea 
                    v-model="formData.cancellationTerms"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="İptal koşullarını yazınız..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Resim Tab -->
            <div v-if="activeTab === 'photos'" class="bg-white rounded-lg shadow-sm border">
              <h3 class="text-xl font-bold text-red-600 mb-6 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-t-lg border-b">Resimler</h3>
              
              <!-- Upload Buttons -->
              <div class="px-6 py-4 border-b">
                <div class="flex flex-wrap gap-3 mb-4">
                  <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium text-sm">
                    + Galeriden Getir
                  </button>
                  <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium text-sm">
                    + Fotoğraflar Ekle
                  </button>
                  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium text-sm">
                    ↓ Yüklemeyi Başlat
                  </button>
                  <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium text-sm">
                    Vazgeç
                  </button>
                </div>
              </div>

              <!-- Photo Grid -->
              <div class="px-6 py-4">
                <div class="grid grid-cols-5 gap-4 mb-6">
                  <div v-for="i in 25" :key="i" class="relative">
                    <div class="aspect-square border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 flex items-center justify-center">
                      <div class="text-gray-400">
                        <svg class="mx-auto h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 7v10h16V7H4zm8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                        </svg>
                      </div>
                    </div>
                    <button class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center">
                      ✕
                    </button>
                  </div>
                </div>

                <!-- Bottom Buttons -->
                <div class="flex justify-end space-x-3">
                  <button class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium">
                    Tümünü Temizle
                  </button>
                  <button class="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors font-medium">
                    Kaydet İlerle
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer -->
        <div v-if="selectedTourType" class="px-6 py-4 border-t border-gray-200 flex justify-between">
          <div>
            <button 
              v-if="selectedTourType"
              @click="goBack"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              ← Geri
            </button>
          </div>
          
          <div class="flex space-x-3">
            <button 
              class="px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Taslak Kaydet
            </button>
            <button 
              class="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Sıfırla
            </button>
            <button 
              class="px-6 py-3 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition-colors"
            >
              İptal
            </button>
            <button 
              class="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Kaydet Yeni Ekle
            </button>
            <button 
              @click="saveWizard"
              class="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              {{ isLastTab ? 'Kaydet' : 'Kaydet İlerle' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'save'])

// Data
const selectedTourType = ref(null)
const activeTab = ref('general')

// Tab sequence
const tabSequence = [
  'general',
  'program', 
  'departure',
  'service',
  'extraTours',
  'priceGroup',
  'date',
  'pricing',
  'cancellation',
  'photos'
]

// Computed
const isLastTab = computed(() => {
  return activeTab.value === 'photos'
})
const formData = ref({
  durum: true,
  yayinla: false,
  b2cYayinla: true,
  fiyatYayinla: false,
  onerilenTur: true,
  rating: 5,
  turKodu: '',
  saglaYici: '',
  tipType: 'resort',
  details: '',
  sortOrder: 1,
  tourName: '',
  tourDuration: '6Gece',
  tourLanguage: 'Türkçe',
  tourProgram1: '',
  tourProgramName: '',
  tourDay: '',
  topTitle: '',
  title: '',
  content: '',
  includedServices: ['Uçak Bileti', 'Otel Konaklaması', 'Öğün Dahil', 'Transfer Hizmetleri', 'Rehber Eşliği'],
  excludedServices: ['Vize Ücreti', 'Şahsi Harcamalar', 'İçecekler', 'Ek Turlar', 'Bahşişler'],
  importantInfo: '',
  visaPassportInfo: 'Bu Rotada Vize, Evisa,Kapıda Vize şartından bir veya birbirinden bağımsız olarak işçilikli olabılır. Seyahat öncesinde aykırıntısında oldurunuz hakkıyla şleyiniz.',
  // Movement points fields
  movementCountry: '',
  movementCity: '',
  departurePoint: '',
  departureTime: '',
  movementPoints: [
    { country: 'Türkiye', city: 'İstanbul', departurePoint: 'Bakırköy Ömür Plaza Önü', time: '20:00' },
    { country: 'Türkiye', city: 'Ankara', departurePoint: 'Beyken Plaza Önü', time: '20:00' },
    { country: 'Türkiye', city: 'Sakarya', departurePoint: 'Otogar Girişi Önü', time: '19:00' },
    { country: 'Bulgaristan', city: 'Kapitan Andreevo', departurePoint: 'Sınır Kapısı Çıkışı', time: '18:00' }
  ],
  // Extra service fields
  extraServiceProduct: '',
  extraServiceRequired: '',
  extraServiceVAT: '',
  extraServiceCommission: '',
  extraServiceDescription: '',
  extraServiceName: '',
  extraServiceBuyPrice: 0,
  extraServiceSellPrice: 0,
  // Extra tours
  extraTours: [
    { description: '', buyPrice: 0, sellPrice: 0 },
    { description: '', buyPrice: 0, sellPrice: 0 },
    { description: '', buyPrice: 0, sellPrice: 0 },
    { description: '', buyPrice: 0, sellPrice: 0 },
    { description: '', buyPrice: 0, sellPrice: 0 },
    { description: '', buyPrice: 0, sellPrice: 0 }
  ],
  // Price group fields
  priceGroupName: '',
  priceGroupDescription: '',
  startDate: '',
  endDate: '',
  frequency: '',
  companyGroup: '',
  salesChannel: '',
  subCompany: '',
  selectedPriceGroup: '',
  doublePrice: 0,
  singlePrice: 0,
  childPrice: 0,
  infantPrice: 0,
  cancellationPolicy: '',
  cancellationDays: 7,
  cancellationFee: 10,
  refundDays: 14,
  cancellationTerms: ''
})

// Methods
const closeWizard = () => {
  selectedTourType.value = null
  activeTab.value = 'general'
  emit('close')
}

const selectTourType = (type) => {
  selectedTourType.value = type
  activeTab.value = 'general'
  console.log('Seçilen tur tipi:', type)
}

const goBack = () => {
  selectedTourType.value = null
  activeTab.value = 'general'
}

const saveWizard = () => {
  const currentIndex = tabSequence.indexOf(activeTab.value)
  
  if (currentIndex < tabSequence.length - 1) {
    // Bir sonraki tab'a geç
    activeTab.value = tabSequence[currentIndex + 1]
  } else {
    // Son tab'daysa kaydet ve kapat
    emit('save', formData.value)
    closeWizard()
  }
}

const setRating = (rating) => {
  formData.value.rating = rating
}

const setTipType = (type) => {
  formData.value.tipType = type
}

const addIncludedService = () => {
  formData.value.includedServices.push('')
}

const removeIncludedService = (index) => {
  formData.value.includedServices.splice(index, 1)
}

const addExcludedService = () => {
  formData.value.excludedServices.push('')
}

const removeExcludedService = (index) => {
  formData.value.excludedServices.splice(index, 1)
}

const addMovementPoint = () => {
  formData.value.movementPoints.push({
    country: '',
    city: '',
    departurePoint: '',
    time: ''
  })
}

const removeMovementPoint = (index) => {
  formData.value.movementPoints.splice(index, 1)
}
</script>
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-hidden">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">Yeni Otel Ekle</h2>
                <p class="text-red-100 text-sm">Otel bilgilerini eksiksiz doldurun</p>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:text-red-200 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="bg-gray-50 border-b border-gray-200">
          <nav class="flex flex-wrap">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="scrollToSection(tab.id)"
              :class="getTabClass(tab.id)"
              class="px-4 py-2 text-xs font-medium transition-all duration-200 border-b-2 hover:bg-gray-100"
            >
              {{ tab.title }}
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div class="px-6 py-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
          
          <!-- Tek Sayfa İçerik - Tüm Bölümler -->
          <div class="space-y-8">
            
            <!-- Genel Bilgiler Bölümü -->
            <div id="general" class="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-red-800 mb-4">Genel Bilgiler</h3>
              
              <!-- Durum ve Yayın Toggles -->
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div class="bg-white p-3 rounded-lg border">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Durum</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="formData.status" type="checkbox" class="sr-only">
                      <div :class="formData.status ? 'bg-red-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                        <div :class="formData.status ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="bg-white p-3 rounded-lg border">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Yayınla</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="formData.publish" type="checkbox" class="sr-only">
                      <div :class="formData.publish ? 'bg-blue-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                        <div :class="formData.publish ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="bg-white p-3 rounded-lg border">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">B2C Yayınla</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="formData.b2cPublish" type="checkbox" class="sr-only">
                      <div :class="formData.b2cPublish ? 'bg-green-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                        <div :class="formData.b2cPublish ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="bg-white p-3 rounded-lg border">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Fiyat Yayınla</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="formData.pricePublish" type="checkbox" class="sr-only">
                      <div :class="formData.pricePublish ? 'bg-yellow-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                        <div :class="formData.pricePublish ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="bg-white p-3 rounded-lg border">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Önerilen Otel</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="formData.featured" type="checkbox" class="sr-only">
                      <div :class="formData.featured ? 'bg-purple-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                        <div :class="formData.featured ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Yıldız Rating -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Yıldız</label>
                <div class="flex items-center space-x-1">
                  <div 
                    v-for="star in 5" 
                    :key="star"
                    @click="formData.starRating = star"
                    class="cursor-pointer text-2xl transition-all hover:scale-110 transform"
                    :class="star <= formData.starRating ? 'text-yellow-400' : 'text-gray-300'"
                  >
                    ★
                  </div>
                  <span class="ml-3 text-sm text-gray-600">({{ formData.starRating }} yıldız)</span>
                </div>
              </div>

              <!-- Form Fields -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Otel Getir <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="formData.hotelCode"
                      type="text" 
                      required
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Otel kodu"
                    />
                    <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Sağlayıcı <span class="text-red-500">*</span>
                  </label>
                  <div class="flex space-x-2">
                    <select 
                      v-model="formData.provider"
                      required
                      class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Tripadvisor</option>
                      <option value="paximum">Paximum</option>
                      <option value="hotelbeds">HotelBeds</option>
                      <option value="booking">Booking.com</option>
                      <option value="manual">Manuel</option>
                    </select>
                    <button class="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tip</label>
                  <div class="flex space-x-2">
                    <button 
                      v-for="tip in tips" 
                      :key="tip"
                      @click="formData.tip = tip"
                      :class="formData.tip === tip ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                      class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {{ tip }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Vitrin Resmi -->
              <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Vitrin Resmi</label>
                <div class="flex items-center space-x-4">
                  <div class="w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <!-- Otel Havalimanı -->
              <div class="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                <h4 class="text-md font-semibold text-gray-800 mb-4">Otel Havalimanı</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Koordinatlar (Haritadan Seç Tıkla)</label>
                    <input 
                      v-model="formData.coordinates"
                      type="text" 
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0,0"
                    />
                  </div>
                  <div class="flex items-end space-x-2">
                    <div class="flex-1">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Giriş, Çıkış</label>
                      <div class="flex space-x-2">
                        <input 
                          v-model="formData.checkIn"
                          type="time" 
                          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <input 
                          v-model="formData.checkOut"
                          type="time" 
                          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- İletişim Bilgileri Bölümü -->
            <div id="contact" class="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-blue-800 mb-4">İletişim Bilgileri</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Adı Soyadı</label>
                  <input 
                    v-model="formData.contactName"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Yetkili kişi"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Görev</label>
                  <input 
                    v-model="formData.position"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Pozisyon"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input 
                    v-model="formData.phone"
                    type="tel" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0532 123 45 67"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Mail</label>
                  <input 
                    v-model="formData.email"
                    type="email" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="info@hotel.com"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
                  <select 
                    v-model="formData.country"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Türkiye</option>
                    <option value="antalya">Antalya</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">İl</label>
                  <select 
                    v-model="formData.city"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Antalya</option>
                    <option value="muratpasa">Muratpaşa</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">İlçe</label>
                  <select 
                    v-model="formData.district"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Muratpaşa</option>
                    <option value="lara">Lara</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Semt</label>
                  <select 
                    v-model="formData.neighborhood"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Lara</option>
                  </select>
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                <textarea 
                  v-model="formData.address"
                  rows="2" 
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Detaylı adres bilgisi..."
                ></textarea>
              </div>
            </div>

            <!-- Kategori Bilgileri Bölümü -->
            <div id="category" class="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-green-800 mb-4">Kategori Bilgileri</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Kategori Grubu <span class="text-red-500">*</span>
                  </label>
                  <select 
                    v-model="formData.categoryGroup"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Yazlık Oteller</option>
                    <option value="antalya">Antalya Otelleri</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Kategori <span class="text-red-500">*</span>
                  </label>
                  <select 
                    v-model="formData.category"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Antalya Otelleri</option>
                  </select>
                </div>

                <div class="flex items-end">
                  <button 
                    type="button"
                    class="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Yeni Ekle
                  </button>
                </div>
              </div>
            </div>

            <!-- SEO Bilgileri Bölümü -->
            <div id="seo" class="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-purple-800 mb-4">SEO Bilgileri</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input 
                    v-model="formData.seoTitle"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="SEO başlık"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input 
                    v-model="formData.seoUrl"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="seo-url"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <textarea 
                    v-model="formData.seoKeywords"
                    rows="2" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="anahtar, kelimeler, virgül, ile"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea 
                    v-model="formData.seoDescription"
                    rows="2" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="SEO açıklama metni..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Kod Alanları Bölümü -->
            <div id="codes" class="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-yellow-800 mb-4">Kod Alanları</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-1</label>
                  <input 
                    v-model="formData.code1"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="< >"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-2</label>
                  <input 
                    v-model="formData.code2"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="< >"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-3</label>
                  <input 
                    v-model="formData.code3"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="< >"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kod-4</label>
                  <input 
                    v-model="formData.code4"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="< >"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Grup Kodu</label>
                  <input 
                    v-model="formData.groupCode"
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="< >"
                  />
                </div>
              </div>
            </div>

            <!-- Mesafe Bilgileri Bölümü -->
            <div id="distances" class="bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-indigo-800 mb-4">Mesafe</h3>
              
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b">
                      <th class="text-left py-2 text-sm font-medium text-gray-700">Tip</th>
                      <th class="text-left py-2 text-sm font-medium text-gray-700">Adı</th>
                      <th class="text-left py-2 text-sm font-medium text-gray-700">Mesafe</th>
                      <th class="text-left py-2 text-sm font-medium text-gray-700">Birim</th>
                      <th class="text-left py-2 text-sm font-medium text-gray-700">
                        <button 
                          type="button"
                          class="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
                        >
                          Yeni Ekle
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(distance, index) in formData.distances" :key="index" class="border-b">
                      <td class="py-2">
                        <select 
                          v-model="distance.type"
                          class="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="airport">Antalya Havalimanı</option>
                          <option value="alanya-airport">Alanya Havalimanı</option>
                          <option value="city">Şehir Merkezi</option>
                          <option value="beach">Antik Şehir</option>
                        </select>
                      </td>
                      <td class="py-2">
                        <span class="text-sm">{{ distance.name }}</span>
                      </td>
                      <td class="py-2">
                        <span class="text-sm">{{ distance.distance }}</span>
                      </td>
                      <td class="py-2">
                        <span class="text-sm">{{ distance.location }}</span>
                      </td>
                      <td class="py-2">
                        <button 
                          type="button"
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="flex justify-center mt-4">
                <nav class="flex items-center space-x-2">
                  <button class="px-3 py-1 text-sm border rounded hover:bg-gray-50">1</button>
                  <button class="px-3 py-1 text-sm bg-gray-800 text-white rounded">2</button>
                  <button class="px-3 py-1 text-sm border rounded hover:bg-gray-50">3</button>
                  <span class="px-2">...</span>
                  <button class="px-3 py-1 text-sm border rounded hover:bg-gray-50">9</button>
                </nav>
              </div>
            </div>

          </div>

          <!-- Detaylar Bölümü -->
          <div id="details" class="space-y-8">
            
            <!-- Otel Bilgileri Tablosu -->
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800">Otel Bilgileri</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Bilgi Ekle
                </button>
              </div>

              <!-- Form Fields -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Adı</label>
                  <input 
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Otel adı"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tipi</label>
                  <input 
                    type="text" 
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Tip"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Yıldız</label>
                  <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
                    <option>★★★★★</option>
                    <option>★★★★</option>
                    <option>★★★</option>
                  </select>
                </div>
              </div>

              <!-- Genel Tablo -->
              <div class="bg-white rounded-lg border">
                <div class="bg-gray-100 px-4 py-2 rounded-t-lg">
                  <h4 class="text-sm font-semibold text-gray-700">Genel</h4>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Dil</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Sıralama</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Başlık</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Sitede Göster</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in formData.hotelDetails" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm">{{ item.language }}</td>
                        <td class="px-4 py-2 text-sm">{{ item.order }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">{{ item.title }}</td>
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="item.showOnSite"
                              @change="item.showOnSite = !item.showOnSite"
                              class="sr-only"
                            />
                            <div :class="item.showOnSite ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="item.showOnSite ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Mevsimsel Bilgi -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-blue-800">Mevsimsel Bilgi</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Bilgi Ekle
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Dil</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Sıralama</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Tarihler</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Başlık</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Sitede Göster</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in formData.seasonalInfo" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm">{{ item.language }}</td>
                        <td class="px-4 py-2 text-sm">{{ item.order }}</td>
                        <td class="px-4 py-2 text-sm">{{ item.dates }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">{{ item.title }}</td>
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="item.showOnSite"
                              @change="item.showOnSite = !item.showOnSite"
                              class="sr-only"
                            />
                            <div :class="item.showOnSite ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="item.showOnSite ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Etkinlik -->
            <div class="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-green-800">Etkinlik</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Bilgi Ekle
                </button>
              </div>

              <!-- Etkinlik Listesi -->
              <div class="bg-white rounded-lg border mb-6">
                <div class="bg-gray-100 px-4 py-2 rounded-t-lg">
                  <h4 class="text-sm font-semibold text-gray-700">Etkinlik Listesi</h4>
                </div>
                <div class="p-4">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Etkinlik Listesi</label>
                      <input 
                        type="text" 
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Etkinlik adı"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Etkinlik Başlangıç</label>
                      <input 
                        type="date" 
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Etkinlik Bitiş</label>
                      <input 
                        type="date" 
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                    <textarea 
                      rows="3" 
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Etkinlik açıklaması..."
                    ></textarea>
                  </div>

                  <!-- Resim Upload -->
                  <div class="grid grid-cols-3 gap-4">
                    <div v-for="n in 3" :key="n" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <button class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Etkinlik Tablosu -->
              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">İsmi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Açıklama</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Tarihler</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Resim</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(event, index) in formData.events" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm text-blue-600">{{ event.name }}</td>
                        <td class="px-4 py-2 text-sm">{{ event.description }}</td>
                        <td class="px-4 py-2 text-sm">{{ event.dates }}</td>
                        <td class="px-4 py-2">
                          <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          </div>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Konseptler Bölümü -->
          <div id="concepts" class="space-y-8">
            
            <!-- Konsept Tipi -->
            <div class="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-orange-800">Konsept Tipi</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Konsept Ekle
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">KOD</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">İsim</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(concept, index) in formData.concepts" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm font-medium">{{ concept.code }}</td>
                        <td class="px-4 py-2">
                          <select 
                            v-model="concept.name"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="gida-dahili">Gıda Dahili</option>
                            <option value="tam-pansiyon-plus">Tam Pansiyon Plus</option>
                            <option value="hersey-dahil">Herşey Dahil</option>
                            <option value="sadece-oda">Sadece Oda</option>
                          </select>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Oda Bölümü -->
          <div id="room" class="space-y-8">
            
            <!-- Oda Bilgileri -->
            <div class="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-purple-800">Oda Bilgileri</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Oda Ekle
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Oda Tipi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Hesaplama Tipi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Kod</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Adı</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Min Kişi</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Max Kişi</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Std Kişi</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Min Yet</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Max Yet</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Min Çoc</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Max Çoc</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(room, index) in formData.rooms" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm">{{ room.type }}</td>
                        <td class="px-4 py-2 text-sm">{{ room.calculationType }}</td>
                        <td class="px-4 py-2 text-sm font-medium">{{ room.code }}</td>
                        <td class="px-4 py-2 text-sm">{{ room.name }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.minPerson }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.maxPerson }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.stdPerson }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.minAdult }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.maxAdult }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.minChild }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ room.maxChild }}</td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Çocuk Bölümü -->
          <div id="child" class="space-y-8">
            
            <!-- Çocuk Politikaları -->
            <div class="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-pink-800">Çocuk Politikaları</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Politika Ekle
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Kod</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Adı</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Oda Tipi</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(policy, index) in formData.childPolicies" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm font-medium">{{ policy.code }}</td>
                        <td class="px-4 py-2 text-sm">{{ policy.name }}</td>
                        <td class="px-4 py-2 text-center">
                          <select v-model="policy.roomType" class="text-sm border rounded px-2 py-1 bg-gray-50">
                            <option value="hepsi">Hepsi</option>
                            <option value="deluxe">Deluxe Oda</option>
                            <option value="standart">Standart Oda</option>
                          </select>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Fiyat Bölümü -->
          <div id="price" class="space-y-8">
            
            <!-- Arama Kriterleri -->
            <div class="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-emerald-800">Arama Kriterleri</h3>
              </div>

              <!-- Filtreler -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat Tipi</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option>Tümü</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rezervasyon Tarihi</label>
                  <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Geçerlilik Tarihi</label>
                  <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Pansiyon</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option>Tümü</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Market</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option>Tümü</option>
                  </select>
                </div>
                <div class="flex items-end">
                  <button 
                    type="button"
                    class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Ara
                  </button>
                </div>
              </div>

              <!-- Fiyat Tablosu -->
              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Sıra</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Fiyat Tipi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Kur</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Rezervasyon Tarihi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Geçerlilik Tarihi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Rezervasyon Tutarı</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Fiyat (Geçe)</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">İndirim Grubu</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Acente Oranı</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Pansiyon</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Market</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Aktif</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(price, index) in formData.priceData" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm">{{ index + 1 }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.type }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.searchType }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.period }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.currency }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.ageRange }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.priceType }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.roomType }}</td>
                        <td class="px-4 py-2 text-sm">{{ price.agentDiscount }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">{{ price.pension }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ price.market }}</td>
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="price.active"
                              @change="togglePriceActive(index)"
                              class="sr-only"
                            />
                            <div :class="price.active ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="price.active ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Kontejyan Bölümü -->
          <div id="container" class="space-y-8">
            
            <!-- Arama Kriterleri -->
            <div class="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-cyan-800">Arama Kriterleri</h3>
              </div>

              <!-- Filtreler -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tip</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500">
                    <option>Tümü</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
                  <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Oda</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500">
                    <option>Tümü</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Market</label>
                  <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500">
                    <option>Tümü</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end mb-6">
                <button 
                  type="button"
                  class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Ara
                </button>
              </div>

              <!-- Kontejyan Tablosu -->
              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Tip</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Tarih Aralığı</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Oda</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Market</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Kontejyan</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Garanti</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Detay Link</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Aktif</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(criteria, index) in formData.searchCriteria" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm">{{ criteria.type }}</td>
                        <td class="px-4 py-2 text-sm">{{ criteria.searchDate }}</td>
                        <td class="px-4 py-2 text-sm">{{ criteria.room }}</td>
                        <td class="px-4 py-2 text-sm">{{ criteria.market }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ criteria.quota }}</td>
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="criteria.guarantee > 2"
                              @change="toggleCriteriaGuarantee(index)"
                              class="sr-only"
                            />
                            <div :class="criteria.guarantee > 2 ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="criteria.guarantee > 2 ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-center text-sm">{{ criteria.detail }}</td>
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="criteria.active"
                              @change="toggleCriteriaActive(index)"
                              class="sr-only"
                            />
                            <div :class="criteria.active ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="criteria.active ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- İptal İade Bölümü -->
          <div id="cancel" class="space-y-8">
            
            <!-- Kick Back Listesi -->
            <div class="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-red-800">Kick Back Listesi</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Yeni Kick Back Oluştur
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Durum</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Rezervasyon Tarihleri</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Konaklama Tarihleri</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Min Ciro</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Max Ciro</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Oran</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Kick Back</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Hesaplama</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Açıklama</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(kickback, index) in formData.kickBackData" :key="index" class="border-b">
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="kickback.active"
                              @change="toggleKickBackActive(index)"
                              class="sr-only"
                            />
                            <div :class="kickback.active ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="kickback.active ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-sm">{{ kickback.reservationDate }}</td>
                        <td class="px-4 py-2 text-sm">{{ kickback.usageDate }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ kickback.minCiro }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ kickback.maxCiro }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ kickback.rate }}</td>
                        <td class="px-4 py-2 text-sm">{{ kickback.kickBack }}</td>
                        <td class="px-4 py-2 text-sm">{{ kickback.hesaplama }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">{{ kickback.description }}</td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Ödeme Planı Listesi -->
            <div class="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-orange-800">Ödeme Planı Listesi</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Yeni Ödeme Planı Oluştur
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Plan Adı</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Satış Tarihleri</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Konaklama Tarihleri</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Ödeme Şartı</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">%</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Ödeme Tarihi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Açıklama</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(plan, index) in formData.paymentPlans" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm font-medium">{{ plan.planName }}</td>
                        <td class="px-4 py-2 text-sm">{{ plan.salesDate }}</td>
                        <td class="px-4 py-2 text-sm">{{ plan.usageDate }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ plan.paymentRate }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ plan.paymentRate }}</td>
                        <td class="px-4 py-2 text-sm">{{ plan.paymentDate }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">{{ plan.description }}</td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Aksiyonlar Bölümü -->
          <div id="actions" class="space-y-8">
            
            <!-- Aksiyonlar -->
            <div class="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-teal-800">Aksiyonlar</h3>
                <button 
                  type="button"
                  class="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Yeni Aksiyon
                </button>
              </div>

              <div class="bg-white rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Geçerlilik Tarihi</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Giriş Kalan Gün</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Konaklama Gün</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Ceza Tipi</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Tutar</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Oda</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Açıklama</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Aktif</th>
                        <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(action, index) in formData.actionData" :key="index" class="border-b">
                        <td class="px-4 py-2 text-sm">{{ action.date }}</td>
                        <td class="px-4 py-2 text-sm">{{ action.entryDate }}</td>
                        <td class="px-4 py-2 text-sm">{{ action.usageDate }}</td>
                        <td class="px-4 py-2 text-sm">{{ action.roomType }}</td>
                        <td class="px-4 py-2 text-center text-sm">{{ action.tutar }}</td>
                        <td class="px-4 py-2 text-sm">{{ action.room }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">{{ action.description }}</td>
                        <td class="px-4 py-2 text-center">
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :checked="action.active"
                              @change="toggleActionActive(index)"
                              class="sr-only"
                            />
                            <div :class="action.active ? 'bg-green-500' : 'bg-gray-300'" class="relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out">
                              <div :class="action.active ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-4 py-2 text-center">
                          <div class="flex items-center justify-center space-x-2">
                            <button class="text-gray-400 hover:text-blue-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          <!-- Resim Bölümü -->
          <div id="images" class="space-y-8">
            
            <!-- Resimler -->
            <div class="bg-gradient-to-r from-violet-50 to-violet-100 border border-violet-200 rounded-lg p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-violet-800">Resimler</h3>
              </div>

              <!-- Upload Buttons -->
              <div class="flex space-x-4 mb-6">
                <button 
                  type="button"
                  class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  + Fotoğraflar Ekle
                </button>
                <button 
                  type="button"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Yüklemeli Flaşlı
                </button>
                <button 
                  type="button"
                  class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Vazgeç
                </button>
              </div>

              <!-- Image Grid -->
              <div class="grid grid-cols-5 gap-4">
                <div v-for="n in 25" :key="n" class="relative aspect-square bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 hover:border-violet-400 transition-colors">
                  <!-- Placeholder Image -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  
                  <!-- Delete Button -->
                  <button class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Bottom Button -->
              <div class="flex justify-end mt-6">
                <button 
                  type="button"
                  class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Tümünü Temizle
                </button>
              </div>
            </div>

          </div>

          <!-- Widget Bölümü -->
          <div id="widget" class="space-y-8">
            
            <!-- Widget URL -->
            <div class="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-slate-800 mb-4">Widget URL</h3>
              
              <div class="bg-white rounded-lg border p-4">
                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700">URL:</span>
                  <code class="flex-1 px-3 py-2 bg-gray-100 rounded text-sm font-mono text-gray-800">
                    https://b2b.primeturlar.com/hotels/new-widget/752
                  </code>
                  <span class="text-sm text-gray-600">aynısı olacak fiba banka olmayacak</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div class="flex space-x-3">
            <button 
              @click="saveDraft"
              type="button"
              class="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Taslak Kaydet
            </button>
            
            <button 
              @click="resetForm"
              type="button"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Sıfırla
            </button>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="closeWizard"
              type="button"
              class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              İptal
            </button>
            
            <button 
              @click="saveHotel"
              type="button"
              class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Kaydet İlerle
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

// Tab system
const activeTab = ref('general')
const showDetailsPage = ref(false)
const tabs = ref([
  { id: 'general', title: 'Genel Bilgiler' },
  { id: 'details', title: 'Detaylar' },
  { id: 'concepts', title: 'Konseptler' },
  { id: 'room', title: 'Oda' },
  { id: 'child', title: 'Çocuk' },
  { id: 'price', title: 'Fiyat' },
  { id: 'container', title: 'Kontejyan' },
  { id: 'cancel', title: 'İptal İade' },
  { id: 'actions', title: 'Aksiyonlar' },
  { id: 'images', title: 'Resim' },
  { id: 'widget', title: 'Widget' }
])

// Tips data
const tips = ref(['●', '○', '◑'])

// Form data - Single object for all sections
const formData = ref({
  // Genel Bilgiler
  status: true,
  publish: false,
  b2cPublish: true,
  pricePublish: false,
  featured: true,
  starRating: 5,
  hotelCode: '',
  provider: '',
  tip: '●',
  coordinates: '',
  checkIn: '14:00',
  checkOut: '12:00',
  
  // İletişim Bilgileri
  contactName: '',
  position: '',
  phone: '',
  email: '',
  country: '',
  city: '',
  district: '',
  neighborhood: '',
  address: '',
  
  // Kategori Bilgileri
  categoryGroup: '',
  category: '',
  
  // SEO Bilgileri
  seoTitle: '',
  seoUrl: '',
  seoKeywords: '',
  seoDescription: '',
  
  // Kod Alanları
  code1: '',
  code2: '',
  code3: '',
  code4: '',
  groupCode: '',
  
  // Mesafe Bilgileri
  distances: [
    { type: 'airport', name: 'Serhat AY', distance: '0532 485 42 94', location: 'Antalya' },
    { type: 'alanya-airport', name: 'Serhat AY', distance: '0264 264 64 64', location: 'Alanya' },
    { type: 'city', name: 'Serhat AY', distance: '0532 532 32 32', location: 'Bodrum' },
    { type: 'beach', name: 'Serhat AY', distance: '0532 532 32 32', location: 'Marmaris' }
  ],
  
  // Detaylar Sayfası - Otel Bilgileri
  hotelDetails: [
    { language: 'TR', order: 1, title: 'Genel Tanıtım', showOnSite: true },
    { language: 'EN', order: 2, title: 'Otel Olanakları', showOnSite: true },
    { language: 'TR', order: 3, title: 'Yeme İçme', showOnSite: false },
    { language: 'EN', order: 4, title: 'Aktiviteler', showOnSite: true }
  ],
  
  // Mevsimsel Bilgi
  seasonalInfo: [
    { language: 'TR', order: 1, dates: '19-05-25/19-09-25', title: 'Genel Tanıtım', showOnSite: true },
    { language: 'EN', order: 2, dates: '19-09-25/31-10-22', title: 'Otel Olanakları', showOnSite: true },
    { language: 'TR', order: 3, dates: '19-09-25/31-10-22', title: 'Yeme İçme', showOnSite: false },
    { language: 'EN', order: 4, dates: '19-09-25/31-10-22', title: 'Aktiviteler', showOnSite: true }
  ],
  
  // Etkinlikler
  events: [
    { name: 'Test Konseri', description: 'Test Açıklama', dates: '19-09-2025 19-09-2025' },
    { name: 'Test Konseri', description: 'Test Açıklama', dates: '19-09-2025 19-09-2025' },
    { name: 'Test Konseri', description: 'Test Açıklama', dates: '19-09-2025 19-09-2025' },
    { name: 'Test Konseri', description: 'Test Açıklama', dates: '19-09-2025 19-09-2025' }
  ],
  
  // Konseptler
  concepts: [
    { code: 'TR', name: 'gida-dahili' },
    { code: 'EN', name: 'tam-pansiyon-plus' },
    { code: 'TR', name: 'hersey-dahil' },
    { code: 'EN', name: 'sadece-oda' }
  ],
  
  // Oda Bilgileri
  rooms: [
    { type: 'Standart Oda', calculationType: 'PerPerson', code: 'STK', name: 'Standart Kara Manzaralı', minPerson: 1, maxPerson: 2, stdPerson: 2, minAdult: 1, maxAdult: 2, minChild: 0, maxChild: 0 },
    { type: 'Aile Odası', calculationType: 'PerPerson', code: 'ADM', name: 'Aile Odası Deniz Manzaralı', minPerson: 1, maxPerson: 4, stdPerson: 2, minAdult: 1, maxAdult: 2, minChild: 1, maxChild: 2 },
    { type: 'Deluxe Oda', calculationType: 'UnitPrice', code: 'SDM', name: 'Standart Deniz Manzaralı', minPerson: 1, maxPerson: 6, stdPerson: 3, minAdult: 2, maxAdult: 3, minChild: 1, maxChild: 3 },
    { type: 'Roi Oda', calculationType: 'UnitPrice', code: 'ROJ', name: 'Deluxe Oda', minPerson: 1, maxPerson: 2, stdPerson: 2, minAdult: 1, maxAdult: 2, minChild: 1, maxChild: 2 }
  ],
  
  // Çocuk Politikaları
  childPolicies: [
    { code: 'CP11', name: '1Mayıs-30Mayıs', roomType: 'hepsi' },
    { code: 'CP12', name: '1Haziran-30Eylül', roomType: 'hepsi' },
    { code: 'CP13', name: 'Ramazan Bayramı Dönemi', roomType: 'deluxe' },
    { code: 'CP14', name: 'Kurban Bayramı Dönemi', roomType: 'standart' }
  ],
  
  // Fiyat Bilgileri
  priceData: [
    { type: 'Tümü', searchType: 'Tümü', period: '01.01.2016 13:55', currency: 'TRY', ageRange: '1-30', priceType: 'All', roomType: 'All', agentDiscount: 'All', pension: 'Oda Kahvaltı, Sadece Oda', market: 'All', active: true },
    { type: 'All', searchType: 'TRY', period: '01.01.2016 13:55', currency: '1-30', ageRange: '1-30', priceType: 'Fst.o.Grp.Psr', roomType: 'All', agentDiscount: 'Hepey Dahil', pension: 'Hepey Dahil', market: 'All', active: true },
    { type: 'All', searchType: 'EURO', period: '01.01.2016 13:55', currency: '1-30', ageRange: '1-30', priceType: 'Grn. Grnt.Pzr', roomType: 'All', agentDiscount: 'Hepey Dahil, Tam Pansiyon', pension: 'Hepey Dahil, Tam Pansiyon', market: 'All', active: false },
    { type: 'All', searchType: 'USD', period: '01.01.2016 13:55', currency: '1-30', ageRange: '1-30', priceType: 'All', roomType: 'All', agentDiscount: 'Ultra Hepey Dahil', pension: 'Ultra Hepey Dahil', market: 'All', active: true }
  ],
  
  // Kontejyan Bilgileri
  quotaData: [
    { status: 'On Sale', reservationDate: '01.01.2016 13:55', usageDate: '01.01.2016 13:55', minCiro: '100000', maxCiro: '300000', rate: '2', kickBack: 'Ciro Bazlı', hesaplama: 'Komisyon', agentDiscount: 'Erken Rezervasyon Kick Back' },
    { status: 'On Sale', reservationDate: '01.01.2016 13:55', usageDate: '23-06-2025 - 26-06-2025', minCiro: '100000', maxCiro: '300000', rate: '3', kickBack: 'Fatura Bazlı', hesaplama: 'Indirimli', agentDiscount: 'Sezon Sonu Konaklama' }
  ],
  
  // İptal İade Politikaları
  searchCriteria: [
    { type: 'Tümü', searchDate: '01.01.2016 13:55', room: 'Standart Kara Manzaralı, Deluxe Oda, Aile Odası, Standart Deniz Manzaralı Oda', market: 'Türkiye', quota: '+5', guarantee: '2', detail: '3', active: true },
    { type: 'Kontejyan', searchDate: '01.01.2016 13:55', room: 'All', market: 'Türkiye', quota: '+10', guarantee: '2', detail: '3', active: true },
    { type: 'Serbet', searchDate: '01.01.2016 13:55', room: 'Standart Deniz Manzaralı', market: 'All', quota: '+10', guarantee: '3', detail: '3', active: false },
    { type: 'Stop Sale', searchDate: '01.01.2016 13:55', room: 'Deluxe Oda, Aile Odası', market: 'All', quota: '+5', guarantee: '3', detail: '3', active: true },
    { type: 'Stop Aç', searchDate: '01.01.2016 13:55', room: 'Standart Deniz Manzaralı', market: 'All', quota: '+5', guarantee: '3', detail: '3', active: true }
  ],
  
  // Aksiyonlar
  actionData: [
    { date: '01.01.2016 13:55', entryDate: '7-99', usageDate: '1-31', roomType: 'Yazlık', tutar: '50', room: 'All', description: 'Tanitim amaçlı yapılan indirim... ooza uygulanır.', active: true },
    { date: '01.01.2016 13:55', entryDate: '5-99', usageDate: '1-31', roomType: 'Tutar', tutar: '100', room: 'Kara Manzaralı, Oda, Aile Odası', description: 'Tanitim amaçlı yapılan indirim... ooza uygulanır.', active: false },
    { date: '01.01.2016 13:55', entryDate: '3-99', usageDate: '1-31', roomType: 'Gün', tutar: '1', room: 'All', description: 'Tanitim amaçlı yapılan indirim... ooza uygulanır.', active: true },
    { date: '01.01.2016 13:55', entryDate: '1-99', usageDate: '1-31', roomType: 'Yazlık', tutar: '100', room: 'All', description: 'Tanitim amaçlı yapılan indirim... ooza uygulanır.', active: true }
  ],
  
  // Kick Back Listesi
  kickBackData: [
    { status: 'Durum', reservationDate: '23-06-2025 - 26-06-2025', usageDate: '23-06-2025 - 26-06-2025', minCiro: '100000', maxCiro: '300000', rate: '2', kickBack: 'Ciro Bazlı', hesaplama: 'Komisyon', description: 'Erken Rezervasyon Kick Back', active: true },
    { status: 'Durum', reservationDate: '23-06-2025 - 26-06-2025', usageDate: '25-06-2025 - 29-06-2025', minCiro: '100000', maxCiro: '300000', rate: '3', kickBack: 'Fatura Bazlı', hesaplama: 'Indirimli', description: 'Sezon Sonu Konaklama', active: false }
  ],
  
  // Ödeme Planı Listesi
  paymentPlans: [
    { planName: 'Örnek Plan', salesDate: '23-06-2025 - 26-06-2025', usageDate: '25-06-2025 - 29-06-2025', paymentRate: '30', paymentDate: '23-06-2025 - 26-06-2025', description: 'Erken Rezervasyon Kick Back' },
    { planName: 'Örnek Plan', salesDate: '23-06-2025 - 26-06-2025', usageDate: '25-06-2025 - 29-06-2025', paymentRate: '30', paymentDate: '25-06-2025 - 29-06-2025', description: 'Sezon Sonu Konaklama' }
  ]
})

// Methods
const getTabClass = (tabId) => {
  const baseClass = 'relative'
  const activeClass = 'text-red-600 border-red-500 bg-white'
  const inactiveClass = 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
  
  return `${baseClass} ${tabId === activeTab.value ? activeClass : inactiveClass}`
}

const scrollToSection = (tabId) => {
  activeTab.value = tabId
  const element = document.getElementById(tabId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const saveDraft = () => {
  console.log('Taslak kaydediliyor:', formData.value)
}

const resetForm = () => {
  // Reset all form data
  Object.keys(formData.value).forEach(key => {
    if (typeof formData.value[key] === 'boolean') {
      formData.value[key] = false
    } else if (typeof formData.value[key] === 'number') {
      formData.value[key] = 0
    } else if (Array.isArray(formData.value[key])) {
      // Keep distances array
      if (key === 'distances') return
    } else {
      formData.value[key] = ''
    }
  })
  // Set defaults
  formData.value.status = true
  formData.value.starRating = 5
  formData.value.checkIn = '14:00'
  formData.value.checkOut = '12:00'
  formData.value.tip = '●'
}

const saveHotel = () => {
  console.log('Otel kaydediliyor:', formData.value)
  
  // Sıralı sekme geçişi
  const tabOrder = ['general', 'details', 'concepts', 'room', 'child', 'price', 'container', 'cancel', 'actions', 'images', 'widget']
  const currentIndex = tabOrder.indexOf(activeTab.value)
  
  if (currentIndex < tabOrder.length - 1) {
    // Bir sonraki sekmere geç
    const nextTab = tabOrder[currentIndex + 1]
    activeTab.value = nextTab
    scrollToSection(nextTab)
    console.log(`${nextTab} sekmesine geçiliyor...`)
  } else {
    // Son sekmede ise kaydet ve kapat
    console.log('Wizard tamamlandı, kaydediliyor...')
    emit('save', formData.value)
    closeWizard()
  }
}

const closeWizard = () => {
  activeTab.value = 'general'
  emit('close')
}

// Switch toggle methods
const togglePriceActive = (index) => {
  formData.value.priceData[index].active = !formData.value.priceData[index].active
  console.log(`Fiyat ${index + 1} aktiflik durumu:`, formData.value.priceData[index].active)
}

const toggleCriteriaActive = (index) => {
  formData.value.searchCriteria[index].active = !formData.value.searchCriteria[index].active
  console.log(`Kriter ${index + 1} aktiflik durumu:`, formData.value.searchCriteria[index].active)
}

const toggleCriteriaGuarantee = (index) => {
  formData.value.searchCriteria[index].guarantee = formData.value.searchCriteria[index].guarantee > 2 ? '2' : '3'
  console.log(`Kriter ${index + 1} garanti durumu:`, formData.value.searchCriteria[index].guarantee)
}

const toggleActionActive = (index) => {
  formData.value.actionData[index].active = !formData.value.actionData[index].active
  console.log(`Aksiyon ${index + 1} aktiflik durumu:`, formData.value.actionData[index].active)
}

const toggleKickBackActive = (index) => {
  formData.value.kickBackData[index].active = !formData.value.kickBackData[index].active
  console.log(`Kick Back ${index + 1} aktiflik durumu:`, formData.value.kickBackData[index].active)
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Tab transitions */
.tab-enter-active, .tab-leave-active {
  transition: opacity 0.3s;
}

.tab-enter-from, .tab-leave-to {
  opacity: 0;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
</style> 
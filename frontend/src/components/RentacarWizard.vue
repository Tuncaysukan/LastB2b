<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-hidden">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0"/>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">Yeni Araç Ekle</h2>
                <p class="text-orange-100 text-sm">Araç kiralama bilgilerini eksiksiz doldurun</p>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:text-orange-200 transition-colors">
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
          
          <!-- Genel Bilgiler Bölümü -->
          <div id="general" class="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-orange-800 mb-4">Genel Bilgiler</h3>
            
            <!-- Durum Toggles -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-white p-3 rounded-lg border">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Durum</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="formData.status" type="checkbox" class="sr-only">
                    <div :class="formData.status ? 'bg-orange-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
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
                  <span class="text-sm font-medium text-gray-700">Müsait</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="formData.available" type="checkbox" class="sr-only">
                    <div :class="formData.available ? 'bg-green-600' : 'bg-gray-200'" class="relative w-8 h-4 bg-gray-200 rounded-full transition-colors">
                      <div :class="formData.available ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0 left-0 bg-white w-4 h-4 rounded-full transition-transform"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Temel Bilgiler -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Araç Adı</label>
                <input v-model="formData.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Araç adını giriniz">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                <select v-model="formData.brand" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Marka Seçin</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Ford">Ford</option>
                  <option value="Renault">Renault</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Audi">Audi</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input v-model="formData.model" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Model giriniz">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Plaka</label>
                <input v-model="formData.plate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="34 ABC 123">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Yıl</label>
                <input v-model="formData.year" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="2023">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Araç Grubu</label>
                <select v-model="formData.group" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Grup Seçin</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Kompakt">Kompakt</option>
                  <option value="Orta">Orta</option>
                  <option value="Büyük">Büyük</option>
                  <option value="Lüks">Lüks</option>
                  <option value="SUV">SUV</option>
                  <option value="Minivan">Minivan</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Araç Detayları Bölümü -->
          <div id="details" class="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-blue-800 mb-4">Araç Detayları</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Yakıt Tipi</label>
                <select v-model="formData.fuelType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Yakıt Seçin</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Dizel">Dizel</option>
                  <option value="Hibrit">Hibrit</option>
                  <option value="Elektrik">Elektrik</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Vites Tipi</label>
                <select v-model="formData.transmission" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Vites Seçin</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Otomatik">Otomatik</option>
                  <option value="Yarı Otomatik">Yarı Otomatik</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Koltuk Sayısı</label>
                <input v-model="formData.seats" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="5">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kapı Sayısı</label>
                <input v-model="formData.doors" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="4">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Renk</label>
                <input v-model="formData.color" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Beyaz">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Motor Hacmi</label>
                <input v-model="formData.engineSize" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="1.6">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kilometre</label>
                <input v-model="formData.mileage" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="50000">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Klima</label>
                <select v-model="formData.airCondition" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Klima Seçin</option>
                  <option value="Var">Var</option>
                  <option value="Yok">Yok</option>
                  <option value="Otomatik">Otomatik</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Fiyat Bilgileri Bölümü -->
          <div id="pricing" class="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-green-800 mb-4">Fiyat Bilgileri</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Günlük Fiyat (TL)</label>
                <input v-model="formData.dailyPrice" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="250">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Haftalık Fiyat (TL)</label>
                <input v-model="formData.weeklyPrice" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Aylık Fiyat (TL)</label>
                <input v-model="formData.monthlyPrice" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="5000">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Depozito (TL)</label>
                <input v-model="formData.deposit" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1000">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
                <select v-model="formData.currency" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="TL">TL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat Tipi</label>
                <select v-model="formData.priceType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="Sabit">Sabit</option>
                  <option value="Değişken">Değişken</option>
                  <option value="Sezonluk">Sezonluk</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Şube Bilgileri Bölümü -->
          <div id="branch" class="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-purple-800 mb-4">Şube Bilgileri</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Şube Adı</label>
                <input v-model="formData.branchName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Atatürk Havalimanı Şubesi">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                <select v-model="formData.city" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Şehir Seçin</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Antalya">Antalya</option>
                  <option value="Bursa">Bursa</option>
                </select>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                <textarea v-model="formData.address" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Şube adresi"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input v-model="formData.phone" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="+90 212 123 45 67">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input v-model="formData.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="sube@rentacar.com">
              </div>
            </div>
          </div>

          <!-- Ek Hizmetler Bölümü -->
          <div id="services" class="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-teal-800 mb-4">Ek Hizmetler</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="font-medium text-gray-700">Dahil Edilen Hizmetler</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input v-model="formData.services.gps" type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500">
                    <span class="ml-2 text-sm text-gray-700">GPS Navigasyon</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="formData.services.childSeat" type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500">
                    <span class="ml-2 text-sm text-gray-700">Çocuk Koltuğu</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="formData.services.additionalDriver" type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500">
                    <span class="ml-2 text-sm text-gray-700">Ek Sürücü</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="formData.services.wifi" type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500">
                    <span class="ml-2 text-sm text-gray-700">WiFi</span>
                  </label>
                </div>
              </div>
              
              <div class="space-y-4">
                <h4 class="font-medium text-gray-700">Ücretli Ek Hizmetler</h4>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Havalimanı Teslimat Ücreti</label>
                    <input v-model="formData.services.airportDeliveryFee" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="50">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Otel Teslimat Ücreti</label>
                    <input v-model="formData.services.hotelDeliveryFee" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="75">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Temizlik Ücreti</label>
                    <input v-model="formData.services.cleaningFee" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="100">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sigorta Bilgileri Bölümü -->
          <div id="insurance" class="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-red-800 mb-4">Sigorta Bilgileri</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="font-medium text-gray-700">Temel Sigorta</h4>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Kasko Sigortası</label>
                    <select v-model="formData.insurance.comprehensive" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="">Seçin</option>
                      <option value="full">Tam Kasko</option>
                      <option value="partial">Kısmi Kasko</option>
                      <option value="none">Yok</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Trafik Sigortası</label>
                    <select v-model="formData.insurance.traffic" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="included">Dahil</option>
                      <option value="extra">Ek Ücretli</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <h4 class="font-medium text-gray-700">Ek Sigorta Seçenekleri</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input v-model="formData.insurance.theft" type="checkbox" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                    <span class="ml-2 text-sm text-gray-700">Hırsızlık Sigortası</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="formData.insurance.personalAccident" type="checkbox" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                    <span class="ml-2 text-sm text-gray-700">Kişisel Kaza Sigortası</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="formData.insurance.roadside" type="checkbox" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                    <span class="ml-2 text-sm text-gray-700">Yol Yardım</span>
                  </label>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Muafiyet Tutarı (TL)</label>
                  <input v-model="formData.insurance.deductible" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="2000">
                </div>
              </div>
            </div>
          </div>

          <!-- Resim Yönetimi Bölümü -->
          <div id="images" class="bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-indigo-800 mb-4">Resim Yönetimi</h3>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ana Resim</label>
                <div class="flex items-center space-x-4">
                  <div class="w-32 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <button type="button" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                      Resim Seç
                    </button>
                    <p class="text-xs text-gray-500 mt-1">JPG, PNG (Max: 5MB)</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Galeri Resimleri</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div v-for="i in 8" :key="i" class="w-full h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Özel Şartlar Bölümü -->
          <div id="conditions" class="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-yellow-800 mb-4">Özel Şartlar</h3>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Yaş</label>
                  <input v-model="formData.conditions.minAge" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="21">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Ehliyet Yaşı</label>
                  <input v-model="formData.conditions.minLicenseAge" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="2">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Günlük KM Limiti</label>
                  <input v-model="formData.conditions.dailyKmLimit" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="300">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Fazla KM Ücreti (TL/km)</label>
                  <input v-model="formData.conditions.extraKmFee" type="number" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="0.50">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kiralama Şartları</label>
                <textarea v-model="formData.conditions.rentalTerms" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Kiralama ile ilgili özel şartlar ve kurallar..."></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">İptal Koşulları</label>
                <textarea v-model="formData.conditions.cancellationPolicy" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="İptal ve iade koşulları..."></textarea>
              </div>
              
              <div class="space-y-2">
                <h4 class="font-medium text-gray-700">Ek Gereksinimler</h4>
                <label class="flex items-center">
                  <input v-model="formData.conditions.creditCardRequired" type="checkbox" class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500">
                  <span class="ml-2 text-sm text-gray-700">Kredi Kartı Zorunlu</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.conditions.internationalLicense" type="checkbox" class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500">
                  <span class="ml-2 text-sm text-gray-700">Uluslararası Ehliyet Gerekli</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.conditions.oneWayRental" type="checkbox" class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500">
                  <span class="ml-2 text-sm text-gray-700">Tek Yön Kiralama Mümkün</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div class="flex space-x-3">
            <button @click="resetForm" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Sıfırla
            </button>
            <button @click="saveDraft" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
              Taslak Kaydet
            </button>
          </div>
          <div class="flex space-x-3">
            <button @click="closeWizard" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              İptal
            </button>
            <button @click="saveAndNext" class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center">
              <span>{{ currentTab === tabs.length - 1 ? 'Kaydet' : 'Kaydet & İleri' }}</span>
              <svg v-if="currentTab < tabs.length - 1" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
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

// Tab definitions
const tabs = ref([
  { id: 'general', title: 'Genel Bilgiler' },
  { id: 'details', title: 'Araç Detayları' },
  { id: 'pricing', title: 'Fiyat Bilgileri' },
  { id: 'branch', title: 'Şube Bilgileri' },
  { id: 'services', title: 'Ek Hizmetler' },
  { id: 'insurance', title: 'Sigorta' },
  { id: 'images', title: 'Resimler' },
  { id: 'conditions', title: 'Özel Şartlar' }
])

// Current active tab
const currentTab = ref(0)

// Form data
const formData = ref({
  // Genel Bilgiler
  status: true,
  publish: true,
  b2cPublish: false,
  availability: true,
  
  // Araç Detayları
  brand: '',
  model: '',
  plate: '',
  year: '',
  group: '',
  fuelType: '',
  transmission: '',
  seats: '',
  doors: '',
  color: '',
  engineSize: '',
  mileage: '',
  airConditioning: true,
  
  // Fiyat Bilgileri
  dailyPrice: '',
  weeklyPrice: '',
  monthlyPrice: '',
  deposit: '',
  currency: 'TRY',
  priceType: '',
  
  // Şube Bilgileri
  branchName: '',
  city: '',
  address: '',
  phone: '',
  email: '',
  
  // Ek Hizmetler
  services: {
    gps: false,
    childSeat: false,
    additionalDriver: false,
    wifi: false,
    airportDeliveryFee: '',
    hotelDeliveryFee: '',
    cleaningFee: ''
  },
  
  // Sigorta Bilgileri
  insurance: {
    comprehensive: '',
    traffic: 'included',
    theft: false,
    personalAccident: false,
    roadside: false,
    deductible: ''
  },
  
  // Özel Şartlar
  conditions: {
    minAge: '',
    minLicenseAge: '',
    dailyKmLimit: '',
    extraKmFee: '',
    rentalTerms: '',
    cancellationPolicy: '',
    creditCardRequired: false,
    internationalLicense: false,
    oneWayRental: false
  }
})

// Methods
const getTabClass = (tabId) => {
  const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)
  const isActive = tabIndex === currentTab.value
  
  if (isActive) {
    return 'border-orange-500 text-orange-600 bg-orange-50'
  } else {
    return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  }
}

const scrollToSection = (tabId) => {
  const element = document.getElementById(tabId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    // currentTab'i güncelle
    const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)
    if (tabIndex !== -1) {
      currentTab.value = tabIndex
    }
  }
}

const saveDraft = () => {
  console.log('Taslak kaydedildi:', formData.value)
}

const resetForm = () => {
  // Form verilerini sıfırla
  formData.value = {
    status: true,
    publish: false,
    b2cPublish: true,
    available: true,
    name: '',
    brand: '',
    model: '',
    plate: '',
    year: '',
    group: '',
    fuelType: '',
    transmission: '',
    seats: '',
    doors: '',
    color: '',
    engineSize: '',
    mileage: '',
    airCondition: '',
    dailyPrice: '',
    weeklyPrice: '',
    monthlyPrice: '',
    deposit: '',
    currency: 'TL',
    priceType: 'Sabit',
    branchName: '',
    city: '',
    address: '',
    phone: '',
    email: ''
  }
  
  // İlk tab'a dön
  currentTab.value = 0
  scrollToSection('general')
}

const saveRentacar = () => {
  console.log('Araç kaydedildi:', formData.value)
  emit('save', formData.value)
  closeWizard()
}

const saveAndNext = () => {
  // Son tab'daysa kaydet ve kapat
  if (currentTab.value === tabs.value.length - 1) {
    saveRentacar()
  } else {
    // Sonraki tab'a geç
    currentTab.value++
    const nextTabId = tabs.value[currentTab.value].id
    scrollToSection(nextTabId)
  }
}

const closeWizard = () => {
  // Wizard kapatılırken currentTab'i sıfırla
  currentTab.value = 0
  emit('close')
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

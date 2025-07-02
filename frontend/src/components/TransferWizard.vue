<template>
  <div class="transfer-wizard-container">

    <div v-if="loading" class="py-10 text-center">
      <p class="text-gray-600">Yükleniyor...</p>
    </div>

    <div v-else class="form-container">
      <form @submit.prevent="saveTransfer">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Temel Bilgiler -->
          <div class="form-section bg-white p-5 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Temel Bilgiler</h3>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="form-group">
                <label for="transferCode" class="block text-sm font-medium text-gray-700 mb-1">Transfer Kodu <span class="text-red-500">*</span></label>
                <input
                  id="transferCode"
                  v-model="transfer.code"
                  type="text"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                  :readonly="isEditMode"
                  :class="{'bg-gray-100': isEditMode}"
                />
              </div>
              
              <div class="form-group">
                <label for="transferStatus" class="block text-sm font-medium text-gray-700 mb-1">Durum <span class="text-red-500">*</span></label>
                <select
                  id="transferStatus"
                  v-model="transfer.status"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Onaylandı">Onaylandı</option>
                  <option value="Beklemede">Beklemede</option>
                  <option value="İptal">İptal</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="transferDate" class="block text-sm font-medium text-gray-700 mb-1">Transfer Tarihi <span class="text-red-500">*</span></label>
                <input
                  id="transferDate"
                  v-model="transfer.date"
                  type="date"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="transferTime" class="block text-sm font-medium text-gray-700 mb-1">Transfer Saati <span class="text-red-500">*</span></label>
                <input
                  id="transferTime"
                  v-model="transfer.time"
                  type="time"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Lokasyon Bilgileri -->
          <div class="form-section bg-white p-5 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Lokasyon Bilgileri</h3>
            
            <div class="form-group mb-4">
              <label for="transferFrom" class="block text-sm font-medium text-gray-700 mb-1">Nereden <span class="text-red-500">*</span></label>
              <input
                id="transferFrom"
                v-model="transfer.from"
                type="text"
                class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Havalimanı, otel, adres vb."
                required
              />
            </div>
            
            <div class="form-group mb-4">
              <label for="transferTo" class="block text-sm font-medium text-gray-700 mb-1">Nereye <span class="text-red-500">*</span></label>
              <input
                id="transferTo"
                v-model="transfer.to"
                type="text"
                class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Havalimanı, otel, adres vb."
                required
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="distance" class="block text-sm font-medium text-gray-700 mb-1">Mesafe (km)</label>
                <input
                  id="distance"
                  v-model.number="transfer.distance"
                  type="number"
                  min="0"
                  step="0.1"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div class="form-group">
                <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Tahmini Süre (dk)</label>
                <input
                  id="duration"
                  v-model.number="transfer.duration"
                  type="number"
                  min="0"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Müşteri Bilgileri -->
          <div class="form-section bg-white p-5 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Müşteri Bilgileri</h3>
            
            <div class="form-group mb-4">
              <label for="customerName" class="block text-sm font-medium text-gray-700 mb-1">Müşteri Adı <span class="text-red-500">*</span></label>
              <input
                id="customerName"
                v-model="transfer.customer.name"
                type="text"
                class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="form-group">
                <label for="customerPhone" class="block text-sm font-medium text-gray-700 mb-1">Telefon <span class="text-red-500">*</span></label>
                <input
                  id="customerPhone"
                  v-model="transfer.customer.phone"
                  type="text"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="customerEmail" class="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input
                  id="customerEmail"
                  v-model="transfer.customer.email"
                  type="email"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="customerNotes" class="block text-sm font-medium text-gray-700 mb-1">Özel Notlar</label>
              <textarea
                id="customerNotes"
                v-model="transfer.customer.notes"
                rows="3"
                class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- Araç Bilgileri -->
          <div class="form-section bg-white p-5 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Araç Bilgileri</h3>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="form-group">
                <label for="vehicleType" class="block text-sm font-medium text-gray-700 mb-1">Araç Tipi <span class="text-red-500">*</span></label>
                <select
                  id="vehicleType"
                  v-model="transfer.vehicle.type"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Minivan">Minivan</option>
                  <option value="Otobüs">Otobüs</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="vehicleConfig" class="block text-sm font-medium text-gray-700 mb-1">Konfigürasyon <span class="text-red-500">*</span></label>
                <select
                  id="vehicleConfig"
                  v-model="transfer.vehicle.configuration"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Standart">Standart</option>
                  <option value="Business">Business</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="capacity" class="block text-sm font-medium text-gray-700 mb-1">Yolcu Kapasitesi <span class="text-red-500">*</span></label>
                <input
                  id="capacity"
                  v-model.number="transfer.vehicle.capacity"
                  type="number"
                  min="1"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="luggage" class="block text-sm font-medium text-gray-700 mb-1">Bagaj Kapasitesi</label>
                <input
                  id="luggage"
                  v-model.number="transfer.vehicle.luggage"
                  type="number"
                  min="0"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Ödeme Bilgileri -->
          <div class="form-section bg-white p-5 rounded-lg shadow col-span-1 md:col-span-2">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Ödeme Bilgileri</h3>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="form-group">
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Fiyat <span class="text-red-500">*</span></label>
                <input
                  id="price"
                  v-model.number="transfer.price"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">Para Birimi <span class="text-red-500">*</span></label>
                <select
                  id="currency"
                  v-model="transfer.currency"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="paymentStatus" class="block text-sm font-medium text-gray-700 mb-1">Ödeme Durumu <span class="text-red-500">*</span></label>
                <select
                  id="paymentStatus"
                  v-model="transfer.paymentStatus"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Ödendi">Ödendi</option>
                  <option value="Beklemede">Beklemede</option>
                  <option value="İptal">İptal</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-1">Ödeme Yöntemi</label>
                <select
                  id="paymentMethod"
                  v-model="transfer.paymentMethod"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="Nakit">Nakit</option>
                  <option value="Kredi Kartı">Kredi Kartı</option>
                  <option value="Havale/EFT">Havale/EFT</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Ek Bilgiler -->
          <div class="form-section bg-white p-5 rounded-lg shadow col-span-1 md:col-span-2">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Ek Bilgiler</h3>
            
            <div class="grid grid-cols-1 gap-4">
              <div class="form-group mb-4">
                <label for="operationalNotes" class="block text-sm font-medium text-gray-700 mb-1">Operasyon Notları</label>
                <textarea
                  id="operationalNotes"
                  v-model="transfer.operationalNotes"
                  rows="3"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="driverInfo" class="block text-sm font-medium text-gray-700 mb-1">Sürücü Bilgileri</label>
                <input
                  id="driverInfo"
                  v-model="transfer.driverInfo"
                  type="text"
                  class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="İsim ve telefon"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions mt-6 flex justify-end space-x-3">
          <button type="button" @click="cancel" class="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded">
            İptal
          </button>
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
            {{ isEditMode ? 'Güncelle' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferWizard',
  emits: ['saved', 'cancelled'],
  props: {
    transferId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      loading: false,
      isEditMode: false,
      transfer: {
        id: null,
        code: '',
        status: 'Beklemede',
        date: this.formatDate(new Date()),
        time: this.formatTime(new Date()),
        bookingDate: '',
        from: '',
        to: '',
        distance: 0,
        duration: 0,
        price: 0,
        currency: 'TRY',
        paymentStatus: 'Beklemede',
        paymentMethod: '',
        paymentDate: '',
        operationalNotes: '',
        driverInfo: '',
        customer: {
          name: '',
          phone: '',
          email: '',
          notes: ''
        },
        vehicle: {
          type: 'Sedan',
          configuration: 'Standart',
          capacity: 4,
          luggage: 3
        }
      }
    };
  },
  methods: {
    formatDate(date) {
      return date.toISOString().split('T')[0];
    },
    formatTime(date) {
      return date.toTimeString().slice(0, 5);
    },
    loadTransferData() {
      if (!this.transferId) {
        // Yeni transfer ekleme modundayız
        this.isEditMode = false;
        return;
      }
      
      this.loading = true;
      this.isEditMode = true;
      
      // Simüle edilmiş API çağrısı - gerçek uygulamada bu kısma axios isteği eklenecek
      setTimeout(() => {
        // Örnek veri - backend entegrasyonu yapıldığında kaldırılacak
        this.transfer = {
          id: this.transferId,
          code: `TR${this.transferId.toString().padStart(4, '0')}`,
          status: 'Onaylandı',
          date: '2025-05-19',
          time: '14:30',
          bookingDate: '15.04.2025 10:23',
          from: 'İstanbul Airport (IST)',
          to: 'Taksim Meydanı, İstanbul',
          distance: 42,
          duration: 45,
          price: 500,
          currency: 'TRY',
          paymentStatus: 'Ödendi',
          paymentMethod: 'Kredi Kartı',
          paymentDate: '15.04.2025',
          operationalNotes: 'VIP karşılama hizmeti dahildir.',
          driverInfo: 'Ahmet Yılmaz - 0532 123 45 67',
          customer: {
            name: 'Mehmet Öztürk',
            phone: '+90 555 987 65 43',
            email: 'mehmet@example.com',
            notes: 'Havalimanında karşılanacak.'
          },
          vehicle: {
            type: 'Sedan',
            configuration: 'Business',
            capacity: 4,
            luggage: 3
          }
        };
        
        this.loading = false;
      }, 1000);
    },
    cancel() {
      this.$emit('cancelled');
    },
    saveTransfer() {
      this.loading = true;
      
      // Simüle edilmiş API çağrısı - gerçek uygulamada bu kısma axios isteği eklenecek
      setTimeout(() => {
        // Başarılı kaydetme/güncelleme sonrası
        this.loading = false;
        
        // Kaydetme işlemi başarılı olduğunda bildirim göster ve modal'ı kapat
        alert(`Transfer başarıyla ${this.isEditMode ? 'güncellendi' : 'kaydedildi'}.`);
        this.$emit('saved');
      }, 1000);
    },
    generateTransferCode() {
      // Yeni transfer için otomatik kod oluşturma
      if (!this.isEditMode && !this.transfer.code) {
        const prefix = 'TR';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.transfer.code = `${prefix}${randomNum}`;
      }
    }
  },
  mounted() {
    this.loadTransferData();
    this.generateTransferCode();
  }
};
</script>

<style scoped>
.transfer-wizard-container {
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.form-section {
  transition: all 0.3s ease;
}

.form-section:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
}
</style>

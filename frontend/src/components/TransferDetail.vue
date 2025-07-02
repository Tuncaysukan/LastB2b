<template>
  <div class="transfer-detail-container">
    <div class="header flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Transfer Detayı #{{ transferId }}</h2>
      <div class="flex space-x-2">
        <button @click="goBack" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          <i class="fas fa-arrow-left mr-1"></i> Geri
        </button>
        <button @click="editTransfer" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          <i class="fas fa-edit mr-1"></i> Düzenle
        </button>
        <button @click="printTransfer" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          <i class="fas fa-print mr-1"></i> Yazdır
        </button>
      </div>
    </div>

    <div v-if="loading" class="py-10 text-center">
      <p class="text-gray-600">Yükleniyor...</p>
    </div>

    <div v-else-if="error" class="py-10 text-center">
      <p class="text-red-600">{{ error }}</p>
      <button @click="loadTransferDetails" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Tekrar Dene
      </button>
    </div>

    <div v-else class="transfer-details grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="basic-info bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Temel Bilgiler</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="info-item">
            <p class="text-gray-600 text-sm">Transfer Kodu</p>
            <p class="font-medium">{{ transfer.code }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Durum</p>
            <p :class="getStatusClass(transfer.status)">{{ transfer.status }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Transfer Tarihi</p>
            <p class="font-medium">{{ transfer.date }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Transfer Saati</p>
            <p class="font-medium">{{ transfer.time }}</p>
          </div>
          <div class="info-item col-span-2">
            <p class="text-gray-600 text-sm">Rezervasyon Tarihi</p>
            <p class="font-medium">{{ transfer.bookingDate }}</p>
          </div>
        </div>
      </div>

      <div class="location-info bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Lokasyon Bilgileri</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="info-item col-span-2">
            <p class="text-gray-600 text-sm">Nereden</p>
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>
              <p class="font-medium">{{ transfer.from }}</p>
            </div>
          </div>
          <div class="info-item col-span-2">
            <p class="text-gray-600 text-sm">Nereye</p>
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>
              <p class="font-medium">{{ transfer.to }}</p>
            </div>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Mesafe</p>
            <p class="font-medium">{{ transfer.distance }} km</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Tahmini Süre</p>
            <p class="font-medium">{{ transfer.duration }} dakika</p>
          </div>
        </div>
      </div>

      <div class="customer-info bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Müşteri Bilgileri</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="info-item col-span-2">
            <p class="text-gray-600 text-sm">Müşteri Adı</p>
            <p class="font-medium">{{ transfer.customer.name }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Telefon</p>
            <p class="font-medium">{{ transfer.customer.phone }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">E-posta</p>
            <p class="font-medium">{{ transfer.customer.email }}</p>
          </div>
          <div class="info-item col-span-2">
            <p class="text-gray-600 text-sm">Özel Notlar</p>
            <p class="font-medium">{{ transfer.customer.notes || 'Not bulunmuyor' }}</p>
          </div>
        </div>
      </div>

      <div class="vehicle-info bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Araç Bilgileri</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="info-item">
            <p class="text-gray-600 text-sm">Araç Tipi</p>
            <p class="font-medium">{{ transfer.vehicle.type }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Konfigürasyon</p>
            <p class="font-medium">{{ transfer.vehicle.configuration }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Yolcu Kapasitesi</p>
            <p class="font-medium">{{ transfer.vehicle.capacity }} kişi</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Bagaj Kapasitesi</p>
            <p class="font-medium">{{ transfer.vehicle.luggage }} parça</p>
          </div>
        </div>
      </div>

      <div class="payment-info bg-white p-4 rounded-lg shadow col-span-2">
        <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Ödeme Bilgileri</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="info-item">
            <p class="text-gray-600 text-sm">Fiyat</p>
            <p class="font-medium">{{ transfer.price }} {{ transfer.currency }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Ödeme Durumu</p>
            <p :class="getPaymentStatusClass(transfer.paymentStatus)">{{ transfer.paymentStatus }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Ödeme Yöntemi</p>
            <p class="font-medium">{{ transfer.paymentMethod }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Ödeme Tarihi</p>
            <p class="font-medium">{{ transfer.paymentDate || 'Ödeme yapılmadı' }}</p>
          </div>
        </div>
      </div>

      <div class="additional-info bg-white p-4 rounded-lg shadow col-span-2">
        <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Ek Bilgiler</h3>
        <div class="grid grid-cols-1 gap-4">
          <div class="info-item">
            <p class="text-gray-600 text-sm">Operasyon Notları</p>
            <p class="font-medium">{{ transfer.operationalNotes || 'Not bulunmuyor' }}</p>
          </div>
          <div class="info-item">
            <p class="text-gray-600 text-sm">Sürücü Bilgileri</p>
            <p class="font-medium">{{ transfer.driverInfo || 'Henüz atanmadı' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferDetail',
  props: {
    transferId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      transfer: {
        id: null,
        code: '',
        status: '',
        date: '',
        time: '',
        bookingDate: '',
        from: '',
        to: '',
        distance: 0,
        duration: 0,
        price: 0,
        currency: 'TRY',
        paymentStatus: '',
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
          type: '',
          configuration: '',
          capacity: 0,
          luggage: 0
        }
      }
    };
  },
  methods: {
    loadTransferDetails() {
      this.loading = true;
      this.error = null;

      // Simüle edilmiş API çağrısı - gerçek uygulamada bu kısma axios isteği eklenecek
      setTimeout(() => {
        // Örnek veri - backend entegrasyonu yapıldığında kaldırılacak
        this.transfer = {
          id: this.transferId,
          code: `TR${this.transferId.toString().padStart(4, '0')}`,
          status: 'Onaylandı',
          date: '19.05.2025',
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
    goBack() {
      this.$router.push('/dashboard/transfer');
    },
    editTransfer() {
      this.$router.push(`/dashboard/transfer/edit/${this.transferId}`);
    },
    printTransfer() {
      window.print();
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case 'onaylandı':
          return 'text-green-600 font-medium';
        case 'beklemede':
          return 'text-yellow-600 font-medium';
        case 'iptal':
          return 'text-red-600 font-medium';
        default:
          return 'font-medium';
      }
    },
    getPaymentStatusClass(status) {
      switch (status.toLowerCase()) {
        case 'ödendi':
          return 'text-green-600 font-medium';
        case 'beklemede':
          return 'text-yellow-600 font-medium';
        case 'iptal':
          return 'text-red-600 font-medium';
        default:
          return 'font-medium';
      }
    }
  },
  mounted() {
    this.loadTransferDetails();
  }
};
</script>

<style scoped>
.transfer-detail-container {
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

@media print {
  .header button {
    display: none;
  }
}
</style>

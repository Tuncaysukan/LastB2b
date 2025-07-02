<template>
  <div class="transfer-list-container">
    <div class="header flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Private Transfer Listesi</h2>
      <div class="flex space-x-2">
        <button @click="openNewTransferModal" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Yeni Transfer Ekle
        </button>
        <button @click="refreshList" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          <i class="fas fa-sync-alt"></i> Yenile
        </button>
      </div>
    </div>

    <div class="description mb-4">
      <p class="text-gray-700">Bu alanda Private Transfer Listesini görebilirsiniz ve düzenleyebilirsiniz.</p>
      <p class="text-red-500 text-sm">Transfer modülünü kullanabilmek için şirket ayarlarınızı etkinleştirmeniz gerekiyor.</p>
    </div>

    <div class="filters grid grid-cols-2 gap-4 mb-4">
      <div class="left-filters">
        <div class="flex space-x-2 items-center">
          <label class="w-20">Arama:</label>
          <input v-model="filters.search" type="text" class="border px-2 py-1 rounded flex-grow" placeholder="Arama yapın...">
        </div>
      </div>
      <div class="right-filters flex justify-end space-x-4">
        <div class="flex items-center space-x-2">
          <label>Göster:</label>
          <select v-model="pagination.perPage" class="border px-2 py-1 rounded">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>kayıt</span>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-10 px-2 py-2 border"></th>
            <th class="w-12 px-2 py-2 border">Kod</th>
            <th class="px-4 py-2 border">Nereden</th>
            <th class="px-4 py-2 border">Nereye</th>
            <th class="px-4 py-2 border">Tarih</th>
            <th class="px-4 py-2 border">Durum</th>
            <th class="px-4 py-2 border">Müşteri</th>
            <th class="px-4 py-2 border">Ücret</th>
            <th class="px-4 py-2 border">Para Birimi</th>
            <th class="px-4 py-2 border">Konfigürasyon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transfer, index) in transfers" :key="transfer.id" class="hover:bg-gray-50">
            <td class="px-2 py-2 border">
              <input type="checkbox" v-model="selectedTransfers" :value="transfer.id">
            </td>
            <td class="px-2 py-2 border">{{ transfer.code }}</td>
            <td class="px-4 py-2 border">{{ transfer.from }}</td>
            <td class="px-4 py-2 border">{{ transfer.to }}</td>
            <td class="px-4 py-2 border">{{ transfer.date }}</td>
            <td class="px-4 py-2 border">
              <span :class="getStatusClass(transfer.status)">{{ transfer.status }}</span>
            </td>
            <td class="px-4 py-2 border">{{ transfer.customer }}</td>
            <td class="px-4 py-2 border text-right">{{ transfer.price }}</td>
            <td class="px-4 py-2 border">{{ transfer.currency }}</td>
            <td class="px-4 py-2 border">
              <div class="flex space-x-1">
                <button @click="editTransfer(transfer)" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteTransfer(transfer)" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">
                  <i class="fas fa-trash"></i>
                </button>
                <button @click="viewTransferDetail(transfer)" class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="transfers.length === 0">
            <td colspan="10" class="px-4 py-2 text-center border">Kayıt bulunamadı</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination flex justify-between items-center mt-4">
      <div class="pagination-info">
        Gösterilen: {{ pagination.from }} - {{ pagination.to }} / {{ pagination.total }} kayıt
      </div>
      <div class="pagination-controls flex space-x-2">
        <button 
          @click="changePage(1)" 
          :disabled="pagination.currentPage === 1"
          class="px-3 py-1 border rounded"
          :class="pagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
        >
          1
        </button>
        <button 
          v-if="pagination.currentPage > 3" 
          class="px-3 py-1 border rounded"
        >...</button>
        <button 
          v-for="page in visiblePageNumbers" 
          :key="page"
          @click="changePage(page)"
          class="px-3 py-1 border rounded"
          :class="pagination.currentPage === page ? 'bg-blue-500 text-white' : ''"
        >
          {{ page }}
        </button>
        <button 
          v-if="pagination.currentPage < pagination.lastPage - 2" 
          class="px-3 py-1 border rounded"
        >...</button>
        <button 
          v-if="pagination.lastPage > 1"
          @click="changePage(pagination.lastPage)" 
          :disabled="pagination.currentPage === pagination.lastPage"
          class="px-3 py-1 border rounded"
          :class="pagination.currentPage === pagination.lastPage ? 'opacity-50 cursor-not-allowed' : ''"
        >
          {{ pagination.lastPage }}
        </button>
      </div>
    </div>
  </div>

  <!-- Transfer Ekleme/Düzenleme Modalı -->
  <div v-if="showTransferModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl max-h-90vh overflow-y-auto">
      <div class="modal-header border-b px-6 py-3 flex justify-between items-center">
        <h3 class="text-lg font-medium">{{ editingTransferId ? 'Transfer Düzenle' : 'Yeni Transfer Ekle' }}</h3>
        <button @click="closeTransferModal" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body p-6">
        <TransferWizard 
          :transferId="editingTransferId" 
          @saved="onTransferSaved" 
          @cancelled="closeTransferModal" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import TransferWizard from './TransferWizard.vue';

export default {
  name: 'TransferList',
  components: {
    TransferWizard
  },
  data() {
    return {
      showTransferModal: false,
      editingTransferId: null,
      transfers: [
        // Örnek veriler - gerçek API entegrasyonunda kaldırılacak
        { 
          id: 1, 
          code: '001', 
          from: 'Türkiye', 
          to: 'İstanbul Airport', 
          date: '19.05.2025',
          status: 'Onaylandı', 
          customer: 'Ahmet Yılmaz', 
          price: 500.00,
          currency: 'TRY',
          configuration: 'Sedan'
        },
        { 
          id: 2, 
          code: '002', 
          from: 'Türkiye', 
          to: 'Sabiha Gökçen Airport', 
          date: '20.05.2025',
          status: 'Beklemede', 
          customer: 'Ayşe Demir', 
          price: 450.00,
          currency: 'TRY',
          configuration: 'SUV'
        },
        { 
          id: 3, 
          code: '003', 
          from: 'Türkiye', 
          to: 'Antalya Havalimanı', 
          date: '21.05.2025',
          status: 'İptal', 
          customer: 'Mehmet Kaya', 
          price: 600.00,
          currency: 'TRY',
          configuration: 'VIP'
        },
      ],
      selectedTransfers: [],
      filters: {
        search: '',
        status: '',
        dateRange: null
      },
      pagination: {
        currentPage: 1,
        perPage: 10,
        from: 1,
        to: 10,
        total: 100,
        lastPage: 10
      }
    };
  },
  computed: {
    visiblePageNumbers() {
      const currentPage = this.pagination.currentPage;
      const lastPage = this.pagination.lastPage;
      const pages = [];
      
      if (lastPage <= 7) {
        // Toplam sayfa sayısı az ise hepsini göster
        for (let i = 2; i < lastPage; i++) {
          pages.push(i);
        }
      } else {
        // Aksi takdirde akıllı bir aralık göster
        if (currentPage <= 4) {
          for (let i = 2; i <= 5; i++) {
            pages.push(i);
          }
        } else if (currentPage >= lastPage - 3) {
          for (let i = lastPage - 4; i < lastPage; i++) {
            pages.push(i);
          }
        } else {
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
        }
      }
      
      return pages;
    }
  },
  methods: {
    fetchTransfers() {
      // API'den transfer verilerini çekme işlemi
      // Gerçek bir backend bağlantısı eklenecek
      console.log('Transfer verileri çekiliyor...');
      
      // API entegrasyonu gerçekleştiğinde burada axios ile veri çekilecek
      // this.transfers = response.data.transfers;
      // this.pagination = response.data.pagination;
    },
    openNewTransferModal() {
      this.editingTransferId = null;
      this.showTransferModal = true;
    },
    
    closeTransferModal() {
      this.showTransferModal = false;
      this.editingTransferId = null;
    },
    
    onTransferSaved() {
      this.closeTransferModal();
      this.fetchTransfers();
    },
    editTransfer(transfer) {
      this.editingTransferId = transfer.id;
      this.showTransferModal = true;
    },
    deleteTransfer(transfer) {
      if (confirm(`${transfer.code} kodlu transfer kaydını silmek istediğinizden emin misiniz?`)) {
        // API'ye silme isteği gönderme
        console.log(`Transfer #${transfer.id} siliniyor...`);
        // Başarılı olursa listeden kaldır
        this.transfers = this.transfers.filter(t => t.id !== transfer.id);
      }
    },
    viewTransferDetail(transfer) {
      this.$router.push(`/dashboard/transfer/${transfer.id}`);
    },
    refreshList() {
      this.fetchTransfers();
    },
    changePage(page) {
      this.pagination.currentPage = page;
      this.fetchTransfers();
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case 'onaylandı':
          return 'text-green-600';
        case 'beklemede':
          return 'text-yellow-600';
        case 'iptal':
          return 'text-red-600';
        default:
          return '';
      }
    }
  },
  mounted() {
    this.fetchTransfers();
  }
};
</script>

<style scoped>
.transfer-list-container {
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.max-h-90vh {
  max-height: 90vh;
}
</style>

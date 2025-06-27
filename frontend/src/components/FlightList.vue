<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <!-- Header Section -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Uçuş Listesi</h2>
          <p class="text-gray-600 mt-1">Sistemdeki tüm uçuşları görüntüleyin ve yönetin</p>
        </div>
        <button
          @click="openNewFlightWizard"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Yeni Uçuş Ekle</span>
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Arama</label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Uçuş ara..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Havayolu</label>
          <select
            v-model="selectedAirline"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tüm Havayolları</option>
            <option value="Turkish Airlines">Turkish Airlines</option>
            <option value="Pegasus">Pegasus</option>
            <option value="SunExpress">SunExpress</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Durum</label>
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tüm Durumlar</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded">
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Uçuş Kodu
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Havayolu
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Güzergah
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarih
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Süre
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sağlayıcı
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="flight in filteredFlights"
            :key="flight.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                v-model="selectedFlights"
                :value="flight.id"
                class="rounded"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="viewFlightDetail(flight)"
                class="text-green-600 hover:text-green-800 font-medium cursor-pointer"
              >
                {{ flight.flightCode }}
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-8 w-8">
                  <img class="h-8 w-8 rounded-full" :src="flight.airlineLogo" :alt="flight.airline" />
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">{{ flight.airline }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ flight.route }}</div>
              <div class="text-sm text-gray-500">{{ flight.airports }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ flight.date }}</div>
              <div class="text-sm text-gray-500">{{ flight.time }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ flight.duration }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ flight.provider }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  flight.status === 'Aktif'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                ]"
              >
                {{ flight.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex space-x-2">
                <button
                  @click="editFlight(flight)"
                  class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                  title="Düzenle"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  @click="duplicateFlight(flight)"
                  class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                  title="Kopyala"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button
                  @click="deleteFlight(flight)"
                  class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                  title="Sil"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Toplam {{ filteredFlights.length }} uçuş gösteriliyor
      </div>
      <div class="flex space-x-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-2 text-sm rounded',
            currentPage === page
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- Social Media Icons -->
    <div class="mt-6 flex justify-center space-x-4">
      <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      </a>
      <a href="#" class="text-blue-700 hover:text-blue-900 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
        </svg>
      </a>
      <a href="#" class="text-pink-600 hover:text-pink-800 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.752-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
        </svg>
      </a>
      <a href="#" class="text-red-600 hover:text-red-800 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
      <a href="#" class="text-green-600 hover:text-green-800 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      </a>
      <a href="#" class="text-green-800 hover:text-green-900 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </a>
      <a href="#" class="text-red-700 hover:text-red-900 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      </a>
      <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      </a>
    </div>

    <!-- Flight Wizard Component -->
    <FlightWizard
      :showWizard="showWizard"
      :editingFlight="editingFlight"
      @close="closeWizard"
      @save="saveFlight"
    />

    <!-- Flight Detail Component -->
    <FlightDetail
      :showDetail="showDetail"
      :flight="selectedFlight"
      @close="closeDetail"
      @edit="editFlightFromDetail"
    />
  </div>
</template>

<script>
import FlightWizard from './FlightWizard.vue'
import FlightDetail from './FlightDetail.vue'

export default {
  name: 'FlightList',
  components: {
    FlightWizard,
    FlightDetail
  },
  data() {
    return {
      searchTerm: '',
      selectedAirline: '',
      selectedStatus: '',
      selectAll: false,
      selectedFlights: [],
      currentPage: 1,
      itemsPerPage: 10,
      showWizard: false,
      showDetail: false,
      editingFlight: null,
      selectedFlight: null,
      flights: [
        {
          id: 1,
          flightCode: 'TK1001',
          airline: 'Turkish Airlines',
          airlineLogo: 'https://via.placeholder.com/32/e53e3e/ffffff?text=TK',
          route: 'İstanbul → Paris',
          airports: 'IST → CDG',
          date: '2024-01-15',
          time: '10:30 - 14:45',
          duration: '4s 15dk',
          provider: 'Turkish Airlines',
          status: 'Aktif',
          price: '€450'
        },
        {
          id: 2,
          flightCode: 'PC2052',
          airline: 'Pegasus',
          airlineLogo: 'https://via.placeholder.com/32/f59e0b/ffffff?text=PC',
          route: 'İstanbul → Londra',
          airports: 'SAW → LHR',
          date: '2024-01-16',
          time: '16:20 - 19:35',
          duration: '4s 15dk',
          provider: 'Pegasus',
          status: 'Aktif',
          price: '£320'
        },
        {
          id: 3,
          flightCode: 'XQ150',
          airline: 'SunExpress',
          airlineLogo: 'https://via.placeholder.com/32/f97316/ffffff?text=XQ',
          route: 'Antalya → Düsseldorf',
          airports: 'AYT → DUS',
          date: '2024-01-17',
          time: '08:45 - 13:10',
          duration: '4s 25dk',
          provider: 'SunExpress',
          status: 'Aktif',
          price: '€380'
        },
        {
          id: 4,
          flightCode: 'TK1845',
          airline: 'Turkish Airlines',
          airlineLogo: 'https://via.placeholder.com/32/e53e3e/ffffff?text=TK',
          route: 'İstanbul → Frankfurt',
          airports: 'IST → FRA',
          date: '2024-01-18',
          time: '14:25 - 17:50',
          duration: '4s 25dk',
          provider: 'Turkish Airlines',
          status: 'Pasif',
          price: '€420'
        },
        {
          id: 5,
          flightCode: 'PC1205',
          airline: 'Pegasus',
          airlineLogo: 'https://via.placeholder.com/32/f59e0b/ffffff?text=PC',
          route: 'İzmir → Amsterdam',
          airports: 'ADB → AMS',
          date: '2024-01-19',
          time: '11:15 - 15:40',
          duration: '4s 25dk',
          provider: 'Pegasus',
          status: 'Aktif',
          price: '€360'
        }
      ]
    }
  },
  computed: {
    filteredFlights() {
      let filtered = this.flights

      if (this.searchTerm) {
        filtered = filtered.filter(flight =>
          flight.flightCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          flight.airline.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          flight.route.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }

      if (this.selectedAirline) {
        filtered = filtered.filter(flight => flight.airline === this.selectedAirline)
      }

      if (this.selectedStatus) {
        filtered = filtered.filter(flight => flight.status === this.selectedStatus)
      }

      return filtered
    },
    totalPages() {
      return Math.ceil(this.filteredFlights.length / this.itemsPerPage)
    }
  },
  methods: {
    openNewFlightWizard() {
      this.editingFlight = null
      this.showWizard = true
    },
    editFlight(flight) {
      this.editingFlight = { ...flight }
      this.showWizard = true
    },
    editFlightFromDetail(flight) {
      this.closeDetail()
      this.editFlight(flight)
    },
    duplicateFlight(flight) {
      const newFlight = {
        ...flight,
        id: Date.now(),
        flightCode: flight.flightCode + '_COPY',
        status: 'Pasif'
      }
      this.flights.push(newFlight)
    },
    deleteFlight(flight) {
      if (confirm(`${flight.flightCode} kodlu uçuşu silmek istediğinizden emin misiniz?`)) {
        this.flights = this.flights.filter(t => t.id !== flight.id)
      }
    },
    viewFlightDetail(flight) {
      this.selectedFlight = flight
      this.showDetail = true
    },
    closeWizard() {
      this.showWizard = false
      this.editingFlight = null
    },
    closeDetail() {
      this.showDetail = false
      this.selectedFlight = null
    },
    saveFlight(flightData) {
      if (this.editingFlight) {
        const index = this.flights.findIndex(t => t.id === this.editingFlight.id)
        if (index !== -1) {
          this.flights[index] = { ...this.flights[index], ...flightData }
        }
      } else {
        const newFlight = {
          id: Date.now(),
          flightCode: `FL${Date.now().toString().slice(-4)}`,
          airline: 'Turkish Airlines',
          airlineLogo: 'https://via.placeholder.com/32/e53e3e/ffffff?text=TK',
          route: 'İstanbul → Paris',
          airports: 'IST → CDG',
          date: new Date().toLocaleDateString('tr-TR'),
          time: '10:30 - 14:45',
          duration: '4s 15dk',
          provider: 'Turkish Airlines',
          status: 'Aktif',
          price: '€450',
          ...flightData
        }
        this.flights.push(newFlight)
      }
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedFlights = this.filteredFlights.map(flight => flight.id)
      } else {
        this.selectedFlights = []
      }
    },
    clearFilters() {
      this.searchTerm = ''
      this.selectedAirline = ''
      this.selectedStatus = ''
    }
  }
}
</script> 
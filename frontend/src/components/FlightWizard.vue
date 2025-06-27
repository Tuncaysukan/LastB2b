<template>
  <div v-if="showWizard" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <h2 class="text-2xl font-bold">{{ isEditing ? 'Uçuş Düzenle' : 'Yeni Uçuş Ekle' }}</h2>
        <p class="text-green-100 mt-1">Uçuş bilgilerini düzenleyin</p>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-gray-200 bg-gray-50">
        <nav class="flex space-x-8 px-6" aria-label="Tabs">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            @click="activeTab = index"
            :class="[
              activeTab === index
                ? 'border-green-500 text-green-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <!-- Hava Alanları Yönetimi -->
        <div v-if="activeTab === 0">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Hava Alanları Yönetimi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">IATA Kodu</label>
              <input
                v-model="formData.airports.iataCode"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="IST"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Havaalanı İsmi</label>
              <input
                v-model="formData.airports.airportName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="İstanbul Havalimanı"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
              <select
                v-model="formData.airports.country"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Ülke Seçin</option>
                <option value="Türkiye">Türkiye</option>
                <option value="Almanya">Almanya</option>
                <option value="Fransa">Fransa</option>
                <option value="İngiltere">İngiltere</option>
                <option value="ABD">ABD</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
              <input
                v-model="formData.airports.city"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="İstanbul"
              />
            </div>
          </div>
          <button
            @click="addAirport"
            class="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Havaalanı Ekle
          </button>

          <!-- Airports Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Düzenle</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IATA Kodu</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Havaalanı İsmi</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ülke</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Şehir</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="airport in airportsList" :key="airport.id">
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-cog"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airport.iataCode }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airport.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airport.country }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airport.city }}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Hava Yolları Yönetimi -->
        <div v-if="activeTab === 1">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Hava Yolları Yönetimi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Havayolu Kodu</label>
              <input
                v-model="formData.airlines.airlineCode"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="TK"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Havayolu İsmi</label>
              <input
                v-model="formData.airlines.airlineName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Turkish Airlines"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
              <select
                v-model="formData.airlines.country"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Ülke Seçin</option>
                <option value="Türkiye">Türkiye</option>
                <option value="Almanya">Almanya</option>
                <option value="Fransa">Fransa</option>
                <option value="İngiltere">İngiltere</option>
                <option value="ABD">ABD</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
              <input
                v-model="formData.airlines.city"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="İstanbul"
              />
            </div>
          </div>
          <button
            @click="addAirline"
            class="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Havayolu Ekle
          </button>

          <!-- Airlines Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Düzenle</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Havayolu Kodu</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Havayolu İsmi</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ülke</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Şehir</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="airline in airlinesList" :key="airline.id">
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-cog"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airline.code }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airline.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airline.country }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ airline.city }}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Terminal Yönetimi -->
        <div v-if="activeTab === 2">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Terminal Yönetimi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Havalimanı</label>
              <select
                v-model="formData.terminals.airport"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Havalimanı Seçin</option>
                <option value="İstanbul Havalimanı">İstanbul Havalimanı</option>
                <option value="Sabiha Gökçen Havalimanı">Sabiha Gökçen Havalimanı</option>
                <option value="Çukurova Havalimanı">Çukurova Havalimanı</option>
                <option value="Esenboğa Havalimanı">Esenboğa Havalimanı</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Terminal</label>
              <input
                v-model="formData.terminals.terminal"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="İç Hatlar"
              />
            </div>
          </div>
          <button
            @click="addTerminal"
            class="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Terminal Ekle
          </button>

          <!-- Terminals Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Düzenle</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Havalimanı</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Terminal</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="terminal in terminalsList" :key="terminal.id">
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-cog"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ terminal.airport }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ terminal.terminal }}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Uçak Yönetimi -->
        <div v-if="activeTab === 3">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Uçak Yönetimi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Uçak Tipi</label>
              <input
                v-model="formData.aircraft.aircraftType"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="BOG737"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Uçak Adı</label>
              <input
                v-model="formData.aircraft.aircraftName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Boeing 737-800"
              />
            </div>
          </div>
          <button
            @click="addAircraft"
            class="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Uçak Ekle
          </button>

          <!-- Aircraft Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Düzenle</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uçak Tipi</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uçak Adı</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="aircraft in aircraftList" :key="aircraft.id">
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-cog"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ aircraft.type }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ aircraft.name }}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Koltuk Sınıfı Yönetimi -->
        <div v-if="activeTab === 4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Koltuk Sınıfı Yönetimi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sınıf Kodu</label>
              <input
                v-model="formData.seatClasses.classCode"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="A"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sınıf Adı</label>
              <input
                v-model="formData.seatClasses.className"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="First Class"
              />
            </div>
          </div>
          <button
            @click="addSeatClass"
            class="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Sınıf Ekle
          </button>

          <!-- Seat Classes Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Düzenle</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sınıf Kodu</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sınıf Adı</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="seatClass in seatClassesList" :key="seatClass.id">
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-cog"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ seatClass.code }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ seatClass.name }}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between">
        <button
          @click="closeWizard"
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          İptal
        </button>
        <div class="flex space-x-3">
          <button
            v-if="activeTab > 0"
            @click="previousTab"
            class="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Geri
          </button>
          <button
            @click="nextTab"
            class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {{ activeTab === tabs.length - 1 ? 'Kaydet' : 'Kaydet İlerle' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightWizard',
  props: {
    showWizard: {
      type: Boolean,
      default: false
    },
    editingFlight: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        { id: 'airports', name: 'Havaalanları' },
        { id: 'airlines', name: 'Hava Yolları' },
        { id: 'terminals', name: 'Terminaller' },
        { id: 'aircraft', name: 'Uçak Tipi' },
        { id: 'seatClasses', name: 'Koltuk Sınıfları' }
      ],
      formData: {
        airports: {
          iataCode: '',
          airportName: '',
          country: '',
          city: ''
        },
        airlines: {
          airlineCode: '',
          airlineName: '',
          country: '',
          city: ''
        },
        terminals: {
          airport: '',
          terminal: ''
        },
        aircraft: {
          aircraftType: '',
          aircraftName: ''
        },
        seatClasses: {
          classCode: '',
          className: ''
        }
      },
      airportsList: [
        { id: 1, iataCode: 'AAA', name: 'İstanbul Airport', country: 'Türkiye', city: 'İstanbul' },
        { id: 2, iataCode: 'AAB', name: 'Sabiha Gökçen Airport', country: 'Türkiye', city: 'İstanbul' },
        { id: 3, iataCode: 'AAC', name: 'Augsburg Havalimanı', country: 'Almanya', city: 'Altenburg' },
        { id: 4, iataCode: 'AAD', name: 'Aubenas Havalaanı', country: 'Fransa', city: 'Aubenas' },
        { id: 5, iataCode: 'AAE', name: 'Yeni Ercan Havalimanı', country: 'KKTC', city: 'Lefkoşa' }
      ],
      airlinesList: [
        { id: 1, code: 'AAA', name: 'Pegasus Havayolları', country: 'Türkiye', city: 'İstanbul' },
        { id: 2, code: 'AAB', name: 'Türk Hava Yolları', country: 'Türkiye', city: 'İstanbul' },
        { id: 3, code: 'AAC', name: 'Ajet', country: 'Almanya', city: 'Altenburg' },
        { id: 4, code: 'AAD', name: 'Özbekistan Airlines', country: 'Fransa', city: 'Aubenas' },
        { id: 5, code: 'AAE', name: 'FlyKıbrıs', country: 'KKTC', city: 'Lefkoşa' }
      ],
      terminalsList: [
        { id: 1, airport: 'İstanbul Havalimanı', terminal: 'İç Hatlar' },
        { id: 2, airport: 'İstanbul Havalimanı', terminal: 'Dış Hatlar' },
        { id: 3, airport: 'Sabiha Gökçen Havalimanı', terminal: 'İç Hatlar' },
        { id: 4, airport: 'Çukurova Havalimanı', terminal: 'A Class Test' },
        { id: 5, airport: 'Esenboğa Havalimanı', terminal: 'İç Hatlar' }
      ],
      aircraftList: [
        { id: 1, type: 'ANT140', name: 'Antonov An-140' },
        { id: 2, type: 'AIR319', name: 'Airbus A319neo' },
        { id: 3, type: 'BOG737', name: 'Boeing 737-800' },
        { id: 4, type: 'S340', name: 'Saab 340' },
        { id: 5, type: 'ZP', name: 'Paranair' }
      ],
      seatClassesList: [
        { id: 1, code: 'A', name: 'First Class' },
        { id: 2, code: 'B', name: 'Economy Class' },
        { id: 3, code: 'C', name: 'Business Class' },
        { id: 4, code: 'D', name: 'Premium Economy' },
        { id: 5, code: 'E', name: 'Promotion Class' }
      ]
    }
  },
  computed: {
    isEditing() {
      return this.editingFlight !== null
    }
  },
  watch: {
    editingFlight(newVal) {
      if (newVal) {
        this.populateForm(newVal)
      }
    }
  },
  methods: {
    nextTab() {
      if (this.activeTab < this.tabs.length - 1) {
        this.activeTab++
      } else {
        this.saveFlight()
      }
    },
    previousTab() {
      if (this.activeTab > 0) {
        this.activeTab--
      }
    },
    closeWizard() {
      this.$emit('close')
      this.resetForm()
      this.activeTab = 0
    },
    resetForm() {
      this.formData = {
        airports: {
          iataCode: '',
          airportName: '',
          country: '',
          city: ''
        },
        airlines: {
          airlineCode: '',
          airlineName: '',
          country: '',
          city: ''
        },
        terminals: {
          airport: '',
          terminal: ''
        },
        aircraft: {
          aircraftType: '',
          aircraftName: ''
        },
        seatClasses: {
          classCode: '',
          className: ''
        }
      }
    },
    addAirport() {
      if (this.formData.airports.iataCode && this.formData.airports.airportName) {
        const newAirport = {
          id: Date.now(),
          iataCode: this.formData.airports.iataCode,
          name: this.formData.airports.airportName,
          country: this.formData.airports.country,
          city: this.formData.airports.city
        }
        this.airportsList.push(newAirport)
        this.formData.airports = {
          iataCode: '',
          airportName: '',
          country: '',
          city: ''
        }
      }
    },
    addAirline() {
      if (this.formData.airlines.airlineCode && this.formData.airlines.airlineName) {
        const newAirline = {
          id: Date.now(),
          code: this.formData.airlines.airlineCode,
          name: this.formData.airlines.airlineName,
          country: this.formData.airlines.country,
          city: this.formData.airlines.city
        }
        this.airlinesList.push(newAirline)
        this.formData.airlines = {
          airlineCode: '',
          airlineName: '',
          country: '',
          city: ''
        }
      }
    },
    addTerminal() {
      if (this.formData.terminals.airport && this.formData.terminals.terminal) {
        const newTerminal = {
          id: Date.now(),
          airport: this.formData.terminals.airport,
          terminal: this.formData.terminals.terminal
        }
        this.terminalsList.push(newTerminal)
        this.formData.terminals = {
          airport: '',
          terminal: ''
        }
      }
    },
    addAircraft() {
      if (this.formData.aircraft.aircraftType && this.formData.aircraft.aircraftName) {
        const newAircraft = {
          id: Date.now(),
          type: this.formData.aircraft.aircraftType,
          name: this.formData.aircraft.aircraftName
        }
        this.aircraftList.push(newAircraft)
        this.formData.aircraft = {
          aircraftType: '',
          aircraftName: ''
        }
      }
    },
    addSeatClass() {
      if (this.formData.seatClasses.classCode && this.formData.seatClasses.className) {
        const newSeatClass = {
          id: Date.now(),
          code: this.formData.seatClasses.classCode,
          name: this.formData.seatClasses.className
        }
        this.seatClassesList.push(newSeatClass)
        this.formData.seatClasses = {
          classCode: '',
          className: ''
        }
      }
    },
    populateForm(flight) {
      // Form doldurmak için
    },
    saveFlight() {
      const flightData = {
        id: this.isEditing ? this.editingFlight.id : Date.now(),
        ...this.formData
      }
      
      this.$emit('save', flightData)
      this.closeWizard()
    }
  }
}
</script> 
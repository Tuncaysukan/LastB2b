<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out" 
         :class="{ '-translate-x-full lg:translate-x-0': !sidebarOpen, 'translate-x-0': sidebarOpen }">
      
      <!-- Logo Header -->
              <div class="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
            </svg>
          </div>
          <span class="text-white font-bold text-lg">B2B Prime Tur</span>
        </div>
      </div>

      <!-- Menu Items -->
      <nav class="mt-4 px-3">
        <div class="space-y-1">
          <SidebarMenuItem 
            v-for="item in menuItems" 
            :key="item.id"
            :item="item"
            :active-menu="activeMenu"
            @click="setActiveMenu(item.id)"
          />
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-4 py-3">
          <!-- Mobile menu button -->
          <button @click="toggleSidebar" class="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- Breadcrumb -->
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-4">
              <li>
                <div>
                  <a href="#" class="text-gray-400 hover:text-gray-500">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                  </a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="ml-4 text-sm font-medium text-gray-900">{{ getActiveMenuTitle() }}</span>
                </div>
              </li>
            </ol>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 12V7a3.5 3.5 0 117 0v5M4 12h16"/>
              </svg>
            </button>
            
            <!-- Profile -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">AD</span>
              </div>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-gray-900">Admin User</p>
                <p class="text-xs text-gray-500">admin@b2bprimetr.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Buttons (sadece Ürünler sayfasında veya kategori seçildiğinde görünür) -->
        <div v-if="activeMenu === 'products' || selectedCategory" class="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div class="flex flex-wrap gap-2">
            <CategoryButton 
              v-for="category in productCategories" 
              :key="category.id"
              :category="category"
              :active="selectedCategory === category.id"
              @click="setActiveCategory(category.id)"
            />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <!-- Anasayfa -->
        <DashboardHome v-if="activeMenu === 'home'" />
        
        <!-- Ürünler Ana Sayfası -->
        <ProductsGrid v-else-if="activeMenu === 'products' && !selectedCategory" :category="'all'" />
        
        <!-- Otel Listesi Sayfası -->
        <HotelList v-else-if="selectedCategory === 'hotel'" />
        
        <!-- Tur Listesi Sayfası -->
        <TourList v-else-if="selectedCategory === 'tour'" />
        
        <!-- Uçuş Listesi Sayfası -->
        <FlightList v-else-if="selectedCategory === 'flight'" />
        
        <!-- Transfer Listesi Sayfası -->
        <TransferList v-else-if="selectedCategory === 'transfer'" />
        
        <!-- Diğer Kategori Sayfaları -->
        <ProductsGrid v-else-if="selectedCategory" :category="selectedCategory" />
        
        <!-- Diğer Sayfalar -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">{{ getActiveMenuTitle() }}</h3>
          <p class="mt-1 text-sm text-gray-500">Bu sayfa henüz geliştirilme aşamasında.</p>
        </div>
      </main>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" @click="closeSidebar" class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"></div>

    <!-- Tour Type Selection Modal -->
    <div v-if="showTourTypeModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeTourTypeModal"></div>
      
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-lg bg-white rounded-lg shadow-xl transform transition-all">
          
          <!-- Header -->
          <div class="bg-red-500 text-white px-6 py-4 rounded-t-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold">Yeni Tur Ekle</h3>
                <p class="text-red-100 text-sm mt-1">Tur bilgilerini eksiksiz doldurun</p>
              </div>
              <button @click="closeTourTypeModal" class="text-white hover:bg-red-600 rounded p-1 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-4">
            <!-- Tur Seçenekleri -->
            <div class="flex flex-wrap justify-center gap-3">
              <button 
                @click="openTourWizard('daily')"
                class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Günübirlik / Konaklamalı
              </button>
              
              <button 
                @click="openTourWizard('activity')"
                class="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Aktivite
              </button>
              
              <button 
                @click="openTourWizard('package')"
                class="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors text-sm font-medium"
              >
                Seyehat Paketi
              </button>
              
              <button 
                @click="openTourWizard('private')"
                class="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Özel Tur
              </button>
              
              <button 
                @click="openTourWizard('health')"
                class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm font-medium border-2 border-red-700"
              >
                Sağlık Paketleri
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tour Wizards -->
    <TourWizard 
      :isOpen="showDailyTourWizard"
      @close="closeDailyTourWizard"
      @save="saveDailyTour"
    />
    
    <ActivityWizard 
      :isOpen="showActivityWizard"
      @close="closeActivityWizard"
      @save="saveActivity"
    />
    
    <TravelPackageWizard 
      :isOpen="showPackageWizard"
      @close="closePackageWizard"
      @save="savePackage"
    />
    
    <PrivateTourWizard 
      :isOpen="showPrivateTourWizard"
      @close="closePrivateTourWizard"
      @save="savePrivateTour"
    />
    
    <HealthTourWizard 
      :isOpen="showHealthWizard"
      @close="closeHealthWizard"
      @save="saveHealthTour"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarMenuItem from '@/components/SidebarMenuItem.vue'
import CategoryButton from '@/components/CategoryButton.vue'
import DashboardHome from '@/components/DashboardHome.vue'
import ProductsGrid from '@/components/ProductsGrid.vue'
import HotelList from '@/components/HotelList.vue'
import TourList from '@/components/TourList.vue'
import FlightList from '@/components/FlightList.vue'
import TransferList from '@/components/TransferList.vue'
import TourWizard from '@/components/TourWizard.vue'
import ActivityWizard from '@/components/ActivityWizard.vue'
import TravelPackageWizard from '@/components/TravelPackageWizard.vue'
import PrivateTourWizard from '@/components/PrivateTourWizard.vue'
import HealthTourWizard from '@/components/HealthTourWizard.vue'

// Reactive data
const sidebarOpen = ref(false)
const activeMenu = ref('home')
const selectedCategory = ref(null) // null = Ana sayfalar, string = Seçili kategori

// Tour Wizard States
const showTourTypeModal = ref(false)
const showDailyTourWizard = ref(false)
const showActivityWizard = ref(false)
const showPackageWizard = ref(false)
const showPrivateTourWizard = ref(false)
const showHealthWizard = ref(false)

// Menu items
const menuItems = ref([
  { id: 'home', title: 'Anasayfa', icon: 'home' },
  { id: 'sales', title: 'Satış', icon: 'chart-bar' },
  { id: 'products', title: 'Ürünler', icon: 'cube' },
  { id: 'pricing', title: 'Fiyat Kuralları', icon: 'currency-dollar' },
  { id: 'operations', title: 'Operasyon', icon: 'cog' },
  { id: 'finance', title: 'Finans Muhasebe', icon: 'calculator' },
  { id: 'agencies', title: 'Acenteler', icon: 'office-building' },
  { id: 'reports', title: 'Raporlar', icon: 'chart-pie' },
  { id: 'designs', title: 'Tasarımlar', icon: 'color-swatch' },
  { id: 'management', title: 'Yönetim', icon: 'users' },
  { id: 'definitions', title: 'Tanımlamalar', icon: 'adjustments' },
  { id: 'members', title: 'Üyeler', icon: 'user-group' },
  { id: 'b2c', title: 'B2C Yönetimi', icon: 'shopping-cart' },
  { id: 'crm', title: 'CRM Yönetimi', icon: 'phone' },
  { id: 'modules', title: 'Modüller', icon: 'puzzle' },
  { id: 'api', title: 'Api & Xml', icon: 'code' }
])

// Product categories
const productCategories = ref([
  { id: 'hotel', title: 'Otel', color: 'red' },
  { id: 'tour', title: 'Tur', color: 'blue' },
  { id: 'flight', title: 'Uçak', color: 'green' },
  { id: 'transfer', title: 'Transfer', color: 'purple' },
  { id: 'activity', title: 'Aktivite', color: 'yellow' },
  { id: 'rentacar', title: 'Rentacar', color: 'indigo' },
  { id: 'dynamic', title: 'Dinamik Paket', color: 'pink' },
  { id: 'tailormade', title: 'Tailormade', color: 'gray' },
  { id: 'visa', title: 'Vize', color: 'orange' },
  { id: 'health', title: 'Sağlık', color: 'teal' },
  { id: 'bus', title: 'Otobüs', color: 'cyan' }
])

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const setActiveMenu = (menuId) => {
  activeMenu.value = menuId
  selectedCategory.value = null // Menü değişince kategori seçimini sıfırla
  closeSidebar()
}

const setActiveCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const getActiveMenuTitle = () => {
  const menu = menuItems.value.find(item => item.id === activeMenu.value)
  return menu ? menu.title : 'Dashboard'
}

// Tour Type Modal Methods
const openTourTypeModal = () => {
  showTourTypeModal.value = true
}

const closeTourTypeModal = () => {
  showTourTypeModal.value = false
}

// Tour Wizard Methods
const openTourWizard = (type) => {
  closeTourTypeModal()
  
  switch(type) {
    case 'daily':
      showDailyTourWizard.value = true
      break
    case 'activity':
      showActivityWizard.value = true
      break
    case 'package':
      showPackageWizard.value = true
      break
    case 'private':
      showPrivateTourWizard.value = true
      break
    case 'health':
      showHealthWizard.value = true
      break
  }
}

// Daily Tour Wizard
const closeDailyTourWizard = () => {
  showDailyTourWizard.value = false
}

const saveDailyTour = (data) => {
  console.log('Günübirlik/Konaklamalı Tur Saved:', data)
  // API call yapılacak
}

// Activity Wizard
const closeActivityWizard = () => {
  showActivityWizard.value = false
}

const saveActivity = (data) => {
  console.log('Aktivite Saved:', data)
  // API call yapılacak
}

// Package Wizard
const closePackageWizard = () => {
  showPackageWizard.value = false
}

const savePackage = (data) => {
  console.log('Seyehat Paketi Saved:', data)
  // API call yapılacak
}

// Private Tour Wizard
const closePrivateTourWizard = () => {
  showPrivateTourWizard.value = false
}

const savePrivateTour = (data) => {
  console.log('Özel Tur Saved:', data)
  // API call yapılacak
}

// Health Tour Wizard
const closeHealthWizard = () => {
  showHealthWizard.value = false
}

const saveHealthTour = (data) => {
  console.log('Sağlık Paketi Saved:', data)
  // API call yapılacak
}

// Expose openTourTypeModal to global scope for ActionButtons
window.openTourTypeModal = openTourTypeModal
</script>

<style scoped>
/* Custom scrollbar for sidebar */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: #f1f1f1;
}

nav::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style> 
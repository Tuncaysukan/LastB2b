<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out" 
         :class="{ '-translate-x-full lg:translate-x-0': !sidebarOpen, 'translate-x-0': sidebarOpen }">
      
      <!-- Logo Header -->
      <div class="flex items-center justify-center h-16 px-4 bg-brand-gradient">
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
              <div class="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarMenuItem from '@/components/SidebarMenuItem.vue'
import CategoryButton from '@/components/CategoryButton.vue'
import DashboardHome from '@/components/DashboardHome.vue'
import ProductsGrid from '@/components/ProductsGrid.vue'
import HotelList from '@/components/HotelList.vue'

// Reactive data
const sidebarOpen = ref(false)
const activeMenu = ref('home')
const selectedCategory = ref(null) // null = Ana sayfalar, string = Seçili kategori

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
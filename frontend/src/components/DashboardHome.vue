<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl shadow-soft text-white p-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Hoş Geldiniz! 👋</h1>
          <p class="text-brand-100 text-lg">B2B Prime Tur CRM Sistemi</p>
          <p class="text-brand-200 text-sm mt-1">Son giriş: {{ new Date().toLocaleDateString('tr-TR') }}</p>
        </div>
        <div class="hidden md:block">
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop" 
               alt="Dashboard" class="w-32 h-32 rounded-lg opacity-20" />
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        v-for="stat in stats" 
        :key="stat.id"
        :stat="stat"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sales Chart -->
      <div class="bg-white rounded-xl shadow-soft p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Aylık Satış Grafiği</h3>
          <select class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
            <option>Son 6 Ay</option>
            <option>Son 12 Ay</option>
          </select>
        </div>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p class="text-gray-500">Grafik burada gösterilecek</p>
        </div>
      </div>

      <!-- Popular Products -->
      <div class="bg-white rounded-xl shadow-soft p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Popüler Ürünler</h3>
        <div class="space-y-4">
          <div v-for="product in popularProducts" :key="product.id" 
               class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <img :src="product.image" :alt="product.name" 
                 class="w-12 h-12 rounded-lg object-cover" />
            <div class="ml-4 flex-1">
              <h4 class="text-sm font-medium text-gray-900">{{ product.name }}</h4>
              <p class="text-xs text-gray-500">{{ product.bookings }} rezervasyon</p>
            </div>
            <span class="text-sm font-medium text-brand-600">{{ formatPrice(product.revenue) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white rounded-xl shadow-soft p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
        <button class="text-sm text-brand-600 hover:text-brand-700 font-medium">Tümünü Gör</button>
      </div>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" 
             class="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="flex-shrink-0">
            <div :class="getActivityIconClass(activity.type)" 
                 class="w-10 h-10 rounded-full flex items-center justify-center">
              <component :is="getActivityIcon(activity.type)" class="w-5 h-5" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm text-gray-900">{{ activity.description }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.date) }}</p>
          </div>
          <span :class="getActivityBadgeClass(activity.status)" 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {{ activity.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatsCard from '@/components/StatsCard.vue'
import { 
  UserIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon 
} from '@heroicons/vue/24/outline'

// Sample data
const stats = ref([
  {
    id: 1,
    title: 'Toplam Rezervasyon',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    color: 'blue',
    icon: 'shopping-bag'
  },
  {
    id: 2,
    title: 'Aylık Gelir',
    value: '₺1,248,500',
    change: '+8%',
    trend: 'up',
    color: 'green',
    icon: 'currency-dollar'
  },
  {
    id: 3,
    title: 'Aktif Müşteri',
    value: '847',
    change: '+15%',
    trend: 'up',
    color: 'purple',
    icon: 'user'
  },
  {
    id: 4,
    title: 'Tamamlanan Tur',
    value: '1,235',
    change: '+5%',
    trend: 'up',
    color: 'orange',
    icon: 'check-circle'
  }
])

const popularProducts = ref([
  {
    id: 1,
    name: 'Crystal Admiral Resort',
    bookings: 45,
    revenue: 125000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Kapadokya Turu',
    bookings: 32,
    revenue: 85000,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73b15?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Antalya Transfer',
    bookings: 67,
    revenue: 45000,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop'
  }
])

const recentActivities = ref([
  {
    id: 1,
    description: 'Yeni otel rezervasyonu: Crystal Admiral Resort',
    date: new Date(Date.now() - 1000 * 60 * 30),
    type: 'booking',
    status: 'Onaylandı'
  },
  {
    id: 2,
    description: 'Müşteri Ahmet Yılmaz profil bilgilerini güncelledi',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: 'user',
    status: 'Tamamlandı'
  },
  {
    id: 3,
    description: 'Kapadokya Turu için ödeme alındı',
    date: new Date(Date.now() - 1000 * 60 * 60 * 4),
    type: 'payment',
    status: 'Başarılı'
  }
])

// Helper methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}

const formatDate = (date) => {
  return new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto' }).format(
    Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}

const getActivityIcon = (type) => {
  const icons = {
    booking: ShoppingBagIcon,
    user: UserIcon,
    payment: CurrencyDollarIcon
  }
  return icons[type] || CheckCircleIcon
}

const getActivityIconClass = (type) => {
  const classes = {
    booking: 'bg-blue-100 text-blue-600',
    user: 'bg-purple-100 text-purple-600',
    payment: 'bg-green-100 text-green-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const getActivityBadgeClass = (status) => {
  const classes = {
    'Onaylandı': 'bg-green-100 text-green-800',
    'Tamamlandı': 'bg-blue-100 text-blue-800',
    'Başarılı': 'bg-green-100 text-green-800',
    'Bekliyor': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script> 
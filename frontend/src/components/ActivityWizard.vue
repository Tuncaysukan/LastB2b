<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeWizard"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-4xl bg-white rounded-lg shadow-xl transform transition-all">
        
        <!-- Header -->
        <div class="bg-green-500 text-white px-6 py-4 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="text-2xl">🎯</div>
              <div>
                <h3 class="text-xl font-semibold">Aktivite Oluştur</h3>
                <p class="text-green-100 text-sm mt-1">Spor ve macera aktiviteleri</p>
              </div>
            </div>
            <button @click="closeWizard" class="text-white hover:bg-green-600 rounded p-1 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Aktivite Adı</label>
              <input type="text" v-model="activityData.name" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Paraşüt Atlama">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Aktivite Türü</label>
              <select v-model="activityData.type" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Su Sporları</option>
                <option>Hava Sporları</option>
                <option>Dağcılık</option>
                <option>Macera</option>
                <option>Kültürel</option>
                <option>Doğa</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Zorluk Seviyesi</label>
              <select v-model="activityData.difficulty" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Kolay</option>
                <option>Orta</option>
                <option>Zor</option>
                <option>Uzman</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Süre (Saat)</label>
              <input type="number" v-model="activityData.duration" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="3">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Yaş Sınırı</label>
              <input type="text" v-model="activityData.ageLimit" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="18+">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Katılımcı</label>
              <input type="number" v-model="activityData.minParticipants" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Maksimum Katılımcı</label>
              <input type="number" v-model="activityData.maxParticipants" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="10">
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Aktivite Lokasyonu</label>
            <input type="text" v-model="activityData.location" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Kaş, Antalya">
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Gerekli Ekipmanlar</label>
            <div class="space-y-2">
              <div v-for="(equipment, index) in activityData.equipment" :key="index" class="flex items-center space-x-2">
                <input type="text" v-model="equipment.name" class="flex-1 border border-gray-200 rounded px-3 py-2 text-sm" :placeholder="`${index + 1}. Ekipman`">
                <div class="flex items-center space-x-2">
                  <label class="text-xs">Dahil</label>
                  <input type="checkbox" v-model="equipment.included" class="w-4 h-4">
                </div>
                <button @click="removeEquipment(index)" class="text-red-500 hover:text-red-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <button @click="addEquipment" class="text-green-500 hover:text-green-700 text-sm flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Ekipman Ekle</span>
              </button>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Güvenlik Bilgileri</label>
            <textarea v-model="activityData.safetyInfo" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Güvenlik önlemleri ve uyarılar..."></textarea>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Aktivite Açıklaması</label>
            <textarea v-model="activityData.description" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Aktivite hakkında detaylı bilgi..."></textarea>
          </div>

          <!-- Pricing Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 class="font-semibold text-gray-700 mb-3">Fiyatlandırma</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Yetişkin Fiyatı</label>
                <input type="number" v-model="activityData.pricing.adult" class="w-full border border-gray-300 rounded px-3 py-2" placeholder="150">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Çocuk Fiyatı</label>
                <input type="number" v-model="activityData.pricing.child" class="w-full border border-gray-300 rounded px-3 py-2" placeholder="100">
              </div>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Para Birimi</label>
              <select v-model="activityData.pricing.currency" class="w-full border border-gray-300 rounded px-3 py-2">
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button @click="closeWizard" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              İptal
            </button>
            <button @click="saveWizard" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Aktivite Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'save'])

// Activity Data
const activityData = ref({
  name: '',
  type: 'Su Sporları',
  difficulty: 'Kolay',
  duration: 3,
  ageLimit: '18+',
  minParticipants: 2,
  maxParticipants: 10,
  location: '',
  equipment: [
    { name: '', included: true }
  ],
  safetyInfo: '',
  description: '',
  pricing: {
    adult: 0,
    child: 0,
    currency: 'TRY'
  }
})

// Methods
const closeWizard = () => {
  // Reset form
  activityData.value = {
    name: '',
    type: 'Su Sporları',
    difficulty: 'Kolay',
    duration: 3,
    ageLimit: '18+',
    minParticipants: 2,
    maxParticipants: 10,
    location: '',
    equipment: [{ name: '', included: true }],
    safetyInfo: '',
    description: '',
    pricing: {
      adult: 0,
      child: 0,
      currency: 'TRY'
    }
  }
  emit('close')
}

const saveWizard = () => {
  emit('save', activityData.value)
  closeWizard()
}

const addEquipment = () => {
  activityData.value.equipment.push({ name: '', included: true })
}

const removeEquipment = (index) => {
  if (activityData.value.equipment.length > 1) {
    activityData.value.equipment.splice(index, 1)
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style> 
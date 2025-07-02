<template>
  <div class="flex items-center space-x-2">
    <!-- Yeni Ekle Button -->
    <button 
      @click="handleNewItem"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-sm"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      {{ newButtonText }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  category: {
    type: String,
    default: 'hotel'
  }
})

const emit = defineEmits(['new-item'])

// Dynamic button text based on category
const categoryTexts = {
  hotel: 'Yeni Otel',
  tour: 'Yeni Tur', 
  flight: 'Yeni Uçuş',
  transfer: 'Yeni Transfer',
  activity: 'Yeni Aktivite',
  rentacar: 'Yeni Araç',
  dynamic: 'Yeni Paket',
  tailormade: 'Yeni Tailormade',
  visa: 'Yeni Vize',
  health: 'Yeni Sağlık',
  bus: 'Yeni Otobüs'
}

const newButtonText = categoryTexts[props.category] || 'Yeni Ekle'

// Handle new item click
const handleNewItem = () => {
  if (props.category === 'tour') {
    // For tour category, open tour type selection modal
    if (window.openTourTypeModal) {
      window.openTourTypeModal()
    }
  } else {
    // For other categories, emit the normal event
    emit('new-item')
  }
}
</script> 
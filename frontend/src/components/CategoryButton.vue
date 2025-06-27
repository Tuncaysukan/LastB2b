<template>
  <button
    @click="$emit('click')"
    class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
    :class="buttonClasses"
  >
    <span class="w-2 h-2 rounded-full mr-2" :class="dotColor"></span>
    {{ category.title }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const colorClasses = {
  red: {
    active: 'bg-red-500 text-white border-red-500 shadow-md',
    inactive: 'bg-white text-red-600 border-red-200 hover:bg-red-50',
    dot: 'bg-red-400'
  },
  blue: {
    active: 'bg-blue-500 text-white border-blue-500 shadow-md',
    inactive: 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50',
    dot: 'bg-blue-400'
  },
  green: {
    active: 'bg-green-500 text-white border-green-500 shadow-md',
    inactive: 'bg-white text-green-600 border-green-200 hover:bg-green-50',
    dot: 'bg-green-400'
  },
  purple: {
    active: 'bg-purple-500 text-white border-purple-500 shadow-md',
    inactive: 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50',
    dot: 'bg-purple-400'
  },
  yellow: {
    active: 'bg-yellow-500 text-white border-yellow-500 shadow-md',
    inactive: 'bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50',
    dot: 'bg-yellow-400'
  },
  indigo: {
    active: 'bg-indigo-500 text-white border-indigo-500 shadow-md',
    inactive: 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50',
    dot: 'bg-indigo-400'
  },
  pink: {
    active: 'bg-pink-500 text-white border-pink-500 shadow-md',
    inactive: 'bg-white text-pink-600 border-pink-200 hover:bg-pink-50',
    dot: 'bg-pink-400'
  },
  gray: {
    active: 'bg-gray-500 text-white border-gray-500 shadow-md',
    inactive: 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
    dot: 'bg-gray-400'
  },
  orange: {
    active: 'bg-orange-500 text-white border-orange-500 shadow-md',
    inactive: 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50',
    dot: 'bg-orange-400'
  },
  teal: {
    active: 'bg-teal-500 text-white border-teal-500 shadow-md',
    inactive: 'bg-white text-teal-600 border-teal-200 hover:bg-teal-50',
    dot: 'bg-teal-400'
  },
  cyan: {
    active: 'bg-cyan-500 text-white border-cyan-500 shadow-md',
    inactive: 'bg-white text-cyan-600 border-cyan-200 hover:bg-cyan-50',
    dot: 'bg-cyan-400'
  }
}

const buttonClasses = computed(() => {
  const color = colorClasses[props.category.color] || colorClasses.gray
  return props.active ? color.active : color.inactive
})

const dotColor = computed(() => {
  const color = colorClasses[props.category.color] || colorClasses.gray
  return props.active ? 'bg-white bg-opacity-80' : color.dot
})
</script> 
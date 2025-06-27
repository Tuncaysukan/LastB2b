<template>
  <div class="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-shadow duration-300">
    <div class="flex items-center">
      <div :class="iconBgClass" class="flex-shrink-0 p-3 rounded-xl">
        <component :is="iconComponent" class="w-6 h-6" :class="iconClass" />
      </div>
      <div class="ml-4 flex-1">
        <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
        <div class="flex items-baseline mt-1">
          <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
          <span v-if="stat.change" :class="changeClass" class="ml-2 flex items-center text-sm font-medium">
            <component :is="trendIcon" class="w-4 h-4 mr-1" />
            {{ stat.change }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  UserIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  stat: {
    type: Object,
    required: true
  }
})

const iconComponents = {
  'user': UserIcon,
  'shopping-bag': ShoppingBagIcon,
  'currency-dollar': CurrencyDollarIcon,
  'check-circle': CheckCircleIcon
}

const iconComponent = computed(() => iconComponents[props.stat.icon] || CheckCircleIcon)

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    icon: 'text-green-600'
  },
  purple: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-100',
    icon: 'text-orange-600'
  },
  red: {
    bg: 'bg-red-100',
    icon: 'text-red-600'
  }
}

const iconBgClass = computed(() => colorClasses[props.stat.color]?.bg || 'bg-gray-100')
const iconClass = computed(() => colorClasses[props.stat.color]?.icon || 'text-gray-600')

const changeClass = computed(() => {
  if (props.stat.trend === 'up') {
    return 'text-green-600'
  } else if (props.stat.trend === 'down') {
    return 'text-red-600'
  }
  return 'text-gray-600'
})

const trendIcon = computed(() => {
  if (props.stat.trend === 'up') {
    return ArrowTrendingUpIcon
  } else if (props.stat.trend === 'down') {
    return ArrowTrendingDownIcon
  }
  return ArrowTrendingUpIcon
})
</script> 
<template>
  <button
    @click="$emit('click')"
    class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
    :class="isActive ? activeClasses : inactiveClasses"
  >
    <!-- Icon -->
    <component :is="iconComponent" class="w-5 h-5 mr-3 flex-shrink-0" />
    
    <!-- Title -->
    <span>{{ item.title }}</span>
    
    <!-- Active indicator -->
    <div v-if="isActive" class="ml-auto w-2 h-2 bg-brand-400 rounded-full"></div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import {
  HomeIcon,
  ChartBarIcon,
  CubeIcon,
  CurrencyDollarIcon,
  CogIcon,
  CalculatorIcon,
  BuildingOfficeIcon,
  ChartPieIcon,
  SwatchIcon,
  UsersIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  PhoneIcon,
  PuzzlePieceIcon,
  CodeBracketIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  activeMenu: {
    type: String,
    required: true
  }
})

defineEmits(['click'])

const isActive = computed(() => props.activeMenu === props.item.id)

const iconComponents = {
  'home': HomeIcon,
  'chart-bar': ChartBarIcon,
  'cube': CubeIcon,
  'currency-dollar': CurrencyDollarIcon,
  'cog': CogIcon,
  'calculator': CalculatorIcon,
  'office-building': BuildingOfficeIcon,
  'chart-pie': ChartPieIcon,
  'color-swatch': SwatchIcon,
  'users': UsersIcon,
  'adjustments': AdjustmentsHorizontalIcon,
  'user-group': UserGroupIcon,
  'shopping-cart': ShoppingCartIcon,
  'phone': PhoneIcon,
  'puzzle': PuzzlePieceIcon,
  'code': CodeBracketIcon
}

const iconComponent = computed(() => iconComponents[props.item.icon] || HomeIcon)

const activeClasses = 'bg-brand-50 text-brand-700 border-l-4 border-brand-500 shadow-sm'
const inactiveClasses = 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent hover:border-gray-200'
</script> 
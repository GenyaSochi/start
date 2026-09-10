<template>
  <div class="category-tabs">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="tab"
      :class="{ active: activeCategory === cat.slug }"
      @click="$emit('select', cat.slug)"
    >
      {{ cat.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/../../shared/types/sushi'

defineProps<{
  categories: Category[]
  activeCategory: string
}>()

defineEmits<{
  (e: 'select', slug: string): void
}>()
</script>

<style scoped>
.category-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 0 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  flex-shrink: 0;
  padding: 10px 22px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.tab:hover {
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.85);
}

.tab.active {
  background: #1a1a1a;
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>

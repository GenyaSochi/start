<template>
  <div class="filter-bar">
    <div class="sort-group">
      <label>Сортировка:</label>
      <select :value="sort" @change="$emit('update:sort', ($event.target as HTMLSelectElement).value)">
        <option value="popular">По популярности</option>
        <option value="price_asc">Сначала дешевле</option>
        <option value="price_desc">Сначала дороже</option>
        <option value="new">По новизне</option>
      </select>
    </div>

    <div class="filter-toggles">
      <button
        class="filter-chip"
        :class="{ active: filters.onlyPromo }"
        @click="$emit('toggle-filter', 'onlyPromo')"
      >
        Акции 🔥
      </button>
      <button
        class="filter-chip"
        :class="{ active: filters.onlySpicy }"
        @click="$emit('toggle-filter', 'onlySpicy')"
      >
        Острые 🌶
      </button>
    </div>

    <div class="price-range">
      <label>Цена:</label>
      <input
        type="number"
        placeholder="от"
        :value="filters.minPrice"
        @input="$emit('update:min-price', Number(($event.target as HTMLInputElement).value) || 0)"
      />
      <span>—</span>
      <input
        type="number"
        placeholder="до"
        :value="filters.maxPrice"
        @input="$emit('update:max-price', Number(($event.target as HTMLInputElement).value) || 0)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sort: string
  filters: {
    onlyPromo: boolean
    onlySpicy: boolean
    minPrice: number | null
    maxPrice: number | null
  }
}>()

defineEmits<{
  (e: 'update:sort', value: string): void
  (e: 'toggle-filter', key: 'onlyPromo' | 'onlySpicy'): void
  (e: 'update:min-price', value: number): void
  (e: 'update:max-price', value: number): void
}>()
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 12px 0 16px;
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-group label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-family: 'Inter', sans-serif;
}

.sort-group select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  cursor: pointer;
}

.sort-group select:focus {
  border-color: rgba(74, 144, 226, 0.5);
}

.filter-toggles {
  display: flex;
  gap: 8px;
}

.filter-chip {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  background: rgba(255, 255, 255, 0.08);
}

.filter-chip.active {
  background: rgba(244, 67, 54, 0.2);
  border-color: rgba(244, 67, 54, 0.5);
  color: rgba(255, 120, 100, 0.95);
}

.price-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.price-range label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-family: 'Inter', sans-serif;
}

.price-range input {
  width: 80px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-family: 'Inter', sans-serif;
  outline: none;
}

.price-range input:focus {
  border-color: rgba(74, 144, 226, 0.5);
}

.price-range span {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .price-range {
    margin-left: 0;
  }
}
</style>

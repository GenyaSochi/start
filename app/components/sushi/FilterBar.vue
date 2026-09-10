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
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
}

.sort-group select {
  padding: 8px 12px;
  background: #1a1a1a;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
  cursor: pointer;
}

.sort-group select:focus {
  border-color: #370000;
}

.filter-toggles {
  display: flex;
  gap: 8px;
}

.filter-chip {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  background: #2a2a2a;
}

.filter-chip.active {
  background: #370000;
  border-color: #370000;
  color: #fff;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.price-range label {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
}

.price-range input {
  width: 80px;
  padding: 8px 10px;
  background: #1a1a1a;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
}

.price-range input:focus {
  border-color: #370000;
}

.price-range span {
  color: rgba(0, 0, 0, 0.3);
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

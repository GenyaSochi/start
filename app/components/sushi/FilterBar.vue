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
      <button class="filter-chip" :class="{ active: filters.onlyPromo }" @click="$emit('toggle-filter', 'onlyPromo')">
        Акции 🔥
      </button>
      <button class="filter-chip" :class="{ active: filters.onlySpicy }" @click="$emit('toggle-filter', 'onlySpicy')">
        Острые 🌶
      </button>
    </div>

    <div class="price-range">
      <label>Цена:</label>
      <input type="number" placeholder="от" :value="filters.minPrice"
        @input="$emit('update:min-price', Number(($event.target as HTMLInputElement).value) || 0)" />
      <span>—</span>
      <input type="number" placeholder="до" :value="filters.maxPrice"
        @input="$emit('update:max-price', Number(($event.target as HTMLInputElement).value) || 0)" />
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
  color: #fff;
  color-scheme: dark;
}

.filter-bar *,
.filter-bar *::before,
.filter-bar *::after {
  box-sizing: border-box;
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-group label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
}

.sort-group select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.sort-group select:focus {
  border-color: rgba(255, 255, 255, 0.4);
}

.filter-toggles {
  display: flex;
  gap: 8px;
}

.filter-chip {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-appearance: none;
  appearance: none;
}

.filter-chip:hover {
  background: rgba(255, 255, 255, 0.12);
}

.filter-chip.active {
  background: rgba(255, 77, 77, 0.9);
  border-color: rgba(255, 77, 77, 0.9);
  color: #fff;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.price-range label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
}

.price-range input {
  width: 80px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: textfield;
}

.price-range input::-webkit-outer-spin-button,
.price-range input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-range input:focus {
  border-color: rgba(255, 255, 255, 0.4);
}

.price-range span {
  color: rgba(255, 255, 255, 0.3);
}

/* Ноутбуки и небольшие десктопы */
@media (max-width: 1024px) {
  .filter-bar {
    gap: 12px;
  }

  .price-range {
    margin-left: 0;
  }
}

/* Планшеты и мобильные */
@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px 0 14px;
  }

  .sort-group {
    width: 100%;
  }

  .sort-group select {
    flex: 1;
    width: 100%;
    padding: 12px 14px;
    font-size: 1rem;
    min-height: 44px;
  }

  .filter-toggles {
    width: 100%;
    flex-wrap: wrap;
  }

  .filter-chip {
    flex: 1;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    padding: 12px 14px;
  }

  .price-range {
    margin-left: 0;
    width: 100%;
  }

  .price-range input {
    flex: 1;
    width: auto;
    min-width: 0;
    padding: 12px 14px;
    font-size: 1rem;
    min-height: 44px;
  }

  .price-range span {
    flex-shrink: 0;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .filter-bar {
    gap: 8px;
  }

  .sort-group label,
  .price-range label {
    font-size: 0.8rem;
  }

  .filter-chip {
    font-size: 0.85rem;
    padding: 10px 10px;
    min-height: 40px;
  }

  .price-range input {
    padding: 10px 10px;
    font-size: 0.9rem;
    min-height: 40px;
  }
}
</style>

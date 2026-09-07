<template>
  <article class="product-card" :class="{ unavailable: !product.is_available }">
    <div class="card-image" @click="$emit('open', product)">
      <img :src="product.image_url" :alt="product.name" loading="lazy" />
      <div class="badges">
        <span v-if="product.is_hit" class="badge hit">Хит</span>
        <span v-if="product.is_new" class="badge new">Новинка</span>
        <span v-if="product.old_price" class="badge sale">Акция</span>
        <span v-if="!product.is_available" class="badge unavailable">Нет в наличии</span>
      </div>
    </div>

    <div class="card-body">
      <h3 class="card-title" @click="$emit('open', product)">{{ product.name }}</h3>
      <p class="card-weight">{{ product.weight }} г</p>

      <div class="card-footer">
        <div class="price-block">
          <span class="price">{{ product.price }} ₽</span>
          <span v-if="product.old_price" class="old-price">{{ product.old_price }} ₽</span>
        </div>

        <div v-if="quantity > 0" class="qty-control">
          <button class="qty-btn" @click="decrease">−</button>
          <span class="qty-value">{{ quantity }}</span>
          <button class="qty-btn" @click="increase">+</button>
        </div>
        <button v-else class="add-btn" :disabled="!product.is_available" @click="increase">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3V15M3 9H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/../../shared/types/sushi'

const props = defineProps<{
  product: Product
  quantity: number
}>()

const emit = defineEmits<{
  (e: 'add', product: Product): void
  (e: 'decrease', product: Product): void
  (e: 'open', product: Product): void
}>()

function increase() {
  if (!props.product.is_available) return
  emit('add', props.product)
}

function decrease() {
  emit('decrease', props.product)
}
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border: none;
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.06),
    inset 0 0 0 2px rgba(74, 144, 226, 0.15),
    0 0 0 1px rgba(74, 144, 226, 0.08);
  position: relative;
}

.product-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(135deg, rgba(74,144,226,0.12), rgba(160,120,255,0.08), transparent 60%);
  opacity: 0.6;
  transition: opacity 0.25s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 32px rgba(74, 144, 226, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.04),
    inset 0 0 0 2px rgba(74, 144, 226, 0.3);
}

.product-card:hover::after {
  opacity: 1;
}

.product-card.unavailable {
  opacity: 0.5;
  pointer-events: none;
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  cursor: pointer;
  background: #f8f9fa;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  z-index: 2;
}

.badge {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.badge.hit {
  background: #ffc107;
  color: #1a1a1a;
}

.badge.new {
  background: #4caf50;
  color: #fff;
}

.badge.sale {
  background: #f44336;
  color: #fff;
}

.badge.unavailable {
  background: #757575;
  color: #fff;
}

.card-body {
  padding: 14px 16px 16px;
}

.card-title {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: color 0.2s ease;
}

.card-title:hover {
  color: #4a90e2;
}

.card-weight {
  margin: 0 0 12px;
  font-size: 0.8rem;
  color: #888;
  font-family: 'Inter', sans-serif;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
}

.old-price {
  font-size: 0.85rem;
  color: #aaa;
  text-decoration: line-through;
  font-family: 'Inter', sans-serif;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0f4ff;
  border-radius: 8px;
  padding: 4px 8px;
}

.qty-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.qty-btn:hover {
  background: rgba(74, 144, 226, 0.12);
}

.qty-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a2e;
  min-width: 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.add-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-btn:hover:not(:disabled) {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.add-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>

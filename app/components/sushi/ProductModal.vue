<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="product" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content product-modal">
          <button class="modal-close" @click="$emit('close')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="product-modal-image">
            <img :src="product.image_url" :alt="product.name" />
            <div class="badges">
              <span v-if="product.is_hit" class="badge hit">Хит</span>
              <span v-if="product.is_new" class="badge new">Новинка</span>
              <span v-if="product.old_price" class="badge sale">Акция</span>
            </div>
          </div>

          <div class="product-modal-body">
            <h2 class="product-modal-title">{{ product.name }}</h2>
            <p class="product-modal-weight">{{ product.weight }} г</p>

            <div v-if="product.spiciness" class="spiciness">
              Острота: {{ '🌶'.repeat(product.spiciness) }}
            </div>

            <p class="product-modal-desc">{{ product.description }}</p>

            <div class="product-modal-footer">
              <div class="price-block">
                <span class="price">{{ product.price }} ₽</span>
                <span v-if="product.old_price" class="old-price">{{ product.old_price }} ₽</span>
              </div>

              <div class="qty-row">
                <div v-if="quantity > 0" class="qty-control">
                  <button class="qty-btn" @click="decrease">−</button>
                  <span class="qty-value">{{ quantity }}</span>
                  <button class="qty-btn" @click="increase">+</button>
                </div>
                <button v-else class="add-to-cart-btn" :disabled="!product.is_available" @click="increase">
                  В корзину — {{ product.price }} ₽
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Product } from '~/../../shared/types/sushi'

const props = defineProps<{
  product: Product | null
  quantity: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', product: Product): void
  (e: 'decrease', product: Product): void
}>()

function increase() {
  if (props.product && props.product.is_available) {
    emit('add', props.product)
  }
}

function decrease() {
  if (props.product) {
    emit('decrease', props.product)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.product-modal {
  position: relative;
  background: rgba(15, 18, 28, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.product-modal-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.product-modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
}

.badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.badge.hit {
  background: rgba(255, 193, 7, 0.9);
  color: #1a1a1a;
}

.badge.new {
  background: rgba(76, 175, 80, 0.9);
  color: #fff;
}

.badge.sale {
  background: rgba(244, 67, 54, 0.9);
  color: #fff;
}

.product-modal-body {
  padding: 1.5rem;
}

.product-modal-title {
  margin: 0 0 4px;
  font-size: 1.4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Inter', sans-serif;
}

.product-modal-weight {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Inter', sans-serif;
}

.spiciness {
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: rgba(255, 150, 100, 0.9);
  font-family: 'Inter', sans-serif;
}

.product-modal-desc {
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
}

.product-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Inter', sans-serif;
}

.old-price {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: line-through;
  font-family: 'Inter', sans-serif;
}

.qty-row {
  display: flex;
  align-items: center;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 6px 12px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.qty-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.qty-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  min-width: 24px;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.add-to-cart-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.4);
}

.add-to-cart-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .product-modal,
.modal-leave-active .product-modal {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from .product-modal {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

.modal-leave-to .product-modal {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>

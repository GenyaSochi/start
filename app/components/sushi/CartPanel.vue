<template>
  <Transition name="slide">
    <div v-if="open" class="cart-overlay" @click.self="$emit('close')">
      <div class="cart-panel">
        <div class="cart-header">
          <h2>Корзина</h2>
          <button class="close-btn" @click="$emit('close')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div v-if="isEmpty" class="cart-empty">
          <p>Корзина пуста</p>
          <span>Добавьте что-нибудь вкусное из меню</span>
        </div>

        <div v-else class="cart-body">
          <div class="cart-items">
            <div v-for="item in cart.items" :key="item.product_id" class="cart-item">
              <img :src="item.image_url" :alt="item.name" class="item-img" />
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p class="item-weight">{{ item.weight }} г</p>
                <p class="item-price">{{ item.price_fixed }} ₽ × {{ item.quantity }} = {{ item.line_total }} ₽</p>
              </div>
              <div class="item-actions">
                <div class="qty-control">
                  <button class="qty-btn" @click="onDecrease(item)">−</button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="updateQuantity(item.product_id, item.quantity + 1)">+</button>
                </div>
                <button class="remove-btn" @click="removeProduct(item.product_id)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Промокод -->
          <div class="promo-section">
            <div class="promo-input-row">
              <input
                v-model="promoCode"
                type="text"
                placeholder="Промокод"
                class="promo-input"
                @keyup.enter="applyPromoCode"
              />
              <button class="promo-btn" @click="applyPromoCode">Применить</button>
            </div>
            <p v-if="promoError" class="promo-error">{{ promoError }}</p>
            <p v-if="cart.promo" class="promo-success">
              Скидка по промокоду «{{ cart.promo.code }}»: −{{ cart.promo.discount_amount }} ₽
              <button class="remove-promo" @click="removePromo">✕</button>
            </p>
          </div>

          <!-- Итоги -->
          <div class="cart-summary">
            <div class="summary-row">
              <span>Подытог</span>
              <span>{{ cart.subtotal }} ₽</span>
            </div>
            <div v-if="cart.discount > 0" class="summary-row discount">
              <span>Скидка</span>
              <span>−{{ cart.discount }} ₽</span>
            </div>
            <div class="summary-row">
              <span>Доставка</span>
              <span>{{ cart.delivery_cost === 0 ? 'Бесплатно' : cart.delivery_cost + ' ₽' }}</span>
            </div>
            <div class="summary-row total">
              <span>Итого</span>
              <span>{{ cart.total }} ₽</span>
            </div>
            <div class="summary-row weight">
              <span>Вес заказа</span>
              <span>{{ cart.total_weight }} г</span>
            </div>
          </div>

          <!-- Предупреждение о мин. сумме -->
          <div v-if="cart.min_order_diff > 0" class="min-order-warning">
            Добавьте ещё на {{ cart.min_order_diff }} ₽ для бесплатной доставки
          </div>

          <button class="checkout-btn" :disabled="cart.min_order_diff > 0 || checkingOut" @click="startCheckout">
            <span v-if="checkingOut">Оформление...</span>
            <span v-else>Оформить заказ — {{ cart.total }} ₽</span>
          </button>
          <button class="clear-btn" @click="clearCart">Очистить корзину</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { cart, isEmpty, updateQuantity, removeProduct, applyPromo, clearCart } = useCart()

const promoCode = ref('')
const promoError = ref('')
const checkingOut = ref(false)
const checkoutDone = ref(false)
const checkoutError = ref('')

async function applyPromoCode() {
  promoError.value = ''
  if (!promoCode.value.trim()) return
  try {
    await applyPromo(promoCode.value.trim())
    promoCode.value = ''
  } catch (e: any) {
    promoError.value = e?.data?.message || e?.message || 'Не удалось применить промокод'
  }
}

async function removePromo() {
  promoError.value = ''
  try {
    await applyPromo('')
  } catch {
    // ignore
  }
}

async function onDecrease(item: any) {
  if (item.quantity <= 1) {
    await removeProduct(item.product_id)
  } else {
    await updateQuantity(item.product_id, item.quantity - 1)
  }
}

async function startCheckout() {
  if (cart.value.min_order_diff > 0) return
  checkingOut.value = true
  checkoutError.value = ''
  try {
    // Проверка актуальных остатков на сервере
    const freshCart = await $fetch(`/api/v1/cart?cart_id=${cart.value.cart_id}`) as any
    const unavailable = freshCart.items.filter((i: any) => !i.is_available)
    if (unavailable.length > 0) {
      checkoutError.value = `Товары недоступны: ${unavailable.map((i: any) => i.name).join(', ')}. Удалите их из корзины.`
      checkingOut.value = false
      return
    }

    // Имитация оформления заказа (в реальном проекте — POST /api/v1/orders)
    await new Promise(resolve => setTimeout(resolve, 1500))
    checkoutDone.value = true
    await clearCart()
    setTimeout(() => {
      checkoutDone.value = false
      emit('close')
    }, 3000)
  } catch (e: any) {
    checkoutError.value = e?.data?.message || e?.message || 'Ошибка при оформлении заказа'
  } finally {
    checkingOut.value = false
  }
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
}

.cart-panel {
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: rgba(15, 18, 28, 0.97);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cart-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Manrope', sans-serif;
}

.close-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Manrope', sans-serif;
}

.cart-empty p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
}

.cart-empty span {
  font-size: 0.85rem;
}

.cart-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.item-img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-info h4 {
  margin: 0 0 2px;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Manrope', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-weight {
  margin: 0 0 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: 'Manrope', sans-serif;
}

.item-price {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Manrope', sans-serif;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 2px 6px;
}

.qty-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.qty-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.qty-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  min-width: 18px;
  text-align: center;
  font-family: 'Manrope', sans-serif;
}

.remove-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: rgba(244, 67, 54, 0.15);
  color: rgba(244, 67, 54, 0.8);
}

/* Promo */
.promo-section {
  margin-bottom: 1.5rem;
}

.promo-input-row {
  display: flex;
  gap: 8px;
}

.promo-input {
  flex: 1;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
}

.promo-input:focus {
  border-color: rgba(74, 144, 226, 0.5);
}

.promo-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.promo-btn {
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.promo-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.promo-error {
  margin: 6px 0 0;
  font-size: 0.8rem;
  color: rgba(244, 67, 54, 0.9);
  font-family: 'Manrope', sans-serif;
}

.promo-success {
  margin: 6px 0 0;
  font-size: 0.8rem;
  color: rgba(76, 175, 80, 0.9);
  font-family: 'Manrope', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}

.remove-promo {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
}

.remove-promo:hover {
  color: rgba(244, 67, 54, 0.8);
}

/* Summary */
.cart-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Manrope', sans-serif;
}

.summary-row.discount {
  color: rgba(76, 175, 80, 0.9);
}

.summary-row.total {
  font-size: 1.15rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.summary-row.weight {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}

.min-order-warning {
  padding: 12px 16px;
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: 10px;
  color: rgba(255, 183, 77, 0.95);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  margin-bottom: 1rem;
  text-align: center;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 10px;
}

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.checkout-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  border-color: rgba(244, 67, 54, 0.3);
  color: rgba(244, 67, 54, 0.7);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-active .cart-panel,
.slide-leave-active .cart-panel {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .cart-panel {
  transform: translateX(100%);
}

.slide-leave-to .cart-panel {
  transform: translateX(100%);
}

@media (max-width: 480px) {
  .cart-panel {
    width: 100vw;
  }
}
</style>

<template>
  <Teleport to="body">
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

        <div v-if="checkoutDone" class="cart-success-block">
          <div class="checkout-success">
            <p class="checkout-success-title">Заказ оформлен!</p>
            <p class="checkout-success-text">В ближайшее время с вами свяжется администратор</p>
          </div>
        </div>

        <div v-else-if="isEmpty" class="cart-empty">
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
            <div v-if="pickupDiscount > 0" class="summary-row discount">
              <span>Скидка за самовывоз (10%)</span>
              <span>−{{ pickupDiscount }} ₽</span>
            </div>
            <div class="summary-row">
              <span>Доставка</span>
              <span>{{ deliveryType === 'pickup' ? 'Бесплатно (самовывоз)' : (effectiveDeliveryCost === 0 ? 'Бесплатно' : effectiveDeliveryCost + ' ₽ (оплата курьеру)') }}</span>
            </div>
            <div class="summary-row total">
              <span>Итого</span>
              <span>{{ effectiveTotal }} ₽</span>
            </div>
            <div class="summary-row weight">
              <span>Вес заказа</span>
              <span>{{ cart.total_weight }} г</span>
            </div>
          </div>

          <!-- Предупреждение о мин. сумме -->
          <div v-if="cart.min_order_diff > 0 && deliveryType === 'delivery'" class="min-order-warning">
            Минимальная сумма заказа — 500 ₽. Добавьте ещё на {{ cart.min_order_diff }} ₽
          </div>
          <div v-else-if="deliveryType === 'delivery' && effectiveDeliveryCost > 0" class="min-order-warning">
            Бесплатная доставка от 1500 ₽. Добавьте ещё на {{ 1500 - (cart.subtotal - cart.discount) }} ₽
          </div>

          <!-- Локация и телефон -->
          <div class="checkout-form">
            <div class="form-group">
              <label class="form-label">Способ получения</label>
              <div class="location-options">
                <button
                  class="location-option"
                  :class="{ active: deliveryType === 'pickup' }"
                  @click="deliveryType = 'pickup'"
                >
                  Самовывоз
                  <span class="location-price">Бесплатно</span>
                </button>
                <button
                  class="location-option"
                  :class="{ active: deliveryType === 'delivery' }"
                  @click="deliveryType = 'delivery'"
                >
                  Доставка
                  <span class="location-price">{{ cart.delivery_cost === 0 ? 'Бесплатно' : cart.delivery_cost + ' ₽' }}</span>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Номер телефона</label>
              <input
                v-model="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                class="phone-input"
              />
              <p v-if="phoneError" class="field-error">{{ phoneError }}</p>
            </div>

            <div class="form-group">
              <label class="form-label">Желаемое время готовности</label>
              <input
                v-model="readyTime"
                type="time"
                class="phone-input"
              />
            </div>
          </div>

          <div v-if="checkoutError" class="checkout-error-msg">
            {{ checkoutError }}
          </div>
          <button v-if="!checkoutDone" class="checkout-btn" :disabled="(cart.min_order_diff > 0 && deliveryType === 'delivery') || checkingOut" @click="startCheckout">
            <span v-if="checkingOut">Оформление...</span>
            <span v-else>Оформить заказ — {{ effectiveTotal }} ₽</span>
          </button>
          <button class="clear-btn" @click="clearCart">Очистить корзину</button>
        </div>
      </div>
    </div>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
const deliveryType = ref<'pickup' | 'delivery'>('delivery')
const phone = ref('')
const phoneError = ref('')
const readyTime = ref('')

const effectiveDeliveryCost = computed(() => {
  if (deliveryType.value === 'pickup') return 0
  return cart.value.delivery_cost
})

const pickupDiscount = computed(() => {
  if (deliveryType.value !== 'pickup') return 0
  return Math.round((cart.value.subtotal - cart.value.discount) * 0.1)
})

const effectiveTotal = computed(() => {
  return cart.value.subtotal - cart.value.discount - pickupDiscount.value + effectiveDeliveryCost.value
})

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
  phoneError.value = ''
  if (!phone.value.trim()) {
    phoneError.value = 'Укажите номер телефона для связи'
    return
  }
  if (cart.value.min_order_diff > 0 && deliveryType.value === 'delivery') return
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
  background: rgba(0, 0, 0, 0.3);
  z-index: 1001;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0 24px 80px 24px;
  pointer-events: auto;
}

.cart-panel {
  width: 420px;
  max-width: calc(100vw - 48px);
  max-height: 80vh;
  background: rgba(15, 18, 28, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
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

.cart-success-block {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 2rem 1.5rem;
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

/* Checkout form */
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Manrope', sans-serif;
}

.location-options {
  display: flex;
  gap: 8px;
}

.location-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.location-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.location-option.active {
  background: rgba(74, 144, 226, 0.15);
  border-color: rgba(74, 144, 226, 0.5);
  color: rgba(255, 255, 255, 0.95);
}

.location-price {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
}

.location-option.active .location-price {
  color: rgba(74, 144, 226, 0.8);
}

.phone-input {
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
  transition: border-color 0.2s ease;
  color-scheme: dark;
}

.phone-input:focus {
  border-color: rgba(74, 144, 226, 0.5);
}

.phone-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.field-error {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(244, 67, 54, 0.9);
  font-family: 'Manrope', sans-serif;
}

.checkout-success {
  padding: 20px 16px;
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.4);
  border-radius: 12px;
  text-align: center;
  margin-bottom: 10px;
}

.checkout-success-title {
  margin: 0 0 6px;
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(76, 175, 80, 0.95);
  font-family: 'Manrope', sans-serif;
}

.checkout-success-text {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Manrope', sans-serif;
}

.checkout-error-msg {
  padding: 12px 16px;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 10px;
  color: rgba(244, 67, 54, 0.9);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  margin-bottom: 10px;
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
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .cart-panel {
  transform: translateY(40px) scale(0.95);
  opacity: 0;
}

.slide-leave-to .cart-panel {
  transform: translateY(40px) scale(0.95);
  opacity: 0;
}

@media (max-width: 480px) {
  .cart-overlay {
    padding: 0 12px 72px 12px;
  }
  .cart-panel {
    width: 100%;
    max-width: 100%;
    max-height: 85vh;
  }
}
</style>

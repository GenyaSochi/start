import { ref, computed, readonly } from 'vue'
import { getOrCreateCart, getCartSummary, updateCartItem as uci, addToCart as atc, applyPromo as ap, removeFromCart as rfc, clearCart as cc} from '~/helpers/cart-engine'

const CART_ID_KEY = 'sushi_cart_id'

export interface CartItemEnriched {
  product_id: number
  quantity: number
  price_fixed: number
  name: string
  image_url: string
  weight: number
  is_available: boolean
  line_total: number
}

export interface CartSummary {
  cart_id: string
  items: CartItemEnriched[]
  subtotal: number
  discount: number
  promo: { code: string; discount_amount: number; description: string } | null
  delivery_cost: number
  total: number
  total_weight: number
  min_order_diff: number
  promocode: string | null
}

const emptyCart: CartSummary = {
  cart_id: '',
  items: [],
  subtotal: 0,
  discount: 0,
  promo: null,
  delivery_cost: 0,
  total: 0,
  total_weight: 0,
  min_order_diff: 0,
  promocode: null
}

const cart = ref<CartSummary>({ ...emptyCart })
const loading = ref(false)
const error = ref<string | null>(null)

function getCartId(): string {
  if (import.meta.server) return ''
  let id = localStorage.getItem(CART_ID_KEY)
  if (!id) {
    id = `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    localStorage.setItem(CART_ID_KEY, id)
  }
  return id
}

async function apiCall(url: string, options?: RequestInit): Promise<CartSummary> {
  loading.value = true
  error.value = null
  try {
    const data = await $fetch<CartSummary>(url, options as any)
    cart.value = data
    if (import.meta.client && data.cart_id) {
      localStorage.setItem(CART_ID_KEY, data.cart_id)
    }
    return data
  } catch (e: any) {
    const msg = e?.data?.message || e?.message || 'Ошибка запроса'
    error.value = msg
    throw e
  } finally {
    loading.value = false
  }
}

export function useCart() {
  const itemCount = computed(() => cart.value.items.reduce((sum, i) => sum + i.quantity, 0))
  const isEmpty = computed(() => cart.value.items.length === 0)

  async function fetchCart() {
    const cartId = getCartId()
    if (!cartId) return
    const cart1 = getOrCreateCart(cartId)
    cart.value = getCartSummary(cart1)
    if (import.meta.client && cartId) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  async function addProduct(productId: number, quantity = 1) {
    const cartId = getCartId()      
    const cart1 = atc(cartId || '', productId, quantity)
    cart.value = getCartSummary(cart1)
    if (import.meta.client && cartId) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  async function updateQuantity(productId: number, quantity: number) {
    const cartId = getCartId()
    const cart1 = uci(cartId, productId, quantity)
    cart.value = getCartSummary(cart1)
    if (import.meta.client && cartId) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  async function removeProduct(productId: number) {
    const cartId = getCartId()
    const cart1 = rfc(cartId, productId)
    cart.value = getCartSummary(cart1)
    if (import.meta.client && cartId) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  async function applyPromo(code: string) {
    const cartId = getCartId()
    const cart1 = ap(cartId, code)
    cart.value = getCartSummary(cart1)
    if (import.meta.client && cartId) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  async function clearCart() {
    const cartId = getCartId()
    const cart1 = cc(cartId)
    cart.value = getCartSummary(cart1)
    if (import.meta.client && cartId) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  function getItemQuantity(productId: number): number {
    const item = cart.value.items.find(i => i.product_id === productId)
    return item ? item.quantity : 0
  }

  return {
    cart: readonly(cart),
    loading: readonly(loading),
    error: readonly(error),
    itemCount,
    isEmpty,
    fetchCart,
    addProduct,
    updateQuantity,
    removeProduct,
    applyPromo,
    clearCart,
    getItemQuantity
  }
}

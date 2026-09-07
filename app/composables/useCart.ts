import { ref, computed, readonly } from 'vue'

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
    await apiCall(`/api/v1/cart?cart_id=${cartId}`)
  }

  async function addProduct(productId: number, quantity = 1) {
    const cartId = getCartId()
    await apiCall('/api/v1/cart/add', {
      method: 'POST',
      body: { cart_id: cartId, product_id: productId, quantity }
    })
  }

  async function updateQuantity(productId: number, quantity: number) {
    const cartId = getCartId()
    await apiCall('/api/v1/cart/update', {
      method: 'PUT',
      body: { cart_id: cartId, product_id: productId, quantity }
    })
  }

  async function removeProduct(productId: number) {
    const cartId = getCartId()
    await apiCall('/api/v1/cart/remove', {
      method: 'DELETE',
      body: { cart_id: cartId, product_id: productId }
    })
  }

  async function applyPromo(code: string) {
    const cartId = getCartId()
    await apiCall('/api/v1/cart/apply_promo', {
      method: 'POST',
      body: { cart_id: cartId, code }
    })
  }

  async function clearCart() {
    const cartId = getCartId()
    await apiCall('/api/v1/cart/clear', {
      method: 'DELETE',
      body: { cart_id: cartId }
    })
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

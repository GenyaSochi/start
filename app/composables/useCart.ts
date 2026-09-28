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
  promocode: null,
}

const cart = ref<CartSummary>({ ...emptyCart })
const loading = ref(false)
const error = ref<string | null>(null)

function getCartId(): string | null {
  if (import.meta.server) return null
  return localStorage.getItem(CART_ID_KEY)
}

function saveCartId(id: string) {
  if (import.meta.client) {
    localStorage.setItem(CART_ID_KEY, id)
  }
}

async function apiCall(url: string, options?: RequestInit): Promise<CartSummary> {
  loading.value = true
  error.value = null
  try {
    const data = await $fetch<CartSummary>(url, options as any)
    cart.value = data
    if (data.cart_id) {
      saveCartId(data.cart_id)
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

  async function ensureCartId(): Promise<string> {
    let cartId = getCartId()
    if (!cartId) {
      const data = await $fetch<{ cart_id: string }>('/api/cart', { method: 'POST' })
      cartId = data.cart_id
      saveCartId(cartId)
    }
    return cartId
  }

  async function fetchCart() {
    const cartId = await ensureCartId()
    return apiCall(`/api/cart/${cartId}`)
  }

  async function addProduct(productId: number, quantity = 1) {
    const cartId = await ensureCartId()
    return apiCall(`/api/cart/${cartId}/items`, {
      method: 'POST',
      body: { productId, quantity },
    })
  }

  async function updateQuantity(productId: number, quantity: number) {
    const cartId = await ensureCartId()
    return apiCall(`/api/cart/${cartId}/items/${productId}`, {
      method: 'PATCH',
      body: { quantity },
    })
  }

  async function removeProduct(productId: number) {
    const cartId = await ensureCartId()
    return apiCall(`/api/cart/${cartId}/items/${productId}`, { method: 'DELETE' })
  }

  async function applyPromo(code: string) {
    const cartId = await ensureCartId()
    return apiCall(`/api/cart/${cartId}/promo`, {
      method: 'POST',
      body: { code },
    })
  }

  async function clearCart() {
    const cartId = await ensureCartId()
    return apiCall(`/api/cart/${cartId}`, { method: 'DELETE' })
  }

  function getItemQuantity(productId: number): number {
    const item = cart.value.items.find((i) => i.product_id === productId)
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
    getItemQuantity,
  }
}

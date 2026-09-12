import type { CartState, CartItem, PromoResult } from '../../shared/types/sushi'
import { products, promos, MIN_ORDER_SUM, DELIVERY_COST, FREE_DELIVERY_THRESHOLD } from '../data/menu'

const carts = new Map<string, CartState>()

export function getOrCreateCart(cartId?: string): CartState {
  const id = cartId || `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  if (!carts.has(id)) {
    carts.set(id, {
      cart_id: id,
      items: [],
      promocode: null,
      promo: null,
      delivery_cost: 0
    })
  }
  return carts.get(id)!
}

export function addToCart(cartId: string, productId: number, quantity: number): CartState {
  const cart = getOrCreateCart(cartId)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
  }
  if (!product.is_available) {
    throw createError({ statusCode: 400, statusMessage: 'Товар временно отсутствует' })
  }

  const existing = cart.items.find((i) => i.product_id === productId)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.items.push({
      product_id: productId,
      quantity,
      price_fixed: product.price
    })
  }

  recalculate(cart)
  return cart
}

export function updateCartItem(cartId: string, productId: number, quantity: number): CartState {
  const cart = getOrCreateCart(cartId)
  const item = cart.items.find((i) => i.product_id === productId)

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Позиция не найдена в корзине' })
  }
  if (quantity < 1) {
    throw createError({ statusCode: 400, statusMessage: 'Минимальное количество — 1' })
  }

  item.quantity = quantity
  recalculate(cart)
  return cart
}

export function removeFromCart(cartId: string, productId: number): CartState {
  const cart = getOrCreateCart(cartId)
  cart.items = cart.items.filter((i) => i.product_id !== productId)
  recalculate(cart)
  return cart
}

export function clearCart(cartId: string): CartState {
  const cart = getOrCreateCart(cartId)
  cart.items = []
  cart.promocode = null
  cart.promo = null
  cart.delivery_cost = 0
  return cart
}

export function applyPromo(cartId: string, code: string): CartState {
  const cart = getOrCreateCart(cartId)
  
  // Если код пустой - удаляем промокод
  if (!code || code.trim() === '') {
    cart.promocode = null
    cart.promo = null
    recalculate(cart)
    return cart
  }
  
  const upperCode = code.toUpperCase()
  const promoData = promos[upperCode]

  if (!promoData) {
    throw createError({ statusCode: 400, statusMessage: 'Промокод не найден' })
  }

  const subtotal = calcSubtotal(cart)
  if (promoData.min_sum && subtotal < promoData.min_sum) {
    throw createError({
      statusCode: 400,
      statusMessage: `Минимальная сумма заказа для этого промокода: ${promoData.min_sum} ₽`
    })
  }

  cart.promocode = upperCode
  recalculate(cart)
  return cart
}

function calcSubtotal(cart: CartState): number {
  return cart.items.reduce((sum, item) => sum + item.price_fixed * item.quantity, 0)
}

function calcPromoDiscount(cart: CartState): PromoResult | null {
  if (!cart.promocode) return null
  const promoData = promos[cart.promocode]
  if (!promoData) return null

  const subtotal = calcSubtotal(cart)
  let amount = 0

  if (promoData.discount_percent) {
    amount = Math.round(subtotal * promoData.discount_percent / 100)
  } else if (promoData.discount_fixed) {
    amount = promoData.discount_fixed
  }

  amount = Math.min(amount, subtotal)

  return {
    code: cart.promocode,
    discount_amount: amount,
    description: promoData.description
  }
}

export function recalculate(cart: CartState): void {
  const subtotal = calcSubtotal(cart)
  cart.promo = calcPromoDiscount(cart)
  const afterDiscount = subtotal - (cart.promo?.discount_amount || 0)
  if (afterDiscount >= FREE_DELIVERY_THRESHOLD) {
    cart.delivery_cost = 0
  } else {
    cart.delivery_cost = DELIVERY_COST
  }
}

export function getCartSummary(cart: CartState) {
  const subtotal = calcSubtotal(cart)
  const discount = cart.promo?.discount_amount || 0
  const totalWeight = cart.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.product_id)
    return sum + (product ? product.weight * item.quantity : 0)
  }, 0)

  const enrichedItems = cart.items.map((item) => {
    const product = products.find((p) => p.id === item.product_id)
    return {
      ...item,
      name: product?.name || 'Неизвестный товар',
      image_url: product?.image_url || '',
      weight: product?.weight || 0,
      is_available: product?.is_available ?? false,
      line_total: item.price_fixed * item.quantity
    }
  })

  return {
    cart_id: cart.cart_id,
    items: enrichedItems,
    subtotal,
    discount,
    promo: cart.promo,
    delivery_cost: cart.delivery_cost,
    total: subtotal - discount + cart.delivery_cost,
    total_weight: totalWeight,
    min_order_diff: Math.max(0, MIN_ORDER_SUM - (subtotal - discount)),
    promocode: cart.promocode
  }
}

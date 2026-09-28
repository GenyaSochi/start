import type { PromoResult } from '../../shared/types/sushi'
import type { PromoCode } from '../../prisma/generated/models/PromoCode'

type EnrichedItem = {
  product_id: number
  quantity: number
  price_fixed: number
  name: string
  image_url: string
  weight: number
  is_available: boolean
  line_total: number
}

export interface CartSummaryResult {
  cart_id: string
  items: EnrichedItem[]
  subtotal: number
  discount: number
  promo: PromoResult | null
  delivery_cost: number
  total: number
  total_weight: number
  min_order_diff: number
  promocode: string | null
}

interface Settings {
  minOrderSum: number
  deliveryCost: number
  freeDeliveryThreshold: number
}

export async function getSettings(): Promise<Settings> {
  const prisma = usePrisma()
  const rows = await prisma.setting.findMany()
  const map: Record<string, number> = {}
  for (const s of rows) {
    map[s.key] = Number(s.value)
  }
  return {
    minOrderSum: map['MIN_ORDER_SUM'] ?? 500,
    deliveryCost: map['DELIVERY_COST'] ?? 300,
    freeDeliveryThreshold: map['FREE_DELIVERY_THRESHOLD'] ?? 1500,
  }
}

export async function getOrCreateCart(cartId?: string): Promise<string> {
  const prisma = usePrisma()
  if (cartId) {
    const existing = await prisma.cart.findUnique({ where: { id: cartId } })
    if (existing) return existing.id
  }
  const id = cartId || `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  await prisma.cart.create({ data: { id } })
  return id
}

async function getPromoByCode(code: string): Promise<PromoCode | null> {
  const prisma = usePrisma()
  return prisma.promoCode.findUnique({ where: { code } })
}

async function calcSubtotal(cartId: string): Promise<number> {
  const prisma = usePrisma()
  const items = await prisma.cartItem.findMany({ where: { cartId } })
  return items.reduce((sum, i) => sum + i.priceFixed * i.quantity, 0)
}

async function calcPromoDiscount(cartId: string, promocode: string | null): Promise<PromoResult | null> {
  if (!promocode) return null
  const promo = await getPromoByCode(promocode)
  if (!promo) return null

  const subtotal = await calcSubtotal(cartId)
  let amount = 0

  if (promo.discountPercent) {
    amount = Math.round((subtotal * promo.discountPercent) / 100)
  } else if (promo.discountFixed) {
    amount = promo.discountFixed
  }

  amount = Math.min(amount, subtotal)

  return {
    code: promocode,
    discount_amount: amount,
    description: promo.description,
  }
}

async function calcDeliveryCost(subtotalAfterDiscount: number): Promise<number> {
  const settings = await getSettings()
  return subtotalAfterDiscount >= settings.freeDeliveryThreshold ? 0 : settings.deliveryCost
}

export async function addToCart(cartId: string, productId: number, quantity: number): Promise<void> {
  const prisma = usePrisma()
  const product = await prisma.product.findUnique({ where: { id: productId } })

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
  }
  if (!product.isAvailable) {
    throw createError({ statusCode: 400, statusMessage: 'Товар временно отсутствует' })
  }

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId, productId } },
  })

  if (existing) {
    await prisma.cartItem.update({
      where: { cartId_productId: { cartId, productId } },
      data: { quantity: existing.quantity + quantity },
    })
  } else {
    await prisma.cartItem.create({
      data: { cartId, productId, quantity, priceFixed: product.price },
    })
  }
}

export async function updateCartItem(cartId: string, productId: number, quantity: number): Promise<void> {
  const prisma = usePrisma()
  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId, productId } },
  })

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Позиция не найдена в корзине' })
  }
  if (quantity < 1) {
    throw createError({ statusCode: 400, statusMessage: 'Минимальное количество — 1' })
  }

  await prisma.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: { quantity },
  })
}

export async function removeFromCart(cartId: string, productId: number): Promise<void> {
  const prisma = usePrisma()
  await prisma.cartItem.deleteMany({ where: { cartId, productId } })
}

export async function clearCart(cartId: string): Promise<void> {
  const prisma = usePrisma()
  await prisma.cartItem.deleteMany({ where: { cartId } })
  await prisma.cart.update({ where: { id: cartId }, data: { promoCode: null } })
}

export async function applyPromo(cartId: string, code: string): Promise<void> {
  const prisma = usePrisma()

  if (!code || code.trim() === '') {
    await prisma.cart.update({ where: { id: cartId }, data: { promoCode: null } })
    return
  }

  const upperCode = code.toUpperCase()
  const promo = await getPromoByCode(upperCode)

  if (!promo) {
    throw createError({ statusCode: 400, statusMessage: 'Промокод не найден' })
  }

  const subtotal = await calcSubtotal(cartId)
  if (promo.minSum && subtotal < promo.minSum) {
    throw createError({
      statusCode: 400,
      statusMessage: `Минимальная сумма заказа для этого промокода: ${promo.minSum} ₽`,
    })
  }

  await prisma.cart.update({ where: { id: cartId }, data: { promoCode: upperCode } })
}

export async function getCartSummary(cartId: string): Promise<CartSummaryResult> {
  const prisma = usePrisma()

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true },
  })

  if (!cart) {
    throw createError({ statusCode: 404, statusMessage: 'Корзина не найдена' })
  }

  const products = await prisma.product.findMany()
  const settings = await getSettings()

  const subtotal = cart.items.reduce((sum, i) => sum + i.priceFixed * i.quantity, 0)
  const promo = await calcPromoDiscount(cartId, cart.promoCode)
  const discount = promo?.discount_amount || 0
  const deliveryCost = await calcDeliveryCost(subtotal - discount)

  const enrichedItems: EnrichedItem[] = cart.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      product_id: item.productId,
      quantity: item.quantity,
      price_fixed: item.priceFixed,
      name: product?.name || 'Неизвестный товар',
      image_url: product?.imageUrl || '',
      weight: product?.weight || 0,
      is_available: product?.isAvailable ?? false,
      line_total: item.priceFixed * item.quantity,
    }
  })

  const totalWeight = cart.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)
    return sum + (product ? product.weight * item.quantity : 0)
  }, 0)

  return {
    cart_id: cart.id,
    items: enrichedItems,
    subtotal,
    discount,
    promo,
    delivery_cost: deliveryCost,
    total: subtotal - discount + deliveryCost,
    total_weight: totalWeight,
    min_order_diff: Math.max(0, settings.minOrderSum - (subtotal - discount)),
    promocode: cart.promoCode,
  }
}

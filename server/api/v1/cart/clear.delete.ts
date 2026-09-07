import { clearCart, getCartSummary } from '../../../utils/cart-engine'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cartId = body?.cart_id as string

  if (!cartId) {
    throw createError({ statusCode: 400, statusMessage: 'cart_id обязателен' })
  }

  const cart = clearCart(cartId)
  return getCartSummary(cart)
})

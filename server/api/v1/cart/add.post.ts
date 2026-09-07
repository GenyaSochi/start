import { addToCart, getCartSummary } from '../../../utils/cart-engine'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cartId = body?.cart_id as string | undefined
  const productId = Number(body?.product_id)
  const quantity = Number(body?.quantity) || 1

  if (!productId) {
    throw createError({ statusCode: 400, statusMessage: 'product_id обязателен' })
  }

  const cart = addToCart(cartId || '', productId, quantity)
  return getCartSummary(cart)
})

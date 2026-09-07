import { removeFromCart, getCartSummary } from '../../../utils/cart-engine'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cartId = body?.cart_id as string
  const productId = Number(body?.product_id)

  if (!cartId || !productId) {
    throw createError({ statusCode: 400, statusMessage: 'cart_id и product_id обязательны' })
  }

  const cart = removeFromCart(cartId, productId)
  return getCartSummary(cart)
})

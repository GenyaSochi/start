import { updateCartItem, getCartSummary } from '../../../utils/cart-engine'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cartId = body?.cart_id as string
  const productId = Number(body?.product_id)
  const quantity = Number(body?.quantity)

  if (!cartId || !productId || !quantity) {
    throw createError({ statusCode: 400, statusMessage: 'cart_id, product_id и quantity обязательны' })
  }

  const cart = updateCartItem(cartId, productId, quantity)
  return getCartSummary(cart)
})

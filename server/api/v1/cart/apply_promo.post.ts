import { applyPromo, getCartSummary } from '../../../utils/cart-engine'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cartId = body?.cart_id as string
  const code = body?.code as string

  if (!cartId || !code) {
    throw createError({ statusCode: 400, statusMessage: 'cart_id и code обязательны' })
  }

  const cart = applyPromo(cartId, code)
  return getCartSummary(cart)
})

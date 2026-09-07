import { getOrCreateCart, getCartSummary } from '../../../utils/cart-engine'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const cartId = query.cart_id ? String(query.cart_id) : undefined
  const cart = getOrCreateCart(cartId)
  return getCartSummary(cart)
})

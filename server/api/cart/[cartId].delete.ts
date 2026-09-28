export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'cartId')!
  await clearCart(cartId)
  return getCartSummary(cartId)
})

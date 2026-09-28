export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'cartId')!
  return getCartSummary(cartId)
})

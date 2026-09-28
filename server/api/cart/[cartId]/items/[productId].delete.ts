export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'cartId')!
  const productId = Number(getRouterParam(event, 'productId'))
  await removeFromCart(cartId, productId)
  return getCartSummary(cartId)
})

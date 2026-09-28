export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'cartId')!
  const body = await readBody(event)
  await applyPromo(cartId, body?.code ?? '')
  return getCartSummary(cartId)
})

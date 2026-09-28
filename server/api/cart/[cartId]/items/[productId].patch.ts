export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'cartId')!
  const productId = Number(getRouterParam(event, 'productId'))
  const body = await readBody(event)

  if (!body?.quantity || Number(body.quantity) < 1) {
    throw createError({ statusCode: 400, statusMessage: 'quantity (≥ 1) обязательно' })
  }

  await updateCartItem(cartId, productId, Number(body.quantity))
  return getCartSummary(cartId)
})

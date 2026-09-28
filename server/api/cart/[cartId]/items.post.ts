export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'cartId')!
  const body = await readBody(event)

  if (!body?.productId || !body?.quantity || Number(body.quantity) < 1) {
    throw createError({ statusCode: 400, statusMessage: 'productId и quantity (≥ 1) обязательны' })
  }

  await getOrCreateCart(cartId)
  await addToCart(cartId, Number(body.productId), Number(body.quantity))
  return getCartSummary(cartId)
})

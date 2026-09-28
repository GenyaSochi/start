export default defineEventHandler(async () => {
  const cartId = await getOrCreateCart()
  return { cart_id: cartId }
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const prisma = usePrisma()

  await prisma.cartItem.deleteMany({ where: { productId: id } })
  await prisma.product.delete({ where: { id } })

  return { ok: true }
})

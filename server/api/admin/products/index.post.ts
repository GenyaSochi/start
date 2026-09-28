export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const prisma = usePrisma()

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      oldPrice: body.old_price ? Number(body.old_price) : null,
      weight: Number(body.weight),
      imageUrl: body.image_url || '',
      categoryId: Number(body.category_id),
      isAvailable: body.is_available ?? true,
      spiciness: body.spiciness != null ? Number(body.spiciness) : null,
      isNew: body.is_new ?? false,
      isHit: body.is_hit ?? false,
    },
  })

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    old_price: product.oldPrice,
    weight: product.weight,
    image_url: product.imageUrl,
    category_id: product.categoryId,
    is_available: product.isAvailable,
    spiciness: product.spiciness,
    is_new: product.isNew,
    is_hit: product.isHit,
  }
})

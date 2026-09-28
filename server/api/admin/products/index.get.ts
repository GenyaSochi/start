export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const prisma = usePrisma()
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } })
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
  return {
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      old_price: p.oldPrice,
      weight: p.weight,
      image_url: p.imageUrl,
      category_id: p.categoryId,
      is_available: p.isAvailable,
      spiciness: p.spiciness,
      is_new: p.isNew,
      is_hit: p.isHit,
    })),
    categories: categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sort_order: c.sortOrder,
    })),
  }
})

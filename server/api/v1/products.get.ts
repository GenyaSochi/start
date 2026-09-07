import { products } from '../../data/menu'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = query.category ? String(query.category) : undefined
  const sort = query.sort ? String(query.sort) : undefined
  const limit = query.limit ? Number(query.limit) : 20
  const offset = query.offset ? Number(query.offset) : 0

  let result = products.filter((p) => p.is_available)

  if (category) {
    const slugToId: Record<string, number> = {
      sushi: 1,
      rolls: 2,
      sets: 3,
      drinks: 4,
      sauces: 5
    }
    const catId = slugToId[category]
    if (catId) {
      result = result.filter((p) => p.category_id === catId)
    }
  }

  if (sort === 'price_asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sort === 'price_desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sort === 'new') {
    result = [...result].sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
  } else if (sort === 'popular') {
    result = [...result].sort((a, b) => (b.is_hit ? 1 : 0) - (a.is_hit ? 1 : 0))
  }

  return result.slice(offset, offset + limit)
})

import { products } from '../../../data/menu'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const product = products.find((p) => p.id === id)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
  }
  return product
})

import { updateProduct } from '../../../../utils/menu-store'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Неверный формат данных' })
  }

  const product = updateProduct(id, body)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
  }
  return product
})

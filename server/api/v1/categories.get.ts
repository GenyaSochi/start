import { categories } from '../../data/menu'

export default defineEventHandler(() => {
  return [...categories].sort((a, b) => a.sort_order - b.sort_order)
})

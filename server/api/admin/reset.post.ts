import { seed } from '../../../prisma/seed'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await seed(usePrisma())
  return { ok: true }
})

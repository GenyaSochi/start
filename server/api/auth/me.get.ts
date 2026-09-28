export default defineEventHandler(async (event) => {
  const token = getSessionCookie(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Не авторизован' })
  }
  const userId = await validateSession(token)
  if (userId === null) {
    throw createError({ statusCode: 401, statusMessage: 'Сессия истекла' })
  }
  const prisma = usePrisma()
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Пользователь не найден' })
  }
  return { username: user.username }
})

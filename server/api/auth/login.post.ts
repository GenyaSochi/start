export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = body?.username?.trim()
  const password = body?.password

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Укажите логин и пароль' })
  }

  const prisma = usePrisma()
  const user = await prisma.user.findUnique({ where: { username } })

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный логин или пароль' })
  }

  const token = await createSession(user.id)
  setSessionCookie(event, token)

  return { username: user.username }
})

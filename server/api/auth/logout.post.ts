export default defineEventHandler(async (event) => {
  const token = getSessionCookie(event)
  if (token) {
    await destroySession(token)
  }
  clearSessionCookie(event)
  return { ok: true }
})

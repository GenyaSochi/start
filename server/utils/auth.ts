import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const buf = (await scryptAsync(password, salt, 64)) as Buffer
  return `${salt}.${buf.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split('.')
  if (!salt || !hash) return false
  const buf = (await scryptAsync(password, salt, 64)) as Buffer
  const storedBuf = Buffer.from(hash, 'hex')
  return buf.length === storedBuf.length && timingSafeEqual(buf, storedBuf)
}

const SESSION_COOKIE = 'session_token'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

export async function createSession(userId: number): Promise<string> {
  const prisma = usePrisma()
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)
  await prisma.session.create({ data: { token, userId, expiresAt } })
  return token
}

export async function validateSession(token: string): Promise<number | null> {
  const prisma = usePrisma()
  const session = await prisma.session.findUnique({ where: { token } })
  if (!session) return null
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { token } })
    return null
  }
  return session.userId
}

export async function destroySession(token: string): Promise<void> {
  const prisma = usePrisma()
  await prisma.session.deleteMany({ where: { token } })
}

export function getSessionCookie(event: any): string | undefined {
  return getCookie(event, SESSION_COOKIE)
}

export function setSessionCookie(event: any, token: string): void {
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export function clearSessionCookie(event: any): void {
  deleteCookie(event, SESSION_COOKIE)
}

export async function requireAdmin(event: any): Promise<void> {
  const token = getSessionCookie(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Требуется авторизация' })
  }
  const userId = await validateSession(token)
  if (userId === null) {
    throw createError({ statusCode: 401, statusMessage: 'Сессия истекла' })
  }
}

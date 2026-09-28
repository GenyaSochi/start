import { PrismaClient } from './generated/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { resolve } from 'node:path'

function createPrismaClient() {
  const dbPath = resolve(process.cwd(), 'prisma/dev.db')
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` })
  return new PrismaClient({ adapter })
}

let _prisma: PrismaClient | null = null

export function usePrisma(): PrismaClient {
  if (!_prisma) {
    _prisma = createPrismaClient()
  }
  return _prisma
}

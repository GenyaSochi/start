import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import { PrismaClient } from './generated/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { seed } from './seed'

const dbPath = fileURLToPath(new URL('./dev.db', import.meta.url))
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` })
const prisma = new PrismaClient({ adapter })

seed(prisma)
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())

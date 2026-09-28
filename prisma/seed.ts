import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'
import type { PrismaClient } from './generated/client'

const scryptAsync = promisify(scrypt)

export const categories = [
  { id: 1, name: 'Суши и роллы', slug: 'sushi', sortOrder: 1 },
  { id: 2, name: 'Сеты', slug: 'sets', sortOrder: 2 },
  { id: 3, name: 'Закуски', slug: 'rolls', sortOrder: 3 },
  { id: 4, name: 'Напитки', slug: 'drinks', sortOrder: 4 },
  { id: 5, name: 'Соусы', slug: 'sauces', sortOrder: 5 },
]

export const products = [
  { id: 1, name: 'Филадельфия', description: 'Лосось, сливочный сыр, рис, нори. Классический ролл с нежным вкусом.', price: 550, oldPrice: 650, weight: 250, imageUrl: '/img/baked.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: false, isHit: true },
  { id: 2, name: 'Калифорния', description: 'Лосось, авокадо, тобико, рис, нори, сливочный сыр', price: 520, oldPrice: null, weight: 230, imageUrl: '/img/kaliforniya.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: false, isHit: true },
  { id: 3, name: 'Опалённый лосось', description: 'Лосось, авокадо, рис, нори,сливочный сыр', price: 760, oldPrice: null, weight: 270, imageUrl: '/img/losopal.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: true, isHit: false },
  { id: 4, name: 'Спайси лосось', description: 'Острый лосось, спайси соус, рис, нори, сливочный сыр', price: 400, oldPrice: 470, weight: 220, imageUrl: '/img/xx.webp', categoryId: 1, isAvailable: true, spiciness: 2, isNew: false, isHit: false },
  { id: 5, name: 'Маки лосось', description: 'Тонкий ломтик свежего лосося на подушке из риса', price: 300, oldPrice: null, weight: 40, imageUrl: '/img/makilos.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: false, isHit: false },
  { id: 6, name: 'Нигири с тунцом', description: 'Нежный тунец на рисовой подушке с икрой летучей рыбы и креветкой', price: 580, oldPrice: null, weight: 280, imageUrl: '/img/tuna.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: false, isHit: false },
  { id: 7, name: 'Нигири с угрём', description: 'Копчёный угорь на рисе с соусом унаги, огурцом и кунжутом.', price: 550, oldPrice: 600, weight: 250, imageUrl: '/img/eel.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: false, isHit: true },
  { id: 8, name: 'Сет «Для двоих»', description: 'Три вида роллов', price: 1290, oldPrice: 1590, weight: 650, imageUrl: '/img/twoset.webp', categoryId: 2, isAvailable: true, spiciness: 0, isNew: false, isHit: true },
  { id: 9, name: 'Сет «Большая компания»', description: 'Восемь видов роллов', price: 2490, oldPrice: null, weight: 2600, imageUrl: '/img/big.webp', categoryId: 2, isAvailable: true, spiciness: 0, isNew: true, isHit: false },
  { id: 10, name: 'Запечённый ролл с креветкой', description: 'Тигровая креветка, сливочный сыр, спайси майонез, запечённая шапка из рубленной креветки', price: 510, oldPrice: null, weight: 260, imageUrl: '/img/shrimpbaked.webp', categoryId: 1, isAvailable: true, spiciness: 1, isNew: true, isHit: false },
  { id: 11, name: 'Сет "Хот"', description: 'Три вида жареных роллов', price: 1220, oldPrice: 1580, weight: 700, imageUrl: '/img/hot.webp', categoryId: 2, isAvailable: true, spiciness: null, isNew: true, isHit: false },
  { id: 12, name: 'Соевый соус', description: 'Классический соевый соус, 50 мл.', price: 50, oldPrice: null, weight: 50, imageUrl: '/img/soy.webp', categoryId: 5, isAvailable: true, spiciness: null, isNew: false, isHit: false },
  { id: 13, name: 'Ореховый соус', description: 'Ореховый соус', price: 120, oldPrice: null, weight: 40, imageUrl: '/img/nutsauce.webp', categoryId: 5, isAvailable: true, spiciness: null, isNew: false, isHit: false },
  { id: 14, name: 'Жареный лосось', description: 'Лосось, нори, авокадо и сливочный сыр', price: 620, oldPrice: 750, weight: 280, imageUrl: '/img/salmon.webp', categoryId: 1, isAvailable: true, spiciness: 0, isNew: false, isHit: true },
  { id: 15, name: 'Имбирь', description: 'Маринованный имбирь', price: 50, oldPrice: null, weight: 30, imageUrl: '/img/ginger.webp', categoryId: 5, isAvailable: true, spiciness: 1, isNew: false, isHit: false },
  { id: 16, name: 'Васаби', description: 'Острая паста васаби', price: 40, oldPrice: null, weight: 20, imageUrl: '/img/wasabi.webp', categoryId: 5, isAvailable: true, spiciness: 3, isNew: false, isHit: false },
]

export const promoCodes = [
  { code: 'SUSHI2026', discountPercent: 10, discountFixed: null, description: 'Скидка 10% на весь заказ', minSum: 500 },
  { code: 'ROLL200', discountPercent: null, discountFixed: 200, description: 'Скидка 200 ₽ при заказе от 1000 ₽', minSum: 1000 },
  { code: 'FIRST', discountPercent: 15, discountFixed: null, description: 'Скидка 15% на первый заказ', minSum: 0 },
]

export const settings = [
  { key: 'MIN_ORDER_SUM', value: '500' },
  { key: 'DELIVERY_COST', value: '300' },
  { key: 'FREE_DELIVERY_THRESHOLD', value: '1500' },
]

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const buf = await scryptAsync(password, salt, 64)
  return `${salt}.${buf.toString('hex')}`
}

export async function seed(prisma: PrismaClient) {
  console.log('Seeding database...')

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    })
  }
  console.log(`  ✓ ${categories.length} categories`)

  for (const prod of products) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: prod,
    })
  }
  console.log(`  ✓ ${products.length} products`)

  for (const promo of promoCodes) {
    await prisma.promoCode.upsert({
      where: { code: promo.code },
      update: promo,
      create: promo,
    })
  }
  console.log(`  ✓ ${promoCodes.length} promo codes`)

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    })
  }
  console.log(`  ✓ ${settings.length} settings`)

  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const passwordHash = await hashPassword(password)

  const existingAdmin = await prisma.user.findUnique({ where: { username } })
  if (existingAdmin) {
    await prisma.user.update({
      where: { username },
      data: { passwordHash },
    })
    console.log(`  ✓ Admin user "${username}" updated`)
  } else {
    await prisma.user.create({
      data: { username, passwordHash },
    })
    console.log(`  ✓ Admin user "${username}" created (password: ${password})`)
  }

  console.log('Done!')
}

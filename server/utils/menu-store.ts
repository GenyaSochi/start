import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import type { Product, Category } from '../../shared/types/sushi'
import { products as seedProducts, categories as seedCategories } from '../data/menu'

const DATA_DIR = join(process.cwd(), 'server', 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')
const CATEGORIES_FILE = join(DATA_DIR, 'categories.json')

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, 'utf-8')) as T
    }
  } catch (e) {
    console.error(`Failed to read ${filePath}:`, e)
  }
  return fallback
}

function writeJson<T>(filePath: string, data: T) {
  ensureDir()
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export function getProducts(): Product[] {
  return readJson<Product[]>(PRODUCTS_FILE, seedProducts)
}

export function getCategories(): Category[] {
  return readJson<Category[]>(CATEGORIES_FILE, seedCategories)
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function updateProduct(id: number, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...updates, id }
  writeJson(PRODUCTS_FILE, products)
  return products[index]
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const products = getProducts()
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0)
  const newProduct: Product = { ...product, id: maxId + 1 }
  products.push(newProduct)
  writeJson(PRODUCTS_FILE, products)
  return newProduct
}

export function deleteProduct(id: number): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  writeJson(PRODUCTS_FILE, filtered)
  return true
}

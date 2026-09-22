import type { Product, Category } from '../../shared/types/sushi'
import { products as seedProducts, categories as seedCategories } from './data/menu'

const STORAGE_KEY_PRODUCTS = 'sushi_products'
const STORAGE_KEY_CATEGORIES = 'sushi_categories'

let _products: Product[] | null = null
let _categories: Category[] | null = null

function isClient(): boolean {
  return typeof window !== 'undefined'
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    // повреждённые данные — используем сид
  }
  return JSON.parse(JSON.stringify(fallback)) as T
}

function saveToStorage<T>(key: string, data: T): void {
  if (!isClient()) return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // квота или приватный режим — молча пропускаем
  }
}

export function getProducts(): Product[] {
  if (!_products) {
    _products = loadFromStorage<Product[]>(STORAGE_KEY_PRODUCTS, seedProducts)
  }
  return _products
}

export function getCategories(): Category[] {
  if (!_categories) {
    _categories = loadFromStorage<Category[]>(STORAGE_KEY_CATEGORIES, seedCategories)
  }
  return _categories
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function updateProduct(id: number, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...updates, id }
  saveToStorage(STORAGE_KEY_PRODUCTS, products)
  return products[index]
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const products = getProducts()
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0)
  const newProduct: Product = { ...product, id: maxId + 1 }
  products.push(newProduct)
  saveToStorage(STORAGE_KEY_PRODUCTS, products)
  return newProduct
}

export function deleteProduct(id: number): boolean {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false
  products.splice(index, 1)
  saveToStorage(STORAGE_KEY_PRODUCTS, products)
  return true
}

export function resetToDefaults(): void {
  _products = null
  _categories = null
  if (isClient()) {
    localStorage.removeItem(STORAGE_KEY_PRODUCTS)
    localStorage.removeItem(STORAGE_KEY_CATEGORIES)
  }
}

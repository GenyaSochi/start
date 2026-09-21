import type { Product, Category } from '../../shared/types/sushi'
import { products as seedProducts, categories as seedCategories } from './data/menu'

function readJson<T>(fallback: T): T {
  return fallback
}

export function getProducts(): Product[] {
  return readJson<Product[]>(seedProducts)
}

export function getCategories(): Category[] {
  return readJson<Category[]>(seedCategories)
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function updateProduct(id: number, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...updates, id }
  return products[index]
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const products = getProducts()
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0)
  const newProduct: Product = { ...product, id: maxId + 1 }
  products.push(newProduct)
  return newProduct
}

export function deleteProduct(id: number): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  return true
}

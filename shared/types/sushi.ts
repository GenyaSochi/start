export interface Category {
  id: number
  name: string
  slug: string
  sort_order: number
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  old_price: number | null
  weight: number
  image_url: string
  category_id: number
  is_available: boolean
  spiciness: number | null
  is_new: boolean
  is_hit: boolean
}

export interface CartItem {
  product_id: number
  quantity: number
  price_fixed: number
}

export interface PromoResult {
  code: string
  discount_amount: number
  description: string
}

export interface CartState {
  cart_id: string
  items: CartItem[]
  promocode: string | null
  promo: PromoResult | null
  delivery_cost: number
}

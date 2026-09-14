import type { Category, Product } from '../../shared/types/sushi'

export const categories: Category[] = [
  { id: 1, name: 'Суши и роллы', slug: 'sushi', sort_order: 1 },
  { id: 2, name: 'Сеты', slug: 'sets', sort_order: 2 },
  { id: 3, name: 'Закуски', slug: 'rolls', sort_order: 3 },
  { id: 4, name: 'Напитки', slug: 'drinks', sort_order: 4 },
  { id: 5, name: 'Соусы', slug: 'sauces', sort_order: 5 }
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Филадельфия',
    description: 'Лосось, сливочный сыр, рис, нори. Классический ролл с нежным вкусом.',
    price: 550,
    old_price: 650,
    weight: 250,
    image_url: '/img/baked.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 2,
    name: 'Калифорния',
    description: 'Лосось, авокадо, тобико, рис, нори, сливочный сыр',
    price: 520,
    old_price: null,
    weight: 230,
    image_url: '/img/kaliforniya.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 3,
    name: 'Опалённый лосось',
    description: 'Лосось, авокадо, рис, нори,сливочный сыр',
    price: 760,
    old_price: null,
    weight: 270,
    image_url: '/img/losopal.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: true,
    is_hit: false
  },
  {
    id: 4,
    name: 'Спайси лосось',
    description: 'Острый лосось, спайси соус, рис, нори, сливочный сыр',
    price: 400,
    old_price: 470,
    weight: 220,
    image_url: '/img/xx.webp',
    category_id: 1,
    is_available: true,
    spiciness: 2, 
    is_new: false,
    is_hit: false
  },
  {
    id: 5,
    name: 'Маки лосось',
    description: 'Тонкий ломтик свежего лосося на подушке из риса',
    price: 300,
    old_price: null,
    weight: 40,
    image_url: '/img/makilos.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: false
  },
  {
    id: 6,
    name: 'Нигири с тунцом',
    description: 'Нежный тунец на рисовой подушке с икрой летучей рыбы и креветкой',
    price: 580,
    old_price: null,
    weight: 280,
    image_url: '/img/tuna.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: false
  },
  {
    id: 7,
    name: 'Нигири с угрём',
    description: 'Копчёный угорь на рисе с соусом унаги, огурцом и кунжутом.',
    price: 550,
    old_price: 600,
    weight: 250,
    image_url: '/img/eel.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 8,
    name: 'Сет «Для двоих»',
    description: 'Три вида роллов',
    price: 1290,
    old_price: 1590,
    weight: 650,
    image_url: '/img/twoset.webp',
    category_id: 2,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 9,
    name: 'Сет «Большая компания»',
    description: 'Восемь видов роллов',
    price: 2490,
    old_price: null,
    weight: 2600,
    image_url: '/img/big.webp',
    category_id: 2,
    is_available: true,
    spiciness: 0,
    is_new: true,
    is_hit: false
  },
  {
    id: 10,
    name: 'Запечённый ролл с креветкой',
    description: 'Тигровая креветка, сливочный сыр, спайси майонез, запечённая шапка из рубленной креветки',
    price: 510,
    old_price: null,
    weight: 260,
    image_url: '/img/shrimpbaked.webp',
    category_id: 1,
    is_available: true,
    spiciness: 1,
    is_new: true,
    is_hit: false
  },
  {
    id: 11,
    name: 'Сет "Хот"',
    description: 'Три вида жареных роллов',
    price: 1220,
    old_price: 1580,
    weight: 700,
    image_url: '/img/hot.webp',
    category_id: 2,
    is_available: true,
    spiciness: null,
    is_new: true,
    is_hit: false
  },
  {
    id: 12,
    name: 'Соевый соус',
    description: 'Классический соевый соус, 50 мл.',
    price: 50,
    old_price: null,
    weight: 50,
    image_url: '/img/soy.webp',
    category_id: 5,
    is_available: true,
    spiciness: null,
    is_new: false,
    is_hit: false
  },

  {
    id: 13,
    name: 'Ореховый соус',
    description: 'Ореховый соус',
    price: 120,
    old_price: null,
    weight: 40,
    image_url: '/img/nutsauce.webp',
    category_id: 5,
    is_available: true,
    spiciness: null,
    is_new: false,
    is_hit: false
  },
  {
    id: 14,
    name: 'Жареный лосось',
    description: 'Лосось, нори, авокадо и сливочный сыр',
    price: 620,
    old_price: 750,
    weight: 280,
    image_url: '/img/salmon.webp',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 15,
    name: 'Имбирь',
    description: 'Маринованный имбирь',
    price: 50,
    old_price: null,
    weight: 30,
    image_url: '/img/ginger.webp',
    category_id: 5,
    is_available: true,
    spiciness: 1,
    is_new: false,
    is_hit: false
  },
  {
    id: 16,
    name: 'Васаби',
    description: 'Острая паста васаби',
    price: 40,
    old_price: null,
    weight: 20,
    image_url: '/img/wasabi.webp',
    category_id: 5,
    is_available: true,
    spiciness: 3,
    is_new: false,
    is_hit: false
  }
]

export const promos: Record<string, { discount_percent?: number; discount_fixed?: number; description: string; min_sum?: number }> = {
  'SUSHI2026': { discount_percent: 10, description: 'Скидка 10% на весь заказ', min_sum: 500 },
  'ROLL200': { discount_fixed: 200, description: 'Скидка 200 ₽ при заказе от 1000 ₽', min_sum: 1000 },
  'FIRST': { discount_percent: 15, description: 'Скидка 15% на первый заказ', min_sum: 0 }
}

export const MIN_ORDER_SUM = 500
export const DELIVERY_COST = 300
export const FREE_DELIVERY_THRESHOLD = 1500

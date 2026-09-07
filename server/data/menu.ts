import type { Category, Product } from '../../shared/types/sushi'

export const categories: Category[] = [
  { id: 1, name: 'Суши', slug: 'sushi', sort_order: 1 },
  { id: 2, name: 'Роллы', slug: 'rolls', sort_order: 2 },
  { id: 3, name: 'Сеты', slug: 'sets', sort_order: 3 },
  { id: 4, name: 'Напитки', slug: 'drinks', sort_order: 4 },
  { id: 5, name: 'Соусы', slug: 'sauces', sort_order: 5 }
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Филадельфия',
    description: 'Лосось, сливочный сыр, огурец, рис, нори. Классический ролл с нежным вкусом.',
    price: 450,
    old_price: 550,
    weight: 250,
    image_url: '/img/philadelphia.svg',
    category_id: 2,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 2,
    name: 'Калифорния',
    description: 'Краб, авокадо, огурец, тобико, майонез, рис, нори.',
    price: 420,
    old_price: null,
    weight: 230,
    image_url: '/img/california.svg',
    category_id: 2,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 3,
    name: 'Дракон ролл',
    description: 'Угорь, авокадо, огурец, кунжут, унаги соус, рис, нори.',
    price: 580,
    old_price: null,
    weight: 270,
    image_url: '/img/dragon.svg',
    category_id: 2,
    is_available: true,
    spiciness: 1,
    is_new: true,
    is_hit: false
  },
  {
    id: 4,
    name: 'Спайси лосось',
    description: 'Острый лосось, спайси соус, зелёный лук, рис, нори.',
    price: 390,
    old_price: 470,
    weight: 220,
    image_url: '/img/spicy-salmon.svg',
    category_id: 2,
    is_available: true,
    spiciness: 3,
    is_new: false,
    is_hit: false
  },
  {
    id: 5,
    name: 'Нигири с лососем',
    description: 'Тонкий ломтик свежего лосося на подушке из риса.',
    price: 180,
    old_price: null,
    weight: 40,
    image_url: '/img/nigiri-salmon.svg',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: false
  },
  {
    id: 6,
    name: 'Нигири с тунцом',
    description: 'Нежный тунец на рисовой подушке с каплей васаби.',
    price: 210,
    old_price: null,
    weight: 40,
    image_url: '/img/nigiri-tuna.svg',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: false
  },
  {
    id: 7,
    name: 'Нигири с угрём',
    description: 'Копчёный угорь на рисе с соусом унаги и кунжутом.',
    price: 250,
    old_price: 300,
    weight: 45,
    image_url: '/img/nigiri-eel.svg',
    category_id: 1,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 8,
    name: 'Сет «Для двоих»',
    description: 'Филадельфия 8шт, Калифорния 8шт, Нигири микс 6шт, имбирь, васаби, соевый соус.',
    price: 1290,
    old_price: 1590,
    weight: 650,
    image_url: '/img/set-for-two.svg',
    category_id: 3,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  },
  {
    id: 9,
    name: 'Сет «Большая компания»',
    description: '4 вида роллов по 8шт + 12 нигири. Идеально для вечеринки.',
    price: 2490,
    old_price: null,
    weight: 1200,
    image_url: '/img/set-party.svg',
    category_id: 3,
    is_available: true,
    spiciness: 1,
    is_new: true,
    is_hit: false
  },
  {
    id: 10,
    name: 'Зелёный чай матча',
    description: 'Японский порошковый чай матча, подаётся горячим или холодным.',
    price: 190,
    old_price: null,
    weight: 300,
    image_url: '/img/matcha.svg',
    category_id: 4,
    is_available: true,
    spiciness: null,
    is_new: false,
    is_hit: false
  },
  {
    id: 11,
    name: 'Лимонад юдзу',
    description: 'Освежающий лимонад с японским цитрусом юдзу и мятой.',
    price: 220,
    old_price: 280,
    weight: 350,
    image_url: '/img/yuzu-lemonade.svg',
    category_id: 4,
    is_available: true,
    spiciness: null,
    is_new: true,
    is_hit: false
  },
  {
    id: 12,
    name: 'Соевый соус',
    description: 'Классический соевый соус Kikkoman, 50 мл.',
    price: 60,
    old_price: null,
    weight: 50,
    image_url: '/img/soy-sauce.svg',
    category_id: 5,
    is_available: true,
    spiciness: null,
    is_new: false,
    is_hit: false
  },
  {
    id: 13,
    name: 'Острый соус шрирача',
    description: 'Острый чили-соус с чесноком, 30 мл.',
    price: 80,
    old_price: null,
    weight: 30,
    image_url: '/img/sriracha.svg',
    category_id: 5,
    is_available: false,
    spiciness: 3,
    is_new: false,
    is_hit: false
  },
  {
    id: 14,
    name: 'Запечённый ролл с креветкой',
    description: 'Тигровая креветка, сливочный сыр, спайси майонез, запечённая шапка.',
    price: 510,
    old_price: null,
    weight: 260,
    image_url: '/img/baked-shrimp.svg',
    category_id: 2,
    is_available: true,
    spiciness: 1,
    is_new: true,
    is_hit: false
  },
  {
    id: 15,
    name: 'Радуга ролл',
    description: 'Калифорния внутри, сверху покрыт ассорти из лосося, тунца и авокадо.',
    price: 620,
    old_price: 750,
    weight: 280,
    image_url: '/img/rainbow.svg',
    category_id: 2,
    is_available: true,
    spiciness: 0,
    is_new: false,
    is_hit: true
  }
]

export const promos: Record<string, { discount_percent?: number; discount_fixed?: number; description: string; min_sum?: number }> = {
  'SUSHI2026': { discount_percent: 10, description: 'Скидка 10% на весь заказ', min_sum: 500 },
  'ROLL200': { discount_fixed: 200, description: 'Скидка 200 ₽ при заказе от 1000 ₽', min_sum: 1000 },
  'FIRST': { discount_percent: 15, description: 'Скидка 15% на первый заказ', min_sum: 0 }
}

export const MIN_ORDER_SUM = 500
export const DELIVERY_COST_BELOW_MIN = 200

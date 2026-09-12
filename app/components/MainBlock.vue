<template>
  <section class="menu-page">
    <img src="/img/samuraiblack.webp" alt="" class="samurai-bg" />
    <h1 class="menu-title">
      <span class="gradient-text">Победи голод - сделай вкусный заказ!</span>
    </h1>

    <div class="menu-layout">
      <div class="menu-main">
        <SushiCategoryTabs :categories="categories" :active-category="activeCategory" @select="onCategorySelect" />
        <SushiFilterBar :sort="sort" :filters="filters" @update:sort="onSortChange" @toggle-filter="onToggleFilter" @update:min-price="v => filters.minPrice = v || null" @update:max-price="v => filters.maxPrice = v || null" />

        <div v-if="pending" class="loading">Загрузка меню...</div>

        <div v-else-if="filteredProducts.length === 0" class="empty-state">
          <p>Ничего не найдено</p>
          <span>Попробуйте изменить фильтры или выбрать другую категорию</span>
        </div>

        <div v-else class="products-grid">
          <SushiProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :quantity="getItemQuantity(product.id)"
            @add="onAdd"
            @decrease="onDecrease"
            @open="openModal"
          />
        </div>
      </div>

      <!-- Floating cart button -->
      <button v-if="itemCount > 0" class="floating-cart" @click="cartOpen = true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="cart-badge">{{ itemCount }}</span>
        <span class="cart-total">{{ cart.total }} ₽</span>
      </button>
    </div>

    <SushiProductModal :product="selectedProduct" :quantity="selectedProduct ? getItemQuantity(selectedProduct.id) : 0" @close="selectedProduct = null" @add="onAdd" @decrease="onDecrease" />
    <SushiCartPanel :open="cartOpen" @close="cartOpen = false" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product, Category } from '~/../../shared/types/sushi'
import { useCart } from '~/composables/useCart'

const { cart, itemCount, fetchCart, addProduct, updateQuantity, removeProduct, getItemQuantity } = useCart()

const categories = ref<Category[]>([])
const products = ref<Product[]>([])
const pending = ref(true)
const activeCategory = ref('all')
const sort = ref('popular')
const filters = ref({
  onlyPromo: false,
  onlySpicy: false,
  minPrice: null as number | null,
  maxPrice: null as number | null
})

const selectedProduct = ref<Product | null>(null)
const cartOpen = ref(false)

const filteredProducts = computed(() => {
  let list = [...products.value]

  if (activeCategory.value !== 'all') {
    const cat = categories.value.find(c => c.slug === activeCategory.value)
    if (cat) {
      list = list.filter(p => p.category_id === cat.id)
    }
  }

  if (filters.value.onlyPromo) {
    list = list.filter(p => p.old_price !== null)
  }

  if (filters.value.onlySpicy) {
    list = list.filter(p => p.spiciness && p.spiciness > 0)
  }

  if (filters.value.minPrice) {
    list = list.filter(p => p.price >= filters.value.minPrice!)
  }

  if (filters.value.maxPrice) {
    list = list.filter(p => p.price <= filters.value.maxPrice!)
  }

  if (sort.value === 'price_asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (sort.value === 'price_desc') {
    list.sort((a, b) => b.price - a.price)
  } else if (sort.value === 'new') {
    list.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
  } else if (sort.value === 'popular') {
    list.sort((a, b) => (b.is_hit ? 1 : 0) - (a.is_hit ? 1 : 0))
  }

  return list
})

async function loadData() {
  pending.value = true
  try {
    const [cats, prods] = await Promise.all([
      $fetch<Category[]>('/api/v1/categories'),
      $fetch<Product[]>('/api/v1/products?limit=100')
    ])
    categories.value = [{ id: 0, name: 'Все', slug: 'all', sort_order: 0 }, ...cats]
    products.value = prods
  } catch (e) {
    console.error('Failed to load menu:', e)
  } finally {
    pending.value = false
  }
}

function onCategorySelect(slug: string) {
  activeCategory.value = slug
}

function onSortChange(value: string) {
  sort.value = value
}

function onToggleFilter(key: 'onlyPromo' | 'onlySpicy') {
  filters.value[key] = !filters.value[key]
}

async function onAdd(product: Product) {
  const qty = getItemQuantity(product.id)
  try {
    if (qty === 0) {
      await addProduct(product.id, 1)
    } else {
      await updateQuantity(product.id, qty + 1)
    }
  } catch (e: any) {
    const msg = e?.data?.message || e?.message || 'Ошибка'
    alert(msg)
  }
}

async function onDecrease(product: Product) {
  const qty = getItemQuantity(product.id)
  if (qty <= 1) {
    try {
      await removeProduct(product.id)
    } catch {}
  } else {
    try {
      await updateQuantity(product.id, qty - 1)
    } catch {}
  }
}

function openModal(product: Product) {
  selectedProduct.value = product
}

onMounted(async () => {
  await loadData()
  await fetchCart()
})
</script>

<style scoped>
.menu-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
  position: relative;
}

.samurai-bg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vmin;
  height: 60vmin;
  object-fit: contain;
  filter: contrast(1.15) brightness(1.05) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));
  pointer-events: none;
  cursor: none;
  z-index: 0;
}

.menu-page > *:not(.samurai-bg) {
  position: relative;
  z-index: 1;
}

.menu-title {
  text-align: center;
  margin: 0 0 2rem;
  font-size: 2.2rem;
  font-weight: 700;
}

.gradient-text {
  background: linear-gradient(135deg, #370000, #6b1a1a, #370000);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Manrope', sans-serif;
}

.menu-layout {
  position: relative;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: rgba(0, 0, 0, 0.5);
  font-family: 'Manrope', sans-serif;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: rgba(0, 0, 0, 0.4);
  font-family: 'Manrope', sans-serif;
}

.empty-state p {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
}

.floating-cart {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: #1a1a1a;
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 999;
}

.floating-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.cart-badge {
  background: rgba(255, 255, 255, 0.25);
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.85rem;
}

.cart-total {
  font-weight: 600;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .menu-page {
    padding: 1.5rem 1rem 6rem;
  }

  .menu-title {
    font-size: 1.6rem;
  }
}
</style>

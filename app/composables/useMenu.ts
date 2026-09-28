import type { Product, Category } from '../../shared/types/sushi'

export function useMenu() {
  const { data: menuData, pending: menuPending, error: menuError } = useFetch('/api/menu', {
    key: 'menu',
    server: true,
    lazy: false,
  })

  const { data: settingsData } = useFetch('/api/settings', {
    key: 'settings',
    server: true,
    lazy: false,
  })

  const products = computed<Product[]>(() => menuData.value?.products ?? [])
  const categories = computed<Category[]>(() => menuData.value?.categories ?? [])

  const sortedCategories = computed(() =>
    [...categories.value].sort((a, b) => a.sort_order - b.sort_order)
  )

  const settings = computed(() => ({
    min_order_sum: settingsData.value?.min_order_sum ?? 500,
    delivery_cost: settingsData.value?.delivery_cost ?? 300,
    free_delivery_threshold: settingsData.value?.free_delivery_threshold ?? 1500,
  }))

  return {
    products,
    categories,
    sortedCategories,
    settings,
    pending: menuPending,
    error: menuError,
  }
}

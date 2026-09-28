export default defineEventHandler(async () => {
  const prisma = usePrisma()

  const settings = await prisma.setting.findMany()
  const map: Record<string, number> = {}
  for (const s of settings) {
    map[s.key] = Number(s.value)
  }

  return {
    min_order_sum: map['MIN_ORDER_SUM'] ?? 500,
    delivery_cost: map['DELIVERY_COST'] ?? 300,
    free_delivery_threshold: map['FREE_DELIVERY_THRESHOLD'] ?? 1500,
  }
})

<template>
  <div class="admin-page">
    <h1 class="admin-title">Личный кабинет</h1>
    <p class="admin-subtitle">Управление товарами меню</p>
    <p class="admin-note">Изменения сохраняются локально в вашем браузере</p>

    <div v-if="pending" class="loading">Загрузка...</div>

    <div v-else class="admin-content">
      <div class="admin-actions">
        <button class="add-btn-top" @click="startAdd">+ Добавить товар</button>
        <button class="reset-btn" @click="handleReset">Сбросить к умолчанию</button>
      </div>

      <div class="products-table">
        <div class="table-header">
          <span class="col-id">ID</span>
          <span class="col-name">Название</span>
          <span class="col-price">Цена</span>
          <span class="col-old">Старая цена</span>
          <span class="col-cat">Категория</span>
          <span class="col-avail">Доступен</span>
          <span class="col-actions">Действия</span>
        </div>

        <div v-for="product in products" :key="product.id" class="table-row">
          <span class="col-id">{{ product.id }}</span>
          <span class="col-name">{{ product.name }}</span>
          <span class="col-price">{{ product.price }} ₽</span>
          <span class="col-old">{{ product.old_price ? product.old_price + ' ₽' : '—' }}</span>
          <span class="col-cat">{{ getCategoryName(product.category_id) }}</span>
          <span class="col-avail">
            <span :class="['badge', product.is_available ? 'yes' : 'no']">
              {{ product.is_available ? 'Да' : 'Нет' }}
            </span>
          </span>
          <span class="col-actions">
            <button class="btn-edit" @click="startEdit(product)">Ред.</button>
            <button class="btn-del" @click="removeProduct(product.id)">Удалить</button>
          </span>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
          <div class="modal-content">
            <button class="modal-close" @click="showModal = false">✕</button>
            <h2>{{ isAdding ? 'Добавить товар' : 'Редактировать товар' }}</h2>

            <form class="edit-form" @submit.prevent="saveProduct">
              <div class="field">
                <label>Название</label>
                <input v-model="form.name" type="text" required />
              </div>

              <div class="field">
                <label>Описание</label>
                <textarea v-model="form.description" rows="3"></textarea>
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Цена (₽)</label>
                  <input v-model.number="form.price" type="number" min="0" required />
                </div>
                <div class="field">
                  <label>Старая цена (₽)</label>
                  <input v-model.number="form.old_price" type="number" min="0" placeholder="Без скидки" />
                </div>
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Вес (г)</label>
                  <input v-model.number="form.weight" type="number" min="0" required />
                </div>
                <div class="field">
                  <label>Категория</label>
                  <select v-model.number="form.category_id">
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label>URL изображения</label>
                <input v-model="form.image_url" type="text" placeholder="/img/..." />
                <img v-if="form.image_url" :src="'/start/' + form.image_url" class="image-preview" alt="Превью" />
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Острота (0-3)</label>
                  <input v-model.number="form.spiciness" type="number" min="0" max="3" />
                </div>
              </div>

              <div class="checkboxes">
                <label><input type="checkbox" v-model="form.is_available" /> Доступен</label>
                <label><input type="checkbox" v-model="form.is_new" /> Новинка</label>
                <label><input type="checkbox" v-model="form.is_hit" /> Хит</label>
              </div>

              <button type="submit" class="save-btn" :disabled="saving">
                {{ saving ? 'Сохранение...' : 'Сохранить' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, Category } from '~/../../shared/types/sushi'
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct, resetToDefaults } from '~/helpers/menu-store'

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const pending = ref(true)
const showModal = ref(false)
const saving = ref(false)
const isAdding = ref(false)
const editingId = ref<number | null>(null)

const emptyForm = (): Omit<Product, 'id'> => ({
  name: '',
  description: '',
  price: 0,
  old_price: null,
  weight: 0,
  image_url: '',
  category_id: 1,
  is_available: true,
  spiciness: 0,
  is_new: false,
  is_hit: false
})

const form = ref(emptyForm())

function loadData() {
  pending.value = true
  try {
    products.value = [...getProducts()]
    categories.value = [...getCategories()]
  } catch (e) {
    console.error('Failed to load admin data:', e)
  } finally {
    pending.value = false
  }
}

function getCategoryName(id: number): string {
  return categories.value.find(c => c.id === id)?.name || `#${id}`
}

function startAdd() {
  isAdding.value = true
  editingId.value = null
  form.value = emptyForm()
  showModal.value = true
}

function startEdit(product: Product) {
  isAdding.value = false
  editingId.value = product.id
  form.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    old_price: product.old_price,
    weight: product.weight,
    image_url: product.image_url,
    category_id: product.category_id,
    is_available: product.is_available,
    spiciness: product.spiciness,
    is_new: product.is_new,
    is_hit: product.is_hit
  }
  showModal.value = true
}

function saveProduct() {
  saving.value = true
  try {
    const payload = {
      ...form.value,
      old_price: form.value.old_price || null,
      spiciness: form.value.spiciness || null
    }

    if (isAdding.value) {
      addProduct(payload)
    } else if (editingId.value) {
      updateProduct(editingId.value, payload)
    }

    showModal.value = false
    loadData()
  } catch (e: any) {
    alert(e?.message || 'Ошибка сохранения')
  } finally {
    saving.value = false
  }
}

function removeProduct(id: number) {
  if (!confirm('Удалить этот товар?')) return
  try {
    deleteProduct(id)
    loadData()
  } catch (e: any) {
    alert(e?.message || 'Ошибка удаления')
  }
}

function handleReset() {
  if (!confirm('Сбросить все изменения и вернуть меню по умолчанию?')) return
  resetToDefaults()
  loadData()
}

onMounted(loadData)
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  min-height: 100vh;
}

.admin-title {
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0.25rem;
  font-family: 'Manrope', sans-serif;
}

.admin-subtitle {
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 0.5rem;
  font-family: 'Manrope', sans-serif;
}

.admin-note {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  font-family: 'Manrope', sans-serif;
  margin: 0 0 2rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Manrope', sans-serif;
}

.admin-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.add-btn-top {
  background: linear-gradient(135deg, #ff4d4d, #c0392b);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-btn-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 77, 77, 0.4);
}

.reset-btn {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
}

.products-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 50px 1fr 100px 100px 120px 80px 140px;
  gap: 12px;
  align-items: center;
  padding: 10px 16px;
  font-family: 'Manrope', sans-serif;
}

.table-header {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  transition: background 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.06);
}

.col-name {
  font-weight: 600;
}

.badge {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.yes {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.badge.no {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.btn-edit,
.btn-del {
  padding: 6px 14px;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
}

.btn-edit:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-del {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
}

.btn-del:hover {
  background: rgba(244, 67, 54, 0.3);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  position: relative;
  background: rgba(20, 22, 30, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin: 0 0 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Manrope', sans-serif;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  cursor: pointer;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.field label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Manrope', sans-serif;
}

.field input,
.field textarea,
.field select {
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  font-family: 'Manrope', sans-serif;
  outline: none;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: rgba(255, 255, 255, 0.4);
}

.field-row {
  display: flex;
  gap: 1rem;
}

.checkboxes {
  display: flex;
  gap: 1.5rem;
}

.checkboxes label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
}

.image-preview {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.save-btn {
  background: linear-gradient(135deg, #ff4d4d, #c0392b);
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: opacity 0.2s ease;
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .table-header {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 14px;
  }

  .col-id {
    display: none;
  }

  .col-name {
    grid-column: 1 / -1;
    font-size: 1rem;
  }

  .col-actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }

  .field-row {
    flex-direction: column;
  }

  .checkboxes {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
        <div class="modal-content">
          <button class="modal-close" @click="$emit('update:modelValue', false)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <h2 class="modal-title">Связаться с нами</h2>
          <p class="modal-subtitle">Оставьте заявку и мы ответим вам в ближайшее время</p>

          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-field">
              <label>Ваше имя</label>
              <input v-model="form.name" type="text" placeholder="Как к вам обращаться?" required />
            </div>
            <div class="form-field">
              <label>Телефон или Telegram</label>
              <input v-model="form.phone" type="text" placeholder="+7 (___) ___-__-__" required />
            </div>
            <div class="form-field">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="your@email.com" />
            </div>
            <div class="form-field">
              <label>Сообщение</label>
              <textarea v-model="form.message" placeholder="Опишите ваш проект или вопрос..." rows="4"></textarea>
            </div>

            <div class="consent-block">
              <label class="consent-label" :class="{ active: form.consent }">
                <input type="checkbox" v-model="form.consent" required />
                <span class="checkmark"></span>
                <span class="consent-text">
                  Я даю согласие на <NuxtLink to="/privacy" @click.stop>обработку персональных данных</NuxtLink>
                  в соответствии с политикой конфиденциальности
                </span>
              </label>
            </div>

            <button type="submit" class="submit-btn" :disabled="!form.consent">
              <span>Отправить заявку</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: '',
  consent: false
})

function submitForm() {
  if (!form.consent) return
  console.log('Contact form:', JSON.parse(JSON.stringify(form)))
  // Здесь будет отправка данных
  emit('update:modelValue', false)
  // Reset form
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
  form.consent = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  position: relative;
  background: rgba(15, 18, 28, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Inter', sans-serif;
  margin: 0 0 0.5rem;
  text-align: center;
}

.modal-subtitle {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
  text-align: center;
  margin: 0 0 2rem;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  outline: none;
  box-sizing: border-box;
}

.form-field input:focus,
.form-field textarea:focus {
  border-color: rgba(74, 144, 226, 0.5);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.form-field textarea {
  resize: vertical;
  min-height: 80px;
}

/* ── Consent checkbox ── */
.consent-block {
  margin-top: 0.5rem;
}

.consent-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  position: relative;
}

.consent-label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.2s ease;
  position: relative;
  margin-top: 1px;
}

.consent-label.active .checkmark {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border-color: #4a90e2;
}

.consent-label.active .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.consent-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.8rem;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
}

.consent-text a {
  color: rgba(74, 144, 226, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}

.consent-text a:hover {
  color: rgba(74, 144, 226, 1);
  text-decoration: underline;
}

/* ── Submit button ── */
.submit-btn {
  position: relative;
  width: 100%;
  height: 52px;
  padding: 0 24px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.3);
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.45);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Transition ── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from .modal-content {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

@media (max-width: 520px) {
  .modal-content {
    padding: 2rem 1.5rem;
  }
}
</style>

<template>
  <section class="store-page">
    <h1 class="store-title">
      <span class="gradient-text">Анкета для интернет-магазина</span>
    </h1>
    <p class="store-subtitle">
      Чтобы мы могли предложить лучшее решение именно для вас, расскажите немного о вашем бизнесе. Анкета короткая — 5–7
      минут, а результат — точный расчёт и чёткий план.
    </p>

    <form class="store-form" @submit.prevent="submitForm">
      <!-- Блок 1 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">01</span>
          О бизнесе и целях
        </h2>
        <div class="fields-grid">
          <div class="field full-width">
            <label>Название магазина / Бренд</label>
            <input v-model="form.storeName" type="text" placeholder="Введите название" />
          </div>
          <div class="field full-width">
            <label>Чем вы торгуете?</label>
            <input v-model="form.category" type="text" placeholder="Одежда, электроника, ручная работа..." />
          </div>
          <div class="field">
            <label>У вас уже есть офлайн-бизнес?</label>
            <select v-model="form.hasOffline">
              <option value="">Выберите</option>
              <option value="yes">Да — магазин / шоурум / склад</option>
              <option value="no">Нет, только онлайн</option>
            </select>
          </div>
          <div class="field">
            <label>Главная цель сайта</label>
            <select v-model="form.mainGoal">
              <option value="">Выберите</option>
              <option value="online-sales">Продажи через корзину (онлайн-оплата)</option>
              <option value="cash-on-delivery">Сбор заказов с оплатой при доставке</option>
              <option value="catalog">Формирование прайс-листа («витрина»)</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <div class="field full-width" v-if="form.mainGoal === 'other'">
            <label>Опишите вашу цель</label>
            <input v-model="form.mainGoalOther" type="text" placeholder="..." />
          </div>
          <div class="field full-width">
            <label>Планируемое количество товаров</label>
            <div class="radio-group">
              <label class="radio-card" :class="{ active: form.productCount === 'under50' }">
                <input type="radio" v-model="form.productCount" value="under50" />
                <span>до 50</span>
              </label>
              <label class="radio-card" :class="{ active: form.productCount === '50-500' }">
                <input type="radio" v-model="form.productCount" value="50-500" />
                <span>50–500</span>
              </label>
              <label class="radio-card" :class="{ active: form.productCount === '500-5000' }">
                <input type="radio" v-model="form.productCount" value="500-5000" />
                <span>500–5000</span>
              </label>
              <label class="radio-card" :class="{ active: form.productCount === '5000+' }">
                <input type="radio" v-model="form.productCount" value="5000+" />
                <span>более 5000</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок 2 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">02</span>
          Ассортимент и карточка товара
        </h2>
        <div class="fields-grid">
          <div class="field">
            <label>Будут ли у товаров варианты?</label>
            <div class="toggle-group">
              <label class="toggle-card" :class="{ active: form.hasVariants === 'yes' }">
                <input type="radio" v-model="form.hasVariants" value="yes" />
                <span>Да</span>
              </label>
              <label class="toggle-card" :class="{ active: form.hasVariants === 'no' }">
                <input type="radio" v-model="form.hasVariants" value="no" />
                <span>Нет</span>
              </label>
            </div>
          </div>
          <div class="field full-width">
            <label>Какие функции нужны?</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.features.includes('filters') }">
                <input type="checkbox" v-model="form.features" value="filters" />
                <span>Фильтры (цена, бренд, размер)</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.features.includes('compare') }">
                <input type="checkbox" v-model="form.features" value="compare" />
                <span>Сравнение товаров</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.features.includes('cross-sell') }">
                <input type="checkbox" v-model="form.features" value="cross-sell" />
                <span>Рекомендации / cross-sell</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.features.includes('reviews') }">
                <input type="checkbox" v-model="form.features" value="reviews" />
                <span>Отзывы и рейтинг</span>
              </label>
            </div>
          </div>
          <div class="field full-width">
            <label>Как будете добавлять товары?</label>
            <div class="radio-group">
              <label class="radio-card" :class="{ active: form.importMethod === 'manual' }">
                <input type="radio" v-model="form.importMethod" value="manual" />
                <span>Вручную через админку</span>
              </label>
              <label class="radio-card" :class="{ active: form.importMethod === 'csv' }">
                <input type="radio" v-model="form.importMethod" value="csv" />
                <span>Импорт из Excel/CSV</span>
              </label>
              <label class="radio-card" :class="{ active: form.importMethod === '1c' }">
                <input type="radio" v-model="form.importMethod" value="1c" />
                <span>Интеграция с 1С / CRM</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок 3 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">03</span>
          Корзина и оплата
        </h2>
        <div class="fields-grid">
          <div class="field full-width">
            <label>Способы оплаты</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.paymentMethods.includes('cards') }">
                <input type="checkbox" v-model="form.paymentMethods" value="cards" />
                <span>Банковские карты</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.paymentMethods.includes('e-wallets') }">
                <input type="checkbox" v-model="form.paymentMethods" value="e-wallets" />
                <span>Электронные кошельки</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.paymentMethods.includes('cash') }">
                <input type="checkbox" v-model="form.paymentMethods" value="cash" />
                <span>Наличные курьеру</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.paymentMethods.includes('sbp') }">
                <input type="checkbox" v-model="form.paymentMethods" value="sbp" />
                <span>СБП (QR-код)</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.paymentMethods.includes('installment') }">
                <input type="checkbox" v-model="form.paymentMethods" value="installment" />
                <span>Рассрочка / кредит</span>
              </label>
            </div>
          </div>
          <div class="field full-width">
            <label>Способы доставки</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.deliveryMethods.includes('courier') }">
                <input type="checkbox" v-model="form.deliveryMethods" value="courier" />
                <span>Курьерская доставка</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.deliveryMethods.includes('pickup') }">
                <input type="checkbox" v-model="form.deliveryMethods" value="pickup" />
                <span>Пункты выдачи / Постаматы</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.deliveryMethods.includes('post') }">
                <input type="checkbox" v-model="form.deliveryMethods" value="post" />
                <span>Почта России</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.deliveryMethods.includes('self') }">
                <input type="checkbox" v-model="form.deliveryMethods" value="self" />
                <span>Самовывоз</span>
              </label>
            </div>
          </div>
          <div class="field">
            <label>Расчёт стоимости доставки в корзине?</label>
            <div class="toggle-group">
              <label class="toggle-card" :class="{ active: form.deliveryCalc === 'yes' }">
                <input type="radio" v-model="form.deliveryCalc" value="yes" />
                <span>Да</span>
              </label>
              <label class="toggle-card" :class="{ active: form.deliveryCalc === 'no' }">
                <input type="radio" v-model="form.deliveryCalc" value="no" />
                <span>Нет</span>
              </label>
            </div>
          </div>
          <div class="field full-width">
            <label>Что после оформления заказа?</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.postOrder.includes('email-sms') }">
                <input type="checkbox" v-model="form.postOrder" value="email-sms" />
                <span>Письмо и СМС клиенту</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.postOrder.includes('notify-manager') }">
                <input type="checkbox" v-model="form.postOrder" value="notify-manager" />
                <span>Уведомление менеджерам</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.postOrder.includes('crm') }">
                <input type="checkbox" v-model="form.postOrder" value="crm" />
                <span>Интеграция с CRM</span>
              </label>
            </div>
          </div>
          <div class="field full-width" v-if="form.postOrder.includes('crm')">
            <label>Какая CRM?</label>
            <input v-model="form.crmName" type="text" placeholder="Например: Битрикс24, AmoCRM..." />
          </div>
        </div>
      </div>

      <!-- Блок 4 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">04</span>
          Личный кабинет
        </h2>
        <div class="fields-grid">
          <div class="field full-width">
            <label>Что сможет делать клиент в личном кабинете?</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.accountFeatures.includes('history') }">
                <input type="checkbox" v-model="form.accountFeatures" value="history" />
                <span>История заказов</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.accountFeatures.includes('tracking') }">
                <input type="checkbox" v-model="form.accountFeatures" value="tracking" />
                <span>Отслеживание доставки</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.accountFeatures.includes('wishlist') }">
                <input type="checkbox" v-model="form.accountFeatures" value="wishlist" />
                <span>Избранное / Wishlist</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.accountFeatures.includes('addresses') }">
                <input type="checkbox" v-model="form.accountFeatures" value="addresses" />
                <span>Сохранение адресов</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.accountFeatures.includes('bonuses') }">
                <input type="checkbox" v-model="form.accountFeatures" value="bonuses" />
                <span>Бонусы / скидки</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок 5 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">05</span>
          Маркетинг и аналитика
        </h2>
        <div class="fields-grid">
          <div class="field full-width">
            <label>Интеграции</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.integrations.includes('analytics') }">
                <input type="checkbox" v-model="form.integrations" value="analytics" />
                <span>Яндекс.Метрика / Google Analytics</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.integrations.includes('email') }">
                <input type="checkbox" v-model="form.integrations" value="email" />
                <span>Email-рассылки</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.integrations.includes('chat') }">
                <input type="checkbox" v-model="form.integrations" value="chat" />
                <span>Чат-бот / Live chat</span>
              </label>
            </div>
          </div>
          <div class="field full-width">
            <label>Промокоды, скидки, бонусные баллы?</label>
            <textarea v-model="form.promoIdea" placeholder="Опишите вашу идею..." rows="3"></textarea>
          </div>
          <div class="field full-width">
            <label>Выгрузка товаров на маркетплейсы</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.marketplaces.includes('ozon') }">
                <input type="checkbox" v-model="form.marketplaces" value="ozon" />
                <span>Ozon</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.marketplaces.includes('wb') }">
                <input type="checkbox" v-model="form.marketplaces" value="wb" />
                <span>Wildberries</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.marketplaces.includes('ym') }">
                <input type="checkbox" v-model="form.marketplaces" value="ym" />
                <span>Яндекс.Маркет</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.marketplaces.includes('vk') }">
                <input type="checkbox" v-model="form.marketplaces" value="vk" />
                <span>VK Товары</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.marketplaces.includes('none') }">
                <input type="checkbox" v-model="form.marketplaces" value="none" />
                <span>Не нужно</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок 6 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">06</span>
          Бюджет и сроки
        </h2>
        <div class="fields-grid">
          <div class="field">
            <label>Примерный бюджет</label>
            <input v-model="form.budget" type="text" placeholder="Например: 300 000 ₽" />
          </div>
          <div class="field">
            <label>Желаемый срок запуска</label>
            <input v-model="form.deadline" type="text" placeholder="Например: 2 месяца" />
          </div>
          <div class="field full-width">
            <label>Что у вас уже есть?</label>
            <div class="checkbox-grid">
              <label class="checkbox-card" :class="{ active: form.hasAssets.includes('logo') }">
                <input type="checkbox" v-model="form.hasAssets" value="logo" />
                <span>Логотип / брендбук</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.hasAssets.includes('texts') }">
                <input type="checkbox" v-model="form.hasAssets" value="texts" />
                <span>Тексты и описания</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.hasAssets.includes('photos') }">
                <input type="checkbox" v-model="form.hasAssets" value="photos" />
                <span>Фото товаров</span>
              </label>
              <label class="checkbox-card" :class="{ active: form.hasAssets.includes('hosting') }">
                <input type="checkbox" v-model="form.hasAssets" value="hosting" />
                <span>Хостинг и домен</span>
              </label>
            </div>
          </div>
          <div class="field full-width">
            <label>Зачем вы делаете новый магазин?</label>
            <div class="radio-group">
              <label class="radio-card" :class="{ active: form.reason === 'from-scratch' }">
                <input type="radio" v-model="form.reason" value="from-scratch" />
                <span>С нуля</span>
              </label>
              <label class="radio-card" :class="{ active: form.reason === 'migrate' }">
                <input type="radio" v-model="form.reason" value="migrate" />
                <span>Переезд с Tilda / Wix / Shopify</span>
              </label>
              <label class="radio-card" :class="{ active: form.reason === 'redesign' }">
                <input type="radio" v-model="form.reason" value="redesign" />
                <span>Доработка старого сайта</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок 7 -->
      <div class="form-block">
        <h2 class="block-title">
          <span class="block-number">07</span>
          Техническое задание
        </h2>
        <div class="fields-grid">
          <div class="field">
            <label>Платформа (CMS)</label>
            <select v-model="form.platform">
              <option value="">Выберите</option>
              <option value="recommend">Не знаю, посоветуйте</option>
              <option value="opencart">OpenCart</option>
              <option value="woocommerce">WooCommerce (WordPress)</option>
              <option value="laravel">Индивидуальная (Laravel/Symfony)</option>
              <option value="bitrix">1С-Битрикс</option>
            </select>
          </div>
          <div class="field">
            <label>Дизайн</label>
            <select v-model="form.design">
              <option value="">Выберите</option>
              <option value="template">Готовый шаблон</option>
              <option value="custom">Индивидуальный дизайн</option>
            </select>
          </div>
          <div class="field full-width">
            <label>Ссылки на сайты-референсы (что нравится)</label>
            <div class="ref-links">
              <input v-model="form.ref1" type="url" placeholder="Ссылка 1 — https://..." />
              <input v-model="form.ref2" type="url" placeholder="Ссылка 2 — https://..." />
              <input v-model="form.ref3" type="url" placeholder="Ссылка 3 — https://..." />
            </div>
          </div>
        </div>
      </div>

      <!-- Контакты -->
      <div class="form-block contact-block">
        <h2 class="block-title">
          <span class="block-number">✦</span>
          Контактные данные
        </h2>
        <div class="fields-grid">
          <div class="field">
            <label>Ваше имя</label>
            <input v-model="form.contactName" type="text" placeholder="Как к вам обращаться?" />
          </div>
          <div class="field">
            <label>Телефон / Telegram</label>
            <input v-model="form.contactPhone" type="text" placeholder="+7 (___) ___-__-__" />
          </div>
          <div class="field full-width">
            <label>Удобное время для созвона</label>
            <input v-model="form.contactTime" type="text" placeholder="Например: будни после 14:00" />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">
          <span>Отправить анкету</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  storeName: '',
  category: '',
  hasOffline: '',
  mainGoal: '',
  mainGoalOther: '',
  productCount: '',
  hasVariants: '',
  features: [],
  importMethod: '',
  paymentMethods: [],
  deliveryMethods: [],
  deliveryCalc: '',
  postOrder: [],
  crmName: '',
  accountFeatures: [],
  integrations: [],
  promoIdea: '',
  marketplaces: [],
  budget: '',
  deadline: '',
  hasAssets: [],
  reason: '',
  platform: '',
  design: '',
  ref1: '',
  ref2: '',
  ref3: '',
  contactName: '',
  contactPhone: '',
  contactTime: ''
})

function submitForm() {
  console.log('Form data:', JSON.parse(JSON.stringify(form)))
  // Здесь будет отправка данных
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.store-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.store-title {
  text-align: center;
  margin: 0 0 1rem;
  font-size: 2.2rem;
  font-weight: 700;
}

.gradient-text {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(180, 200, 255, 0.85), rgba(140, 180, 255, 0.9));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Inter', sans-serif;
}

.store-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 640px;
  margin: 0 auto 3rem;
  font-family: 'Inter', sans-serif;
}

/* ── Form blocks ── */
.store-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-block {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease;
}

.form-block:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.contact-block {
  border-color: rgba(74, 144, 226, 0.2);
  background: rgba(74, 144, 226, 0.04);
}

.contact-block:hover {
  border-color: rgba(74, 144, 226, 0.35);
}

.block-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 1.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Inter', sans-serif;
}

.block-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.25), rgba(74, 144, 226, 0.08));
  color: rgba(140, 190, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* ── Grid ── */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full-width {
  grid-column: 1 / -1;
}

.field label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

/* ── Inputs ── */
input[type="text"],
input[type="url"],
textarea,
select {
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

input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus,
select:focus {
  border-color: rgba(74, 144, 226, 0.5);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

select option {
  background: #1b2735;
  color: rgba(255, 255, 255, 0.9);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

/* ── Radio / Toggle cards ── */
.radio-group,
.toggle-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.radio-card,
.toggle-card {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
}

.radio-card:hover,
.toggle-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.15);
}

.radio-card.active,
.toggle-card.active {
  background: rgba(74, 144, 226, 0.12);
  border-color: rgba(74, 144, 226, 0.4);
  box-shadow: 0 0 12px rgba(74, 144, 226, 0.1);
}

.radio-card input,
.toggle-card input,
.checkbox-card input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-card span,
.toggle-card span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: color 0.25s ease;
}

.radio-card.active span,
.toggle-card.active span {
  color: rgba(255, 255, 255, 0.95);
}

/* ── Checkbox grid ── */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.checkbox-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
}

.checkbox-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.15);
}

.checkbox-card.active {
  background: rgba(74, 144, 226, 0.12);
  border-color: rgba(74, 144, 226, 0.4);
  box-shadow: 0 0 12px rgba(74, 144, 226, 0.1);
}

.checkbox-card::before {
  content: '';
  width: 18px;
  height: 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin-right: 10px;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.checkbox-card.active::before {
  background: rgba(74, 144, 226, 0.6);
  border-color: rgba(74, 144, 226, 0.8);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 6l2.5 2.5 4.5-5' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.checkbox-card span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: color 0.25s ease;
}

.checkbox-card.active span {
  color: rgba(255, 255, 255, 0.95);
}

/* ── Reference links ── */
.ref-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── Submit button ── */
.form-actions {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.submit-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 48px;
  font-size: 1.05rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  letter-spacing: 0.3px;
}

.submit-btn::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: conic-gradient(from 0deg,
      transparent 0%,
      transparent 50%,
      rgba(74, 144, 226, 0.3) 58%,
      rgba(74, 144, 226, 0.7) 66%,
      rgba(140, 190, 255, 0.9) 72%,
      rgba(74, 144, 226, 0.7) 78%,
      rgba(74, 144, 226, 0.3) 86%,
      transparent 94%,
      transparent 100%);
  animation: border-spin 4s linear infinite;
  z-index: 0;
}

.submit-btn::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1565c0, #42a5f5);
  z-index: 1;
  transition: background 0.3s ease;
}

.submit-btn:hover::after {
  background: linear-gradient(135deg, #0d47a1, #1565c0);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(21, 101, 192, 0.35);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn span {
  position: relative;
  z-index: 2;
}

@keyframes border-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .store-page {
    padding: 2rem 1rem 3rem;
  }

  .store-title {
    font-size: 1.6rem;
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }

  .form-block {
    padding: 1.5rem;
  }

  .checkbox-grid {
    grid-template-columns: 1fr;
  }

  .submit-btn {
    width: 100%;
    padding: 16px 24px;
  }
}
</style>

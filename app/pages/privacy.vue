<template>
  <section class="privacy-page">
    <button class="theme-toggle" @click="toggle" :title="theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'">
      <span v-if="theme === 'dark'">☀️</span>
      <span v-else>🌙</span>
    </button>

    <h1 class="privacy-title">
      <span class="gradient-text">Политика конфиденциальности</span>
    </h1>
    <p class="privacy-updated">Последнее обновление: 27 апреля 2026 г.</p>

    <div class="privacy-content">
      <div class="privacy-section">
        <h2>1. Общие положения</h2>
        <p>
          Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
          пользователей сайта СТАРТ (далее — «Оператор»). Оператор ставит своей важнейшей целью и условием
          осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его
          персональных данных, в том числе защиту прав на неприкосновенность частной жизни, личную и семейную тайну.
        </p>
      </div>

      <div class="privacy-section">
        <h2>2. Персональные данные, подлежащие обработке</h2>
        <p>Оператор может обрабатывать следующие персональные данные Пользователя:</p>
        <ul>
          <li>Фамилия, имя, отчество</li>
          <li>Электронный адрес (email)</li>
          <li>Номер телефона</li>
          <li>Содержание обращения / сообщения</li>
        </ul>
      </div>

      <div class="privacy-section">
        <h2>3. Цели обработки персональных данных</h2>
        <p>Персональные данные обрабатываются в следующих целях:</p>
        <ul>
          <li>Обработка входящих запросов и обращений</li>
          <li>Предоставление информации об услугах компании</li>
          <li>Связь с пользователем для уточнения деталей обращения</li>
          <li>Улучшение качества обслуживания</li>
        </ul>
      </div>

      <div class="privacy-section">
        <h2>4. Правовые основания обработки</h2>
        <p>
          Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и отправки самим
          Пользователем через формы обратной связи на сайте. Заполняя форму, Пользователь выражает своё согласие
          на обработку персональных данных в соответствии с настоящей Политикой.
        </p>
      </div>

      <div class="privacy-section">
        <h2>5. Хранение и защита данных</h2>
        <p>
          Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие
          доступ к ним неуполномоченных лиц. Данные хранятся не дольше, чем этого требуют цели обработки,
          после чего подлежат уничтожению.
        </p>
      </div>

      <div class="privacy-section">
        <h2>6. Права пользователя</h2>
        <p>Пользователь имеет право:</p>
        <ul>
          <li>Получать информацию, касающуюся обработки его персональных данных</li>
          <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
          <li>Отозвать согласие на обработку персональных данных, направив запрос на email: info@start-web.ru</li>
        </ul>
      </div>

      <div class="privacy-section">
        <h2>7. Заключительные положения</h2>
        <p>
          Оператор имеет право вносить изменения в настоящую Политику конфиденциальности. Новая редакция
          вступает в силу с момента её размещения на сайте. Действующая редакция постоянно доступна на
          этой странице.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const { theme, toggle } = useTheme()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.privacy-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  position: relative;
}

.theme-toggle {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

:global([data-theme='light']) .theme-toggle {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.12);
}

:global([data-theme='light']) .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}

.privacy-title {
  text-align: center;
  margin: 0 0 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
}

.gradient-text {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(180, 200, 255, 0.85), rgba(140, 180, 255, 0.9));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Manrope', sans-serif;
}

.privacy-updated {
  text-align: center;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.85rem;
  margin: 0 0 3rem;
  font-family: 'Manrope', sans-serif;
}

.privacy-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.privacy-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.privacy-section h2 {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 1rem;
  font-family: 'Manrope', sans-serif;
}

.privacy-section p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 0.75rem;
  font-family: 'Manrope', sans-serif;
}

.privacy-section p:last-child {
  margin-bottom: 0;
}

.privacy-section ul {
  margin: 0.5rem 0 0;
  padding-left: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  line-height: 1.8;
  font-family: 'Manrope', sans-serif;
}

.privacy-section li {
  margin-bottom: 0.25rem;
}

/* ── Light theme ── */
:global([data-theme='light']) .privacy-page {
  background: #f5f7fa;
  min-height: 100vh;
  max-width: 100%;
  border-radius: 0;
}

:global([data-theme='light']) .privacy-content {
  max-width: 800px;
  margin: 0 auto;
}

:global([data-theme='light']) .gradient-text {
  background: linear-gradient(135deg, #1a1a2e, #2d5aa0, #1a1a2e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

:global([data-theme='light']) .privacy-updated {
  color: rgba(0, 0, 0, 0.4);
}

:global([data-theme='light']) .privacy-section {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

:global([data-theme='light']) .privacy-section h2 {
  color: rgba(0, 0, 0, 0.85);
}

:global([data-theme='light']) .privacy-section p,
:global([data-theme='light']) .privacy-section ul {
  color: rgba(0, 0, 0, 0.6);
}
</style>

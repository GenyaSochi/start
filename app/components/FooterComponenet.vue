<template>
  <footer class="footer-wrapper">
    <div class="footer">
      <div class="footer-col">
        <div class="footer-logo">
          <svg class="rocket-icon-footer" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6 C32 6 22 18 22 34 L22 42 L42 42 L42 34 C42 18 32 6 32 6Z" fill="rgba(255,255,255,0.9)" />
            <circle cx="32" cy="24" r="4" fill="#1b2735" stroke="rgba(255,255,255,0.6)" stroke-width="1" />
            <path d="M22 36 L14 46 L22 42Z" fill="rgba(255,255,255,0.7)" />
            <path d="M42 36 L50 46 L42 42Z" fill="rgba(255,255,255,0.7)" />
            <path d="M27 42 L25 50 L39 50 L37 42Z" fill="rgba(255,255,255,0.5)" />
            <path d="M29 50 L32 58 L35 50Z" fill="rgba(74,144,226,0.6)" />
            <path d="M30 50 L32 55 L34 50Z" fill="rgba(74,144,226,0.3)" />
          </svg>
          <span class="footer-name">СТАРТ</span>
        </div>
        <p class="footer-tagline">Создаём цифровые продукты, которые помогают бизнесу расти</p>
      </div>
      <div class="footer-col">
        <h4>Навигация</h4>
        <NuxtLink to="/about">О нас</NuxtLink>
        <NuxtLink to="/services">Услуги</NuxtLink>
        <NuxtLink to="/location">Где мы</NuxtLink>
        <NuxtLink to="/contacts">Контакты</NuxtLink>
      </div>
      <div class="footer-col">
        <h4>Контакты</h4>
        <p>info@start-web.ru</p>
        <p>+7 (999) 123-45-67</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 СТАРТ. Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.footer-wrapper {
  background: rgba(9, 10, 15, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 4rem;
}

.footer {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px 32px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.rocket-icon-footer {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 4px rgba(74, 144, 226, 0.3));
}

.footer-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1.5px;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 280px;
  margin: 0;
}

.footer-col h4 {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 16px 0;
}

.footer-col a,
.footer-col p {
  display: block;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  margin: 0 0 10px 0;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: rgba(255, 255, 255, 0.85);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 32px;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.8rem;
  margin: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .footer {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 20px 24px;
  }
}
</style>
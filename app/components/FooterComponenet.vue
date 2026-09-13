<template>
  <footer class="footer-wrapper">
    <div class="footer">
      <div class="footer-col footer-brand">
        <div class="footer-logo">
          <img src="/img/samuraiblack.webp" alt="Сытый самурай" class="footer-logo-img" />
          <span class="footer-name">Сытый самурай</span>
        </div>
        <p class="footer-tagline">Победи голод вместе с нами! Доставка вкусных суши и роллов</p>
      </div>
      <div class="footer-col">
        <h4>Навигация</h4>
        <NuxtLink to="/">Главная</NuxtLink>
        <NuxtLink to="/menu">Меню</NuxtLink>
      </div>
      <div class="footer-col">
        <h4>Контакты</h4>
        <p>info@sytyi-samurai.ru</p>
        <p>+7 (999) 123-45-67</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Сытый самурай. Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  background: #1a1a1a;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 4rem;
  position: relative;
  z-index: 2;
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

.footer-logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.footer-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  font-size: 1.2rem;
  font-family: 'Manrope', sans-serif;
  letter-spacing: 1px;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 300px;
  margin: 0;
  font-family: 'Manrope', sans-serif;
}

.footer-col h4 {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 16px 0;
  font-family: 'Manrope', sans-serif;
}

.footer-col a,
.footer-col p {
  display: block;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
  font-family: 'Manrope', sans-serif;
  text-decoration: none;
  margin: 0 0 10px 0;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: #c0392b;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 32px;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.8rem;
  margin: 0;
  text-align: center;
  font-family: 'Manrope', sans-serif;
}

@media (max-width: 768px) {
  .footer-wrapper {
    margin-top: 2.5rem;
  }

  .footer {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 20px 20px;
  }

  .footer-brand {
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-logo-img {
    width: 36px;
    height: 36px;
  }

  .footer-name {
    font-size: 1.1rem;
  }

  .footer-tagline {
    max-width: 100%;
    font-size: 0.85rem;
  }

  .footer-col {
    text-align: center;
  }

  .footer-col h4 {
    font-size: 0.8rem;
    margin-bottom: 12px;
  }

  .footer-col a,
  .footer-col p {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }

  .footer-bottom {
    padding: 16px 20px;
  }

  .footer-bottom p {
    font-size: 0.75rem;
  }
}

@media (max-width: 400px) {
  .footer {
    gap: 22px;
    padding: 24px 16px 18px;
  }

  .footer-name {
    font-size: 1rem;
  }

  .footer-tagline {
    font-size: 0.8rem;
  }

  .footer-col a,
  .footer-col p {
    font-size: 0.8rem;
  }

  .footer-bottom p {
    font-size: 0.7rem;
  }
}
</style>
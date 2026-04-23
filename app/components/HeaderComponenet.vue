<template>
  <header class="header-wrapper">
    <div class="header">
      <NuxtLink to="/" class="logo">
        <svg class="rocket-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 6 C32 6 22 18 22 34 L22 42 L42 42 L42 34 C42 18 32 6 32 6Z" fill="rgba(255,255,255,0.9)" />
          <circle cx="32" cy="24" r="4" fill="#1b2735" stroke="rgba(255,255,255,0.6)" stroke-width="1" />
          <path d="M22 36 L14 46 L22 42Z" fill="rgba(255,255,255,0.7)" />
          <path d="M42 36 L50 46 L42 42Z" fill="rgba(255,255,255,0.7)" />
          <path d="M27 42 L25 50 L39 50 L37 42Z" fill="rgba(255,255,255,0.5)" />
          <path d="M29 50 L32 58 L35 50Z" fill="rgba(74,144,226,0.6)" />
          <path d="M30 50 L32 55 L34 50Z" fill="rgba(74,144,226,0.3)" />
        </svg>
        <span class="name">СТАРТ</span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="/about">О нас</NuxtLink>
        <NuxtLink to="/services">Услуги</NuxtLink>
        <NuxtLink to="/location">Где мы</NuxtLink>
        <NuxtLink to="/contacts">Контакты</NuxtLink>
      </nav>

      <button class="header-but" @click="">
        Связаться
      </button>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(9, 10, 15, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.rocket-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 6px rgba(74, 144, 226, 0.4));
  transition: filter 0.3s ease, transform 0.3s ease;
}

.logo:hover .rocket-icon {
  filter: drop-shadow(0 0 10px rgba(74, 144, 226, 0.7));
  transform: translateY(-1px);
}

.name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  font-size: 1.25rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1.5px;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav a {
  color: rgba(255, 255, 255, 0.55);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.25s ease;
  letter-spacing: 0.3px;
}

.nav a:hover {
  color: rgba(255, 255, 255, 0.9);
}

.nav a.router-link-active {
  color: rgba(255, 255, 255, 0.9);
}

.header-but {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.header-but:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  transform: translateY(-1px);
}

.header-but:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .header {
    padding: 12px 20px;
  }
}
</style>

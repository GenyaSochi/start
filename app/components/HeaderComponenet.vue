<template>
  <header class="header-wrapper">
    <div class="header">
      <NuxtLink to="/" class="logo">
        <img src="/img/samuraiblack.webp" alt="Сытый самурай" class="logo-icon" />
        <span class="name">Сытый самурай</span>
      </NuxtLink>

      <nav class="nav">     
        <NuxtLink to="/location">ГДЕ МЫ</NuxtLink>
        <NuxtLink to="/contacts">КОНТАКТЫ</NuxtLink>
      </nav>

      <button class="header-but" @click="showModal = true">
        СВЯЗАТЬСЯ С НАМИ
      </button>
    </div>

    <ContactModal v-model="showModal" />
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
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

.logo-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo:hover .logo-icon {
  transform: scale(1.15);
  box-shadow: 0 0 14px rgba(74, 144, 226, 0.6);
}

.name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 1.5rem;
  font-family: 'Manrope', sans-serif;
  letter-spacing: 1.5px;
  color: #370000;
}

.nav {
  display: flex;
  gap: 32px;  
}

.nav a {
  color: #370000;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.25s ease;
  letter-spacing: 0.3px;
}

.nav a:hover {
  color: #5a0000;
}

.nav a.router-link-active {
  color: #370000;
}

.header-but {
  color: #370000;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.header-but:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #370000;
  color: #370000;
  font-size: 1rem;
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

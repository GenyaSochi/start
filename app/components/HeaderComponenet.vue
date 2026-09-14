<template>
  <header class="header-wrapper">
    <div class="header">
      <NuxtLink to="/" class="logo">
        <img src="/img/samuraiblack.webp" alt="Сытый самурай" class="logo-icon" />
        <span class="name">Сытый самурай</span>
      </NuxtLink>

      <nav class="nav">
        <!-- <NuxtLink to="/location">ГДЕ МЫ</NuxtLink> -->
        <div class="contacts-wrapper" @mouseenter="showPhone = true" @mouseleave="showPhone = false">
          <button class="contacts-btn" @click="showPhone = !showPhone">КОНТАКТЫ</button>
          <Transition name="fade">
            <div v-if="showPhone" class="phone-dropdown">
              <a href="tel:+79991234567" class="phone-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                +7 (999) 123-45-67
              </a>
            </div>
          </Transition>
        </div>
      </nav>

      <div class="header-address">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span>Екатеринбург, ул. Титова, д.1</span>
      </div>

      <button class="header-but" @click="showModal = true">
        СДЕЛАТЬ ПРЕДЗАКАЗ
      </button>
    </div>

    <ContactModal v-model="showModal" />
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const showPhone = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 300;
  background: rgba(15, 18, 28, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow: visible;
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
}

.nav {
  display: flex;
  gap: 32px;  
}

.nav a {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.25s ease;
  letter-spacing: 0.3px;
}

.nav a:hover {
  color: #fff;
}

.nav a.router-link-active {
  color: rgba(255, 255, 255, 0.9);
}

.contacts-wrapper {
  position: relative;
}

.contacts-btn {
  background: none;
  border: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: color 0.25s ease;
}

.contacts-btn:hover {
  color: #fff;
}

.phone-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px 24px;
  white-space: nowrap;
  z-index: 9999;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  letter-spacing: 0.3px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.phone-link:hover {
  color: rgba(255, 255, 255, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header-address {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: 'Manrope', sans-serif;
  white-space: nowrap;
}

.header-address svg {
  flex-shrink: 0;
}

.header-but {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  color: #fff;
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

  .header-address {
    display: none;
  }

  .header {
    padding: 12px 16px;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .name {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }

  .header-but {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .header-but:hover {
    font-size: 0.8rem;
  }
}

@media (max-width: 400px) {
  .header {
    padding: 10px 12px;
  }

  .name {
    font-size: 0.95rem;
  }

  .header-but {
    padding: 7px 10px;
    font-size: 0.75rem;
  }
}
</style>

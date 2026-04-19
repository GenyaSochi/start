<template>
  <header>
    <div class="header">
      <NuxtLink to="/" style="text-decoration: none;">
        <img src="/img/rocket.svg" width="64">
        <span class="name">СТАРТ</span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="">О нас</NuxtLink>
        <NuxtLink to="">Услуги компании</NuxtLink>
        <NuxtLink to="">Где мы находимся</NuxtLink>
        <NuxtLink to="">Контакты</NuxtLink>
      </nav>
      <button class="header-but" @click="">
        Связаться
      </button>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.nav {
  color: #136dd4;
  font-family: 'Inter', sans-serif;
  display: flex;
  gap: 40px;
}

.name {
  color: #ff0000;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
}

.header-but {
  color: white;
  background: linear-gradient(135deg, #136dd4, #4A90E2);
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-but:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #105abc, #3a7bd8);
}

.header-but:active {
  transform: translateY(0);
}
</style>

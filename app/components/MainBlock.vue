<template>
  <section class="main-block">
    <p class="start-description">
      Создаём современные веб-сайты, мобильные приложения и цифровые продукты,
      которые помогают компаниям расти и привлекать клиентов
    </p>
    <div class="buttons-grid">
      <NuxtLink to="/store" class="but1"><span>Интернет магазин</span></NuxtLink>
      <button class="but2"><span>Сайт для ресторана или кафе с меню и бронированием</span></button>
      <button class="but3"><span>Сайт для медицинского центра c записью онлайн</span></button>
      <button class="but1"><span>Одностраничный сайт для запуска продукта с высокой конверсией</span></button>
      <button class="but2"><span>Корпоративный имиджевый сайт с презентацией</span></button>
      <button class="but3"><span>Портал недвижимости c каталогом объектов</span></button>
      <button class="but1"><span>Сайт для салона красоты c портфолио мастеров и онлайн-записью</span></button>
    </div>
  </section>
</template>

<style scoped>


.start-description {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(200,220,255,0.8), rgba(255,255,255,0.7));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.4;
  margin-bottom: 2rem;
  text-align: center;
  padding: 0 1rem;
}

.main-block {
  padding: 4rem 0;
}

.buttons-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

.buttons-grid button {
  flex: 0 0 280px;
}
@keyframes border-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.but1, .but2, .but3 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  text-align: center;
  line-height: 1.3;
  overflow: hidden;
  flex: 0 1 283px;
  box-sizing: border-box;
}

/* Вращающийся градиент — под кнопкой */
.but1::before, .but2::before, .but3::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 58%,
    rgba(255, 255, 255, 0.5) 66%,
    rgba(255, 255, 255, 0.8) 72%,
    rgba(255, 255, 255, 0.5) 78%,
    rgba(255, 255, 255, 0.1) 86%,
    transparent 94%,
    transparent 100%
  );
  animation: border-spin 5s linear infinite;
  z-index: 0;
}

/* Внутренний фон — перекрывает центр, оставляя только рамку */
.but1::after, .but2::after, .but3::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 8px;
  z-index: 1;
}

/* Текст поверх всего */
.but1 span, .but2 span, .but3 span {
  position: relative;
  z-index: 2;
}

.but1 {
  background: linear-gradient(135deg, #1565c0, #42a5f5);
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);
}
.but1::after {
  background: linear-gradient(135deg, #1565c0, #42a5f5);
}
.but1:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(21, 101, 192, 0.4);
}
.but1:hover::after {
  background: linear-gradient(135deg, #0d47a1, #1565c0);
}

.but2 {
  background: linear-gradient(135deg, #c62828, #ef5350);
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.3);
}
.but2::after {
  background: linear-gradient(135deg, #c62828, #ef5350);
}
.but2:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(198, 40, 40, 0.4);
}
.but2:hover::after {
  background: linear-gradient(135deg, #b71c1c, #c62828);
}

.but3 {
  background: linear-gradient(135deg, #283593, #3f51b5);
  box-shadow: 0 4px 12px rgba(40, 53, 147, 0.3);
}
.but3::after {
  background: linear-gradient(135deg, #283593, #3f51b5);
}
.but3:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(40, 53, 147, 0.4);
}
.but3:hover::after {
  background: linear-gradient(135deg, #1a237e, #283593);
}
</style>
<template>
  <div class="stars-bright"></div>
  <HeaderComponenet />
  <NuxtPage />
  <FooterComponenet />
</template>

<script setup>
const { init } = useTheme()
onMounted(() => init())
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
html {
  font-family: 'Manrope', sans-serif;
}
</style>
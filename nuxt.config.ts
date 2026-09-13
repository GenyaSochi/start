// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  experimental: {
    serverAppConfig: false
  },
  devtools: { enabled: true },
  css: ['~/assets/style.css'],
  modules: ['@nuxt/fonts', '@nuxt/image'],
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5'
    }
  }
})
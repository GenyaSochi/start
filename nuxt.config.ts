// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  experimental: {
    serverAppConfig: false
  },
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image']
})
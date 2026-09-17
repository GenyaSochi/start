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
    baseURL: '/start/',
    buildAssetsDir: '/assets/',
    head: {
      title: 'Сытый самурай', // default fallback title
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/start/favicon.ico' },
      ],
      viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
    },
    
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    }
  }
})
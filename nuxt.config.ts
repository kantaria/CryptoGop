// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/styles'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})

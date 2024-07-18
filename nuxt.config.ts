// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "vuetify-nuxt-module",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Space Grotesk": true,
        },
      },
    ],
  ],
  css: ["/assets/styles/main.scss"],
});

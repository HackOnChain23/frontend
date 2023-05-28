// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  plugins: [
    {
      src: "~/plugins/vue3-particles.ts",
      ssr: false,
    },
  ],

  app: {
    baseURL: "/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      title: "PSPLS Test Project",
      meta: [{ name: "description", content: "content" }],
      link: [],
    },
  },

  googleFonts: {
    download: false,
    useStylesheet: true,
    inject: true,
    fontsDir: "fonts",
    overwriting: false,
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },
  runtimeConfig: {
    public: {
      language: process.env.LANGUAGE,
      metaTitle: process.env.META_TITLE,
    },
    // routes: {
    //   "/": { pretender: true },
    //   "/*": { cors: true },
    // },
  },

  modules: [
    // https://pinia.vuejs.org/ssr/nuxt.html
    "@pinia/nuxt",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://google-fonts.nuxtjs.org
    "@nuxtjs/google-fonts",
    // https://github.com/gitFoxCode/nuxt-icons
    "nuxt-web3.js",
    // https://github.com/wobsoriano/nuxt-web3.js
  ],
  typescript: { shim: false },
  css: ["@/assets/sass/main.sass"],
});

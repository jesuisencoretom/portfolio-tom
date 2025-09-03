// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  alias: {
    assets: "/<rootDir>/assets",
  },

  css: ["~/assets/styles/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/_utils.scss" as *; @use "~/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },

  app: {
    head: {
      title: "Tom Wainberg",
      htmlAttrs: {
        lang: "fr",
        prefix: "og: http://ogp.me/ns#",
      },
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "robots", content: "all" },
        { name: "target", content: "all" },
        { name: "author", content: "Tom Wainberg" },
        { name: "owner", content: "Tom Wainberg" },
        { name: "url", content: "https://tomwainberg.fr" },
        { name: "identifier-URL", content: "https://tomwainberg.fr" },
        { name: "subject", content: "motion designer" },
        {
          name: "description",
          content:
            "Portfolio de Tom Wainberg, je suis un motion designer basé sur Bordeaux et Nantes. Découvrez mon portfolio de motion designer.",
        },
        // Open Graph
        {
          property: "og:title",
          content: "Tom Wainberg | Motion Designer Bordeaux, Nantes",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:description",
          content:
            "Portfolio de Tom Wainberg, je suis un motion designer basé sur Bordeaux et Nantes. Découvrez mon portfolio de motion designer.",
        },
        { property: "og:site_name", content: "Accueil" },
        { property: "og:url", content: "https://tomwainberg.fr" },
        { property: "og:locale", content: "fr" },
        { property: "og:image", content: "/favicon.jpg" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://tomwainberg.fr" },
        {
          name: "twitter:title",
          content: "Tom Wainberg | Motion Designer Bordeaux, Nantes",
        },
        {
          name: "twitter:description",
          content:
            "Portfolio de Tom Wainberg, je suis un motion designer basé sur Bordeaux et Nantes. Découvrez mon portfolio de motion designer.",
        },
        { name: "twitter:image", content: "/favicon.jpg" },
        // Mobile Web App
        { name: "mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-title",
          content: "Tom Wainberg | Motion Designer Bordeaux, Nantes",
        },
        { name: "apple-mobile-web-app-status-bar-style", content: "#000000" },
        { name: "theme-color", content: "#000000" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/manifest.json" },
        {
          rel: "canonical",
          href: "https://tomwainberg.fr",
        },
        {
          rel: "preload",
          href: "/fonts/alteHaasGrotesk/woff2/AlteHaasGrotesk_Bold.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        ,
        {
          rel: "preload",
          href: "/fonts/alteHaasGrotesk/woff2/AlteHaasGrotesk.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxt/image"],
});
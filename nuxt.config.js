export default {
  // target: 'static',
  ssr: false,
  head: {
    title: 'flashematics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Flash cards'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS-MML_SVG'
      }
    ]
  },

  components: true,
  modules: [],

  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/pwa'],
  pwa: {
    manifest: {
      name: 'Flashematics',
      lang: 'ja',
      display: 'standalone'
    }
  },
  css: []
};

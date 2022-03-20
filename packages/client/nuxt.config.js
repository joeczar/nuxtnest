import colors from 'vuetify/es5/util/colors'
import {baseConfigService} from "@nuxtnest/shared"
export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  generate: {
    fallback: true
  },
  server: {
    host: '0'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - breakfastInBed',
    title: 'breakfastInBed',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vuetify.ts'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api/module',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/logout',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          name: 'Authorization',
          property: 'access_token',
          maxAge: 1800,
          global: true,
          required: true
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/auth/log-in',
            method: 'post',
            propertyName: 'access_token'
          },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: false },
          logout: { url: '/api/auth/log-out', method: 'post' }
        }
        // autoLogout: false
      }
    }
  },
  axios: {
    proxy: true, // Can be also an object with default options

    retry: {
      retries: 3
    }
  },

  proxy: {
    '/api/': {
      target: baseConfigService.getValue('API_URL'),
      pathRewrite: { '^/api': '' }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // Basic auth settings
  basic: {
    name: process.env.USERNAME,
    pass: process.env.PASSWORD,
    enabled: 'true' // require boolean value(nullable)
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}

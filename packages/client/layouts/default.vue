<template>
  <v-app :key="appKey" dark>
    <CMainNav v-model="drawer" :items="items" :mini="mini" @logout="rerender" />
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  computed,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({

  setup() {
    const appKey = ref(0)
    const router = useRouter()

    const isLogin = computed(() => router.currentRoute.name === 'login')
    const rerender = () => {
      appKey.value += 1
    }
    return {
      isLogin,
      appKey,
      rerender
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile',
          auth: true
        }
      ],
      mini: false,
      right: true,
      rightDrawer: false,
      title: 'BreakfastInBed.me'
    }
  }
})
</script>

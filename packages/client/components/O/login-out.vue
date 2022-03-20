<template>
  <div class="login-out">
    <v-btn
      :key="update"
      :color="currentColor"
      :class="classes"
      :outlined="$auth.$state.loggedIn"
      :to="redirect"
      @click="updateView"
    >
      {{ currentText }}
      <v-icon right dark>
        {{ currentIcon }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  computed,
  useRouter,
  ref,
  nextTick,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoginOut',
  props: {
    loggedIn: Boolean
  },
  setup(props) {
    const { $auth } = useContext()
    const update = ref(0)
    const router = useRouter()
    const currentRoute = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _val = update.value
      const route = router.currentRoute.path
      return route
    })
    const isLogin = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _val = update.value

      return router.currentRoute.path === '/login'
    })
    const isOutlined = ref(false)
    const currentText = computed(() => {
      if ($auth.$state.loggedIn) return 'Log out'
      if (isLogin.value) return 'Register'
      return 'Log in'
    })
    const currentColor = computed(() => (props.loggedIn ? 'accent' : 'info'))
    const currentIcon = computed(() =>
      props.loggedIn ? 'mdi-logout' : 'mdi-login'
    )
    const classes = ['ma-2']
    const redirect = computed(() => {
      if ($auth.$state.loggedIn) {
        return '/logout'
      }
      if (isLogin.value) {
        return '/register'
      }
      return '/login'
    })
    watch(currentRoute, (newVal, oldVal) => {
      console.log('watch router', { newVal, oldVal })
    })
    const updateView = async () => {
      update.value++
      await nextTick()

      console.log('updateView', {
        'router.currentRoute.path': router.currentRoute.path,
        'currentRoute.value': currentRoute.value,
        currentText: currentText.value,
        redirect: redirect.value,
        isLogin: isLogin.value
      })
    }
    return {
      currentText,
      currentColor,
      currentIcon,
      classes,
      redirect,
      isLogin,
      isOutlined,
      currentRoute,
      updateView,
      update
    }
  }
})
</script>

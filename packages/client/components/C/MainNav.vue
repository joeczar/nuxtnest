<template>
  <v-navigation-drawer
    :value="value"
    :mini-variant.sync="mini"
    fixed
    @input="$emit('input', $event)"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <!-- First letters of user name when set otherwise generic user icon -->
        {{ initials() }}
      </v-list-item-avatar>

      <v-list-item-title>{{ userTitle }}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        v-show="hideIfLoggedOut(item.auth)"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <OLoginOut @logout="handleLogout" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import { User } from '@/types/user'
// import LoginOut from '@/primitives/login-out.vue'

export default defineComponent({
  // components: { LoginOut },
  props: {
    items: { type: Array, required: true },
    value: { type: Boolean, default: false }
  },
  setup(_props, { emit }) {
    const { $auth } = useContext()
    const user = computed(() => {
      return $auth.user as unknown as User
    })
    const hideIfLoggedOut = (authHide: boolean) => {
      if (authHide) {
        return $auth.loggedIn
      }
    }
    const userTitle = computed(() => {
      let title = 'Welcome'
      if ($auth.loggedIn) {
        const { firstname, lastname } = user.value

        if (firstname) {
          title = firstname
          if (lastname) {
            title += ` ${lastname.substring(0, 1)}.`
          }
        }
      }

      return title
    })
    const mini = ref(false)
    const initials = computed(() => {
      const getInitials = () => {
        let initials = ''
        if ($auth.loggedIn) {
          const { firstname, lastname } = user.value

          if (firstname) {
            initials = `${firstname.substring(0, 1)}`
          }
          if (lastname) {
            initials += `${lastname.substring(0, 1)}`
          }
        }
        return initials
      }
      return getInitials
    })
    const handleLogout = () => {
      emit('logout')
    }
    return {
      user,
      initials,
      mini,
      handleLogout,
      userTitle,
      hideIfLoggedOut
    }
  }
})
</script>

<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="register()">
              <template v-if="!verifyPassword">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="joe@wikiskills.com"
                  required
                ></v-text-field>
              </template>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              ></v-text-field>
              <v-text-field
                v-model="password2"
                :rules="passwordRules"
                name="passwordVerify"
                label="Verify Password"
                type="password"
                placeholder="Re-enter your Password"
                required
              ></v-text-field>
              <v-btn type="submit" class="mt-4" color="primary" value="log in"
                >Register</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
/**
 * TODO:
 *  create component from form for reuse in update password
 *  Or! figure out how to make script functions reuseable
 */
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRouter
} from '@nuxtjs/composition-api'

export default defineComponent({
  auth: 'guest',
  props: {
    verifyPassword: Boolean
  },
  setup({ verifyPassword }) {
    const { $axios, $auth } = useContext()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const password2 = ref('')
    const form = ref(null)
    const validated = computed(() => {
      return form.value!! as Vue & { validate: () => boolean }
    })
    const emailRules = [
      (v: any) => !!v || 'E-mail is required',
      (v: string) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid'
    ]
    const passwordRules = [
      (v: any) => !!v || 'Password is required',
      (v: string) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        `Password must contain at least
lowercase letter, one number, a special character and one uppercase letter`
    ]
    const passwordRegEx = new RegExp(password.value, 'g')
    const password2Rules = [
      (v: any) => !!v || 'Passwords must match',
      (v: string) => passwordRegEx.test(v) || 'Passwords must match'
    ]
    onMounted(() => {
      // console.log({ validate: validated.value.validate() })
    })
    const register = async () => {
      console.log({})
      validated.value.validate()
      // form.value?.validate();
      try {
        if (verifyPassword) {
          const response = await $axios.post('/api/auth/register', { password })
          if (response) {
            $auth.logout()
            router.push('/login')
            return
          }
        }
        const response = await $axios.post('/api/auth/register', {
          email,
          password
        })
        console.log('register', { response })
        if (response) router.push('/login')
      } catch (err) {
        console.log(err)
      }
    }

    return {
      form,
      email,
      password,
      password2,
      emailRules,
      passwordRules,
      password2Rules,
      register
    }
  }
})
</script>

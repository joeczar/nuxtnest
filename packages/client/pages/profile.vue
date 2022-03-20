<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 profile">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Profile</v-toolbar-title>
          </v-toolbar>

          <v-card-text v-show="!edit" :key="key" class="user-data">
            <OLabelAndValue
              label="First Name:"
              :value="user.firstname"
              placeholder="none"
            />
            <OLabelAndValue
              label="Last Name:"
              :value="user.lastname"
              placeholder="none"
            />
            <OLabelAndValue
              label="email:"
              :value="user.email"
              placeholder="none"
            />
          </v-card-text>
          <v-card-text v-show="edit" class="user-form">
            <form ref="form" @submit.prevent="userUpdate()">
              <v-text-field
                v-model="firstname"
                name="firstname"
                label="First Name"
                type="text"
                placeholder="Your first name"
              ></v-text-field>

              <v-text-field
                v-model="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                placeholder="Your ast name"
              ></v-text-field>
              <v-text-field
                v-model="email"
                name="email"
                label="Email"
                type="email"
                placeholder="joe@wikiskills.com"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="edit = !edit">{{ edit ? 'Cancel' : 'Edit' }}</v-btn>
            <v-btn v-if="!edit" @click="showUpdatePassword"
              >Update Password</v-btn
            >
            <v-btn v-if="edit" type="submit" color="primary" value="update"
              >Update</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  ref
} from '@nuxtjs/composition-api'
import { User } from '../types/user'


export default defineComponent({

  setup() {
    const key = ref(0)
    const ctx = useContext()
    const user = computed(() => {
      return ctx.$auth.user as unknown as User
    })
    const edit = ref(false)
    const firstname = ref(user.value.firstname)
    const lastname = ref(user.value.lastname)
    const email = ref(user.value.email)
    const userUpdate = async () => {
      const userUpdate = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value
      }
      try {
        console.log('updating user', { userUpdate })
        const result = await ctx.$axios.post(
          `/api/user/${user.value.id}`,
          userUpdate
        )
        if (result) {
          edit.value = false
          await ctx.$auth.fetchUser()

          // key.value++
        }
        return result
      } catch (error) {
        console.log('Error updating user', error)
      }
    }
    return {
      user,
      edit,
      firstname,
      lastname,
      email,
      userUpdate,
      key
    }
  }
})
</script>
<style scoped lang="scss">
.profile {
  .user-data {
    margin: 1rem;
  }
}
</style>

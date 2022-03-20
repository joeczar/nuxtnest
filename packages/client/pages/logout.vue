<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline d-flex justify-center">
          <span class="welcome pe-2">You are now logged out of</span>
          <span class="site-name-title">BreakfastInBed.me</span>
        </v-card-title>
        <v-card-text>
          <p>come back soon!</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { $auth } = useContext()
    onMounted(() => $auth.logout())
  },
  data: () => {
    return {
      breakfast: false
    }
  }
})
</script>
<style lang="scss" scoped>
.headline {
  .site-name-title {
    font-weight: bold;
  }
}
.v-form {
  width: 100%;
}
</style>

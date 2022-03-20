<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline d-flex justify-center">
          <span class="welcome pe-2">Thanks for ordering with</span>
          <span class="site-name-title">BreakfastInBed.me</span>
        </v-card-title>
        <v-card-text>
          <p>We will confirm your order receipt and preparation via email.</p>
          <p>
            Our Chef and/or Bath-Artist will come and prepare everything for
            you.
          </p>
          <p>All you have to do is sit back and enjoy.</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  data: () => {
    return {
      breakfast: false
    }
  },
  computed: {
    switchLabel(): string {
      return this.breakfast ? 'Breakfast in Bed' : 'Dinner in the Bath'
    }
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.breakfast = !this.breakfast
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

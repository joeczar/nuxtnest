<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline d-flex justify-center">
          <span class="welcome pe-2">Welcome to</span>
          <span class="site-name-title">BreakfastInBed.me</span>
        </v-card-title>
        <v-card-text>
          <p>
            Not only can you order Breakfast in Bed, made exactly to your
            wishes, we also offer a romantic Dinner in the Bath service.
          </p>
          <p>
            Simply fill out the form below with your wishes 24 hours in advance,
            and our gourmet chefs will start preparing and planning.
          </p>
          <p>Coming 01.01.2022!</p>
        </v-card-text>
        <v-card-actions v-if="launched">
          <v-form
            ref="form"
            class="flex-column"
            name="order"
            action="/thanks"
            method="post"
            data-netlify
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contactus" />

            <v-switch
              :value="breakfast"
              :label="`${switchLabel}`"
              @change="toggleDarkMode"
            ></v-switch>
            <v-spacer />

            <v-textarea
              filled
              name="input-7-4"
              label="Desired meal"
              value="Please tell us here what you wold like to eat and we will do everything we can to make it happen"
            ></v-textarea>
            <v-textarea
              filled
              name="input-7-4"
              label="Desired drinks"
              value="Please tell us here what you wold like to Drink"
            ></v-textarea>
            <v-textarea
              filled
              name="input-7-4"
              label="Other wishes"
              value="Anything else your heart desires"
            ></v-textarea>

            <!--
            <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn> -->
          </v-form>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  data: () => {
    return {
      breakfast: false,
      launched: false
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

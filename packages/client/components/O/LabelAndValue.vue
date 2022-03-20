<template>
  <div class="label-and-value" :class="classes">
    <span class="label">{{ label }}</span
    ><span :class="{ value, placeholder }"> {{ value || placeholder }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LabelAndValue',
  props: {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' }
  },
  setup() {
    const classes = computed(() => {})

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.label-and-value {
  display: flex;
  margin: 0.5rem auto;
  .label {
    font-weight: bold;
    padding-right: 0.5rem;
  }
  .placeholder {
    opacity: 0.5;
  }
  .value {
    opacity: 1;
  }
}
</style>

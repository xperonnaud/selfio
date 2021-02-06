<template>

  <v-btn
    :class="['elevation-0', {'primary-gradient-color': (valid && !isLoading)}]"
    @click="$emit('btnAction')"
    @keyup.enter="$emit('btnAction')"
    :disabled="!valid || isLoading"
    :loading="isLoading"
    :outlined="outlined"
    :block="block"
    :large="large"
  >
    <span
      v-bind:class="[(valid ? 'white--text' : 'text-disabled')]"
      v-text="label"
    ></span>
  </v-btn>

</template>

<script>

  export default {
    name: 'primary-btn',
    props: {
      label: String,
      block: {
        type: Boolean,
        default: false
      },
      valid: {
        type: Boolean,
        default: true
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      outlined: {
        type: Boolean,
        default: false
      },
    },
  }

</script>

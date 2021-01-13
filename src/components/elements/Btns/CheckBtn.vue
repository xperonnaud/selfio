<template>

  <v-btn
    class="mr-1"
    icon
    :disabled="disabled"
    :color="darkColor('primary')"
  >
    <v-icon :size="28" v-text="'mdi-check'" />
  </v-btn>

</template>

<script>

  export default {
    name: 'check-btn',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

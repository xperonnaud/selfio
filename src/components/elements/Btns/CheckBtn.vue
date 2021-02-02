<template>

  <v-btn
    :class="['mr-1', {'primary-gradient-color': disabled}]"
    icon
    :disabled="disabled"
  >
    <v-icon :size="XLI" v-text="'mdi-check'" />
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

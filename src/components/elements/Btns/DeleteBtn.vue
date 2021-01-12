<template>

  <v-btn
    :color="darkColor('red')"
    :disabled="disabled"
  >
    <v-icon left small color="white" v-text="'mdi-alert'" />
    <span v-text="'Delete'" />
  </v-btn>

</template>

<script>

  export default {
    name: 'delete-btn',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

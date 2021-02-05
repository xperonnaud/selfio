<template>

  <v-alert :icon="`mdi-${icon}`">
    Sorry, this feature requires a larger screen to be displayed.
  </v-alert>

</template>

<script>

  export default {
    name: 'mobile-only-feature',
    props: {
      icon: {
        type: String,
        default: 'alert',
      },
    },
  }

</script>

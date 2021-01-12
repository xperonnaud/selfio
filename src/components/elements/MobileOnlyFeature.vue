<template>

  <v-alert
    border="left"
    :icon="`mdi-${icon}`"
    :color="darkColor(color)"
  >
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
      color: {
        type: String,
        default: 'primary',
      },
    },
  }

</script>

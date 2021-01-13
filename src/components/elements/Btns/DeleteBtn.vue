<template>

  <v-btn
    :color="darkColor('red')"
    :disabled="disabled"
    depressed
  >
    <v-icon left small :color="(isDark ? 'black' : 'white')" v-text="'mdi-alert'" />
    <span v-bind:class="[reversedFontShadeColor]" v-text="'Delete'" />
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

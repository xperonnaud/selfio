<template>

  <v-icon
    v-text="isSelector ? 'mdi-pencil' : 'mdi-chevron-right'"
    :size="isMobile ? SMI : MDI"
    :color="isSelector ? null : xOverlayColor"
    style="float:right"
  ></v-icon>

</template>

<script>

  export default {
    name: 'edit-icon',
    props: {
      isSelector: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

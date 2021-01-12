<template>

  <v-icon
    v-text="isSelector ? 'mdi-pencil' : 'mdi-chevron-right'"
    :size="isMobile ? 18 : 21"
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

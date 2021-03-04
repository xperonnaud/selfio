<template>

  <v-btn
    :color="currentColor"
    :width="48"
    :height="48"
    :fab="isFab"
    right
    bottom
    v-bind:class="[(isMobile ? 'px-0' : 'px-2 ml-3')]"
    @click="openPostFormDialog()"
  >
    <v-icon :class="reversedFontShadeColor" v-text="'mdi-plus'" />
  </v-btn>

</template>

<script>

  export default {
    name: 'form-post-btn',
    props: {
      isFab: {
        type: Boolean,
        default: false
      },
      isRounded: {
        type: Boolean,
        default: false
      },
      isIcon: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

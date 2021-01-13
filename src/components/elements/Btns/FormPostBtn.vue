<template>

  <v-btn
    :color="currentColor"
    :small="isSmall"
    :fab="isFab"
    :rounded="isRounded"
    :icon="isIcon"
    right
    bottom
    v-bind:class="[(isMobile ? 'px-0' : 'px-2 ml-3')]"
    @click="openPostFormDialog()"
  >
    <v-icon v-bind:class="[reversedFontShadeColor]" v-text="'mdi-plus'" />
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
      },
      isSmall: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

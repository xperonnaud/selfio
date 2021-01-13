<template>

  <v-btn
    :color="currentColor"
    :small="isMobile ? isSmall : false"
    :fab="isMobile ? isFab : false"
    :rounded="isRounded"
    :icon="isIcon"
    :outlined="isOutlined"
    :isDepressed="isDepressed"
    right
    bottom
    v-bind:class="[(isMobile ? 'px-0' : 'px-2 ml-3')]"
    @click="openPostFormDialog()"
  >
    <v-icon :color="(!isIcon && !isOutlined) ? (isDark ? 'black' : 'white') : null" v-text="'mdi-plus'" />
    <span v-show="!isMobile" v-text="'New'" v-bind:class="[(isOutlined ? fontShadeColor : null)]" />
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
      isDepressed: {
        type: Boolean,
        default: false
      },
      isOutlined: {
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

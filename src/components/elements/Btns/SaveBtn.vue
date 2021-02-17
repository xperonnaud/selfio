<template>

  <v-btn
    :color="darkColor(color)"
    :outlined="isOutlined"
    :block="isBlock"
    :icon="isMobile ? isIcon : false"
    :disabled="disabled"
    class="elevation-0"
  >
    <v-icon v-if="!isOutlined" v-text="'mdi-check'"/>
    <span v-show="forceText" v-text="$t('global.save')" />
  </v-btn>

</template>

<script>

  export default {
    name: 'save-btn',
    props: {
      isDepressed: {
        type: Boolean,
        default: false
      },
      forceText: {
        type: Boolean,
        default: false
      },
      isOutlined: {
        type: Boolean,
        default: false
      },
      isSmall: {
        type: Boolean,
        default: false
      },
      isIcon: {
        type: Boolean,
        default: false
      },
      isBlock: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: 'primary'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
  }

</script>

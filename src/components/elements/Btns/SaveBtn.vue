<template>

  <v-btn
    v-if="action"
    :color="darkColor(color)"
    :outlined="isOutlined"
    :icon="isMobile ? isIcon : false"
    :disabled="disabled"
    @click.stop="action()"
  >
    <v-icon v-if="!isOutlined" v-text="'mdi-check'"/>
    <span v-show="(!isMobile || isOutlined)" v-text="'Save'" />
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
      color: {
        type: String,
        default: 'primary'
      },
      action: {
        type: Function,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

<template>

  <v-icon
    :class="[(disabled ? disabledClass : fontShadeColor)]"
    :size="size"
    v-text="icon"
  ></v-icon>

</template>

<script>

  export default {
    name: 'poly-icon',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      disabledClass: {
        type: String,
        default: 'text--disabled'
      },
      size: [Number, String],
      icon: String,
    }
  }

</script>

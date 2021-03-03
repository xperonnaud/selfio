<template>

  <v-icon
    :class="[{disabledClass: disabled}]"
    :size="size"
    v-text="icon"
  ></v-icon>

    <!--  <div class="poly-icon">-->
<!--    <v-icon-->
<!--      v-show="!disabled"-->
<!--      :size="size"-->
<!--      v-text="icon"-->
<!--      class="primary-gradient-color-text"-->
<!--    ></v-icon>-->
<!--    <v-icon-->
<!--      v-show="disabled"-->
<!--      :size="size"-->
<!--      v-text="icon"-->
<!--      :class="disabledClass"-->
<!--    ></v-icon>-->
<!--  </div>-->

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

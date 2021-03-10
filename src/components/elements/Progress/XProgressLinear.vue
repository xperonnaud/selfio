<template>

  <v-progress-linear
    :value="value"
    :color="color"
    :height="isMobile ? 4 : 6"
    :background-color="xProgressColor"
    class="rounded"
  ></v-progress-linear>

</template>

<script>

  export default {
    name: 'x-progress-linear',
    props: {
      value: Number,
      color: String
    },
  }

</script>

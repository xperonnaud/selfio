<template>

  <v-divider
    :vertical="vertical"
    v-bind:class="[
      (isMobile ? 'mx-1' : 'mx-2')
    ]"
  />

</template>

<script>

  export default {
    name: 'x-divider',
    props: {
      vertical: {
        type: Boolean,
        default: true,
      },
    },
  }

</script>

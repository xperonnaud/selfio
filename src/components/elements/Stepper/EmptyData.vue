<template>

  <div
    v-bind:class="[
      'text-tiny-dimmed text-center',
    ]"
    :style="'width: 100%;'"
    v-text="'.'"
  />

</template>

<script>

  export default {
    name: 'empty-data',
    props: {
      solo: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

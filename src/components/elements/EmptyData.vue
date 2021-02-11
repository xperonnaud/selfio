<template>

  <div
    v-bind:class="['text-tiny-dimmed, empty-data']"
    v-text="'.'"
  ></div>

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

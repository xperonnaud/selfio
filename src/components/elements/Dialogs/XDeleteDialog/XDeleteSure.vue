<template>

  <div>
    <div>{{t('are-you-sure') | capitalizeFirstFilter}}</div>
    <div v-bind:class="[fontShadeColor]">{{t('irreversible') | capitalizeFirstFilter}}</div>
  </div>

</template>

<script>

  export default {
    name: 'x-delete-sure',
    methods: {
      t(str) {
        return this.$t(`components.x-delete-dialog.${str}`)
      },
    },
  }

</script>

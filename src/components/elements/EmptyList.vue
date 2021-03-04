<template>

  <v-sheet
    class="d-flex text-center align-center justify-center rounded-0"
    :height="height"
  >
    <div>
      <div class="d-flex justify-center">
        <v-icon
          v-text="icon || 'mdi-gauge-empty'"
          :color="color ? color : null"
          :size="XXLI"
          :class="['mx-auto', {'primary-gradient-color-text':!color}]"
        ></v-icon>
      </div>

      <div class="ma-3" v-text="xCapFirst($t('global.empty-list'))" />

      <div v-if="label" class="text-caption">{{label | capitalizeFirstFilter}}</div>
    </div>
  </v-sheet>

</template>

<script>

  export default {
    name: 'empty-list',
    props: {
      height: {
        type: [Number, String],
        default: '100%'
      },
      label: {
        type: String,
        default: null
      },
      icon: {
        type: String,
        default: null
      },
      color: {
        type: String,
        default: null
      },
    }
  }

</script>

<style lang="scss">

  .empty-list-direction-icon {
    transform: rotate(135deg);

    .is-small {
      transform: rotate(135deg);
    }
  }

</style>

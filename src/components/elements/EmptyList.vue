<template>

  <v-row>
    <v-col cols="12">
      <div class="d-flex text-center align-center justify-center">
        <div class="pa-12">
          <div class="d-flex justify-center">
            <v-icon
              v-text="icon || 'mdi-gauge-empty'"
              :color="color ? color : null"
              :size="XXLI"
              :class="['mx-auto', {'primary-gradient-color-text':!color}]"
            ></v-icon>
          </div>

          <div class="ma-3" v-text="$t('global.empty-list')" />

          <div v-if="label" class="text-caption">{{$t(`global.${label}`) | capitalizeFirstFilter}}</div>
        </div>
      </div>
    </v-col>
  </v-row>

</template>

<script>

  export default {
    name: 'empty-list',
    props: {
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

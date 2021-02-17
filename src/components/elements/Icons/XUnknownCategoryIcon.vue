<template>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-text="'mdi-help-circle-outline'"
                :color="getVuetifyColor(14)"
                :size="size"
                v-bind="attrs"
                v-on="on"
            ></v-icon>
        </template>
        <span v-text="$t('global.unknown')" />
    </v-tooltip>

</template>

<script>

  export default {
    name: 'x-unknown-category-icon',
    props: {
      size: {
        type: Number,
        default: null
      },
    }
  }

</script>

<template>

  <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-text="'mdi-apple'"
          :color="disabled ? 'grey' : darkColor('light-green')"
          :style="css"
          :small="small"
          :size="size"
          v-bind="attrs"
          v-on="on"
        ></v-icon>
      </template>
      <span v-text="$t('global.consumable')" />
  </v-tooltip>

</template>

<script>

  export default {
    name: 'consumable-icon',
    props: {
      size: {
        type: Number,
        default: null
      },
      small: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      css: {
        type: String,
        default: null
      }
    }
  }

</script>

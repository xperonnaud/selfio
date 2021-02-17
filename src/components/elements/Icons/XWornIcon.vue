<template>

  <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
          <v-icon
              v-text="'mdi-tshirt-crew'"
              :color="disabled ? 'grey' : darkColor('light-blue')"
              :style="css"
              :small="small"
              :size="size"
              v-bind="attrs"
              v-on="on"
          ></v-icon>
      </template>
      <span v-text="$t('global.worn')" />
  </v-tooltip>

</template>

<script>

  export default {
    name: 'x-worn-icon',
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

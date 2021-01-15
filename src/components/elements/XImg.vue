<template>

  <v-sheet
    :color="background"
    class="mt-1"
    style="border-radius: 32px;"
    dark
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          :src="src"
          v-bind:class="[(logo ? '' : 'svg-image')]"
          :width="width"
          :height="height"
          contain
          v-bind="attrs"
          v-on="on"
        ></v-img>
      </template>
      <span v-if="tooltipText" v-text="tooltipText" />
    </v-tooltip>
  </v-sheet>

</template>

<script>

  export default {
    name: 'x-img',
    props: {
      src: String,
      isCategory: {
        type: Boolean,
        default: false,
      },
      tooltipText: {
        type: String,
        default: null,
      },
      logo: {
        type: Boolean,
        default: false,
      },
      background: {
        type: String,
        default: 'transparent',
      },
      width: {
        type: [Number, String],
        default: '18',
      },
      height: {
        type: [Number, String],
        default: '18',
      },
    },
  }

</script>

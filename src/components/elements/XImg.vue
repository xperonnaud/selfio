<template>

  <v-sheet
    :class="[{'mt-1':!noMargin}]"
    style="border-radius: 32px;"
    color="transparent"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-if="src"
          :src="assetUrl+src"
          :lazy-src="assetUrl+src"
          v-bind:class="[(logo ? '' : 'svg-image')]"
          :width="width"
          :height="height"
          v-bind="attrs"
          v-on="on"
          contain
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
      noMargin: {
        type: Boolean,
        default: false,
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

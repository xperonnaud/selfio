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

      <template v-if="tooltipText">
        <span
          class="ma-0 pa-0"
          v-if="isCategory"
          v-html="xGearCategory(tooltipText) ? xCap($t(`categories.${xGearCategory(tooltipText).title}.title`))
          + '<br>'
           + xCap($t(`categories.${xGearCategory(tooltipText).title}.desc`)) : null"
        ></span>
        <span class="ma-0 pa-0" v-else v-html="tooltipText" />
      </template>
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
        type: [Number, String],
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

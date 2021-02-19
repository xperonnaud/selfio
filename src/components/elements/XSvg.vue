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
          :src="require(`@/assets/images/${svgPath}${src}.svg`)"
          :lazy-src="require(`@/assets/images/${svgPath}${src}.svg`)"
          class="svg-image"
          :width="width"
          :height="height"
          v-bind="attrs"
          v-on="on"
          contain
        ></v-img>
      </template>

      <template v-if="tooltipText">
        <span class="ma-0 pa-0"  v-html="tooltipText" />
      </template>
    </v-tooltip>
  </v-sheet>

</template>

<script>

  export default {
    name: 'x-svg',
    props: {
      src: String,
      svgPath: String,
      tooltipText: {
        type: [Number, String],
        default: null,
      },
      noMargin: {
        type: Boolean,
        default: false,
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

<template>


    <v-sheet
        v-if="isMounted"
        :color="xTabsColor"
        class="pt-1 pb-2 px-2 rounded"
    >
        <div class="d-flex justify-space-between">
            <template v-for="(item, index) in items">
                <div
                    v-if="typeof item.value == 'number' && item.value > 0 && item.percentage"
                    :key="`stacked-data-legend-${randomId()}-${index}`"
                    :class="['text-tiny', darkColorText(item.color)]"
                >
                    <template v-if="item.icon">
                        <v-icon
                            v-if="item.icon"
                            :color="darkColor(item.color)"
                            v-text="`mdi-${item.icon}`"
                            style="padding-bottom: 3px; !important"
                            x-small
                        />

                        <span v-text="item.label" style="margin: 0 2px;" />
                    </template>

                    <template v-else>

                        <v-icon
                            :color="darkColor(item.color)"
                            v-text="`mdi-tshirt-crew`"
                            style="padding-bottom: 3px; !important"
                            x-small
                        />
                        <span v-text="'&'" />
                        <v-icon
                            :color="darkColor(item.color)"
                            v-text="`mdi-apple`"
                            style="padding-bottom: 3px; !important"
                            x-small
                        />
                    </template>

                    <template v-if="item.percentage <= 10">
                        <span :class="[fontShadeColor]">{{item.value | weightUnitFilter(weightUnit)}}</span>
                        <span :class="fontShadeColor" v-text="dynamicWeightUnit(item.value)" :key="`weight-unit-${randomId()}-${item.value}`" />
                    </template>
                </div>
            </template>
        </div>

        <v-sheet
          color="transparent"
          :height="isMobile ? 24 : 36"
          class="d-flex"
        >
            <template v-for="(item, index) in items">
                <v-sheet
                    v-if="typeof item.value == 'number' && item.value > 0 && item.percentage"
                    :key="`stacked-data-progress-${randomId()}-${index}`"
                    :color="darkColor(item.color)"
                    height="100%"
                    :width="item.percentage+'%'"
                    :class="[
                        (isMobile ? 'text-tiny' : 'text-caption'),
                         reversedFontShadeColor,
                         'd-flex align-center justify-center'
                     ]"
                    :style="`border-right: 3px solid black`"
                >
                    <div v-if="item.percentage > 10">
                        <span :class="['ml-1 font-weight-bold']">{{item.value | weightUnitFilter(weightUnit)}}</span>
                        <span v-text="dynamicWeightUnit(item.value)" :key="`weight-unit-${randomId()}-${item.value}`" />
                    </div>
                </v-sheet>
            </template>
        </v-sheet>
    </v-sheet>

</template>

<script>

  export default {
    name: 'x-stacked-progress',
    props: {
      items: Object,
    },
    data: () => ({
      isMounted: false,
    }),
    methods: {

    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

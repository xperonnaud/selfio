<template>

    <v-sheet
      color="transparent"
      :height="isMobile ? SMI : MDI"
      class="d-flex"
    >
        <template v-for="(item, index) in items">
            <v-sheet
                v-if="typeof item.value == 'number' && item.value > 0 && item.percentage"
                :key="`stacked-data-progress-${randomId()}-${index}`"
                :color="darkColor(item.color)"
                :width="item.percentage+'%'"
                height="100%"
                :class="[
                    (isMobile ? 'text-tiny' : 'text-caption'),
                     reversedFontShadeColor,
                     'd-flex align-center justify-center'
                 ]"
            >
                <div
                    v-if="(item.percentage > toggleLimit) || (!isMobile && item.percentage > (toggleLimit/3))"
                    style="margin-top: 2px;"
                >
                    <span :class="['ml-1 font-weight-bold']">{{item.value | weightUnitFilter(weightUnit)}}</span>
                    <span v-text="dynamicWeightUnit(item.value)" :key="`weight-unit-${randomId()}-${item.value}`" />
                </div>
            </v-sheet>
        </template>
    </v-sheet>

</template>

<script>

  export default {
    name: 'stacked-progress-bar',
    props: {
        items: Object,
        toggleLimit: {
            type: Number,
            default: 12
        }
    },
    data: () => ({
      isMounted: false,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

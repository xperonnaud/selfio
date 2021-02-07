<template>

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

                    <span v-if="item.label && item.label!==''" style="margin: 0 2px;">{{$t(`global.${item.label}`)}}</span>
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

                <template v-if="!((item.percentage > toggleLimit) || (!isMobile && item.percentage > (toggleLimit/3)))">
                    <span :class="[fontShadeColor]">{{item.value | weightUnitFilter(weightUnit)}}</span>
                    <span :class="fontShadeColor" v-text="dynamicWeightUnit(item.value)" :key="`weight-unit-${randomId()}-${item.value}`" />
                </template>
            </div>
        </template>
    </div>

</template>

<script>

  export default {
    name: 'x-stacked-progress-legend',
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

<template>

  <v-col class="x-col d-flex justify-center align-center">
    <div v-if="hasGear && weight">
      <span :class="['text-caption',{'text--disabled':disabled}]">{{ weight | weightUnitFilter(weightUnit) }}</span>
      <span :class="['text-tiny-dimmed',{'text--disabled':disabled}]" v-text="dynamicWeightUnit(weight)" :key="`dynamic-weight-unit-${weight}-${randomId()}`" />
    </div>
    <empty-data solo v-else />
  </v-col>

</template>

<script>

  import EmptyData from "@/components/elements/EmptyData";

  export default {
    name: 'x-weight-col',
    components: {
      EmptyData
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      hasGear: {
        type: Boolean,
        default: true
      },
      weight: {
        type: Number,
        default: null
      }
    }
  }

</script>

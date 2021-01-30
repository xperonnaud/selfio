<template>

  <v-col class="x-col">
    <div v-if="hasGear && weight">
      <span :class="['text-caption']">{{ weight | weightUnitFilter(weightUnit) }}</span>
      <span class="text-tiny-dimmed" v-text="dynamicWeightUnit(weight)" :key="`dynamic-weight-unit-${weight}-${randomId()}`" />
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

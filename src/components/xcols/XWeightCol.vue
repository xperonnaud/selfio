<template>

  <v-col class="x-col">
    <div v-if="hasGear && weight">
      <span v-if="weight < 1000" :class="['text-caption']">{{ weight | weightUnitFilter(weightUnit) }}</span>
      <span v-else :class="['text-caption']">{{ weight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
      <span class="text-tiny-dimmed" v-text="weight < 1000 ? weightUnit : supWeightUnit" />
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

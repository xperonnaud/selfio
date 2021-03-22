<template>

  <x-progress-linear
    :value="gearCategoryStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight)"
    :color="getVuetifyColor((typeof gearCategoryStat.id == 'string' ? gearCategories.indexOf(gearCategoryStat.id) : 'unknown'))"
  ></x-progress-linear>

</template>

<script>

  import XProgressLinear from "@/components/elements/Progress/XProgressLinear";

  export default {
    name: 'gear-weight-progress',
    components: {
      XProgressLinear
    },
    props: {
      gearCategoryStat: [Array, Object],
      inventoryGearList: [Array, Object],
      inventoryTotalWeight: Number,
    },
  }

</script>

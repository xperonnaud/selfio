<template>

  <x-linear-progress
    :value="gearCategoryStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight)"
    :color="getVuetifyColor((typeof gearCategoryStat.id == 'string' ? gearCategories.indexOf(gearCategoryStat.id) : 'unknown'))"
  ></x-linear-progress>

</template>

<script>

  import XLinearProgress from "@/components/elements/Progress/XLinearProgress";

  export default {
    name: 'gear-weight-progress',
    components: {
      XLinearProgress
    },
    props: {
      gearCategoryStat: [Array, Object],
      inventoryGearList: [Array, Object],
      inventoryTotalWeight: Number,
    },
  }

</script>

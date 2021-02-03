<template>


    <v-sheet
        v-if="isMounted"
        :color="xTabsColor"
        class="pt-1 pb-2 px-2 rounded"
    >
        <x-stacked-progress-legend :items.sync="items" :toggleLimit="displayToggleLimit" />

        <x-stacked-progress-bar :items.sync="items" :toggleLimit="displayToggleLimit" />
    </v-sheet>

</template>

<script>

  import XStackedProgressBar from "@/components/elements/StackedProgressCard/XStackedProgressBar";
  import XStackedProgressLegend from "@/components/elements/StackedProgressCard/XStackedProgressLegend";

  export default {
    name: 'x-stacked-progress-card',
    components: {
        XStackedProgressLegend,
        XStackedProgressBar
    },
    props: {
      items: Object,
    },
    data: () => ({
        isMounted: false,
        displayToggleLimit: 12,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

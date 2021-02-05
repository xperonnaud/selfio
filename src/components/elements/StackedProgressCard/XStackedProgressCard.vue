<template>

    <v-card
        v-if="isMounted"
        :color="xTabsColor"
        :class="[
            'shadow-bottom py-0 rounded',
            (isMobile ? 'px-2' : 'px-4')
        ]"
    >
        <v-list-item-content class="no-wrap">
            <v-list-item-title v-text="'Balance'" />

            <v-list-item-subtitle class="pt-1">
                <x-stacked-progress-legend
                    :items.sync="items"
                    :toggleLimit="displayToggleLimit"
                ></x-stacked-progress-legend>

                <x-stacked-progress-bar
                    :items.sync="items"
                    :toggleLimit="displayToggleLimit"
                ></x-stacked-progress-bar>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-card>

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

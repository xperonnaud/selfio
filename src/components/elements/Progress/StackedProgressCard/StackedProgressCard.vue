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
            <v-list-item-title v-text="xCapFirst($t('routes.inventories.balance'))" />

            <v-list-item-subtitle class="pt-1">
                <stacked-progress-legend
                    :items.sync="items"
                    :toggleLimit="displayToggleLimit"
                ></stacked-progress-legend>

                <stacked-progress-bar
                    :items.sync="items"
                    :toggleLimit="displayToggleLimit"
                ></stacked-progress-bar>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-card>

</template>

<script>

  import StackedProgressBar from "@/components/elements/Progress/StackedProgressCard/StackedProgressBar";
  import StackedProgressLegend from "@/components/elements/Progress/StackedProgressCard/StackedProgressLegend";

  export default {
    name: 'stacked-progress-card',
    components: {
        StackedProgressLegend,
        StackedProgressBar
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

<template>

    <v-list-item
      v-on:click="$emit('listItemAction')"
      v-bind:class="['x-list-item pl-3']"
    >
        <v-list-item-avatar
            v-if="(currentRouteId === 'gear') || (currentRouteId === 'adventures')"
            v-bind:class="[
              'x-avatar py-0 d-flex  justify-center',
               (isMobile ? 'my-0 mr-3' : 'ml-2 mr-5'),
            ]"
            :style="((currentRouteId === 'gear' && item.category) ? `border: 2px solid ${categoryColor(item.category)} !important;` : '')"
        >
            <x-img
                v-if="currentRouteId === 'gear' && item.category && xGearCategory(item.category)"
                :src="xGearCategory(item.category).icon"
                :tooltipText="item.category"
                :width="SMI"
                :height="SMI"
                isCategory
            ></x-img>

            <x-unknown-category-icon v-else-if="currentRouteId === 'gear'" />

            <x-img
                v-else-if="item.activity && xActivity(item.activity)"
                :src="xActivity(item.activity).icon"
                :tooltipText="xActivity(item.activity).title"
                :width="LGI"
                :height="LGI"
            ></x-img>
        </v-list-item-avatar>

      <v-list-item-content :class="[{'pl-1':currentRouteId === 'inventories'}]">
        <component
          v-if="listComponent"
          :key="`${currentRouteId}-list-item-component`"
          :is="listComponent"
          :ref="listRef"
          :item="item"
        ></component>
      </v-list-item-content>
    </v-list-item>

</template>

<script>

  export default {
    name: "x-list-item",
    components: {
        XImg: () => import('@/components/elements/XImg'),
        XUnknownCategoryIcon: () => import('@/components/elements/Icons/XUnknownCategoryIcon')
    },
    props: {
      item: Object,
    },
    data: () => ({
      isMounted: false,
      loading: true,

      listRef: null,
      listComponent: null,
      listComponentCalled: null,
    }),
    computed: {
      loader() {
        let self = this;
        let listId = this.xCap(this.currentRouteName);
        self.listComponentCalled = `@/components/lists/items/${listId}ListItem.vue`;
        return () => import(`@/components/lists/items/${listId}ListItem.vue`)
      },
    },
    methods: {
      async componentLoad() {
        let self = this;

        if(!this.loading)
            this.loading = true;

        if(this.isItemRoute || this.isConfigurationRoute)
          this.loader()
            .then(() => {
              self.listComponent = () => self.loader();
            })
            .catch((e) => {
              console.log('componentLoad ERROR',e);
            });

        this.loading = false;
      },
    },
    async mounted() {
        this.listRef = this.randomId();
        await this.componentLoad();
      this.isMounted = true;
    }
  }

</script>
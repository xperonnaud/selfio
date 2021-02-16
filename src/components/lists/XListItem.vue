<template>

    <v-list-item
      v-on:click="$emit('listItemAction')"
      v-bind:class="['x-list-item pl-3']"
    >
      <slot name="list-item-avatar" />

      <v-list-item-content :class="[{'pl-1':currentRouteId === 'inventories'}]">
        <component
          v-if="listComponent"
          v-show="isMounted && !loading"
          :key="`${currentRouteId}-list-item-component`"
          :is="listComponent"
          :ref="listRef"
          :item="item"
        ></component>

        <x-list-item-skeleton v-if="!(isMounted && !loading && listComponent)" />
      </v-list-item-content>
    </v-list-item>

</template>

<script>

    import XListItemSkeleton from "@/components/skeletons/XListItemSkeleton";

  export default {
    name: "x-list-item",
    components: {
        XListItemSkeleton,
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
    watch: {
      async currentRouteName(value) {
        if (!value)
          return null;

        this.clearMenuFilters();
        await this.componentLoad();
      },
    },
    async mounted() {
      this.listRef = this.randomId();
      await this.componentLoad();
      this.isMounted = true;
    }
  }

</script>
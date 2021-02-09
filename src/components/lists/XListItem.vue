<template>

    <v-list-item
      v-on:click="$emit('listItemAction')"
      v-bind:class="['x-list-item pl-3']"
    >
      <slot name="list-item-avatar" />

      <v-list-item-content :class="[{'pl-1':currentRouteId === 'inventories'}]">
        <component
          v-if="listComponent"
          :key="`${currentRouteId}-list-item-component`"
          :is="listComponent"
          :ref="listRef"
          :item="item"
        ></component>

        <v-list-item-content v-else>
          <list-container-skeleton />
        </v-list-item-content>
      </v-list-item-content>
    </v-list-item>

</template>

<script>

  const _ = require('lodash');

  import ListContainerSkeleton from "@/components/skeletons/ListContainerSkeleton";

  export default {
    name: "x-list-item",
    components: {
        ListContainerSkeleton,
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

        if(this.isItemRoute || this.isConfigurationRoute)
          this.loader()
            .then(() => {
              self.listComponent = () => self.loader();
            })
            .catch((e) => {
              console.log('componentLoad ERROR',e);
            })
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
      this.loading = false;
    }
  }

</script>


<style lang="scss">

    /*.x-list-item {*/
    /*    .v-list-item__content {*/
    /*        padding: 8px 0 !important;*/
    /*    }*/
    /*}*/

</style>
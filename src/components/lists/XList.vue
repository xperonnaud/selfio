<template>

  <v-card
    v-bind:class="['x-list mx-auto elevation-0']"
    :color="xBackgroundColor"
  >
    <virtual-list
      v-if="listItemComponent"
      style="height: 100%; overflow-y: auto;"
      :data-key="'id'"
      :data-sources.sync="filteredItems"
      :data-component="listItemComponent"
      page-mode
      wrap-class="x-list"
      item-class="x-list-item"
    ></virtual-list>

    <x-list-skeleton v-else />

    <v-list v-if="!isAppLoading && (items.length <= 0 || ((filteredItems.length <= 0) && !(items.length <= 0)))">
      <item-empty-list-item v-if="(items.length <= 0)" />

      <no-result-empty-list-item v-else-if="(filteredItems.length <= 0) && !(items.length <= 0)" />
    </v-list>
  </v-card>

</template>

<script>

  const _ = require('lodash');

  import XListSkeleton from "@/components/skeletons/XListSkeleton";
  import VirtualList from 'vue-virtual-scroll-list'

  export default {
    name: "x-list",
    components: {
      'virtual-list': VirtualList,
      XListSkeleton,
      ItemEmptyListItem: () => import('@/components/lists/items/ItemEmptyListItem'),
      NoResultEmptyListItem: () => import('@/components/lists/items/NoResultEmptyListItem')
    },
    props: {
      title: String,
      icon: String,
      items: Array,
      itemHeaders: Array,
      keyName: String
    },
    data: () => ({
      isMounted: false,
      loading: true,

      listItemRef: null,
      listItemComponent: null,
      listItemComponentCalled: null,
    }),
    computed: {
      loader() {
        let self = this;
        let listItemId = this.xCap(this.currentRouteName);
        self.listItemComponentCalled = `@/components/lists/items/${listItemId}ListItem.vue`;
        return () => import(`@/components/lists/items/${listItemId}ListItem.vue`)
      },
      color() {
        return this.currentColor
      },
      gearTagFilter: {
        get() {
          return this.$store.state.ui.filters.gear.tag
        }
      },
      gearQuantityOwnedFilter: {
        get() {
          return this.$store.state.ui.filters.gear.quantityOwned
        }
      },
      gearStateFilter: {
        get() {
          return this.$store.state.ui.filters.gear.state
        }
      },
      gearCategoryFilter: {
        get() {
          return this.$store.state.ui.filters.gear.category
        }
      },
      gearConsumableFilter: {
        get() {
          return this.$store.state.ui.filters.gear.consumable
        }
      },
      gearBrandFilter: {
        get() {
          return this.$store.state.ui.filters.gear.brand
        }
      },
      inventoryTagFilter: {
        get() {
          return this.$store.state.ui.filters.inventories.tag
        }
      },
      adventureTagFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.tag
        }
      },
      locationAdventureFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.location
        }
      },
      landscapeAdventureFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.landscape
        }
      },
      activityAdventureFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.activity
        }
      },
      weatherAdventureFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.weather
        }
      },
      inventoryAdventureFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.inventory
        }
      },
      ownedBrandFilter: {
        get() {
          return this.$store.state.ui.filters.brands.owned
        }
      },
      filteredItems() {
        return (this.sortedItems.filter(item => {
          if(
            !this.itemSearch

            && !this.gearTagFilter
            && !this.gearQuantityOwnedFilter
            && !this.gearStateFilter
            && typeof this.gearCategoryFilter != 'number'
            && !this.gearConsumableFilter
            && typeof this.gearBrandFilter != 'number'

            && !this.inventoryTagFilter

            && !this.adventureTagFilter
            && !this.locationAdventureFilter
            && typeof this.activityAdventureFilter != 'number'
            && typeof this.landscapeAdventureFilter != 'number'
            && !this.weatherAdventureFilter
            && typeof this.inventoryAdventureFilter != 'number'

            && !this.ownedBrandFilter
          ) return this.items;

          return (
            (this.itemSearch ? item.title.toLowerCase().includes(this.itemSearch.toLowerCase()) : true)

            && (this.gearConsumableFilter ? (item.consumable === true) : true)
            && (this.gearTagFilter ? (item.tags!==null && item.tags.includes(this.gearTagFilter)) : true)
            && (this.gearQuantityOwnedFilter ? (parseFloat(item.quantity_owned) === parseFloat(this.gearQuantityOwnedFilter)) : true)
            && (typeof this.gearCategoryFilter == 'number' ? (item.category === this.gearCategoryFilter) : true)
            && (this.gearStateFilter ? (item.state === this.gearStateFilter) : true)
            && (typeof this.gearBrandFilter == 'number' ? (item.brand === this.gearBrandFilter) : true)

            && (this.inventoryTagFilter ? (item.tags!==null && item.tags.includes(this.inventoryTagFilter)) : true)

            && (this.adventureTagFilter ? (item.tags!==null && item.tags.includes(this.adventureTagFilter)) : true)
            && (typeof this.activityAdventureFilter == 'number' ? (item.activity === this.activityAdventureFilter) : true)
            && (this.locationAdventureFilter ? item.location.toLowerCase().includes(this.locationAdventureFilter.toLowerCase()) : true)
            && (typeof this.landscapeAdventureFilter == 'number' ? (item.landscape === this.landscapeAdventureFilter) : true)
            && (this.weatherAdventureFilter ? (item.weather === this.weatherAdventureFilter) : true)
            && (typeof this.inventoryAdventureFilter == 'number' ? (item.adventure_inventory === this.inventoryAdventureFilter) : true)

            && (this.ownedBrandFilter ? (item.global === false) : true)
          )
        }));
      },
      sortedItems() {
        return _.orderBy(this.items, this.itemOrderBy, this.itemOrderOption);
      }
    },
    methods: {
      async componentLoad() {
        let self = this;

        if(!this.loading)
          this.loading = true;

        if(this.isItemRoute || this.isConfigurationRoute)
          this.loader()
            .then(() => {
              self.listItemComponent = () => self.loader();
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
      },
    },
    async mounted() {
      this.listItemRef = this.randomId();
      await this.componentLoad();
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .x-list {

    .x-list-item {
      background-color: #FFFFFF;
      border-bottom: 1px solid #F7F7F7;
    }

    .v-subheader {
      height: 24px !important;
    }
  }

  .is-dark {
    .x-list {

      .x-list-item {
        background-color: #181818;
        border-bottom: 1px solid #0C0C0C;
      }
    }
  }

</style>
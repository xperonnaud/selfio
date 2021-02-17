<template>

  <v-card
    v-bind:class="['x-list mx-auto elevation-0']"
    :color="xBackgroundColor"
  >
    <virtual-list
      v-if="isMounted && listItemComponent"
      style="height: 100%; overflow-y: auto;"
      :data-key="'id'"
      :data-sources.sync="filteredItems"
      :data-component="listItemComponent"
      page-mode
      wrap-class="x-list"
      item-class="x-list-item"
    ></virtual-list>

    <x-list-skeleton v-else />

    <v-list v-if="items.length <= 0 || (filteredItems.length <= 0) && !(filteredItems.length <= 0)">
      <item-empty-list-item v-if="(items.length <= 0)" />

      <no-result-empty-list-item v-else-if="(filteredItems.length <= 0) && !(filteredItems.length <= 0)" />
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
      itemOwned: {
        get() {
          return this.$store.state.ui.itemOwned
        }
      },
      itemTag: {
        get() {
          return this.$store.state.ui.itemTag
        }
      },
      itemLocation: {
        get() {
          return this.$store.state.ui.itemLocation
        }
      },
      itemQuantityOwned: {
        get() {
          return this.$store.state.ui.itemQuantityOwned
        }
      },
      itemConsumable: {
        get() {
          return this.$store.state.ui.itemConsumable
        }
      },
      itemGearCategory: {
        get() {
          return this.$store.state.ui.itemGearCategory
        }
      },
      itemGearState: {
        get() {
          return this.$store.state.ui.itemGearState
        }
      },
      itemGearBrand: {
        get() {
          return this.$store.state.ui.itemGearBrand
        }
      },
      itemActivity: {
        get() {
          return this.$store.state.ui.itemActivity
        }
      },
      itemLandscape: {
        get() {
          return this.$store.state.ui.itemLandscape
        }
      },
      itemWeather: {
        get() {
          return this.$store.state.ui.itemWeather
        }
      },
      itemInventory: {
        get() {
          return this.$store.state.ui.itemInventory
        }
      },
      filteredItems() {
        return (this.sortedItems.filter(item => {
          if(
            !this.itemSearch
            && !this.itemOwned
            && !this.itemTag
            && !this.itemLocation
            && !this.itemQuantityOwned
            && !this.itemConsumable
            && !this.itemGearCategory
            && !this.itemGearState
            && !this.itemGearBrand
            && !this.itemActivity
            && !this.itemLandscape
            && !this.itemWeather
            && !this.itemInventory
          ) return this.items;

          return (
            (this.itemSearch ? item.title.toLowerCase().includes(this.itemSearch.toLowerCase()) : true)
            && (this.itemLocation ? item.location.toLowerCase().includes(this.itemLocation.toLowerCase()) : true)
            && (this.itemOwned ? (item.user_created === this.userId) : true)
            && (this.itemConsumable ? (item.consumable === true) : true)
            && (this.itemTag ? (item.tags.includes(this.itemTag)) : true)
            && (this.itemQuantityOwned ? (parseFloat(item.quantity_owned) === parseFloat(this.itemQuantityOwned)) : true)
            && (this.itemGearCategory ? (item.category === this.itemGearCategory) : true)
            && (this.itemGearState ? (item.state === this.itemGearState) : true)
            && (this.itemGearBrand ? (item.brand === this.itemGearBrand) : true)
            && (this.itemActivity ? (item.activity === this.itemActivity) : true)
            && (this.itemLandscape ? (item.landscape === this.itemLandscape) : true)
            && (this.itemWeather ? (item.weather === this.itemWeather) : true)
            && (this.itemInventory ? (item.adventure_inventory === this.itemInventory) : true)
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
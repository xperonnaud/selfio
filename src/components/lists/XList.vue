<template>

  <v-card
    v-bind:class="['x-list mx-auto elevation-0']"
    :color="xBackgroundColor"
  >
    <v-list
      v-if="isMounted"
      v-show="!(formDialog && isMobile)"
      v-bind:class="['rounded-0', (isMobile ? 'py-1' : 'py-2')]"
      one-line
      flat
    >
      <v-virtual-scroll
        :bench="benched"
        :items="filteredItems"
        :item-height="xListItemsHeight"
      >
        <template v-slot:default="{ item, index }">
          <x-list-item
            v-if="item"
            :key="`${currentRouteName}-${item.id}-${index}`"
            v-bind:item.sync="item"
            v-on:listItemAction="isItemRoute ? openItemDialog(item) : null"
          >
            <template v-slot:list-item-avatar>
              <v-list-item-avatar
                v-if="(
                  ((currentRouteId !== 'brands') && (currentRouteId !== 'inventories'))
                  || item.activity
                  || item.category
                )"
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
            </template>
          </x-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>

        <item-empty-list-item v-if="(items.length <= 0)" />

        <no-result-empty-list-item v-if="(filteredItems.length <= 0) && !(items.length <= 0)" />
      </v-virtual-scroll>
    </v-list>
  </v-card>

</template>

<script>

  const _ = require('lodash');

  export default {
    name: "x-list",
    components: {
      XListItem: () => import('@/components/lists/XListItem'),
      ItemEmptyListItem: () => import('@/components/lists/items/ItemEmptyListItem'),
      NoResultEmptyListItem: () => import('@/components/lists/items/NoResultEmptyListItem'),
      XUnknownCategoryIcon: () => import('@/components/elements/Icons/XUnknownCategoryIcon'),
      XImg: () => import('@/components/elements/XImg')
    },
    props: {
      title: String,
      color: {
        type: String,
        default: 'black'
      },
      icon: String,
      items: Array,
      itemHeaders: Array,
      keyName: String
    },
    data: () => ({
      isMounted: false,
      benched: 5,

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

        if(this.isItemRoute || this.isConfigurationRoute)
          this.loader()
            .then(() => {
              self.listComponent = () => self.loader();
            })
            .catch((e) => {
              console.log('componentLoad ERROR',e);
            })
      },
      openItemDialog(item) {
        if(item) {
          let self = this;

          let references = null;
          if(this.currentRouteName === 'gear') {
            references = this.gearReferences;

          } else if(this.currentRouteName === 'inventories') {
            references = this.inventoryReferences;

          } else if(this.currentRouteName === 'adventures') {
            references = this.adventureReferences;
          }

          if(references) {
            let itemIndex = references[item.id];

            setTimeout(function(){
              self.selectedItem = item;
              self.selectedItemIndex = itemIndex;
              self.formDialog = true;
              self.formDialogType = 'update';
            }, 50);
          } else {
            self.formDialog = false;
          }
        }
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
      let self = this;
      this.listRef = this.randomId();
      await this.componentLoad();

      self.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .x-list {
    .v-subheader {
      height: 24px !important;
    }
  }

</style>
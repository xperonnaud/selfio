<template>

  <v-card
    v-bind:class="['list-container mx-auto elevation-0']"
    :color="xBackgroundColor"
  >
    <v-list
      v-show="!(formDialog && isMobile) && !loading"
      v-bind:class="['rounded-0', (isMobile ? 'py-1' : 'py-2')]"
      one-line
      flat
    >
      <v-scroll-y-transition group>
        <template v-for="(item, index) in filteredItems">
          <v-list-item
            :key="`${currentRouteTitle}-${index}`"
            @click.stop="isItemRoute ? openItemDialog(item) : null"
            v-bind:class="['pl-3']"
          >
            <v-list-item-avatar
              v-if="(
                ((currentRouteTitle !== 'Brands') && (currentRouteTitle !== 'Inventories'))
                || item.activity
                || item.type
              )"
              v-bind:class="[
                'x-avatar',
                'py-0',
                 (isMobile ? 'my-0 mr-3' : 'ml-2 mr-5'),
                 (item.type ? getReversedVuetifyColor(item.type) : ''),
              ]"
            >
              <x-img
                v-if="item.type && xGearType(item.type)"
                :src="xGearType(item.type).icon.data.full_url"
                :width="22"
                :height="22"
                :tooltipText="xGearType(item.type).title"
                isCategory
              ></x-img>

              <x-img
                v-if="item.activity && xActivity(item.activity)"
                :src="xActivity(item.activity).icon.data.full_url"
                :width="24"
                :height="24"
                :tooltipText="xActivity(item.activity).title"
              ></x-img>
            </v-list-item-avatar>

            <component
              v-if="listComponent"
              :is="listComponent"
              :ref="listRef"
              :item="item"
            ></component>

            <v-list-item-content v-else>
              <v-row>
                <v-col cols="3" class="pa-0">
                  <v-skeleton-loader
                    height="36"
                    type="list-item-two-line"
                  ></v-skeleton-loader>
                </v-col>

                <v-col class="pa-0" />

                <v-col class="pa-0 pt-3">
                  <v-skeleton-loader
                    width="60"
                    type="text"
                  ></v-skeleton-loader>
                </v-col>

                <v-col class="pa-0" />

                <v-col class="pa-0 pt-3">
                  <v-skeleton-loader
                    width="60"
                    type="text"
                  ></v-skeleton-loader>
                </v-col>

                <v-col class="pa-0" />

                <v-col class="pa-0 pt-3">
                  <v-skeleton-loader
                    width="60"
                    type="text"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>

        <v-list-item v-if="(items.length <= 0)" :key="`empty-list-${currentRouteName}`">
          <v-list-item-content>
            <empty-list
              :label="`Add ${currentRouteName}`"
              :icon="currentNavItem.icon"
              :color="currentColor"
              isLink
            ></empty-list>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else-if="(filteredItems.length <= 0)" :key="`no-results-list-${currentRouteName}`">
          <v-list-item-content>
            <empty-list
              label="No results"
              icon="mdi-gauge-empty"
              :color="navItemColor(currentRouteName)"
            ></empty-list>
          </v-list-item-content>
        </v-list-item>
      </v-scroll-y-transition>
    </v-list>
  </v-card>

</template>

<script>

  const _ = require('lodash');

  import EmptyList from "@/components/elements/EmptyList";
  import XImg from "@/components/elements/XImg";

  export default {
    name: "list-container",
    components: {
      EmptyList,
      XImg
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
      loading: false,

      listRef: null,
      listComponent: null,
      listComponentCalled: null,
    }),
    computed: {
      loader() {
        let self = this;
        let listId = this.$options.filters.capitalizeFilter(this.currentRouteName);
        self.listComponentCalled = `@/components/lists/items/${listId}ListItem.vue`;
        return () => import(`@/components/lists/items/${listId}ListItem.vue`)
      },
      itemSearch: {
        get() {
          return this.$store.state.ui.itemSearch
        }
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
      itemGearType: {
        get() {
          return this.$store.state.ui.itemGearType
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
            && !this.itemGearType
            && !this.itemGearState
            && !this.itemGearBrand
            && !this.itemActivity
            && !this.itemLandscape
            && !this.itemWeather
            && !this.itemInventory
          ) return this.items;

          return (
            (this.itemSearch ? item.title.toLowerCase().includes(this.itemSearch.toLowerCase()) : true)
            && (this.itemOwned ? (item.owner === this.userId) : true)
            && (this.itemTag ? (item.tags.includes(this.itemTag)) : true)
            && (this.itemGearType ? (item.type === this.itemGearType) : true)
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
      componentLoad() {
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
          this.isAppLoading = true;

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
      currentRouteName(value) {
        if (!value)
          return null;

        this.clearMenuFilters();
        this.componentLoad();
      },
    },
    mounted() {
      this.listRef = this.randomId();
      this.isMounted = true;
      this.componentLoad();
    }
  }

</script>

<style lang="scss">

  .v-skeleton-loader__list-item-two-line.v-skeleton-loader__bone {
    height: 36px !important;
  }

  .list-container {
    .v-subheader {
      height: 24px !important;
    }
  }

</style>
<template>

    <v-container
      v-if="isMounted"
      v-bind:class="[
        {'py-0': isMobile},
        'adventures-form pa-0'
      ]"
      style="max-width: unset;"
    >
      <v-form class="adventures-form" v-model="valid">
        <v-tabs
          v-model="tab"
          :color="currentColor"
          :background-color="xTabsColor"
          fixed-tabs
        >
          <v-tab :key="'adventure-general'">
            <span v-text="$t('global.general')" />
          </v-tab>
          <v-tab :key="'adventure-event'">
            <span v-text="$t('routes.adventures.event')" />
          </v-tab>
          <v-tab :key="'adventure-details'">
            <span v-text="$t('global.details')" />
          </v-tab>

          <v-tabs-items v-model="tab" :style="xBackgroundStyleColorStr">
            <v-tab-item :key="'adventure-general'">
              <v-responsive
                class="overflow-y-auto"
                :height="maxDialogContentHeight"
              >
                <v-card flat :color="xBackgroundColor">
                  <v-card-text :class="{'py-1':isMobile}">
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <title-field
                          label="title"
                          v-bind:valid.sync="validTitle"
                          v-bind:value.sync="updatedItem.title"
                        ></title-field>
                      </v-col>

                      <v-col cols="12">
                        <activity-selector v-bind:value.sync="updatedItem.activity" />
                      </v-col>

                      <v-col cols="12">
                        <inventory-selector
                          label="inventory"
                          :list="inventoriesList"
                          :color="currentColor"
                          :type="'inventories'"
                          v-bind:value.sync="updatedItem.adventure_inventory"
                        ></inventory-selector>
                      </v-col>

                      <v-col
                        v-if="(typeof updatedItem.adventure_inventory === 'number') && inventoryHasGear"
                        cols="12"
                      >
                        <adventure-gear-card
                          v-on:cardAction="editInventory()"
                          :isLoading="isEditing"
                          :updatedItem.sync="updatedItem"
                          :originalInventoryGear.sync="originalInventoryGear"
                          :packedGearRatio.sync="packedGearRatio"
                          :roundedPackedGearRatio.sync="roundedPackedGearRatio"
                        ></adventure-gear-card>
                      </v-col>

                      <v-col cols="12">
                        <x-combobox
                          label="tags"
                          v-bind:value.sync="updatedItem.tags"
                          v-bind:items="preferences.adventure_tags"
                          v-bind:route="'adventures'"
                        ></x-combobox>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          :label="xCapFirst($t('global.note'))"
                          v-model="updatedItem.note"
                          :color="currentColor"
                          filled
                          dense
                          hide-details="auto"
                          auto-grow
                          rows="1"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-responsive>
            </v-tab-item>

            <v-tab-item :key="'adventure-event'">
              <v-responsive
                class="overflow-y-auto"
                :height="maxDialogContentHeight"
              >
                <v-card flat :color="xBackgroundColor">
                  <v-card-text :class="{'py-1':isMobile}">
                    <v-row>
                      <v-col cols="12">
                        <landscape-selector v-bind:value.sync="updatedItem.landscape" />
                      </v-col>

                      <v-col cols="12">
                        <x-text
                          :label="$t('global.location')"
                          v-bind:value.sync="updatedItem.location"
                        ></x-text>
                      </v-col>

                      <v-col cols="12">
                        <x-date-picker
                          label="start-date"
                          v-bind:value.sync="updatedItem.start_date"
                        ></x-date-picker>
                      </v-col>

                      <v-col cols="12">
                        <x-time-picker
                          label="start-time"
                          v-bind:value.sync="updatedItem.start_time"
                        ></x-time-picker>
                      </v-col>

                      <v-col cols="12">
                        <x-date-picker
                          label="end-date"
                          v-bind:value.sync="updatedItem.end_date"
                          :minDate="updatedItem.start_date"
                        ></x-date-picker>
                      </v-col>

                      <v-col cols="12">
                        <x-time-picker
                          label="end-time"
                          v-bind:value.sync="updatedItem.end_time"
                        ></x-time-picker>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-responsive>
            </v-tab-item>

            <v-tab-item :key="'adventure-conditions'">
              <v-responsive
                class="overflow-y-auto"
                :height="maxDialogContentHeight"
              >
                <v-card flat :color="xBackgroundColor">
                  <v-card-text :class="{'py-1':isMobile}">
                    <v-row>
                      <v-col cols="12">
                        <x-text
                          :label="`${$t('global.elevation')}/${$t('global.depth')}`"
                          v-bind:value.sync="updatedItem.elevation"
                          :rules="xRules.decimals"
                          :suffix="elevationUnit"
                        ></x-text>
                      </v-col>

                      <v-col cols="12">
                        <x-text
                          :label="$t('global.distance')"
                          v-bind:value.sync="updatedItem.distance"
                          :rules="xRules.decimals"
                          :suffix="distanceUnit"
                        ></x-text>
                      </v-col>

                      <v-col cols="12">
                        <weather-selector
                          v-bind:value.sync="updatedItem.weather"
                          :iconSize="LGI"
                          hasIcon
                        ></weather-selector>
                      </v-col>

                      <v-col cols="12">
                        <x-increment
                          label="max-temp"
                          v-bind:value.sync="updatedItem.temp_max"
                          :rules="xRules.temperature"
                          :color="currentColor"
                          :min="updatedItem.temp_min || null"
                          :max="50"
                          :append="temperatureUnit"
                        ></x-increment>
                      </v-col>

                      <v-col cols="12">
                        <x-increment
                          label="min-temp"
                          v-bind:value.sync="updatedItem.temp_min"
                          :rules="xRules.temperature"
                          :color="currentColor"
                          :min="-50"
                          :max="updatedItem.temp_max || null"
                          :append="temperatureUnit"
                        ></x-increment>
                      </v-col>

                      <v-col cols="12">
                        <x-increment
                          label="humidity"
                          v-bind:value.sync="updatedItem.humidity"
                          :rules="xRules.integer"
                          :color="currentColor"
                          :min="0"
                          :max="100"
                          :append="'%'"
                        ></x-increment>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-responsive>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>

        <v-dialog
          v-model="isEditing"
          :transition="dialogTransition"
          max-width="900px"
          :fullscreen="isMobile"
          :hide-overlay="isMobile"
          persistent
        >
          <v-card class="mx-auto" flat :color="xBackgroundColor">
            <v-toolbar :class="['edition-toolbar', (isMobile ? 'px-0' : 'px-2')]">
              <v-btn @click="closeEditor()" icon>
                <v-icon v-text="'mdi-arrow-left'" />
              </v-btn>

              <v-toolbar-title v-bind:class="[{'px-0':isMobile}]">
                <v-list-item two-line class="px-0">
                  <v-list-item-content class="pa-0">
                    <v-list-item-title>
                      <span v-if="updatedItem.title">{{updatedItem.title | capitalizeFirstFilter}}&nbsp;-&nbsp;</span>
                      <span>{{$t('components.adventure-gear-card.gear-checklist') | capitalizeFirstFilter}}</span>
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <div class="d-flex">
                        <div>
                            <span class="font-weight-regular">
                              <span v-bind:class="[navItemColorText('inventories')]" v-text="updatedItem.packed_gear ? updatedItem.packed_gear.length : 0" />
                              <span v-text="' / '" />
                              <span v-bind:class="[navItemColorText('inventories')]" v-text="originalInventoryGear.length" />
                              <span v-text="` ${$t('components.adventure-gear-card.packed-gear')}`" />
                            </span>
                        </div>

                        <div class="ml-1">
                          <v-slide-x-transition>
                            <v-icon
                              v-show="packedGearRatio && packedGearRatio===100"
                              v-text="'mdi-check'"
                              :color="navItemColor('inventories')"
                              small
                            ></v-icon>
                          </v-slide-x-transition>
                        </div>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-toolbar-title>

              <v-spacer />

              <adventure-gear-filter-menu
                v-bind:filters.sync="filters"
                v-bind:gearFilterMode.sync="gearFilterModeOn"
              ></adventure-gear-filter-menu>

              <v-btn
                @click.stop="closeGearList()"
                icon
              >
                <poly-icon :size="XLI" icon="mdi-check" />
              </v-btn>

              <template v-slot:extension>
                <v-list
                  v-bind:class="['rounded-0 py-0 max-width']"
                  color="transparent"
                  one-line
                  flat
                  dense
                >
                  <v-list-item :class="[(isMobile ? 'pl-13' : 'pl-11')]">
                    <v-list-item-avatar
                      v-bind:class="['x-avatar my-0 py-0 mr-1 d-flex justify-center']"
                      width="40"
                      height="40"
                    >
                      <v-col class="x-col py-2">
                        <div class="d-flex justify-center" />
                      </v-col>
                    </v-list-item-avatar>

                    <adventure-gear-list-header
                      :gearOrderBy="gearOrderBy"
                      v-on:sortGear="sortGear($event)"
                    ></adventure-gear-list-header>
                  </v-list-item>
                </v-list>
              </template>
            </v-toolbar>

            <v-card-text :class="['pa-0']">
              <v-list
                v-if="filteredGear.length > 0"
                subheader
                two-line
                dense
              >
                <DynamicScroller
                  :style="`height: ${DynamicListHeight()}px`"
                  :items.sync="filteredGear"
                  :minItemSize="xListItemsHeight"
                  key-field="id"
                >
                  <template v-slot="{ item, index, active }">
                    <DynamicScrollerItem
                      :item="item"
                      :active="active"
                      :size-dependencies="[item.title]"
                      :data-index="index"
                    >
                      <adventure-gear-list-item
                        :key="`adventure-gear-${item.gear_id}-${index}`"
                        :source.sync="item"
                        :updatedItem.sync="updatedItem"
                        v-on:itemAction="packGear(item.gear_id)"
                      ></adventure-gear-list-item>

                      <v-divider />
                    </DynamicScrollerItem>
                  </template>
                </DynamicScroller>
              </v-list>

              <empty-list
                v-else
                :height="currentDialogHeight"
                :label="xCapFirst($t(`routes.inventories.add-inventory-gear`))"
                :color="navItemColor('gear')"
              ></empty-list>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-text-field v-show="false" v-model="validTitle" :rules="xRules.boolean" />
      </v-form>
    </v-container>

</template>

<script>

  const _ = require('lodash');

  import Vue from 'vue'
  import AdventureGearFilterMenu from "@/components/elements/FilterMenu/AdventureGearFilterMenu";
  import AdventureGearListHeader from "@/components/lists/headers/AdventureGearListHeader";
  import PolyIcon from "@/components/elements/Icons/PolyIcon";
  import AdventureGearListItem from "@/components/lists/items/AdventureGearListItem";
  import AdventureGearCard from "@/components/elements/Cards/AdventureGearCard";
  import XText from "@/components/inputs/XText";
  import TitleField from "@/components/inputs/TitleField";
  import WeatherSelector from "@/components/inputs/selectors/WeatherSelector";
  import XIncrement from "@/components/inputs/XIncrement";
  import XDatePicker from "@/components/inputs/XDatePicker";
  import XTimePicker from "@/components/inputs/XTimePicker";
  import InventorySelector from "@/components/inputs/selectors/InventorySelector";
  import ActivitySelector from "@/components/inputs/selectors/ActivitySelector";
  import LandscapeSelector from "@/components/inputs/selectors/LandscapeSelector";
  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'adventures-form',
    components: {
      PolyIcon,
      AdventureGearFilterMenu,
      AdventureGearListHeader,
      AdventureGearListItem,
      AdventureGearCard,
      XText,
      TitleField,
      WeatherSelector,
      XCombobox,
      XIncrement,
      InventorySelector,
      XTimePicker,
      XDatePicker,
      ActivitySelector,
      LandscapeSelector,
    },
    props: {
      item: Object,
      itemIndex: Number,
      isFormMounted: {
        type: Boolean,
        default: false
      },
      isFormLoading: {
        type: Boolean,
        default: true
      },
      isFormValid: {
        type: Boolean,
        default: false
      },
      postItem: {
        type: Boolean,
        default: false
      },
      patchItem: {
        type: Boolean,
        default: false
      },
      deleteItem: {
        type: Boolean,
        default: false
      },
      editMode: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      valid: false,
      validTitle: false,

      tab: 'adventure-general',

      isEditing: false,
      isLoading: null,

      isUpdatedItemFixed: false,
      updatedItem: {},

      originalInventoryGear: [],

      gearOrderBy: 'type',
      gearOrderOption: 'desc',

      gearFilterModeOn: false,
      filters: {
        gearCategoryFilter: null,
        gearIsPackedFilter: null,
        gearTagsFilter: null,
        gearStateFilter: null,
        gearBrandFilter: null,
        gearConsumableFilter: null,
        gearIsWornFilter: null,
      },
    }),
    computed: {
      nbUnpackedItems() {
        if(this.isMounted && this.updatedItem.packed_gear && this.updatedItem.packed_gear.length)
          return (this.originalInventoryGear.length - this.updatedItem.packed_gear.length);
        return this.originalInventoryGear.length;
      },
      hasInventoryGear() {
        return (this.originalInventoryGear && this.originalInventoryGear.length > 0);
      },
      inventoryGear() {
        return this.updatedItem.adventure_inventory;
      },
      inventoryHasGear() {
        if(!this.inventoryGear
            || typeof this.inventoryGear !== 'number'
            || !this.xInventory(this.inventoryGear)
            || !this.xInventory(this.inventoryGear).inventory_gear
        )
          return false;
        return (this.xInventory(this.inventoryGear).inventory_gear.length > 0);
      },
      roundedPackedGearRatio() {
        if(this.packedGearRatio)
          return this.xFilters.roundIntFilter(this.packedGearRatio);
        return null;
      },
      packedGearRatio() {
        if(this.isMounted && this.originalInventoryGear && this.originalInventoryGear.length)
          return ((((this.updatedItem.packed_gear && this.updatedItem.packed_gear.length > 0) ? this.updatedItem.packed_gear.length : 0) / this.originalInventoryGear.length) * 100);
        return null;
      },
      filteredGear() {
        if(this.isMounted)
          return (this.sortedGear.filter(item => {
            let gear = this.xGear(item.gear_id);
            if(
              !this.itemSearch
              && !this.filters.gearCategoryFilter
              && !this.filters.gearStateFilter
              && !this.filters.gearTagsFilter
              && !this.filters.gearBrandFilter
              && !this.filters.gearIsWornFilter
              && !this.filters.gearIsPackedFilter
              && !this.filters.gearConsumableFilter
            ) return this.originalInventoryGear;

            return (
              (this.itemSearch ? (gear.title && gear.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
              && (this.filters.gearCategoryFilter ? (gear.category && gear.category === this.filters.gearCategoryFilter) : true)
              && (this.filters.gearStateFilter ? (gear.state && gear.state === this.filters.gearStateFilter) : true)
              && (this.filters.gearBrandFilter ? (gear.brand && gear.brand === this.filters.gearBrandFilter) : true)
              && (this.filters.gearConsumableFilter ? (gear.consumable === true) : true)
              && (this.filters.gearTagsFilter ? (gear.tags.includes(this.filters.gearTagsFilter)) : true)
              && (this.filters.gearIsWornFilter ? (item.gear_worn === true) : true)
              && (this.filters.gearIsPackedFilter ? (this.updatedItem && this.updatedItem.packed_gear && this.updatedItem.packed_gear.includes(item.gear_id)) : true)
            )
          }));

        return this.sortedGear;
      },
      sortedGear() {
        return _.orderBy(this.originalInventoryGear, this.gearOrderBy, this.gearOrderOption);
      },
    },
    methods: {
      closeGearFilterMenu() {
        this.gearFilterModeOn = false;
      },
      sortGear(by, option = "asc") {
        if (this.gearOrderBy == by) {
          if (this.gearOrderOption == "asc") {
            this.gearOrderOption = "desc";
          } else if (this.gearOrderOption == "desc") {
            this.gearOrderOption = "asc";
          }
        } else {
          this.gearOrderOption = option;
          this.gearOrderBy = by;
        }
      },
      async initInventoryGear() {
        if(typeof this.updatedItem.adventure_inventory == 'number'
            && this.xInventory(this.updatedItem.adventure_inventory)
            && this.xInventory(this.updatedItem.adventure_inventory).inventory_gear
        ) {
          this.originalInventoryGear = [...this.xInventory(this.updatedItem.adventure_inventory).inventory_gear];
        }
      },
      editInventory() {
        this.isEditing = true;
      },
      packGear(gearId) {
        let index = this.updatedItem.packed_gear.indexOf(gearId);
        if(index !== -1) {
          this.updatedItem.packed_gear.splice(index, 1);
        } else {
          this.updatedItem.packed_gear.push(gearId);
        }
      },
      increment(property) {
        this.updatedItem[property]++;
      },
      decrement(property) {
        this.updatedItem[property]--;
      },
      async initUpdatedItem() {
        this.updatedItem = this.copyVar(this.item);
      },
      async fixUpdatedItem() {
        if(!this.isUpdatedItemFixed) {
          if(this.item === null || !this.item) {
            Vue.set(this.updatedItem, 'temp_max', null);
            Vue.set(this.updatedItem, 'temp_min', null);
            Vue.set(this.updatedItem, 'elevation', null);
            Vue.set(this.updatedItem, 'distance', null);
            Vue.set(this.updatedItem, 'humidity', null);

          } else {
            if(typeof this.item.temp_max == 'undefined' || !this.item.temp_max || isNaN(this.item.temp_max)) {
              this.updatedItem.temp_max = null;
            } else {
              this.updatedItem.temp_max = this.temperatureUnitConverter(this.item.temp_max);
            }

            if(typeof this.item.temp_min == 'undefined' || !this.item.temp_min || isNaN(this.item.temp_min)) {
              this.updatedItem.temp_min = null;
            } else {
              this.updatedItem.temp_min = this.temperatureUnitConverter(this.item.temp_min);
            }

            if(typeof this.item.elevation == 'undefined' || !this.item.elevation || isNaN(this.item.elevation)) {
              this.updatedItem.elevation = null;
            } else {
              this.updatedItem.elevation = this.elevationUnitConverter(this.item.elevation);
            }

            if(typeof this.item.distance == 'undefined' || !this.item.distance || isNaN(this.item.distance)) {
              this.updatedItem.distance = null;
            } else {
              this.updatedItem.distance = this.distanceUnitConverter(this.item.distance);
            }

            if(typeof this.item.humidity == 'undefined' || !this.item.humidity || isNaN(this.item.humidity)) {
              this.updatedItem.humidity = null;
            }
          }

          this.isUpdatedItemFixed = true;
        }
      },
      async closeEditor() {
        this.isEditing = false;
      },
      closeGearList() {
        this.isEditing = false
      },
      ratioFilter(ratio) {
        if(ratio)
          return this.xFilters.roundIntFilter(ratio);
        return null;
      },
      isGearPacked(gearId) {
        if(!this.updatedItem.packed_gear)
          return null;
        return (this.updatedItem.packed_gear.indexOf(gearId) !== -1);
      },
      clearAdventureMenuFilters() {
        this.filters.gearCategoryFilter = null;
        this.filters.gearTagsFilter = null;
        this.filters.gearStateFilter = null;
        this.filters.gearBrandFilter = null;
        this.filters.gearIsPackedFilter = null;
        this.filters.gearIsWornFilter = null;
        this.filters.gearConsumableFilter = null;
      },
    },
    watch: {
      async inventoryGear(val) {
        if(this.isMounted) {
          let self = this;
          if(typeof val == 'number')
            await this.initInventoryGear();

          Vue.set(this.updatedItem, 'packed_gear', []);

          if(this.item && this.item.adventure_inventory === val) {
            this.item.packed_gear.forEach(function(gearId) {
              let invGear = self.originalInventoryGear.filter( invGear => invGear['gear_id'] === gearId );
              if(invGear && invGear.length === 1) {
                let len = self.updatedItem.packed_gear.length;
                Vue.set(self.updatedItem.packed_gear, len, gearId);
              }
            });
          }
        }
      },
      valid(val) {
        if(this.isMounted)
          this.$emit('update:isFormValid',val);
      },
      isMounted(newVal, oldVal) {
        if(newVal === true && oldVal === false)
          this.$emit('update:isFormMounted',newVal);
      },
      isLoading(val) {
        if(this.isMounted)
          this.$emit('update:isFormLoading',val);
      },
      isFormLoading(val) {
        if(this.isMounted)
          this.isLoading = val;
      },
      async postItem(val) {
        if(this.valid===true && val===true) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'adventure');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'adventure');

          await this.api_post_adventure(this.updatedItem);
          Object.assign(this.updatedItem, {});

          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async patchItem(val) {
        if(this.valid===true && val===true) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'adventure');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'adventure');

          await this.api_patch_adventure(this.updatedItem, this.itemIndex, this.item.adventure_inventory);

          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async deleteItem(val) {
        if(val===true) {
          this.isLoading = true;
          await this.api_remove_adventure(this.item.id, this.itemIndex);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async isEditing(newVal) {
        this.isLoading = true;
        this.$emit('update:editMode',newVal);
        this.isLoading = false;
      },
      async editMode(val) {
        if(this.isMounted) {
          this.isEditing = val;

          if(val === false)
            this.clearAdventureMenuFilters();
        }
      },
    },
    async mounted() {

      if(this.item) {
        await this.initUpdatedItem();
        await this.initInventoryGear();
      }

      await this.fixUpdatedItem();

      this.isMounted = true;
      this.isLoading = false;
    }
  }
</script>
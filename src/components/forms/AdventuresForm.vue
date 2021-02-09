<template>

    <v-container
      v-if="isMounted"
      style="max-width: unset;"
      v-bind:class="[
        {'py-0': isMobile},
        'adventures-form pa-0'
      ]"
    >
      <v-form class="adventures-form" v-model="valid">
        <v-expand-transition>
          <v-tabs
            v-show="!isEditing"
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
                  :min-height="dialogContentHeight"
                  :max-height="maxDialogContentHeight"
                >
                  <v-card flat :color="xBackgroundColor">
                    <v-card-text :class="{'py-1':isMobile}">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <x-title-field
                            label="title"
                            v-bind:valid.sync="validTitle"
                            v-bind:value.sync="updatedItem.title"
                          ></x-title-field>
                        </v-col>

                        <v-col cols="12">
                          <x-selector
                            label="activity"
                            dataType="activities"
                            :list="activitiesList"
                            :listReferences="activityReferences"
                            v-bind:value.sync="updatedItem.activity"
                            :iconSize="LGI"
                          ></x-selector>
                        </v-col>

                        <v-col cols="12">
                          <x-picker
                            label="inventory"
                            :list="inventoriesList"
                            :color="currentColor"
                            :type="'inventories'"
                            v-bind:value.sync="updatedItem.adventure_inventory"
                          ></x-picker>
                        </v-col>

                        <v-col
                          v-if="(typeof updatedItem.adventure_inventory === 'number') && inventoryHasGear"
                          cols="12"
                        >
                          <adventure-gear-card
                            v-on:cardAction="editInventory()"
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
                  :min-height="dialogContentHeight"
                  :max-height="maxDialogContentHeight"
                >
                  <v-card flat :color="xBackgroundColor">
                    <v-card-text :class="{'py-1':isMobile}">
                      <v-row>
                        <v-col cols="12">
                          <x-selector
                            label="landscape"
                            dataType="landscapes"
                            :list="landscapesList"
                            :listReferences="landscapeReferences"
                            v-bind:value.sync="updatedItem.landscape"
                            :iconSize="36"
                            :avatarSize="XLI"
                            logo
                          ></x-selector>
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
                  :min-height="dialogContentHeight"
                  :max-height="maxDialogContentHeight"
                >
                  <v-card flat :color="xBackgroundColor">
                    <v-card-text :class="{'py-1':isMobile}">
                      <v-row>
                        <v-col cols="12">
                          <x-text
                            :label="`${$t('global.elevation')}/${$t('global.depth')}`"
                            v-bind:value.sync="updatedItem.elevation"
                            :rules="xRules.decimal"
                            :suffix="elevationUnit"
                          ></x-text>
                        </v-col>

                        <v-col cols="12">
                          <x-text
                            :label="$t('global.distance')"
                            v-bind:value.sync="updatedItem.distance"
                            :rules="xRules.decimal"
                            :suffix="distanceUnit"
                          ></x-text>
                        </v-col>

                        <v-col cols="12">
                          <x-simple-selector
                            label="weather"
                            dataType="weathers"
                            :list="weathers"
                            v-bind:value.sync="updatedItem.weather"
                            :iconSize="LGI"
                            hasIcon
                          ></x-simple-selector>
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
        </v-expand-transition>

        <v-expand-transition>
          <div v-show="isEditing">
            <v-card class="mx-auto" flat :color="xBackgroundColor">
              <v-card-text :class="['pa-0']">
                <v-toolbar class="edition-toolbar">
                  <v-btn @click="closeEditor()" icon>
                    <v-icon v-text="'mdi-arrow-left'" />
                  </v-btn>

                  <v-toolbar-title v-bind:class="[{'pa-0':isMobile}]">
                    <v-list-item two-line>
                      <v-list-item-content class="pa-0">
                        <v-list-item-title>{{$t('components.adventure-gear-card.gear-checklist') | capitalizeFirstFilter}}</v-list-item-title>

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

                  <div class="mr-1 text-center">
                    <v-menu
                      v-model="gearFilterModeOn"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      left
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="gearFilterModeOn = !gearFilterModeOn"
                          v-bind="attrs"
                          v-on="on"
                          icon
                        >
                          <v-icon v-text="gearFilterModeOn?'mdi-filter-variant-minus':'mdi-filter-variant'" />
                        </v-btn>
                      </template>

                      <v-card>
                        <v-list class="py-1">
                          <v-list-item>
                            <v-list-item-title v-text="$t('global.filters')" />

                            <v-spacer />

                            <v-btn
                              @click="closeGearFilterMenu()"
                              icon
                            >
                              <v-icon v-text="'mdi-close'" />
                            </v-btn>

                          </v-list-item>
                        </v-list>

                        <v-divider />

                        <v-list>
                          <v-list-item class="mb-3">
                            <x-picker
                              label="category"
                              :list="categoriesList"
                              v-bind:value.sync="gearCategoryFilter"
                            ></x-picker>
                          </v-list-item>

                          <v-list-item class="mb-3">
                            <v-autocomplete
                              v-if="gearFilterModeOn"
                              :label="$t('global.tags')"
                              v-model="gearTagsFilter"
                              :items="preferences.gear_tags"
                              :color="currentColor"
                              filled
                              dense
                              clearable
                              hide-details="auto"
                            ></v-autocomplete>
                          </v-list-item>

                          <v-list-item class="mb-3">
                            <x-brand-selector v-bind:value.sync="gearBrandFilter" isInFilter />
                          </v-list-item>

                          <v-list-item class="mb-3">
                            <x-state-selector v-bind:value.sync="gearStateFilter" isInFilter />
                          </v-list-item>

                          <v-list-item class="mb-3">
                            <x-checkbox
                              label="packed"
                              v-bind:value.sync="gearIsPackedFilter"
                            ></x-checkbox>
                          </v-list-item>

                          <v-list-item class="mb-3">
                            <x-checkbox
                              label="worn"
                              v-bind:value.sync="gearIsWornFilter"
                            ></x-checkbox>
                          </v-list-item>

                          <v-list-item class="mb-3">
                            <x-checkbox
                              label="consumable"
                              v-bind:value.sync="gearConsumableFilter"
                            ></x-checkbox>
                          </v-list-item>
                        </v-list>

                        <v-divider />

                        <v-card-actions>
                          <v-btn
                            @click="clearAdventureMenuFilters()"
                            :color="errorColor"
                            text
                          >
                            <span v-text="$t('global.reset')" />
                          </v-btn>

                          <v-spacer />

                          <v-btn
                            @click="closeGearFilterMenu()"
                            text
                            class="primary-gradient-color-text"
                            icon
                          >
                            <v-icon v-text="'mdi-check'" />
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </div>

                  <v-btn
                    @click="closeGearList()"
                    class="primary-gradient-color-text"
                    icon
                  >
                    <v-icon :size="XLI" v-text="'mdi-check'" />
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

                        <v-list-item-content class="py-0">
                          <v-row align="center" justify="center">

                            <v-col :cols="isMobile ? 6 : 4" :class="['py-2 col-border-r',{'ml-3':!isMobile}]">
                              <div class="d-flex align-center">
                                <div class="text-tiny">{{$t('global.title') | capitalizeFirstFilter}}</div>
                              </div>
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
                              <div class="d-flex justify-center align-center">
                                <div class="text-tiny">{{$t('global.weight') | capitalizeFirstFilter}}</div>
                              </div>
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
                              <div class="d-flex justify-center align-center">
                                <div class="text-tiny">{{$t('global.price') | capitalizeFirstFilter}}</div>
                              </div>
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
                              <div class="d-flex justify-center align-center">
                                <div class="text-tiny">{{$t('global.state') | capitalizeFirstFilter}}</div>
                              </div>
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
                              <div class="text-tiny text-center">{{$t('global.consumable') | minifyTextFilter | capitalizeFirstFilter}}</div>
                            </v-col>

                            <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('gear_worn')" v-ripple>
                              <div class="text-tiny text-center" v-text="$t('global.worn')" />
                              <x-sort-icon prop="gear_worn" />
                            </v-col>

                            <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('gear_quantity_packed')" v-ripple>
                              <div class="text-tiny text-center" v-text="$t('global.qty')" />
                              <x-sort-icon prop="gear_quantity_packed" />
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-toolbar>

                <v-list
                  subheader
                  two-line
                  dense
                >
                  <v-responsive
                    class="overflow-y-auto"
                    :max-height="isMobile ? (listHeight) : 600"
                  >
                    <v-scroll-y-transition group>
                      <template v-for="(gear, index) in filteredGear">
                        <adventure-gear-list-item
                          :key="`adventure-gear-${gear.gear_id}-${index}`"
                          :gear.sync="gear"
                          :updatedItem.sync="updatedItem"
                          v-on:itemAction="packGear(gear.gear_id)"
                        ></adventure-gear-list-item>

                        <v-divider
                          v-if="(index < originalInventoryGear.length - 1)"
                          :key="index"
                        ></v-divider>
                      </template>
                    </v-scroll-y-transition>
                  </v-responsive>
                </v-list>
              </v-card-text>
            </v-card>
          </div>
        </v-expand-transition>

        <v-text-field v-show="false" v-model="validTitle" :rules="xRules.boolean" />
      </v-form>
    </v-container>

</template>

<script>

  const _ = require('lodash');

  import Vue from 'vue'

  import XText from "@/components/inputs/fields/XText";
  import AdventureGearCard from "@/components/elements/Cards/AdventureGearCard";
  import AdventureGearListItem from "@/components/lists/items/AdventureGearListItem";
  import XTitleField from "@/components/inputs/fields/XTitleField";
  import XCheckbox from "@/components/inputs/XCheckbox";
  import XBrandSelector from "@/components/inputs/fields/XBrandSelector";
  import XStateSelector from "@/components/inputs/fields/XStateSelector";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";
  import XIncrement from "@/components/inputs/XIncrement";
  import XPicker from "@/components/inputs/XPicker";
  import XTimePicker from "@/components/inputs/XTimePicker";
  import XDatePicker from "@/components/inputs/XDatePicker";
  import XSelector from "@/components/inputs/XSelector";
  import XSimpleSelector from "@/components/inputs/XSimpleSelector";
  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'adventures-form',
    components: {
      XText,
      AdventureGearCard,
      AdventureGearListItem,
      XTitleField,
      XCheckbox,
      XBrandSelector,
      XStateSelector,
      XSortIcon,
      XCombobox,
      XIncrement,
      XTimePicker,
      XDatePicker,
      XPicker,
      XSelector,
      XSimpleSelector,
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
        default: false
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
      benched: 5,

      tab: 'adventure-general',

      isEditing: false,
      isLoading: false,
      listHeight: 160,

      isUpdatedItemFixed: false,
      updatedItem: {},

      originalInventoryGear: [],

      gearOrderBy: 'type',
      gearOrderOption: 'desc',

      gearFilterModeOn: false,
      gearCategoryFilter: null,
      gearTagsFilter: null,
      gearStateFilter: null,
      gearBrandFilter: null,
      gearIsWornFilter: null,
      gearIsPackedFilter: null,
      gearConsumableFilter: null,
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
              && !this.gearCategoryFilter
              && !this.gearStateFilter
              && !this.gearTagsFilter
              && !this.gearBrandFilter
              && !this.gearIsWornFilter
              && !this.gearIsPackedFilter
              && !this.gearConsumableFilter
            ) return this.originalInventoryGear;

            return (
              (this.itemSearch ? (gear.title && gear.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
              && (this.gearCategoryFilter ? (gear.category && gear.category === this.gearCategoryFilter) : true)
              && (this.gearStateFilter ? (gear.state && gear.state === this.gearStateFilter) : true)
              && (this.gearBrandFilter ? (gear.brand && gear.brand === this.gearBrandFilter) : true)
              && (this.gearConsumableFilter ? (gear.consumable === true) : true)
              && (this.gearTagsFilter ? (gear.tags.includes(this.gearTagsFilter)) : true)
              && (this.gearIsWornFilter ? (item.gear_worn === true) : true)
              && (this.gearIsPackedFilter ? (this.updatedItem && this.updatedItem.packed_gear && this.updatedItem.packed_gear.includes(item.gear_id)) : true)
            )
          }));

        return this.sortedGear;
      },
      sortedGear() {
        return _.orderBy(this.originalInventoryGear, this.gearOrderBy, this.gearOrderOption);
      },
    },
    methods: {
      clearAdventureMenuFilters() {
        this.gearCategoryFilter = null;
        this.gearTagsFilter = null;
        this.gearStateFilter = null;
        this.gearBrandFilter = null;
        this.gearIsPackedFilter = null;
        this.gearIsWornFilter = null;
        this.gearConsumableFilter = null;
      },
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
      initWindowHeight() {
        this.listHeight = (window.innerHeight - 160);
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
          this.isLoading = false;
          this.formDialog = false;
        }
      },
      async patchItem(val) {
        if(this.valid===true && val===true
            && (this.item !== this.updatedItem)
        ) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'adventure');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'adventure');

          await this.api_patch_adventure(this.updatedItem, this.itemIndex, this.item.adventure_inventory);
          this.isLoading = false;
        }
        if(this.valid===true && val===true)
          this.formDialog = false;
      },
      async deleteItem(val) {
        if(val===true) {
          await this.api_remove_adventure(this.item.id, this.itemIndex);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
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
      this.isLoading = true;
      this.initWindowHeight();

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

<style lang="scss">

  .adventures-form {

    .v-subheader {
      max-height: 24px !important;
    }
  }

</style>
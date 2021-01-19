<template>

  <v-form class="adventures-form" v-model="valid">
    <v-container
      v-if="isMounted"
      style="max-width: unset;"
      v-bind:class="[
        {'py-0': isMobile},
        'pa-0'
      ]"
    >
      <v-tabs
        v-show="!isEditing"
        v-model="tab"
        :color="currentColor"
        :background-color="xTabsColor"
        fixed-tabs
      >
        <v-tab :key="'adventure-general'">
          <span v-text="'General'" />
        </v-tab>
        <v-tab :key="'adventure-calendar'">
          <span v-text="'Calendar'" />
        </v-tab>
        <v-tab :key="'adventure-location'">
          <span v-text="'Location'" />
        </v-tab>
        <v-tab :key="'adventure-weather'">
          <span v-text="'Weather'" />
        </v-tab>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="'adventure-general'">
            <v-card flat :color="xBackgroundColor">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Title"
                      hide-details
                      v-model="updatedItem.title"
                      :rules="xRules.text"
                      :color="currentColor"
                      filled
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <x-selector
                      label="Activity"
                      :list="activitiesList"
                      :listReferences="activityReferences"
                      v-bind:value.sync="updatedItem.activity"
                      :iconSize="'26'"
                    ></x-selector>
                  </v-col>

                  <v-col cols="12">
                    <x-picker
                      :label="'Inventory '+(inventoryHasGear ? ('('+originalInventoryGear.length+' item'+(originalInventoryGear.length>1?'s)':')')) : ' (no items)')"
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
                    <div class="x-check-form">
                        <v-card
                          v-if="isMounted"
                          v-bind:class="[
                              'x-check-form-card',
                              'mx-auto',
                              'elevation-0',
                              {'is-dark':isDark}
                            ]"
                          :color="xBackgroundColor"
                          @click.stop="editInventory()"
                        >
                          <v-list one-line dense>
                            <v-list-item class="input-list-item">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="'Gear Checklist'"
                                  v-bind:class="[fontShadeColor]"
                                ></v-list-item-title>

                                <v-list-item-subtitle>
                                  <span class="font-weight-regular">
                                    <span v-bind:class="[fontShadeColor]" v-text="updatedItem.packed_gear ? updatedItem.packed_gear.length : 0" />
                                    <span class="text-tiny" v-text="' / '" />
                                    <span v-bind:class="[fontShadeColor]" v-text="originalInventoryGear.length" />
                                    <span class="text-tiny" v-text="' packed'" />
                                  </span>
                                  <span class="float-right">
                                    <span v-bind:class="['text-caption',fontShadeColor]">
                                      {{ packedGearRatio | roundIntFilter }}
                                    </span>
                                    <span v-text="'%'" />
                                  </span>
                                  <v-progress-linear
                                    v-if="(typeof packedGearRatio == 'number')"
                                    :key="`gear-checklist-${updatedItem.adventure_inventory}`"
                                    :value="roundedPackedGearRatio"
                                    :color="navItemColor('inventories')"
                                    :background-color="xProgressColor"
                                    :height="3"
                                  ></v-progress-linear>
                                </v-list-item-subtitle>
                              </v-list-item-content>

                              <v-list-item-action v-if="originalInventoryGear" v-show="false">
                                <v-list-item-action-text>
                                  <div class="d-flex">
                                    <x-divider />

                                    <div>
                                      <span v-bind:class="[currentColorText]">{{ sumInventoryWeight(originalInventoryGear) | thousandthFilter }}</span>
                                      <span v-text="' k'+weightUnit" />
                                    </div>

                                    <x-divider />

                                    <div>
                                      <span v-bind:class="[currentColorText]">{{ sumInventoryPrice(originalInventoryGear) | thousandthFilter }}</span>
                                      <span v-text="' k'+priceUnit" />
                                    </div>
                                  </div>

                                </v-list-item-action-text>
                              </v-list-item-action>

                              <v-list-item-avatar>
                                <edit-icon isSelector />
                              </v-list-item-avatar>
                            </v-list-item>
                          </v-list>
                        </v-card>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <x-combobox
                      label="Tags"
                      v-bind:value.sync="updatedItem.tags"
                      v-bind:items="preferences.adventure_tags"
                      v-bind:route="'adventures'"
                    ></x-combobox>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      label="Note"
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
          </v-tab-item>

          <v-tab-item :key="'adventure-calendar'">
            <v-card flat :color="xBackgroundColor">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <x-date-picker
                      label="Start Date"
                      v-bind:value.sync="updatedItem.start_date"
                    ></x-date-picker>
                  </v-col>

                  <v-col cols="12">
                    <x-time-picker
                      label="Start Time"
                      v-bind:value.sync="updatedItem.start_time"
                    ></x-time-picker>
                  </v-col>

                  <v-col cols="12">
                    <x-date-picker
                      label="End Date"
                      v-bind:value.sync="updatedItem.end_date"
                      :minDate="updatedItem.start_date"
                    ></x-date-picker>
                  </v-col>

                  <v-col cols="12">
                    <x-time-picker
                      label="End Time"
                      v-bind:value.sync="updatedItem.end_time"
                    ></x-time-picker>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item :key="'adventure-location'">
            <v-card flat :color="xBackgroundColor">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <x-selector
                      label="Landscape"
                      :list="landscapesList"
                      :listReferences="landscapeReferences"
                      v-bind:value.sync="updatedItem.landscape"
                      :iconSize="'26'"
                      logo
                    ></x-selector>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Location"
                      v-model="updatedItem.location"
                      :color="currentColor"
                      filled
                      dense
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Elevation"
                      v-model="updatedItem.elevation"
                      :rules="xRules.elevation"
                      :color="currentColor"
                      filled
                      dense
                      hide-details="auto"
                      :suffix="elevationUnit"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                        label="Distance"
                        v-model="updatedItem.distance"
                        :rules="xRules.decimal"
                        :color="currentColor"
                        filled
                        dense
                        hide-details="auto"
                        :suffix="distanceUnit"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item :key="'adventure-weather'">
            <v-card flat :color="xBackgroundColor">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <x-simple-selector
                      label="Weather"
                      :list="weathers"
                      v-bind:value.sync="updatedItem.weather"
                      :iconSize="'26'"
                      hasIcon
                    ></x-simple-selector>
                  </v-col>

                  <v-col cols="12">
                    <x-increment
                    label="Max Temperature"
                    v-bind:value.sync="updatedItem.temp_max"
                    :rules="xRules.temperature"
                    :color="currentColor"
                    :min="updatedItem.temp_min"
                    :max="50"
                    :append="temperatureUnit"
                    ></x-increment>
                  </v-col>

                  <v-col cols="12">
                    <x-increment
                      label="Min Temperature"
                      v-bind:value.sync="updatedItem.temp_min"
                      :rules="xRules.temperature"
                      :color="currentColor"
                      :min="-50"
                      :max="updatedItem.temp_max"
                      :append="temperatureUnit"
                    ></x-increment>
                  </v-col>

                  <v-col cols="12">
                    <x-increment
                      label="Humidity"
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
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>

      <v-expand-transition>
        <div v-show="isEditing">
          <v-card class="mx-auto" flat :color="xBackgroundColor">

            <v-card-text class="pa-0">
              <v-toolbar>
                <v-btn @click="closeEditor()" icon>
                  <v-icon v-text="'mdi-arrow-left'" />
                </v-btn>

                <v-toolbar-title v-text="'Gear'" v-bind:class="[{'pa-0':isMobile}]" />

                <v-spacer />

                <div class="d-flex">
                  <div>
                    <span class="font-weight-regular">
                      <span v-bind:class="['text-body-1',navItemColorText('inventories')]" v-text="updatedItem.packed_gear ? updatedItem.packed_gear.length : 0" />
                      <span class="text-tiny-dimmed" v-text="' / '" />
                      <span v-bind:class="['text-body-1',navItemColorText('inventories')]" v-text="originalInventoryGear.length" />
                      <span class="text-body-1" v-text="' packed'" />
                    </span>
                  </div>

                  <div class="ml-1">
                    <v-slide-x-transition>
                      <v-icon
                        v-show="packedGearRatio && packedGearRatio===100"
                        v-text="'mdi-check'"
                        :color="navItemColor('inventories')"
                        small
                      />
                    </v-slide-x-transition>
                  </div>
                </div>

                <v-spacer />

                <filter-menu
                  v-bind:filterMode.sync="gearFilterMode"
                  :forcedRouteName="'gear'"
                  class="mr-1"
                ></filter-menu>

                <v-btn
                  @click="closeGearList()"
                  :color="darkColor('primary')"
                  icon
                >
                  <v-icon :size="28" v-text="'mdi-check'" />
                </v-btn>
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
                      <v-list-item
                        :key="`adventure-gear-${gear.gear_id}-${index}`"
                        @click.stop="packGear(gear.gear_id)"
                        class="x-checklist-item"
                      >
                        <v-list-item-action>
                          <v-checkbox
                            :input-value="isGearPacked(gear.gear_id)"
                            :color="currentColor"
                          ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-avatar
                          v-bind:class="[
                            'x-avatar',
                            'my-0 mr-3',
                            (xGear(gear.gear_id).type ?
                              getReversedVuetifyColor(xGear(gear.gear_id).type)
                              : ''
                            )
                          ]"
                        >
                          <x-img
                            v-if="xGear(gear.gear_id).type"
                            :src="xGearType(xGear(gear.gear_id).type).icon.data.full_url"
                            :tooltipText="xGearType(xGear(gear.gear_id).type).title"
                            :width="22"
                            :height="22"
                            isCategory
                          ></x-img>

                          <v-icon
                            v-else
                            v-text="'mdi-help-rhombus'"
                          />
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-row align="center" justify="center">
                            <v-col :cols="isMobile ? 6 : 4" class="py-0">
                              <div>
                                <v-list-item-title
                                  v-text="xGear(gear.gear_id).title"
                                  v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
                                ></v-list-item-title>

                                <v-list-item-subtitle
                                  class="text-caption"
                                  v-text="xGear(gear.gear_id).brand ? xGearBrand(xGear(gear.gear_id).brand).title : '.'"
                                ></v-list-item-subtitle>
                              </div>
                            </v-col>

                            <v-col class="x-col">
                              <div v-if="xGear(gear.gear_id).weight">
                                <span class="text-caption" v-text="xGear(gear.gear_id).weight" />
                                <span class="text-tiny-dimmed" v-text="weightUnit" />
                              </div>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col">
                              <div v-if="xGear(gear.gear_id).price" >
                                <span class="text-caption" v-text="xGear(gear.gear_id).price" />
                                <span class="text-tiny-dimmed" v-text="priceUnit" />
                              </div>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col">
                              <div v-if="xGear(gear.gear_id).purchase_date">
                                <span class="text-caption">{{xGear(gear.gear_id).purchase_date | minimalDateFilter(dateFormatPref)}}</span>
                              </div>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col v-if="!isMobile" class="x-col">
                              <v-tooltip v-if="xGear(gear.gear_id).state && xGearState(xGear(gear.gear_id).state)" bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon
                                    :color="xGearState(xGear(gear.gear_id).state).color"
                                    class="pa-2"
                                    v-text="'mdi-'+stateIcon(xGearState(xGear(gear.gear_id).state).title)"
                                    :size="21"
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-icon>
                                </template>
                                <span v-text="xGearState(xGear(gear.gear_id).state).title" />
                              </v-tooltip>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col class="x-col">
                              <div>
                                <span class="text-tiny-dimmed" v-html="'&#215;'" />
                                <span class="text-caption" v-html="xGear(gear.gear_id).quantity_owned ? xGear(gear.gear_id).quantity_owned : 0" />
                              </div>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>

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
    </v-container>
  </v-form>

</template>

<script>

  const _ = require('lodash');

  import Vue from 'vue'

  import XDivider from "@/components/elements/XDivider";
  import EmptyData from "@/components/elements/Stepper/EmptyData";
  import XImg from "@/components/elements/XImg";
  import XIncrement from "@/components/elements/Pickers/XIncrement";
  import FilterMenu from "@/components/elements/FilterMenu/FilterMenu";
  import EditIcon from "@/components/elements/EditIcon";
  import XPicker from "@/components/elements/Pickers/XPicker";
  import XTimePicker from "@/components/elements/Pickers/XTimePicker";
  import XDatePicker from "@/components/elements/Pickers/XDatePicker";
  import XSelector from "@/components/elements/Pickers/XSelector";
  import XSimpleSelector from "@/components/elements/Pickers/XSimpleSelector";
  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'adventures-form',
    components: {
      XCombobox,
      XDivider,
      EmptyData,
      XIncrement,
      XImg,
      FilterMenu,
      EditIcon,
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
      valid: false,

      tab: 'adventure-general',

      isEditing: false,
      isLoading: false,
      listHeight: 150,

      updatedItem: {},

      originalInventoryGear: [],
      gearFilterMode: false,
    }),
    computed: {
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
          return this.$options.filters.roundIntFilter(this.packedGearRatio);
        return null;
      },
      packedGearRatio() {
        if(this.isMounted && this.originalInventoryGear && this.originalInventoryGear.length)
          return ((((this.updatedItem.packed_gear && this.updatedItem.packed_gear.length > 0) ? this.updatedItem.packed_gear.length : 0) / this.originalInventoryGear.length) * 100);
        return null;
      },
      filteredGear() {
        if(this.isMounted)
          return (this.originalInventoryGear.filter(item => {
            let gear = this.xGear(item.gear_id);
            if(
              !this.itemSearch
              && !this.itemGearType
              && !this.itemGearState
              && !this.itemGearBrand
            ) return this.originalInventoryGear;

            return (
              (this.itemSearch ? (gear.title && gear.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
              && (this.itemGearType ? (gear.type && gear.type === this.itemGearType) : true)
              && (this.itemGearState ? (gear.state && gear.state === this.itemGearState) : true)
              && (this.itemGearBrand ? (gear.brand && gear.brand === this.itemGearBrand) : true)
            )
          }));

        return this.originalInventoryGear;
      },
    },
    methods: {
      ratioFilter(ratio) {
        if(ratio)
          return this.$options.filters.roundIntFilter(ratio);
        return null;
      },
      isGearPacked(gearId) {
        if(!this.updatedItem.packed_gear)
          return null;
        return (this.updatedItem.packed_gear.indexOf(gearId+'') !== -1);
      },
      async closeEditor() {
        this.isEditing = false;
      },
      closeGearList() {
        this.isEditing = false
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
        let index = this.updatedItem.packed_gear.indexOf(gearId+'');
        if(index !== -1) {
          this.updatedItem.packed_gear.splice(index, 1);

        } else {
          let len = this.updatedItem.packed_gear.length;
          Vue.set(this.updatedItem.packed_gear, len, gearId+'');
        }
      },
      increment(property) {
        this.updatedItem[property]++;
      },
      decrement(property) {
        this.updatedItem[property]--;
      },
      initWindowHeight() {
        this.listHeight = (window.innerHeight - 122);
      },
      async initUpdatedItem() {
        let self = this;
        for (const [key, value] of Object.entries(self.item)) {
            Vue.set(self.updatedItem, key, value);
        }
      },
      async fixUpdatedItem() {
        if(this.item === null || !this.item) {
          Vue.set(this.updatedItem, 'temp_max', null);
          Vue.set(this.updatedItem, 'temp_min', null);
          Vue.set(this.updatedItem, 'elevation', null);
          Vue.set(this.updatedItem, 'distance', null);

        } else {
          if(typeof this.item.temp_max == 'undefined' || !this.item.temp_max)
            Vue.set(this.updatedItem, 'temp_max', null);

          if(typeof this.item.temp_min == 'undefined' || !this.item.temp_min)
            Vue.set(this.updatedItem, 'temp_min', null);

          if(typeof this.item.elevation == 'undefined' || !this.item.elevation)
            Vue.set(this.updatedItem, 'elevation', null);

          if(typeof this.item.distance == 'undefined' || !this.item.distance)
            Vue.set(this.updatedItem, 'distance', null);
        }
      }
    },
    watch: {
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
      async inventoryGear(val) {
        if(this.isMounted) {
          if(this.item && this.item.packed_gear) {
            Vue.set(this.updatedItem, 'packed_gear', this.item.packed_gear);
          } else {
            Vue.set(this.updatedItem, 'packed_gear', []);
          }


          if(val !== null) {
            await this.initInventoryGear();
          }
        }
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
            this.clearMenuFilters();
        }
      },
    },
    async mounted() {
      this.isLoading = true;
      this.initWindowHeight();

      if(typeof this.item != 'undefined' && this.item) {
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
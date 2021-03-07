<template>

  <div
    v-if="isMounted"
    class="mr-1 text-center filter-menu"
  >
    <v-menu
      v-model="gearFilterModeOn"
      :close-on-content-click="false"
      min-width="333"
      max-width="333"
      :nudge-width="200"
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          :color="nbActiveFilters ? shadeColor : 'transparent'"
          overlap
        >
          <template v-if="nbActiveFilters" v-slot:badge>
            <span
              v-bind:class="reversedFontShadeColor"
              v-text="nbActiveFilters"
            ></span>
          </template>

          <v-btn
            @click="gearFilterModeOn = !gearFilterModeOn"
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon v-text="`mdi-filter-variant${gearFilterModeOn?'-minus':''}`" />
          </v-btn>
        </v-badge>
      </template>

      <v-card>
        <v-list class="py-1">
          <v-list-item>
            <v-list-item-title>{{$t('global.filters') | capitalizeFirstFilter}}</v-list-item-title>

            <v-spacer />

            <v-btn
              @click="closeGearFilterMenu()"
              icon
            >
              <v-icon v-text="'mdi-close'" />
            </v-btn>

          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item class="mb-3">
            <x-category-selector v-bind:value.sync="filters.gearCategoryFilter" isInFilter />
          </v-list-item>

          <v-list-item class="mb-3">
            <v-autocomplete
              v-if="gearFilterModeOn"
              :label="xCapFirst($t('global.tags'))"
              v-model="filters.gearTagsFilter"
              :items="preferences.gear_tags"
              :color="currentColor"
              filled
              dense
              clearable
              hide-details="auto"
            ></v-autocomplete>
          </v-list-item>

          <v-list-item class="mb-3">
            <x-brand-selector v-bind:value.sync="filters.gearBrandFilter" isInFilter />
          </v-list-item>

          <v-list-item class="mb-3">
            <x-state-selector v-bind:value.sync="filters.gearStateFilter" isInFilter />
          </v-list-item>

          <v-list-item class="mb-3">
            <x-checkbox
              label="consumable"
              v-bind:value.sync="filters.gearConsumableFilter"
            ></x-checkbox>
          </v-list-item>

          <v-list-item class="mb-3">
            <x-checkbox
              label="packed"
              v-bind:value.sync="filters.gearIsPackedFilter"
            ></x-checkbox>
          </v-list-item>

          <v-list-item class="mb-3">
            <x-checkbox
              label="quantity-positive"
              v-bind:value.sync="filters.gearQuantityOwnedFilter"
            ></x-checkbox>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-btn
            @click="clearGearMenuFilters()"
            :color="errorColor"
            text
          >
            <span v-text="$t('global.reset')" />
          </v-btn>

          <v-spacer />

          <v-btn
            @click="closeGearFilterMenu()"
            icon
            class="mr-2"
          >
            <poly-icon icon="mdi-check" :size="XLI" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>

</template>

<script>

  import PolyIcon from "@/components/elements/Icons/PolyIcon";
  import XCheckbox from "@/components/inputs/XCheckbox";
  import XCategorySelector from "@/components/inputs/XCategorySelector";
  import XBrandSelector from "@/components/inputs/XBrandSelector";
  import XStateSelector from "@/components/inputs/XStateSelector";

  export default {
    name: 'inventory-gear-filter-menu',
    components: {
      PolyIcon,
      XCheckbox,
      XCategorySelector,
      XBrandSelector,
      XStateSelector,
    },
    props: {
      filters: Object,
      gearFilterMode: Boolean,
    },
    data: () => ({
      isMounted: false,
      invGearFilters: {},
      gearFilterModeOn: null,
    }),
    computed: {
      nbActiveFilters() {
        let self = this;
        let nbActiveFilters = 0;

        Object.keys(this.invGearFilters).forEach(function(item) {
          if(self.invGearFilters[item]!==null && self.invGearFilters[item]!==undefined && self.invGearFilters[item]!==false)
            nbActiveFilters++;
        });

        return nbActiveFilters;
      },
    },
    methods: {
      closeGearFilterMenu() {
        this.gearFilterModeOn = false;
      },
      clearGearMenuFilters() {
        this.invGearFilters.gearCategoryFilter = null;
        this.invGearFilters.gearTagsFilter = null;
        this.invGearFilters.gearStateFilter = null;
        this.invGearFilters.gearBrandFilter = null;
        this.invGearFilters.gearConsumableFilter = null;
        this.invGearFilters.gearIsPackedFilter = null;
        this.invGearFilters.gearQuantityOwnedFilter = null;
      },
    },
    watch: {
      filters(val) {
        this.invGearFilters = val;
      },
      invGearFilters(val) {
        this.$emit('update:filters',val);
      }
    },
    mounted() {
      this.invGearFilters = this.filters;
      this.gearFilterModeOn = this.gearFilterMode;
      this.isMounted = true;
    }
  }

</script>

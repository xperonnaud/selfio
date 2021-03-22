<template>

  <div class="mr-1 text-center filter-menu">
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
            <v-icon v-text="gearFilterModeOn?'mdi-filter-variant-minus':'mdi-filter-variant'" />
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
            <category-selector v-bind:value.sync="filters.gearCategoryFilter" isInFilter />
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
            <brand-selector v-bind:value.sync="filters.gearBrandFilter" isInFilter />
          </v-list-item>

          <v-list-item class="mb-3">
            <state-selector v-bind:value.sync="filters.gearStateFilter" isInFilter />
          </v-list-item>

          <v-list-item class="mb-3">
            <x-checkbox
              label="packed"
              v-bind:value.sync="filters.gearIsPackedFilter"
            ></x-checkbox>
          </v-list-item>

          <v-list-item class="mb-3">
            <x-checkbox
              label="worn"
              v-bind:value.sync="filters.gearIsWornFilter"
            ></x-checkbox>
          </v-list-item>

          <v-list-item class="mb-3">
            <x-checkbox
              label="consumable"
              v-bind:value.sync="filters.gearConsumableFilter"
            ></x-checkbox>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-btn
            @click.stop="clearAdventureMenuFilters()"
            :color="errorColor"
            text
          >
            <span v-text="$t('global.reset')" />
          </v-btn>

          <v-spacer />

          <v-btn
            @click.stop="closeGearFilterMenu()"
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
  import CategorySelector from "@/components/inputs/selectors/CategorySelector";
  import BrandSelector from "@/components/inputs/selectors/BrandSelector";
  import StateSelector from "@/components/inputs/selectors/StateSelector";

  export default {
    name: 'adventure-gear-filter-menu',
    components: {
      PolyIcon,
      XCheckbox,
      CategorySelector,
      BrandSelector,
      StateSelector,
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
      clearAdventureMenuFilters() {
        this.invGearFilters.gearCategoryFilter = null;
        this.invGearFilters.gearTagsFilter = null;
        this.invGearFilters.gearStateFilter = null;
        this.invGearFilters.gearBrandFilter = null;
        this.invGearFilters.gearIsPackedFilter = null;
        this.invGearFilters.gearIsWornFilter = null;
        this.invGearFilters.gearConsumableFilter = null;
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

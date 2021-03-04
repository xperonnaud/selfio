<template>

  <v-list>
    <v-list-item class="mb-3">
      <x-category-selector v-bind:value.sync="gearCategoryFilter" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        :label="xCapFirst($t('global.tags'))"
        v-model="tagFilter"
        :items="preferences.gear_tags"
        :color="currentColor"
        filled
        dense
        clearable
        hide-details="auto"
      ></v-autocomplete>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-brand-selector v-bind:value.sync="brandFilter" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <x-state-selector v-bind:value.sync="gearStateFilter" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <x-checkbox
        label="consumable"
        v-bind:value.sync="consumableFilter"
      ></x-checkbox>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-increment
        label="quantity-owned"
        v-bind:value.sync="quantityOwnedFilter"
        :rules="xRules.decimals"
        :color="currentColor"
        :max="100"
        :min="0"
      ></x-increment>
    </v-list-item>
  </v-list>

</template>

<script>

  import XCheckbox from "@/components/inputs/XCheckbox";
  import XCategorySelector from "@/components/inputs/XCategorySelector";
  import XBrandSelector from "@/components/inputs/XBrandSelector";
  import XStateSelector from "@/components/inputs/XStateSelector";
  import XIncrement from "@/components/inputs/XIncrement";

  export default {
    name: 'gear-filter',
    components: {
      XCheckbox,
      XCategorySelector,
      XBrandSelector,
      XStateSelector,
      XIncrement,
    },
    props: {
      filterMode: Boolean
    },
    data: () => ({
      isMounted: false,
      filterModeOn: false,
    }),
    computed: {
      tagFilter: {
        get() {
          return this.$store.state.ui.filters.gear.tag
        },
        set(value) {
          this.$store.commit("updateTagGearFilter", value)
        }
      },
      quantityOwnedFilter: {
        get() {
          return this.$store.state.ui.filters.gear.quantityOwned
        },
        set(value) {
          this.$store.commit("updateQuantityOwnedGearFilter", value)
        }
      },
      gearStateFilter: {
        get() {
          return this.$store.state.ui.filters.gear.state
        },
        set(value) {
          this.$store.commit("updateStateGearFilter", value)
        }
      },
      gearCategoryFilter: {
        get() {
          return this.$store.state.ui.filters.gear.category
        },
        set(value) {
          this.$store.commit("updateCategoryGearFilter", value)
        }
      },
      consumableFilter: {
        get() {
          return this.$store.state.ui.filters.gear.consumable
        },
        set(value) {
          this.$store.commit("updateConsumableGearFilter", value)
        }
      },
      brandFilter: {
        get() {
          return this.$store.state.ui.filters.gear.brand
        },
        set(value) {
          this.$store.commit("updateBrandGearFilter", value)
        }
      },
    },
    methods: {
      closeFilterMenu() {
        this.filterModeOn = false;
      }
    },
    watch: {
      filterMode(val) {
        this.filterModeOn = val;
      },
      filterModeOn(val) {
        this.$emit('update:filterMode',val);
      }
    },
    mounted() {
      this.filterModeOn = this.filterMode;
      this.isMounted = true;
    }
  }

</script>

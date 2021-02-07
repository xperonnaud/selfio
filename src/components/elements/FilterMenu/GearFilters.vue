<template>

  <v-list>
    <v-list-item class="mb-3">
      <x-picker
        label="category"
        :list="typesList"
        v-bind:value.sync="itemGearCategory"
      ></x-picker>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        :label="$t('global.tags')"
        v-model="itemTag"
        :items="preferences.gear_tags"
        :color="currentColor"
        filled
        dense
        clearable
        hide-details="auto"
      ></v-autocomplete>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-brand-selector v-bind:value.sync="itemGearBrand" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <x-state-selector v-bind:value.sync="itemGearState" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <x-checkbox
        label="consumable"
        v-bind:value.sync="itemConsumable"
      ></x-checkbox>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-increment
        label="quantity-owned"
        v-bind:value.sync="itemQuantityOwned"
        :rules="xRules.decimal"
        :color="currentColor"
        :max="100"
        :min="0"
      ></x-increment>
    </v-list-item>
  </v-list>

</template>

<script>

  import XCheckbox from "@/components/inputs/XCheckbox";
  import XBrandSelector from "@/components/inputs/fields/XBrandSelector";
  import XStateSelector from "@/components/inputs/fields/XStateSelector";
  import XIncrement from "@/components/inputs/XIncrement";
  import XPicker from "@/components/inputs/XPicker";

  export default {
    name: 'gear-filter',
    components: {
      XCheckbox,
      XBrandSelector,
      XStateSelector,
      XIncrement,
      XPicker,
    },
    props: {
      filterMode: Boolean
    },
    data: () => ({
      isMounted: false,
      filterModeOn: false,
    }),
    computed: {
      itemTag: {
        get() {
          return this.$store.state.ui.itemTag
        },
        set(value) {
          this.$store.commit("updateUiItemTag", value)
        }
      },
      itemQuantityOwned: {
        get() {
          return this.$store.state.ui.itemQuantityOwned
        },
        set(value) {
          this.$store.commit("updateUiItemQuantityOwned", value)
        }
      },
      itemGearCategory: {
        get() {
          return this.$store.state.ui.itemGearCategory
        },
        set(value) {
          this.$store.commit("updateUiItemGearCategory", value)
        }
      },
      itemGearState: {
        get() {
          return this.$store.state.ui.itemGearState
        },
        set(value) {
          this.$store.commit("updateUiItemGearState", value)
        }
      },
      itemConsumable: {
        get() {
          return this.$store.state.ui.itemConsumable
        },
        set(value) {
          this.$store.commit("updateUiItemConsumable", value)
        }
      },
      itemGearBrand: {
        get() {
          return this.$store.state.ui.itemGearBrand
        },
        set(value) {
          this.$store.commit("updateUiItemGearBrand", value)
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

<template>

  <v-list>
    <v-list-item class="mb-3">
      <x-picker
        label="Activity"
        :list="activitiesList"
        v-bind:value.sync="itemActivity"
      ></x-picker>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        label="Tags"
        :items="preferences.adventure_tags"
        v-model="itemTag"
        filled
        dense
        clearable
        hide-details="auto"
        :color="currentColor"
      ></v-autocomplete>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-text-field
        v-model="itemLocation"
        label="Location"
        :color="currentColor"
        hide-details="auto"
        clearable
        dense
        filled
      ></v-text-field>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-picker
        label="Landscape"
        :list="landscapesList"
        v-bind:value.sync="itemLandscape"
        logo
      ></x-picker>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        label="Inventory"
        :items="inventoriesList"
        v-model="itemInventory"
        filled
        dense
        clearable
        hide-details="auto"
        item-text="title"
        item-value="id"
        :color="currentColor"
      ></v-autocomplete>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-simple-selector
          label="Weather"
          :list="weathers"
          v-bind:value.sync="itemWeather"
          :iconSize="'26'"
          hasIcon
      ></x-simple-selector>
    </v-list-item>
  </v-list>

</template>

<script>

  import XSimpleSelector from "@/components/inputs/XSimpleSelector";
  import XPicker from "@/components/inputs/XPicker";

  export default {
    name: 'adventures-filter',
    components: {
      XSimpleSelector,
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
      itemLocation: {
        get() {
          return this.$store.state.ui.itemLocation
        },
        set(value) {
          this.$store.commit("updateUiItemLocation", value)
        }
      },
      itemInventory: {
        get() {
          return this.$store.state.ui.itemInventory
        },
        set(value) {
          this.$store.commit("updateUiItemInventory", value)
        }
      },
      itemActivity: {
        get() {
          return this.$store.state.ui.itemActivity
        },
        set(value) {
          this.$store.commit("updateUiItemActivity", value)
        }
      },
      itemLandscape: {
        get() {
          return this.$store.state.ui.itemLandscape
        },
        set(value) {
          this.$store.commit("updateUiItemLandscape", value)
        }
      },
      itemWeather: {
        get() {
          return this.$store.state.ui.itemWeather
        },
        set(value) {
          this.$store.commit("updateUiItemWeather", value)
        }
      },
    },
    methods: {
      closeFilterMenu() {
        this.filterModeOn = false;
      },
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

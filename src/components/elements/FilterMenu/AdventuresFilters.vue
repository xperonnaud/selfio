<template>

  <v-list>
    <v-list-item class="mb-3">
      <x-picker
        label="activity"
        :list="activitiesList"
        v-bind:value.sync="itemActivity"
      ></x-picker>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        :label="xCapFirst($t('global.tags'))"
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
      <x-text
        :label="$t('global.location')"
        v-bind:value.sync="itemLocation"
      ></x-text>
    </v-list-item>

    <v-list-item class="mb-3">
      <x-picker
        label="landscape"
        :list="landscapesList"
        v-bind:value.sync="itemLandscape"
        logo
      ></x-picker>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        :label="xCapFirst($t('global.inventories'))"
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
          label="weather"
          :list="weathers"
          v-bind:value.sync="itemWeather"
          :iconSize="LGI"
          hasIcon
          isInFilter
      ></x-simple-selector>
    </v-list-item>
  </v-list>

</template>

<script>

  import XText from "@/components/inputs/fields/XText";
  import XSimpleSelector from "@/components/inputs/XSimpleSelector";
  import XPicker from "@/components/inputs/XPicker";

  export default {
    name: 'adventures-filter',
    components: {
      XSimpleSelector,
      XText,
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

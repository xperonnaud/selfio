<template>

  <v-list>
    <v-list-item class="mb-3">
      <activity-selector v-bind:value.sync="activityFilter" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        :label="xCapFirst($t('global.tags'))"
        :items="preferences.adventure_tags"
        v-model="tagFilter"
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
        v-bind:value.sync="locationFilter"
      ></x-text>
    </v-list-item>

    <v-list-item class="mb-3">
      <landscape-selector v-bind:value.sync="landscapeFilter" isInFilter />
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        :label="xCapFirst($t('global.inventories'))"
        :items="inventoriesList"
        v-model="inventoryFilter"
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
      <weather-selector
        v-bind:value.sync="weatherFilter"
        :iconSize="LGI"
        hasIcon
        isInFilter
      ></weather-selector>
    </v-list-item>
  </v-list>

</template>

<script>

  import XText from "@/components/inputs/XText";
  import ActivitySelector from "@/components/inputs/selectors/ActivitySelector";
  import LandscapeSelector from "@/components/inputs/selectors/LandscapeSelector";
  import WeatherSelector from "@/components/inputs/selectors/WeatherSelector";

  export default {
    name: 'adventures-filter',
    components: {
      ActivitySelector,
      WeatherSelector,
      XText,
      LandscapeSelector,
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
          return this.$store.state.ui.filters.adventures.tag
        },
        set(value) {
          this.$store.commit("updateTagAdventureFilter", value)
        }
      },
      locationFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.location
        },
        set(value) {
          this.$store.commit("updateLocationAdventureFilter", value)
        }
      },
      inventoryFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.inventory
        },
        set(value) {
          this.$store.commit("updateInventoryAdventureFilter", value)
        }
      },
      activityFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.activity
        },
        set(value) {
          this.$store.commit("updateActivityAdventureFilter", value)
        }
      },
      landscapeFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.landscape
        },
        set(value) {
          this.$store.commit("updateLandscapeAdventureFilter", value)
        }
      },
      weatherFilter: {
        get() {
          return this.$store.state.ui.filters.adventures.weather
        },
        set(value) {
          this.$store.commit("updateWeatherAdventureFilter", value)
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

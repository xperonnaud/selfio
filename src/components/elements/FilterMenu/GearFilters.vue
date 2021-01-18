<template>

  <v-list>
    <v-list-item class="mb-3">
      <v-text-field
        v-model="itemSearch"
        filled
        dense
        label="Search"
        prepend-inner-icon="mdi-magnify"
        hide-details="auto"
        clearable
        small
        :color="currentColor"
      ></v-text-field>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        :items="preferences.gear_tags"
        label="Tags"
        v-model="itemTag"
        filled
        dense
        clearable
        hide-details="auto"
        :color="currentColor"
      ></v-autocomplete>
  </v-list-item>

    <v-list-item class="mb-3">
      <x-picker
        label="Category"
        :list="typesList"
        v-bind:value.sync="itemGearType"
      ></x-picker>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        label="Brand"
        :items="brandsList"
        v-model="itemGearBrand"
        :color="currentColor"
        filled
        dense
        clearable
        @click:clear="itemGearBrand = null"
        hide-details="auto"
        item-text="title"
        item-value="id"
      >
        <template v-slot:selection="data">
          <div
            color="transparent"
            v-bind="data.attrs"
            :input-value="data.selected"
            @click="data.select"
            style="height:30px !important; padding-top: 9px; padding-bottom: 2px;"
            class="py-2"
          >
            {{ data.item.title | capitalizeFilter }}
          </div>
        </template>

        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item" />
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title>
                {{ data.item.title | capitalizeFilter }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-list-item>

    <v-list-item class="mb-3">
      <v-autocomplete
        label="State"
        :items="gearStates"
        v-model="itemGearState"
        :color="currentColor"
        filled
        dense
        clearable
        @click:clear="itemGearState = null"
        hide-details="auto"
        item-text="title"
        item-value="id"
      >
        <template v-slot:selection="data">
          <div
              color="transparent"
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              style="height:30px !important; padding-top: 9px; padding-bottom: 2px;"
              class=""
          >
            <v-avatar tile left min-width="21" width="21" height="21">
              <v-icon
                  :color="data.item.color"
                  v-text="'mdi-'+stateIcon(data.item.title)"
                  size="18"
                  style="padding-bottom: 6px;"
              ></v-icon>
            </v-avatar>

            {{ data.item.title }}
          </div>
        </template>

        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item" />
          </template>
          <template v-else>
            <v-list-item-avatar tile width="21" height="21">
              <v-icon
                  :color="data.item.color"
                  class="py-2 px-1"
                  v-text="'mdi-'+stateIcon(data.item.title)"
                  size="18"
              ></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="data.item.title" />
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-list-item>
  </v-list>

</template>

<script>

  import XPicker from "@/components/elements/Pickers/XPicker";

  export default {
    name: 'gear-filter',
    components: {
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
      itemSearch: {
        get() {
          return this.$store.state.ui.itemSearch
        },
        set(value) {
          this.$store.commit("updateUiItemSearch", value)
        }
      },
      itemTag: {
        get() {
          return this.$store.state.ui.itemTag
        },
        set(value) {
          this.$store.commit("updateUiItemTag", value)
        }
      },
      itemGearType: {
        get() {
          return this.$store.state.ui.itemGearType
        },
        set(value) {
          this.$store.commit("updateUiItemGearType", value)
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

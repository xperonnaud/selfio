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
        :items="preferences.inventory_tags"
        label="Tags"
        v-model="itemTag"
        filled
        dense
        clearable
        hide-details="auto"
        :color="currentColor"
      ></v-autocomplete>
    </v-list-item>
  </v-list>

</template>

<script>

  export default {
    name: 'inventories-filter',
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

<template>

  <v-list>
    <v-list-item class="mb-3">
      <v-autocomplete
        v-if="filterMode"
        :items="preferences.inventory_tags"
        :label="xCapFirst($t('global.tags'))"
        v-model="tagFilter"
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
      tagFilter: {
        get() {
          return this.$store.state.ui.filters.inventories.tag
        },
        set(value) {
          this.$store.commit("updateTagInventoryFilter", value)
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

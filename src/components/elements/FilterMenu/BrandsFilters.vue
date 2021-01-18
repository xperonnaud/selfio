<template>

  <v-list>
    <v-list-item class="mb-3">
      <v-switch
        v-model="itemOwned"
        label="Private"
        flat
        inset
      ></v-switch>
    </v-list-item>
  </v-list>

</template>

<script>

  export default {
    name: 'brands-filter',
    props: {
      filterMode: Boolean
    },
    data: () => ({
      isMounted: false,
      filterModeOn: false,
    }),
    computed: {
      itemOwned: {
        get() {
          return this.$store.state.ui.itemOwned
        },
        set(value) {
          this.$store.commit("updateUiItemOwned", value)
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

<template>

  <div class="text-center">
    <v-menu
      v-model="filterModeOn"
      :close-on-content-click="false"
      :nudge-width="200"
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="isItemRoute || isConfigurationRoute"
          @click="filterModeOn = !filterModeOn"
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon v-text="filterMode?'mdi-filter-variant-minus':'mdi-filter-variant'" />
        </v-btn>
      </template>

      <v-card>
        <v-list class="py-1">
          <v-list-item>
            <v-list-item-title v-text="'Filters'" />

            <v-spacer />

            <v-btn
              @click="closeFilterMenu()"
              icon
            >
              <v-icon v-text="'mdi-minus'" />
            </v-btn>

          </v-list-item>
        </v-list>

        <v-divider />

        <component
          v-if="filterComponent"
          :is="filterComponent"
          :ref="filterRef"
          v-bind:filterMode.sync="filterMode"
          class="pb-0"
        ></component>

        <v-divider />

        <v-card-actions>
          <v-btn
            @click="clearMenuFilters()"
            :color="darkColor('red')"
            text
          >
            <v-icon v-text="'mdi-filter-off'" />
            <span v-text="'Reset'" />
          </v-btn>

          <v-spacer />

          <v-btn
            @click="closeFilterMenu()"
            text
            :color="darkColor('primary')"
            icon
          >
            <v-icon v-text="'mdi-check'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>

</template>

<script>

  export default {
    name: 'filter-menu',
    props: {
      filterMode: Boolean,
      forcedRouteName: {
        type: String,
        default: null
      }
    },
    data: () => ({
      isMounted: false,
      loading: false,
      filterRef: null,
      filterComponent: null,
      filterComponentCalled: null,
      filterModeOn: false,
    }),
    computed: {
      loader() {
        let self = this;
        let listName = self.forcedRouteName ? self.forcedRouteName : this.currentRouteName;
        let listId = this.$options.filters.capitalizeFilter(listName);
        self.filterComponentCalled = `./${listId}Filters.vue`;
        return () => import(`./${listId}Filters.vue`)
      },
    },
    methods: {
      componentLoad() {
        let self = this;
        this.resetUniqueFilterRef();
        let listName = self.forcedRouteName ? self.forcedRouteName : this.$router.currentRoute.path;

        if(this.isItemRoute || this.isConfigurationRoute || self.forcedRouteName)
          this.loader()
            .then(() => {
              self.filterComponent = () => self.loader();
            })
            .catch((e) => {
              console.log('componentLoad ERROR',e);
            })
      },
      resetUniqueFilterRef() {
        if(
          this.isMounted
          && this.filterRef
          && this.$refs[this.filterRef]
        )
          this.$refs[this.filterRef].$destroy();

        this.filterRef = this.randomId();
      },
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
      },
      currentRouteName(value) {
        if (!value)
          return null;

        this.componentLoad();
      },
    },
    mounted() {
      this.filterModeOn = this.filterMode;
      this.filterRef = this.randomId();
      this.isMounted = true;
      this.componentLoad();
    }
  }

</script>

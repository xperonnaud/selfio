<template>

  <div class="text-center">
    <v-menu
      v-model="filterModeOn"
      :close-on-content-click="false"
      min-width="310"
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
          <v-icon v-text="`mdi-filter-variant${filterMode?'-minus':''}`" />
        </v-btn>
      </template>

      <v-card>
        <v-list class="py-1">
          <v-list-item>
            <v-list-item-title>{{$t('global.filters') | capitalizeFirstFilter}}</v-list-item-title>

            <v-spacer />

            <v-btn
              @click="closeFilterMenu()"
              icon
            >
              <v-icon v-text="'mdi-close'" />
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
            :color="errorColor"
            text
          >
            <span v-text="$t('global.reset')" />
          </v-btn>

          <v-spacer />

          <v-btn
            @click="closeFilterMenu()"
            class="primary-gradient-color-text"
            text
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
        let listId = this.xCap(listName);
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

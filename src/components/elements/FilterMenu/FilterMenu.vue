<template>

  <div class="filter-menu text-center">
    <v-menu
      v-model="filterModeOn"
      :close-on-content-click="false"
      min-width="333"
      max-width="333"
      :nudge-width="200"
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          :color="nbActiveFilters ? shadeColor : 'transparent'"
          overlap
        >
          <template v-if="nbActiveFilters" v-slot:badge>
            <span
              v-bind:class="reversedFontShadeColor"
              v-text="nbActiveFilters"
            ></span>
          </template>

          <v-btn
            v-if="isItemRoute || isConfigurationRoute"
            @click="filterModeOn = !filterModeOn"
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon v-text="`mdi-filter-variant${filterMode?'-minus':''}`" />
          </v-btn>
        </v-badge>
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

        <v-responsive
          class="overflow-y-auto"
          :max-height="isMobile ? (currentWindowHeight - 100) : 600"
        >
          <component
            v-if="filterComponent"
            :is="filterComponent"
            :ref="filterRef"
            v-bind:filterMode.sync="filterMode"
            class="pb-0"
          ></component>
        </v-responsive>

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
            @click.stop="closeFilterMenu()"
            icon
            class="mr-2"
          >
            <poly-icon icon="mdi-check" :size="XLI" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>

</template>

<script>

  import PolyIcon from "@/components/elements/Icons/PolyIcon";

  export default {
    name: 'filter-menu',
    components: {
      PolyIcon
    },
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
      nbActiveFilters() {
        let self = this;
        let nbActiveFilters = 0;

        if(typeof this.currentRouteId == 'string' && this.xUi.filters[this.currentRouteId]) {
          Object.keys(this.xUi.filters[this.currentRouteId]).forEach(function(item) {
            if(self.xUi.filters[self.currentRouteId][item]!==null && self.xUi.filters[self.currentRouteId][item]!==undefined && self.xUi.filters[self.currentRouteId][item]!==false)
              nbActiveFilters++;
          });
        }

        return nbActiveFilters;
      }
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

<style lang="scss">

  .filter-menu {
    .v-badge__wrapper {
      left: -4px;
      top: 4px;
    }
  }

</style>

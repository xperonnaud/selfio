<template>

  <v-app-bar
    app
    v-bind:class="['rounded-0', ('elevation-1')]"
    :color="xTabsColor"
  >
    <v-app-bar-nav-icon
      class="mr-1"
      @click.stop="navigationCollapse = !navigationCollapse"
    ></v-app-bar-nav-icon>

    <v-toolbar-title
      v-bind:class="[
        (isItemRoute ? currentColorText : 'primary-gradient-color-text'),
        'pl-0'
      ]"
    >
      <span v-if="isItemRoute" v-text="'My '" />
      <span>{{ $t(`global.${currentRouteId}`) | capitalizeFilter }}</span>
    </v-toolbar-title>

    <template v-if="isItemRoute || isConfigurationRoute">
      <v-spacer />

      <v-expand-x-transition>
        <v-text-field
          v-show="!isMobile || displayItemSearch"
          v-model="itemSearch"
          label="Search"
          :append-icon="!isMobile ? 'mdi-magnify' : null"
          hide-details="auto"
          clearable
          small
          :color="shadeColor"
          style="max-width: 222px;"
        ></v-text-field>
      </v-expand-x-transition>

      <v-btn
        v-show="isMobile"
        @click="displayItemSearch = !displayItemSearch"
        icon
      >
        <v-icon v-text="displayItemSearch ? 'mdi-close' : 'mdi-magnify'" />
      </v-btn>

      <filter-menu
        v-bind:filterMode.sync="filterMode"
        v-bind:class="[{'mr-1':!isMobile}]"
        :style="isMobile ? 'margin-right: -6px !important;' : ''"
        class="ml-1"
      ></filter-menu>

      <template v-if="!isMobile">
        <form-post-btn
          v-if="isItemRoute"
          isFab
          isSmall
          class="ml-2 mr-1 elevation-0"
        ></form-post-btn>

        <v-btn
          v-if="isConfigurationRoute"
          v-bind:class="['px-2 ml-3 mr-1 elevation-0 primary-gradient-color']"
          @click="brandPostDialog = !brandPostDialog"
          :width="48"
          :height="48"
          fab
        >
          <v-icon color="white" v-text="'mdi-plus'" />
        </v-btn>

        <new-brand-dialog
          v-if="isConfigurationRoute"
          v-bind:dialog.sync="brandPostDialog"
        ></new-brand-dialog>
      </template>

    </template>

    <template v-if="isItemRoute || isConfigurationRoute" v-slot:extension>
      <v-list
        v-show="!loading"
        v-bind:class="['rounded-0 py-0 max-width']"
        one-line
        flat
        dense
        :color="xTabsColor"
      >
        <v-list-item>
          <v-list-item-avatar
            v-if="avatarSortProp"
            v-bind:class="[
              'x-avatar',
              'my-0 py-0',
               (isMobile ? 'mr-3' : 'ml-1 mr-4'),
            ]"
            :style="isMobile ? 'margin-left: -4px;' : ''"
          >
            <v-row align="center" justify="center">
              <v-col
                class="x-col py-1 col-border-r x-primary-btn"
                @click.stop="sortItems(avatarSortProp)"
                v-ripple
              >
                <div class="d-flex justify-center">
                  <x-sort-icon :prop="avatarSortProp" />
                </div>
              </v-col>
            </v-row>
          </v-list-item-avatar>

          <component
            v-if="listHeaderComponent"
            :is="listHeaderComponent"
            :ref="listHeaderRef"
          ></component>
        </v-list-item>
      </v-list>
    </template>

    <template v-if="isSettingsRoute">
      <v-spacer />

      <v-btn
        v-bind:class="[{'mr-1':!isMobile}]"
        icon
        @click.stop="updatePreferences()"
        class="primary-gradient-color-text"
      >
        <v-icon
          :size="XLI"
          v-text="'mdi-check'"
        />
      </v-btn>
    </template>
  </v-app-bar>

</template>

<script>

  import NewBrandDialog from "@/components/elements/Dialogs/NewBrandDialog";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";

  export default {
    name: 'app-header',
    components: {
      XSortIcon,
      NewBrandDialog,
      FormPostBtn: () => import('@/components/elements/Btns/FormPostBtn'),
      FilterMenu: () => import('@/components/elements/FilterMenu/FilterMenu'),
      SaveBtn: () => import('@/components/elements/Btns/SaveBtn'),
    },
    data: () => ({
      filterMode: false,

      loading: false,
      listHeaderRef: null,
      listHeaderComponent: null,
      listHeaderComponentCalled: null,

      displayItemSearch: false,

      validBrand: false,
      defaultBrand: { title: '' },
      brandPostDialog: false,
    }),
    computed: {
      headerLoader() {
        let self = this;
        let listId = this.xFilters.capitalizeFilter(this.currentRouteName);
        self.listHeaderComponentCalled = `@/components/lists/headers/${listId}ListHeader.vue`;
        return () => import(`@/components/lists/headers/${listId}ListHeader.vue`)
      },
      avatarSortProp() {
        if(this.currentRouteTitle === 'Gear')
          return 'type';

        if(this.currentRouteTitle === 'Adventures')
          return 'activity';

        return null
      }
    },
    methods: {
      async postBrand() {
        if(this.validBrand === true) {
          await this.api_post_brand(this.defaultBrand);
          this.brandPostDialog = false;
          this.defaultBrand.title = '';
        }
      },
      headerComponentLoad() {
        let self = this;

        if(this.isItemRoute || this.isConfigurationRoute)
          this.headerLoader()
            .then(() => {
              self.listHeaderComponent = () => self.headerLoader();
            })
            .catch((e) => {
              console.log('headerComponentLoad ERROR',e);
            })
      },
    },
    watch: {
      currentRouteName(value) {
        if (!value)
          return null;

        if(this.isItemRoute || this.isConfigurationRoute)
          this.headerComponentLoad();
      },
    },
    mounted() {
      this.listHeaderRef = this.randomId();
      this.isMounted = true;

      if(this.isItemRoute || this.isConfigurationRoute)
        this.headerComponentLoad();
    }
  }

</script>

<style lang="scss">

  .v-toolbar__extension {
    padding: 0 !important;

    .v-subheader {
      height: 24px !important;
    }
  }

</style>

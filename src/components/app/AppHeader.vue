<template>

  <v-app-bar
    v-bind:class="['rounded-0', ('elevation-1')]"
    :color="xTabsColor"
    app
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
      <span>{{ $t(`global.${currentRouteId}`) | capitalizeFilter }}</span>
    </v-toolbar-title>

    <template v-if="isItemRoute || isConfigurationRoute">

      <v-spacer />

      <v-expand-x-transition>
        <v-text-field
          v-show="!isMobile || displayItemSearch"
          v-model="itemSearch"
          :label="xCap($t('global.search'))"
          :append-icon="!isMobile ? 'mdi-magnify' : null"
          hide-details="auto"
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
        :style="isMobile ? 'margin-right: -6px !important;' : ''"
        v-bind:class="[{'ml-3':!isMobile}]"
      ></filter-menu>

      <template v-if="!isMobile">
        <form-post-btn
          v-if="isItemRoute"
          isFab
          isSmall
          class="ml-1 elevation-0"
        ></form-post-btn>

        <v-btn
          v-if="isConfigurationRoute"
          v-bind:class="['px-2 ml-1 elevation-0 primary-gradient-color']"
          @click="brandPostDialog = !brandPostDialog"
          :loading="isAppLoading"
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
              'x-avatar my-0 py-0',
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
        @click.stop="updatePreferences()"
        icon
      >
        <v-icon
          :size="XLI"
          v-text="'mdi-check'"
          :class="fontShadeColor"
        ></v-icon>
      </v-btn>
    </template>
  </v-app-bar>

</template>

<script>

  import XText from "@/components/inputs/XText";
  import NewBrandDialog from "@/components/elements/Dialogs/NewBrandDialog";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";

  export default {
    name: 'app-header',
    components: {
      XText,
      XSortIcon,
      NewBrandDialog,
      FormPostBtn: () => import('@/components/elements/Btns/FormPostBtn'),
      FilterMenu: () => import('@/components/elements/FilterMenu/FilterMenu'),
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
        let listId = this.xCap(this.currentRouteName);
        self.listHeaderComponentCalled = `@/components/lists/headers/${listId}ListHeader.vue`;
        return () => import(`@/components/lists/headers/${listId}ListHeader.vue`)
      },
      avatarSortProp() {
        if(this.currentRouteId === 'gear')
          return 'type';

        if(this.currentRouteId === 'adventures')
          return 'activity';

        return null
      }
    },
    methods: {
      async postBrand() {
        if(this.validBrand === true) {
          this.isAppLoading = true;
          await this.api_post_brand(this.defaultBrand);
          this.brandPostDialog = false;
          this.defaultBrand.title = '';
          this.isAppLoading = false;
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

<template>

  <v-app-bar
    app
    class="rounded-0 elevation-1"
    :color="xTabsColor"
  >
    <v-app-bar-nav-icon
      class="mr-1"
      @click.stop="navigationCollapse = !navigationCollapse"
    ></v-app-bar-nav-icon>

    <v-toolbar-title
      v-bind:class="[currentColorText,'pl-0']">
      <span v-if="isItemRoute" v-text="'My '" />
      <span>{{ currentRouteName | convertSpecialCharsFilter | capitalizeFilter }}</span>
    </v-toolbar-title>

    <template v-if="isItemRoute || isConfigurationRoute">
      <v-spacer />

      <filter-menu
        v-bind:filterMode.sync="filterMode"
        v-bind:class="[{'mr-1':!isMobile}]"
        :style="isMobile ? 'margin-right: -6px !important;' : ''"
      ></filter-menu>

      <form-post-btn
        v-if="!isMobile && isItemRoute"
        isFab
        isSmall
        class="ml-2 mr-1 elevation-0"
      ></form-post-btn>

      <v-btn
        v-if="!isMobile && isConfigurationRoute"
        :color="darkColor('primary')"
        fab
        small
        @click="brandPostDialog = !brandPostDialog"
        v-bind:class="['px-2 ml-3 mr-1 elevation-0']"
      >
        <v-icon v-bind:class="[reversedFontShadeColor]" v-text="'mdi-plus'" />
      </v-btn>

      <v-dialog
          v-if="!isMobile && isConfigurationRoute"
          v-model="brandPostDialog"
          max-width="750px"
          :hide-overlay="isMobile"
          :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
          persistent
      >
        <v-card
            v-bind:class="[
          {'rounded-0': isMobile},
        ]"
        >
          <v-card-title class="headline">
            <span v-text="'New Brand'" />
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-form v-model="validBrand">
                  <v-text-field
                      label="Title"
                      v-model="defaultBrand.title"
                      :rules="xRules.text"
                      :color="darkColor('primary')"
                      @keyup.enter="postBrand()"
                      filled
                      dense
                      hide-details="auto"
                      required
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              @click="brandPostDialog = false"
              v-text="'Cancel'"
              text
            ></v-btn>

            <v-btn
              @click="postBrand()"
              :color="darkColor('primary')"
              :disabled="!validBrand"
              depressed
            >
              <v-icon v-text="'mdi-check'" />
              <span v-text="'Add brand'" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-if="isItemRoute" v-slot:extension>
      <v-list
        v-show="!loading"
        v-bind:class="['rounded-0 py-0 max-width', {'shadow-bottom':!isMobile}]"
        one-line
        flat
        dense
        :color="xTabsColor"
      >
        <v-list-item>
          <v-list-item-avatar
            v-if="currentRouteTitle !== 'Inventories'"
            v-bind:class="[
              'x-avatar',
              'py-0',
               (isMobile ? 'my-0 mr-0' : 'mr-2'),
            ]"
          >
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
        :color="darkColor('primary')"
        icon
        @click.stop="updatePreferences()"
      >
        <v-icon
          :size="28"
          v-text="'mdi-check'"
        />
      </v-btn>
    </template>
  </v-app-bar>

</template>

<script>

  export default {
    name: 'app-header',
    components: {
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

      validBrand: false,
      defaultBrand: { title: '' },
      brandPostDialog: false,
    }),
    computed: {
      headerLoader() {
        let self = this;
        let listId = this.$options.filters.capitalizeFilter(this.currentRouteName);
        self.listHeaderComponentCalled = `@/components/lists/headers/${listId}ListHeader.vue`;
        return () => import(`@/components/lists/headers/${listId}ListHeader.vue`)
      },
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
        let route = this.$options.filters.removeSlashFilter(this.$router.currentRoute.path);

        if(this.itemRoutes.includes(route))
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

        if(this.isItemRoute)
          this.headerComponentLoad();
      },
    },
    mounted() {
      this.listHeaderRef = this.randomId();
      this.isMounted = true;

      if(this.isItemRoute)
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

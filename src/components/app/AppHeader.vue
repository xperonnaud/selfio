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
      v-bind:class="[
        currentColorText,
        'pl-0'
      ]"
    >
      <span v-if="isItemRoute" v-text="'My '" />
      <span>{{ currentRouteName | convertSpecialCharsFilter | capitalizeFilter }}</span>
    </v-toolbar-title>

    <template v-if="isItemRoute">
      <v-spacer />

      <filter-menu
        v-if="isItemRoute"
        v-bind:filterMode.sync="filterMode"
        v-bind:class="[{'mr-1':!isMobile}]"
      ></filter-menu>

      <v-divider v-if="!isMobile" vertical />

      <form-post-btn
        v-if="!isMobile"
        isFab
        isSmall
        isOutlined
        class="ml-2 mr-1 elevation-0"
      ></form-post-btn>
    </template>

    <template v-else-if="isSettingsRoute && saveAction">
      <v-spacer />

      <save-btn
        :action="saveAction"
        :isIcon="isMobile"
        :isOutlined="!isMobile"
        :forceText="!isMobile"
        class="ml-2 mr-1"
      ></save-btn>
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

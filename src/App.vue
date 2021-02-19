<template>
  <div
    v-if="isMounted"
    v-bind:class="[
      'back',
      {'is-logged-in':displayApp && apiAccessToken},
      {'is-small':isMobile},
      {'is-dark':isDark},
    ]"
  >
    <v-app id="inspire">
      <app-header v-if="displayApp && apiAccessToken" />

      <app-nav v-if="displayApp && apiAccessToken" />

      <app-body v-show="!isMobile || (isMobile && !isAppLoading)" />

      <app-footer v-if="displayApp && apiAccessToken" />

      <v-overlay :value="isAppLoading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

      <snack-bar />

      <session-dialog v-if="displayApp && apiAccessToken" :dialog.sync="isSessionExpired" />
    </v-app>
  </div>
</template>

<script>

  import AppHeader from "@/components/app/AppHeader";
  import AppNav from "@/components/navigation/AppNav";
  import AppFooter from "@/components/app/AppFooter";
  import SessionDialog from "@/components/elements/Dialogs/SessionDialog";
  import SnackBar from "@/components/elements/SnackBar";

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppNav,
      AppBody: () => import('@/components/app/AppBody'),
      AppFooter,
      SnackBar,
      SessionDialog
    },
    data: () => ({
      isMounted: false,
    }),
    computed: {
      isSessionExpired: {
        get() {
          return this.xUi.isSessionExpired
        },
      },
      displayApp: {
        get() {
          return this.xUi.displayApp
        },
      }
    },
    methods: {
      async fetchSelfioItems() {
        this.isAppLoading = true;
        await this.api_get_user();
        await this.initPreferences();

        if(this.preferences && this.preferences.theme)
          await this.toggleTheme(this.preferences.theme);

        this.$store.commit('updateUiDisplayApp',true);
        await this.api_get_brands();
        await this.api_get_landscapes();
        await this.api_get_gear();
        await this.api_get_inventories();
        await this.api_get_activities();
        await this.api_get_adventures();
        this.$store.commit('updateUiIsConfigurationReady',true);

        this.isAppLoading = false;
      },
      async initPreferences() {
        await this.api_get_preferences(this.user.id);
      },
    },
    watch: {
      currentRouteName(val) {
        if(val) {
          if(this.navigationCollapse===true && this.isMobile)
            this.navigationCollapse = !this.navigationCollapse;
        }
      },
      async apiAccessToken(value) {
        if(value && (typeof value === 'string'))
          await this.fetchSelfioItems();
      },
      formDialog(val) {
        if(this.isMounted && (val === false)) {
          this.selectedItem = null;
          this.selectedItemIndex = null;
          this.formDialogType = null;

          if(this.isAppLoading === true)
            this.isAppLoading = false;
        }
      },
    },
    mounted() {
      this.setLang(this.getNavigatorLanguage());
      this.isMounted = true;
    }
  };

</script>

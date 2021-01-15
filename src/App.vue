<template>
  <div v-bind:class="[
      'back',
      {'is-logged-in':apiAccessToken},
      {'is-small':isMobile},
      {'is-dark':isDark},
    ]"
  >
    <v-app id="inspire">
      <app-header v-if="apiAccessToken" />

      <app-nav v-if="apiAccessToken"/>

      <app-body />

      <app-footer v-if="apiAccessToken" />

      <v-overlay :value="isAppLoading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

      <snack-bar />
    </v-app>
  </div>
</template>

<script>

  import AppBody from '@/components/app/AppBody';
  import SnackBar from "@/components/elements/SnackBar";

  export default {
    name: 'App',
    components: {
      AppHeader: () => import('@/components/app/AppHeader'),
      AppNav: () => import('@/components/navigation/AppNav'),
      AppBody,
      AppFooter: () => import('@/components/app/AppFooter'),
      SnackBar,
    },
    data: () => ({
      isMounted: false,
    }),
    methods: {
      async fetchSelfioItems() {
        this.isAppLoading = true;
        await this.initPreferences();

        if(this.preferences && this.preferences.theme)
          await this.toggleTheme(this.preferences.theme);

        await this.api_get_brands();
        await this.api_get_landscapes();
        await this.api_get_gear_states();
        await this.api_get_gear_types();
        await this.api_get_gear();
        await this.api_get_inventories();
        await this.api_get_activities();
        await this.api_get_adventures();
        this.$store.commit('updateUiIsConfigurationReady',true);

        this.isAppLoading = false;
      },
      async initPreferences() {
        await this.api_get_preferences();
      },
    },
    watch: {
      currentRouteName(val) {
        if(this.isMounted && val) {
          if(this.navigationCollapse===true && this.isMobile) {
            this.navigationCollapse = !this.navigationCollapse;
          }
        }
      },
      async apiAccessToken(value) {
        if(this.isMounted && value && (typeof value === 'string')) {
          await this.fetchSelfioItems();
        }
      },
      formDialog(val) {
        if(this.isMounted && (val === false)) {
          if(this.isAppLoading === true)
            this.isAppLoading = false;

          this.selectedItem = null;
          this.selectedItemIndex = null;
          this.formDialogType = null;
        }
      },
    },
    mounted() {
      if(this.$router.currentRoute.path !== '/home')
        this.$router.push('home');

      this.isMounted = true;
    }
  };

</script>

<style lang="scss">

  .x-primary-btn {
    cursor: pointer;
  }

  .col-border-r {
    border-right: 1px solid #eee;
  }

  .shadow-bottom {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .input-list-item {
    border-radius: 4px 4px 0 0;
    background-color: #E0E0E0;
  }

  .text-caption-x {
    font-size: 12px;
  }

  .x-col {
    padding: 0 4px;
    text-align: center;
  }

  .ghost-btn {
    padding: 0 !important;
    width: 0 !important;
    min-width: 0 !important;
  }

  .back {
    &:not(.is-logged-in) {
      background-position: center !important;

      &.is-small {
        background-size: contain !important;
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(./assets/images/mountain_bgd_mobile.jpg);
      }

      &:not(.is-small) {
        background-size: cover !important;
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(./assets/images/mountain_bgd_desktop.jpg);
      }

      #inspire {
        background: none;
      }
    }
  }

  .list-icon-wrapper {
    border-radius: 20px;
    max-width: 40px !important;
    margin: auto;
  }

  .max-width {
    width: 100%
  }

  .lowercase {
    text-transform: lowercase;
  }

  .x-tab {
    box-shadow: 0px 10px 2px 0px rgba(0,0,0,0.75) !important;
  }

  .x-avatar {

    .v-sheet {
      border-radius: unset !important;
    }
  }

  .v-chip--select {
    margin-top: 1px !important;
    margin-bottom: 1px !important;
  }

  .v-tab {
    //font-weight: normal !important;
  }

  .floating-button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 12px;
  }

  .x-slider {
    padding: 6px 3px;
    background-color: rgba(0, 0, 0, 0.08) !important;
  }

  .x-checkbox {
    margin-top: unset !important;
    padding-top: 3px !important;
  }

  .text-tiny {
    font-size: 12px !important;
  }

  .text-tiny-dimmed {
    @extend .text-tiny;
    color: grey;
  }

  .text-caption-dimmed {
    font-size: 0.75rem;
    font-weight: normal;
    color: grey;
    margin: 0 0 9px 0 !important;
  }

  .x-check-form {
    border-radius: 4px;

    .v-list {
      padding: 0;
    }

    .x-check-form-card {

      border-radius: 4px 4px 0 0 !important;

      .v-list {
        border-bottom: 1px solid #757575;
      }

      &.is-dark {

        .v-list {
          border-bottom: 1px solid #BDBDBD;
        }

      }
    }
  }

  .v-stepper__step {
    padding-top: 16px !important;
  }

  .v-stepper__step__step {
    color: white !important;
  }

  .is-dark {

    .col-border-r {
      border-color: #292929;
    }

    .input-list-item {
      background-color: #141414;
    }

    .v-stepper__step__step {
      color: black !important;
    }

    .text-tiny-dimmed {
      color: lightgrey;
    }

    .text-caption-dimmed {
      color: lightgrey;
    }

    .x-slider {
      background-color: rgba(255, 255, 255, 0.08) !important;
    }

    .svg-image {
      filter: brightness(0) invert(1);
    }
  }

  .is-small {

    .v-tabs {
      .v-item-group {
        .v-slide-group__prev, .v-slide-group__next {
          display:none !important;
        }
      }
    }

    .v-tabs-bar {
      height: 36px;
    }

    .v-tab {
      font-size: 12px !important;
    }

    .x-checklist-item {
      .v-list-item__action {
        margin-right: 16px !important;
      }
    }

    .stacked-item-data {
      line-height: 18px !important;
    }

    //.v-list-item__title {
    //  font-size: 14px !important;
    //}

    .v-list-item__subtitle {
      font-size: 12px !important;
    }

    .v-stepper--vertical .v-stepper__step {
      padding: 18px 12px !important;
    }

    .v-stepper__content {
      margin-left: 24px  !important;
      padding-top: 0  !important;
    }

    .text-tiny {
      font-size: 11px !important;
    }

    .floating-button {
      bottom: 56px;
    }

    // V-TIMELINE
    .v-timeline--dense .v-timeline-item__body {
      max-width: calc(100% - 65px) !important;
    }

    .v-timeline-item__divider {
      min-width: 65px !important;
    }
  }

</style>
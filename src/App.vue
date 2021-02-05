<template>
  <div
    v-if="isMounted"
    v-bind:class="[
      'back',
      {'is-logged-in':apiAccessToken},
      {'is-small':isMobile},
      {'is-dark':isDark},
    ]"
  >
    <v-app id="inspire">
      <app-header v-if="apiAccessToken" />

      <app-nav v-if="apiAccessToken"/>

      <app-body v-show="!isMobile || (isMobile && !isAppLoading)" />

      <app-footer v-if="apiAccessToken" />

      <v-overlay :value="isAppLoading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

      <snack-bar />

      <session-dialog v-if="apiAccessToken" :dialog.sync="isSessionExpired" />
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
      }
    },
    methods: {
      async fetchSelfioItems() {
        this.isAppLoading = true;
        await this.api_get_user();
        await this.initPreferences();

        if(this.preferences && this.preferences.theme)
          await this.toggleTheme(this.preferences.theme);

        await this.api_get_brands();
        await this.api_get_landscapes();
        await this.api_get_gear_categories();
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
          if(this.isAppLoading === true)
            this.isAppLoading = false;

          this.selectedItem = null;
          this.selectedItemIndex = null;
          this.formDialogType = null;
        }
      },
    },
    mounted() {
      this.isMounted = true;
    }
  };

</script>

<style lang="scss">

  .edition-toolbar {
    .v-toolbar__content {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }

  .x-input {
    background: rgba(0, 0, 0, 0.06) !important;
    border-radius: 4px 4px 0 0;
    padding: 0 12px !important;
  }

  .no-wrap * {
    overflow: unset !important;
    text-overflow: unset !important;
    white-space: unset !important;
  }

  .row-max-width {
    max-width: 600px;
  }

  .v-progress-circular__underlay {
    stroke-width: 2;
  }

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
    padding: 0 4px !important;
    text-align: center !important;
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
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(./assets/images/mountain_bgd_mobile.jpg);
      }

      &:not(.is-small) {
        background-size: cover !important;
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(./assets/images/mountain_bgd_desktop.jpg);
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
    box-shadow: 0 10px 2px 0 rgba(0,0,0,0.75) !important;
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

    .v-subheader {
      font-size: 12px;
      height: 24px !important;
      padding: 0 !important;
    }

    .v-list--dense .v-subheader {
      height: 18px !important;
    }

    .selector-card {

      &.selected {
        border: 1px solid #000 !important;

        &.is-dark {
          border: 1px solid #FFF !important;
        }
      }

      &:before {
        opacity: 0.1;
      }
    }

    &.is-in-filter {
      &:not(.x-state-selector), &:not(.x-simple-selector) {
        .v-text-field--filled > .v-input__control > .v-input__slot {
          background: unset;
        }
      }
    }

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

  .app-nav-list-item {
    &.v-list-item--active {
      background: white;

      &::before {
        background: transparent;
      }

      .v-list-item__icon {
        @extend .primary-gradient-color-text;
      }

      .v-list-item__content {
        .v-list-item__title {
          span {
            @extend .primary-gradient-color-text;
          }
        }
      }
    }
  }

  .primary-gradient-color {
    background-image: linear-gradient(45deg, #009688, #2196F3, #9C27B0);
  }

  .primary-gradient-color-text {
    background: -webkit-linear-gradient(45deg, #009688, #2196F3, #9C27B0);
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
  }

  .is-dark {
    .primary-gradient-color {
      color: white !important;
      /*background-image: linear-gradient(45deg, #64FFDA, #448AFF, #E040FB);*/
    }

    .primary-gradient-color-text {
      background: -webkit-linear-gradient(45deg, #64FFDA, #448AFF, #E040FB);
    }

    .app-nav-list-item {
      &.v-list-item--active {
        background: #191919;
      }
    }

    .x-input {
      background: rgba(255, 255, 255, 0.08) !important;
    }

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

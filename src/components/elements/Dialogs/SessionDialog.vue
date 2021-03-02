<template>

  <v-dialog
    v-if="isMounted"
    v-model="dialog"
    :max-width="maxDialogWidth"
    :transition="dialogTransition"
    persistent
  >
    <div class="session-dialog">
      <v-card>
        <div class="max-width d-flex align-center justify-center">
          <v-avatar :size="48" class="primary-gradient-color" style="position: absolute; top: -26px;">
            <v-icon :size="MDI" v-text="'mdi-history'" style="margin-top: 23px;" dark />
          </v-avatar>
        </div>

        <v-card-title class="headline mt-3">{{t('session-expired') | capitalizeFirstFilter}}</v-card-title>

        <v-card-subtitle>{{t('please-login') | capitalizeFirstFilter}}</v-card-subtitle>

        <v-card-actions class="mt-1">
          <v-btn
            @click="disconnect_session()"
            depressed
            text
            v-text="$t('global.leave')"
          ></v-btn>

          <v-spacer />

          <v-btn
            @click="reloadPage()"
            class="primary-gradient-color"
            depressed
            dark
          >
            {{t('log-back')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

  </v-dialog>

</template>

<script>

  export default {
    name: 'session-dialog',
    props: {
      dialog: Boolean
    },
    data: () => ({
      isMounted: false,
    }),
    methods: {
      t(str) {
        return this.$t(`components.session-dialog.${str}`);
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .session-dialog {
      padding-top: 2px !important;
      background-image: linear-gradient(45deg, #9C27B0, #2196F3, #009688);
  }

</style>

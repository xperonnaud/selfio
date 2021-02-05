<template>

  <v-dialog
    v-if="isMounted"
    v-model="dialog"
    :max-width="isMobile ? '300' : '450'"
    :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
    persistent
  >
    <div class="session-dialog">
      <v-card>
        <div class="max-width d-flex align-center justify-center">
          <v-avatar :size="48" class="primary-gradient-color" style="position: absolute; top: -26px;">
            <v-icon :size="MDI" v-text="'mdi-history'" style="margin-top: 23px;" dark />
          </v-avatar>
        </div>

        <v-card-title class="headline mt-3" v-text="'Your session has expired.'" />

        <v-card-subtitle v-text="'Please log in again.'" />

        <v-divider />

        <v-card-actions>
          <v-btn
            @click="api_logout()"
            depressed
            text
            v-text="'Leave'"
          ></v-btn>

          <v-spacer />

          <v-btn
            @click="api_login()"
            class="primary-gradient-color"
            depressed
            dark
          >
            <span v-text="'Log back in'" />
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

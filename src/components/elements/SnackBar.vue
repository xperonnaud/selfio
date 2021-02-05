<template>

  <v-snackbar
    v-model="snackbarDisplay"
    :dark="apiAccessToken ? isDark : true"
    :timeout="(snackbarTimeout !== 0) ? snackbarTimeout : -1"
    v-bind:class="[
      'x-snack-bar',
      'elevation-3',
      ('x-'+snackbarType),
      {'is-small':isMobile},
      {'is-dark':isDark},
    ]"
    pill
    bottom
  >
    <span v-text="snackbarText" />

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        small
        v-bind="attrs"
        @click="snackbarDisplay = false"
      >
        <v-icon v-text="'mdi-close'" />
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script>

  export default {
    name: 'snack-bar',
    data: () => ({
      isMounted: false,
    }),
    computed: {
      textWordCount() {
        if(this.snackbarText)
          return this.snackbarText.split(' ').length;

        return 0;
      },
      snackbarTimeout() {
        return ((2 + (this.textWordCount % 4)) * 1000); // 1 second => 4 words
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .x-snack-bar {

    &.x-success {
      .v-snack__wrapper {
        background-color :rgba(28, 28, 28, 0.9) !important;
      }
    }

    &.x-error {
      .v-snack__wrapper {
        background-color :rgba(183, 28, 28, 0.8) !important;

        &.is-dark {
          background-color :rgba(255, 82, 82, 0.9) !important;
        }
      }
    }
  }

</style>

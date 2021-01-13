<template>

  <v-snackbar
    v-model="snackbarDisplay"
    :timeout="(snackbarTimeout !== 0) ? snackbarTimeout : -1"
    :color="snackBarColor"
    text
    v-bind:class="[
      'x-snack-bar',
      {'is-small':isMobile}
    ]"
    bottom
  >
    <v-icon
      v-show="snackbarType === 'success'"
      v-text="'mdi-checkbox-marked-circle'"
      class="mr-2"
      :color="isDark ? 'grey darken-4' : 'white'"
    />

    <v-icon
      v-show="snackbarType === 'error'"
      v-text="'mdi-alert'"
      :color="darkColor(snackbarType)"
      class="mr-2"
    />

    <span
      v-text="snackbarText"
      v-bind:class="[
        {'white--text':snackbarType === 'success' && !isDark},
        {'grey--text text--darken-4':snackbarType === 'success' && isDark}
      ]"
    ></span>

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        small
        v-bind="attrs"
        @click="snackbarDisplay = false"
      >
        <v-icon :color="(snackbarType === 'success') ? (isDark ? 'grey darken-4' : 'white') : null" v-text="'mdi-close'" />
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
        return ((1 + (this.textWordCount % 4)) * 1000); // 1 second => 4 words
      },
      snackBarColor() {
        if(!this.snackbarType || this.snackbarType==='success')
          return this.darkColor('primary');

        return this.darkColor(this.snackbarType);
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .x-snack-bar {

    &.is-small {

      .v-snack__wrapper {
        margin-top: 0;
        border-radius: 0 0 4px 4px;
      }
    }
  }

</style>

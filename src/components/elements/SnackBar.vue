<template>

  <v-snackbar
    v-model="snackbarDisplay"
    :dark="apiAccessToken ? isDark : true"
    :timeout="(snackbarTimeout !== 0) ? snackbarTimeout : -1"
    :color="darkColor(snackColor)"
    v-bind:class="[
      'x-snack-bar',
      'elevation-3',
      {'is-small':isMobile}
    ]"
    bottom
    outlined
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
      snackColor() {
        if(this.snackbarType === 'success')
          return 'green';
        if(this.snackbarType === 'error')
          return 'red';

          return 'primary';
      },
      textWordCount() {
        if(this.snackbarText)
          return this.snackbarText.split(' ').length;

        return 0;
      },
      snackbarTimeout() {
        return ((2 + (this.textWordCount % 4)) * 1000); // 1 second => 4 words
      },
      snackBarColor() {
        if(!this.snackbarType)
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
        //margin-top: 0;
        //border-radius: 0 0 4px 4px;
      }
    }
  }

</style>

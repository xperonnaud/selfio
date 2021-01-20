
<template>

  <div v-if="isMounted">

    <div class="d-flex justify-center">
      <v-sheet
        class="timeline-sheet"
        :max-width="cardSize(1200)"
        color="transparent"
      >


      </v-sheet>
    </div>

  </div>

</template>

<script>


  export default {
    name: "dashboard",
    components: {

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

    .is-small .timeline-sheet {
      padding-right: 12px;
    }

    .v-application--is-ltr .is-small.v-timeline--dense:not(.v-timeline--reverse)::before {
      left: calc(48px - 16px) !important;
    }

</style>

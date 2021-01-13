<template>

  <v-form v-model="valid">
    <v-container v-bind:class="(isMobile ? 'pt-3 px-4' : 'pt-7 px-8')" fluid>
      <v-row>
        <v-col v-if="!isMobile" cols="12">
          Incoming feature
        </v-col>

        <v-col v-else cols="12">
          <mobile-only-feature :icon="'responsive'" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>

  export default {
    name: 'import-form',
    components: {
      MobileOnlyFeature: () => import('@/components/elements/MobileOnlyFeature')
    },
    data: () => ({
      valid: false,
    }),
    computed: {

    },
    methods: {

    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

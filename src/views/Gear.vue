<template>
  <v-sheet height="100%">

    <x-list
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:items.sync="gearList"
    ></x-list>

  </v-sheet>
</template>

<script>

export default {
    name: "gear-view",
    components: {
      XList: () => import('@/components/lists/XList'),
    },
    data: () => ({
      isMounted: false,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

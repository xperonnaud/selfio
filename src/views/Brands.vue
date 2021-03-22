
<template>

    <v-sheet height="100%">
      <x-list
        v-show="isMounted"
        v-bind:icon="currentIcon"
        v-bind:title="currentTitle"
        v-bind:color="currentColor"
        v-bind:items="brandsList"
      ></x-list>
    </v-sheet>

</template>

<script>

  export default {
    name: "brands",
    components: {
        XList: () => import('@/components/lists/XList')
    },
    data: () => ({
        isMounted: false,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<template>
  <v-sheet height="100%">

    <x-list
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:items.sync="inventoriesList"
      v-bind:itemHeaders="inventoriesHeaders"
      v-bind:keyName="'name'"
    ></x-list>

  </v-sheet>
</template>

<script>

  export default {
    name: "inventories-view",
    components: {
      XList: () => import('@/components/lists/XList'),
    },
    data: () => ({
      isMounted: false,
    }),
    computed: {
      inventoriesHeaders() {
        return [
          {text: '', value: 'icon', align: 'start'},
          {text: this.$t('global.title'), value: 'title'},
        ]
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

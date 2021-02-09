<template>
  <v-sheet height="100%">

    <x-list
      v-show="isMounted"
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:color="currentColor"
      v-bind:items.sync="inventories"
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
      inventories: {
        get() {
          return this.$store.state.selfio.inventories
        },
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

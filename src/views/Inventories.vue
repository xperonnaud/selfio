<template>
  <v-sheet v-if="isMounted" height="100%">

    <list-container
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:color="currentColor"
      v-bind:items.sync="inventories"
      v-bind:itemHeaders="inventoriesHeaders"
      v-bind:keyName="'name'"
    ></list-container>

  </v-sheet>
</template>

<script>

import ListContainer from "@/components/containers/ListContainer";

  export default {
    name: "inventories-view",
    components: {
      ListContainer,
    },
    data: () => ({
      isMounted: false,
    }),
    computed: {
      inventoriesHeaders() {
        return [
          {text: '', value: 'icon', align: 'start'},
          {text: 'Title', value: 'title'},
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

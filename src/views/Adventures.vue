<template>
  <v-sheet height="100%">

    <x-list
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:items="adventuresList"
      v-bind:itemHeaders="adventuresHeaders"
      v-bind:keyName="'name'"
    ></x-list>

  </v-sheet>
</template>

<script>

  export default {
    name: "adventures-view",
    components: {
      XList: () => import('@/components/lists/XList'),
    },
    data: () => ({
      isMounted: false,
    }),
    computed: {
      adventuresHeaders() {
        return [
          {text: '', value: 'icon', align: 'start'},
          {text: 'Title', value: 'title'},
          {text: 'Activity', value: 'activity'},
          {text: 'Inventory', value: 'adventure_inventory'},
          {text: 'Difficulty', value: 'difficulty'},
        ]
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

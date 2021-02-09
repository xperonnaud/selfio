<template>
  <v-sheet v-if="isMounted" height="100%">

    <x-list
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:color="currentColor"
      v-bind:items="adventures"
      v-bind:itemHeaders="adventuresHeaders"
      v-bind:keyName="'name'"
    ></x-list>

  </v-sheet>
</template>

<script>

  import XList from '@/components/lists/XList'

  export default {
    name: "adventures-view",
    components: {
      XList
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
      adventures: {
        get() {
          return this.$store.state.selfio.adventures
        },
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

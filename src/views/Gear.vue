<template>
  <v-sheet v-if="isMounted" height="100%">

    <list-container
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:color="currentColor"
      v-bind:items="gear"
      v-bind:itemHeaders="gearHeaders"
      v-bind:keyName="'name'"
    ></list-container>

  </v-sheet>
</template>

<script>

import ListContainer from '@/components/containers/ListContainer'

export default {
    name: "gear-view",
    components: {
      ListContainer,
    },
    data: () => ({
      isMounted: false,
    }),
    computed: {
      gearHeaders() {
        return [
          {text: 'Category', value: 'type'},
          {text: 'Title', value: 'title', align: 'start'},
          {text: 'Brand', value: 'brand'},
          {text: 'Weight ('+this.weightUnit+')', value: 'weight'},
          {text: 'Color', value: 'color'},
          {text: 'Size', value: 'size'},
          {text: 'State', value: 'state'},
          {text: 'Price ('+this.priceUnit+')', value: 'price'},
          {text: 'Qty (owned)', value: 'quantity_owned'},
        ]
      },
      gear: {
        get() {
          return this.$store.state.selfio.gear
        },
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

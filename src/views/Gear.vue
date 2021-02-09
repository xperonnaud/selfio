<template>

  <v-sheet height="100%">
    <x-list
      v-show="isMounted"
      v-bind:icon="currentIcon"
      v-bind:title="currentTitle"
      v-bind:color="currentColor"
      v-bind:items="gear"
      v-bind:itemHeaders="gearHeaders"
      v-bind:keyName="'name'"
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

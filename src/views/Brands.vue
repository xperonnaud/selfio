
<template>

    <v-sheet height="100%">
      <x-list
        v-show="isMounted"
        v-bind:icon="currentIcon"
        v-bind:title="currentTitle"
        v-bind:color="currentColor"
        v-bind:items="brandsList"
        v-bind:itemHeaders="brandHeaders"
        v-bind:keyName="'name'"
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
    computed: {
      brandHeaders() {
        return [
          {text: 'Title', value: 'title', align: 'start'},
          {text: 'Private', value: 'owned'},
        ]
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

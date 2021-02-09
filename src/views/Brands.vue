
<template>

    <v-sheet v-if="isMounted" height="100%">
      <x-list
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

  import XList from "@/components/lists/XList";

  export default {
    name: "brands",
    components: {
        XList
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

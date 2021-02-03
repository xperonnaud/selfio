
<template>

    <v-sheet v-if="isMounted" height="100%">
      <list-container
        v-bind:icon="currentIcon"
        v-bind:title="currentTitle"
        v-bind:color="currentColor"
        v-bind:items="brandsList"
        v-bind:itemHeaders="brandHeaders"
        v-bind:keyName="'name'"
      ></list-container>
    </v-sheet>

</template>

<script>

  import ListContainer from "@/components/containers/ListContainer";

  export default {
    name: "brands",
    components: {
      ListContainer
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

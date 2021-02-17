<template>

  <v-list-item :key="`no-results-list-${currentRouteName}`">
    <v-list-item-content>
      <empty-list :color="navItemColor(currentRouteName)" />
    </v-list-item-content>
  </v-list-item>

</template>

<script>

  import EmptyList from "@/components/elements/EmptyList";

  export default {
    name: 'no-result-empty-list-item',
    components: {
      EmptyList,
    },
  }

</script>

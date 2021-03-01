<template>

  <v-list-item
    v-if="isItemRoute"
    :key="`empty-list-${currentRouteName}`"
  >
    <v-list-item-content>
      <empty-list
        :label="xCapFirst($t(`global.add-${currentRouteName}`))"
        :color="navItemColor(currentRouteName)"
      ></empty-list>
    </v-list-item-content>
  </v-list-item>

</template>

<script>

  import EmptyList from "@/components/elements/EmptyList";

  export default {
    name: 'item-empty-list-item',
    components: {
      EmptyList,
    },
  }

</script>

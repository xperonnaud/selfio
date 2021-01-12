<template>

  <div
    v-if="relationType
    && selectedItemRelations[relationType]
    && selectedItemRelations[relationType].length > 0"
  >
    <div>{{ navigationItems[relationType].title }} relation(s):</div>

    <template v-for="itemId in selectedItemRelations[relationType]">
      <v-chip
        v-if="objFilter(list, 'id', itemId)[0]"
        :key="`${navigationItems[relationType].title}-relation-${itemId}`"
        :color="navigationItems[relationType].color"
        class="ma-1"
        label
        small
        dark
        v-text="objFilter(list, 'id', itemId)[0].title"
      ></v-chip>
    </template>
  </div>

</template>

<script>

  export default {
    name: "relation-chip",
    props: {
      relationType: null,
      list: {
        type: Array,
        default: null
      },
    },
  }

</script>
<template>

  <div class="d-flex align-center justify-center">
    <v-icon
      v-text="(itemOrderBy !== prop)
        ? 'mdi-menu-down'
        : (itemOrderOption === 'asc'
          ? 'mdi-menu-down'
          : 'mdi-menu-up')"
      size="20"
      class="my-auto"
    ></v-icon>
  </div>

</template>

<script>

  export default {
    name: 'x-sort-icon',
    props: {
      prop: String
    }
  }

</script>

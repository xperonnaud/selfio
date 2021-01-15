<template>

  <div>
    <v-icon v-text="(itemOrderBy !== prop) ? 'mdi-menu-down' : (itemOrderOption === 'asc' ? 'mdi-menu-down' : 'mdi-menu-up')" />
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

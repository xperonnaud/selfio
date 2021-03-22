<template>

  <div class="d-flex align-center justify-center">
    <v-icon
      v-text="((itemOrderBy !== prop) || (itemOrderOption === 'asc'))
        ? 'mdi-menu-down'
        : 'mdi-menu-up'"
      :size="14"
      v-bind:class="['my-auto', ((itemOrderBy === prop) ? currentColorText : '')]"
    ></v-icon>
  </div>

</template>

<script>

  export default {
    name: 'sort-icon',
    props: {
      prop: String
    }
  }

</script>

<template>

  <v-col
    class="x-col py-1 col-border-r x-primary-btn rounded"
    @click.stop="sortItems(prop)"
    v-ripple
  >
    <div class="d-flex justify-center flex-column">
      <div
        v-bind:class="['text-tiny']"
        v-text="text"
      ></div>

      <x-sort-icon :prop="prop" />
    </div>
  </v-col>

</template>

<script>

  import XSortIcon from "@/components/elements/XSortIcon";

  export default {
    name: 'x-col',
    components: {
      XSortIcon
    },
    props: {
      text: String,
      prop: String,
    },
  }

</script>

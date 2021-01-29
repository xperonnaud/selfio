<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">
      <v-col
        :cols="isMobile ? 9 : 11"
        class="py-2 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div class="d-flex">
          <div class="text-caption" v-text="'Title'" />
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <x-col text="Action" prop="user_created" />
    </v-row>
  </v-list-item-content>

</template>

<script>

  import XCol from "@/components/xcols/XCol";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";

  export default {
    name: 'brand-list-header',
    components: {
      XCol,
      XSortIcon
    }
  }

</script>

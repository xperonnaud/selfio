<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col
        :cols="isMobile ? 7 : 6"
        class="py-1 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div class="d-flex">
          <div class="text-tiny">
            <div v-text="'Title'" />
            <div v-text="'Description'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col py-2 col-border-r">
        <div class="text-tiny text-center" v-text="'Items'" />
      </v-col>

      <v-col class="x-col py-2 col-border-r">
        <div class="text-tiny text-center" v-text="'Weight'" />
      </v-col>

      <template v-if="!isMobile">
        <v-col class="x-col py-2 col-border-r">
          <div class="text-tiny text-center" v-text="'Price'" />
        </v-col>

        <x-col text="Update" prop="date_updated" />
      </template>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XCol from "@/components/xcols/XCol";
  import XSortIcon from "@/components/elements/XSortIcon";

  export default {
    name: 'inventories-list-header',
    components: {
      XCol,
      XSortIcon
    }
  }

</script>

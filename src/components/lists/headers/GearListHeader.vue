<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col
        :cols="isMobile ? 4 : 3"
        class="py-1 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div class="d-flex">
          <div class="text-tiny">
            <div v-text="'Title / Model'" />
            <div v-text="'Brand'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <x-col text="Weight" prop="weight" />

      <template v-if="!isMobile">
        <x-col text="Price" prop="price" />

        <x-col text="Purchase" prop="purchase_date" />

        <x-col text="Update" prop="date_updated" />

        <x-col text="State" prop="state" />
      </template>

      <x-col :text="isMobile ? 'Cons.' : 'Consumable'" prop="Consumable" />

      <x-col :text="isMobile ? 'Qty.' : 'Quantity'" prop="quantity_owned" />

      <v-col cols="1" class="pa-0">
        <div class="text-tiny" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XCol from "@/components/xcols/XCol";
  import XSortIcon from "@/components/elements/XSortIcon";

  export default {
    name: 'gear-list-header',
    components: {
      XCol,
      XSortIcon
    }
  }

</script>

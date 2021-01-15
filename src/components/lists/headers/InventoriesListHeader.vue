<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 7 : 6" class="py-0 col-border-r x-primary-btn" @click.stop="sortItems('title')" v-ripple>
        <div class="d-flex">
          <div>
            <div class="text-tiny" v-text="'Title'" />
            <div class="text-tiny" v-text="'Description'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col col-border-r">
        <div class="text-caption text-center" v-text="'Items'" />
      </v-col>

      <v-col v-if="isMobile" class="x-col col-border-r">
        <div class="text-tiny text-center" v-text="'Price'" />
        <div class="text-tiny text-center" v-text="'Weight'" />
      </v-col>

      <template v-else>
        <v-col class="x-col col-border-r">
          <div class="text-caption text-center" v-text="'Price'" />
        </v-col>

        <v-col class="x-col col-border-r">
          <div class="text-caption text-center" v-text="'Weight'" />
        </v-col>

        <v-col class="x-col stacked-item-data col-border-r x-primary-btn" @click.stop="sortItems('updated_on')" v-ripple>
          <div class="d-flex justify-center">
            <div>
              <div class="text-tiny" v-text="'Last'" />
              <div class="text-tiny" v-text="'Update'" />
            </div>
            <x-sort-icon prop="updated_on" />
          </div>
        </v-col>
      </template>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XSortIcon from "@/components/elements/XSortIcon";

  export default {
    name: 'inventories-list-header',
    components: {
      XSortIcon
    }
  }

</script>

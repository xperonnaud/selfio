<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 3" class="py-0 col-border-r x-primary-btn" @click.stop="sortItems('title')" v-ripple>
        <div class="d-flex">
          <div>
            <div class="text-tiny" v-text="'Title / Model'" />
            <div class="text-tiny" v-text="'Brand'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col v-if="isMobile" class="x-col stacked-item-data col-border-r">
        <div class="text-tiny text-center" v-text="'Weight'" />
        <div class="text-tiny text-center" v-text="'Price'" />
      </v-col>

      <template v-else>
        <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('weight')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Weight'" />
            <x-sort-icon prop="weight" />
          </div>
        </v-col>

        <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('price')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Price'" />
            <x-sort-icon prop="price" />
          </div>
        </v-col>

        <v-col class="x-col stacked-item-data col-border-r x-primary-btn" @click.stop="sortItems('purchase_date')" v-ripple>
          <div class="d-flex justify-center">
            <div>
              <div class="text-tiny" v-text="'Purchase'" />
              <div class="text-tiny" v-text="'Date'" />
            </div>
            <x-sort-icon prop="purchase_date" />
          </div>
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

      <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('state')" v-ripple>
        <div class="d-flex justify-center">
          <div class="text-caption" v-text="'State'" />
          <x-sort-icon prop="state" />
        </div>
      </v-col>

      <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('quantity_owned')" v-ripple>
        <div class="d-flex justify-center">
          <div class="text-caption ml-1" v-text="'Qty'" />
          <x-sort-icon prop="quantity_owned" />
        </div>
      </v-col>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XSortIcon from "@/components/elements/XSortIcon";

  export default {
    name: 'gear-list-header',
    components: {
      XSortIcon
    }
  }

</script>

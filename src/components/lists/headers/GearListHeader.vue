<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col
        :cols="isMobile ? 4 : 3"
        class="py-2 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div :class="['d-flex', {isMobile: 'flex-column'}]">
          <div v-bind:class="['text-tiny']">{{$t('global.title') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <x-col text="weight" prop="weight" />

      <template v-if="!isMobile">
        <x-col text="price" prop="price" />

        <x-col text="purchase" prop="purchase_date" />

        <x-col text="update" prop="date_updated" />

        <x-col text="state" prop="state" />
      </template>

      <x-col text="consumable" mini prop="consumable" />

      <x-col :text="isMobile ? 'qty' : 'quantity'" prop="quantity_owned" />

      <v-col cols="1" class="pa-0">
        <div class="text-tiny" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XCol from "@/components/xcols/XCol";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";

  export default {
    name: 'gear-list-header',
    components: {
      XCol,
      XSortIcon
    }
  }

</script>

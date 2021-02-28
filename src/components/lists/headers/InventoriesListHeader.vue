<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col
        :cols="isMobile ? 7 : 6"
        class="py-2 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div :class="['d-flex', {isMobile: 'flex-column'}]">
          <div v-bind:class="['text-tiny', ((itemOrderBy === 'title') ? currentColorText : '')]">{{$t('global.title') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col py-2 col-border-r">
        <div class="text-tiny text-center">{{$t('global.items') | capitalizeFirstFilter}}</div>
      </v-col>

      <v-col class="x-col py-2 col-border-r">
        <div class="text-tiny text-center">{{$t('global.weight') | capitalizeFirstFilter}}</div>
      </v-col>

      <template v-if="!isMobile">
        <v-col class="x-col py-2 col-border-r">
          <div class="text-tiny text-center">{{$t('global.price') | capitalizeFirstFilter}}</div>
        </v-col>

        <x-col text="update" prop="date_updated" />
      </template>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XCol from "@/components/xcols/XCol";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";

  export default {
    name: 'inventories-list-header',
    components: {
      XCol,
      XSortIcon
    }
  }

</script>

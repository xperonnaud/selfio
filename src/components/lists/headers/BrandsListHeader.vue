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
          <div v-bind:class="['text-tiny', ((itemOrderBy === 'title') ? currentColorText : '')]">{{$t('global.title') | capitalizeFirstFilter}}</div>
          <sort-icon prop="title" />
        </div>
      </v-col>

      <x-col text="action" prop="user_created" />
    </v-row>
  </v-list-item-content>

</template>

<script>

  import XCol from "@/components/xcols/XCol";
  import SortIcon from "@/components/elements/Icons/SortIcon";

  export default {
    name: 'brand-list-header',
    components: {
      XCol,
      SortIcon
    }
  }

</script>

<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col
        :cols="isMobile ? 6 : 2"
        class="py-1 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div class="d-flex">
          <div class="text-tiny">
            <div v-text="'Title'" />
            <div v-text="isMobile ? 'Start date' : 'Location'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col col-border-r py-2">
        <div class="text-tiny text-center" v-text="'Checklist'" />
      </v-col>

      <template v-if="!isMobile">
        <x-col text="Land." prop="landscape" />

        <x-col text="Dist." prop="distance" />

        <x-col text="Elev." prop="elevation" />

        <x-col text="Weather" prop="weather" />

        <x-col text="Temp." prop="temp_min" />

        <x-col text="Hum." prop="humidity" />

        <x-col text="Date" prop="start_date" />

        <v-col class="x-col py-2 col-border-r">
          <div class="text-tiny text-center" v-text="'Duration'" />
        </v-col>

        <x-col text="Update" prop="date_updated" />
      </template>

      <x-col text="Status" prop="start_date" />

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
    name: 'adventures-list-header',
    components: {
      XCol,
      XSortIcon
    }
  }

</script>

<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col
        :cols="isMobile ? 6 : 2"
        class="py-1 col-border-r x-primary-btn rounded"
        @click.stop="sortItems('title')"
        v-ripple
      >
        <div :class="['d-flex', {isMobile: 'flex-column'}]">
          <div v-bind:class="['text-tiny']"
          >{{$t('global.title') | capitalizeFilter}}</div>

          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col col-border-r py-2">
        <div class="text-tiny text-center">
          {{$t('global.checklist') | capitalizeFilter}}
        </div>
      </v-col>

      <template v-if="!isMobile">
        <x-col text="landscape" mini prop="landscape" />

        <x-col text="distance" mini prop="distance" />

        <x-col text="elevation" mini prop="elevation" />

        <x-col text="weather" prop="weather" />

        <x-col text="temperature" mini prop="temp_min" />

        <x-col text="humidity" mini prop="humidity" />

        <x-col text="date" prop="start_date" />

        <v-col class="x-col py-2 col-border-r">
          <div class="text-tiny text-center">
            {{$t('global.duration') | capitalizeFilter}}
          </div>
        </v-col>

        <x-col text="update" prop="date_updated" />
      </template>

      <x-col text="status" prop="start_date" />

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

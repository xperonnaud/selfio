<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 2" class="py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('title')" v-ripple>
        <div class="d-flex">
          <div>
            <div class="text-tiny" v-text="'Title'" />
            <div class="text-tiny" v-text="'Start Date'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col col-border-r py-2">
        <div class="text-caption text-center" v-text="'Checklist'" />
      </v-col>

      <template v-if="!isMobile">
        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('landscape')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Land.'" />
            <x-sort-icon prop="landscape" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('DDistance')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Dist.'" />
            <x-sort-icon prop="distance" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('elevation')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Elev.'" />
            <x-sort-icon prop="elevation" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('weather')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Weather'" />
            <x-sort-icon prop="weather" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('temperature_min')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Temp.'" />
            <x-sort-icon prop="temperature_min" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('humidity')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Hum.'" />
            <x-sort-icon prop="humidity" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortItems('start_date')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Date'" />
            <x-sort-icon prop="start_date" />
          </div>
        </v-col>

        <v-col class="x-col py-2 col-border-r">
          <div class="text-caption text-center" v-text="'Duration'" />
        </v-col>

        <v-col class="x-col py-2 stacked-item-data col-border-r x-primary-btn rounded" @click.stop="sortItems('updated_on')" v-ripple>
          <div class="d-flex justify-center">
            <div>
              <div class="text-tiny" v-text="'Last'" />
              <div class="text-tiny" v-text="'Update'" />
            </div>
            <x-sort-icon prop="updated_on" />
          </div>
        </v-col>
      </template>

      <v-col class="x-col py-2 col-border-r">
        <div class="text-caption text-center" v-text="'Status'" />
      </v-col>

      <v-col cols="1" py-2 class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XSortIcon from "@/components/elements/XSortIcon";

  export default {
    name: 'adventures-list-header',
    components: {
      XSortIcon
    }
  }

</script>

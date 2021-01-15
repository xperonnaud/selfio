<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 3" class="py-0 col-border-r x-primary-btn" @click.stop="sortItems('title')" v-ripple>
        <div class="d-flex">
          <div>
            <div class="text-tiny" v-text="'Title'" />
            <div class="text-tiny" v-text="'Start Date'" />
          </div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col col-border-r">
        <div class="text-caption text-center" v-text="'Checklist'" />
      </v-col>

      <template v-if="!isMobile">
        <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('landscape')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Landscape'" />
            <x-sort-icon prop="landscape" />
          </div>
        </v-col>

        <v-col class="x-col stacked-item-data col-border-r">
          <div class="text-tiny text-center" v-text="'Elevation'" />
          <div class="text-tiny text-center" v-text="'Distance'" />
        </v-col>

        <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('weather')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Weather'" />
            <x-sort-icon prop="weather" />
          </div>
        </v-col>

        <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('temperature_min')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Temperature'" />
            <x-sort-icon prop="temperature_min" />
          </div>
        </v-col>

        <v-col class="x-col col-border-r x-primary-btn" @click.stop="sortItems('humidity')" v-ripple>
          <div class="d-flex justify-center">
            <div class="text-caption" v-text="'Humidity'" />
            <x-sort-icon prop="humidity" />
          </div>
        </v-col>

        <v-col class="x-col col-border-r">
          <div class="text-caption text-center" v-text="'Duration'" />
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

      <v-col class="x-col col-border-r">
        <div class="text-caption text-center" v-text="'Status'" />
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
    name: 'adventures-list-header',
    components: {
      XSortIcon
    }
  }

</script>

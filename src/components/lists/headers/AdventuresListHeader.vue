<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 3" class="py-0">
        <div>
          <v-list-item-title
            v-text="'Title'"
            v-bind:class="['mb-1',{'text-caption' : isMobile}]"
          ></v-list-item-title>

          <v-list-item-subtitle
            class="text-caption"
            v-text="'Start Date'"
          ></v-list-item-subtitle>
        </div>
      </v-col>

      <v-col class="py-0 px-1">
        <div class="text-caption text-center" v-text="'Checklist'" />
      </v-col>

      <template v-if="!isMobile">
        <v-col class="py-0 px-1">
          <div class="text-caption text-center" v-text="'Landscape'" />
        </v-col>

        <v-col class="x-col stacked-item-data">
          <div class="text-tiny text-center" v-text="'Elevation'" />
          <div class="text-tiny text-center" v-text="'Distance'" />
        </v-col>

        <v-col class="py-0 px-1">
          <div class="text-caption text-center" v-text="'Weather'" />
        </v-col>

        <v-col class="py-0 px-1">
          <div class="text-caption text-center" v-text="'Temperature'" />
        </v-col>

        <v-col class="py-0 px-1">
          <div class="text-caption text-center" v-text="'Humidity'" />
        </v-col>

        <v-col class="py-0 px-1">
          <div class="text-caption text-center" v-text="'Duration'" />
        </v-col>
      </template>

      <v-col class="py-0 px-1">
        <div class="text-caption text-center" v-text="'Status'" />
      </v-col>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  export default {
    name: 'adventures-list-header',
  }

</script>

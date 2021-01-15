<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 3" class="py-0 col-border-r">
        <div class="text-tiny" v-text="'Title / Model'" />
        <div class="text-tiny" v-text="'Brand'" />
      </v-col>

      <v-col v-if="isMobile" class="x-col stacked-item-data col-border-r">
        <div class="text-tiny text-center" v-text="'Weight'" />
        <div class="text-tiny text-center" v-text="'Price'" />
      </v-col>

      <template v-else>
        <v-col class="x-col col-border-r">
          <div class="text-caption text-center" v-text="'Weight'" />
        </v-col>

        <v-col class="x-col col-border-r">
          <div class="text-caption text-center" v-text="'Price'" />
        </v-col>

        <v-col class="x-col stacked-item-data col-border-r">
          <div class="text-tiny text-center" v-text="'Purchase'" />
          <div class="text-tiny text-center" v-text="'Date'" />
        </v-col>

        <v-col class="x-col stacked-item-data col-border-r">
          <div class="text-tiny text-center" v-text="'Last'" />
          <div class="text-tiny text-center" v-text="'Update'" />
        </v-col>
      </template>

      <v-col class="x-col col-border-r">
        <div class="text-caption text-center" v-text="'State'" />
      </v-col>

      <v-col class="x-col col-border-r">
        <div class="text-caption text-center ml-1" v-text="'Qty'" />
      </v-col>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  export default {
    name: 'gear-list-header',
  }

</script>

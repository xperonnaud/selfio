<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 7 : 6" class="py-0">
        <div class="text-tiny" v-text="'Title'" />
        <div class="text-tiny" v-text="'Description'" />
      </v-col>

      <v-col class="x-col">
        <div class="text-caption text-center" v-text="'Items'" />
      </v-col>

      <v-col v-if="isMobile" class="x-col">
        <div class="text-tiny text-center" v-text="'Price'" />
        <div class="text-tiny text-center" v-text="'Weight'" />
      </v-col>

      <template v-else>
        <v-col class="x-col">
          <div class="text-caption text-center" v-text="'Price'" />
        </v-col>

        <v-col class="x-col">
          <div class="text-caption text-center" v-text="'Weight'" />
        </v-col>
      </template>

      <v-col cols="1" class="pa-0">
        <div class="text-caption" v-text="''" />
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  export default {
    name: 'inventories-list-header',
  }

</script>

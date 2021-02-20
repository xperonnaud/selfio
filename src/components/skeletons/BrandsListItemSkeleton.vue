<template>

  <v-row>
    <v-col :cols="isMobile ? 9 : 2" class="pa-0">
      <v-skeleton-loader
        height="28"
        type="heading"
        class="ml-4 mt-1"
      ></v-skeleton-loader>
    </v-col>

    <v-col v-if="!isMobile" cols="9" />

    <v-col class="pa-0 pt-1 d-flex align-center justify-center">
      <v-skeleton-loader :width="skeletonItemWidth" type="text" />
    </v-col>
  </v-row>

</template>

<script>

  export default {
    name: "brands-list-item-skeleton",
  }

</script>
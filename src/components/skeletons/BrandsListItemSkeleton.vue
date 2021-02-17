<template>

  <v-row>
    <v-col :cols="isMobile ? 9 : 11" class="pa-0">
      <v-skeleton-loader
        height="36"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </v-col>

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
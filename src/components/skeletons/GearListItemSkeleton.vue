<template>

  <v-row class="gear-list-item-skeleton">
    <v-col :cols="isMobile ? 4 : 3" class="pa-0">
      <v-skeleton-loader
        height="36"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </v-col>

    <template v-for="index in (isMobile ? 3 : 7)">
      <v-col class="pa-0 pt-1 d-flex align-center justify-center" :key="`list-container-skeletons-col-${randomId()}-${index}`">
        <v-skeleton-loader :width="skeletonItemWidth" type="text" />
      </v-col>
    </template>

    <v-col cols="1"/>
  </v-row>

</template>

<script>

  export default {
    name: "gear-list-item-skeleton",
  }

</script>
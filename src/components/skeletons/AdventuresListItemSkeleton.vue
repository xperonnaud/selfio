<template>

  <v-row>
    <v-col :cols="isMobile ? 6 : 2" class="pa-0">
      <v-skeleton-loader
        height="36"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </v-col>

    <template v-for="index in (isMobile ? 2 : 11)">
      <v-col class="pa-0 pt-1 d-flex align-center justify-center" :key="`list-container-skeletons-col-${randomId()}-${index}`">
        <v-skeleton-loader :width="skeletonItemWidth" type="text" />
      </v-col>
    </template>

    <v-col cols="1"/>
  </v-row>

</template>

<script>

  export default {
    name: "adventures-list-item-skeleton",
  }

</script>
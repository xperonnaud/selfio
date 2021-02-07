<template>

  <v-row>
    <v-col cols="3" class="pa-0">
      <v-skeleton-loader
        height="36"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </v-col>

    <template v-for="index in 2">
      <v-col class="pa-0" :key="`list-container-skeleton-empty-col-${randomId()}-${index}`" />

      <v-col class="pa-0 pt-3" :key="`list-container-skeletons-col-${randomId()}-${index}`">
        <v-skeleton-loader width="40" type="text" />
      </v-col>
    </template>

    <template v-if="currentRouteName === 'gear'">
      <v-col class="pa-0" />

      <v-col class="pa-0 pt-3">
        <v-skeleton-loader width="40" type="text" />
      </v-col>
    </template>

    <template v-if="!isMobile">
      <template v-for="index in 3">
        <v-col class="pa-0" :key="`list-container-skeleton-empty-col-${randomId()}-${index}`" />

        <v-col class="pa-0 pt-3" :key="`list-container-skeletons-col-${randomId()}-${index}`">
          <v-skeleton-loader width="40" type="text" />
        </v-col>
      </template>

      <template v-if="currentRouteName === 'adventures'">
        <template v-for="index in 3">
          <v-col class="pa-0" :key="`list-container-skeleton-empty-col-${randomId()}-${index}`" />

          <v-col class="pa-0 pt-3" :key="`list-container-skeletons-col-${randomId()}-${index}`">
            <v-skeleton-loader width="40" type="text" />
          </v-col>
        </template>
        <span v-show="false" />
      </template>
    </template>
  </v-row>

</template>

<script>

  export default {
    name: "list-container-skeleton",
  }

</script>

<style lang="scss">

  .v-skeleton-loader__list-item-two-line.v-skeleton-loader__bone {
    height: 36px !important;
  }

</style>
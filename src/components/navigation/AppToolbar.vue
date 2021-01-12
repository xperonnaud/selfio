<template>

  <v-app-bar :app="isMobile">
    <v-app-bar-nav-icon  @click.stop="navigationCollapse = !navigationCollapse" />

    <v-toolbar-title v-text="$options.filters.capitalizeFilter($route.name)" />

    <v-spacer />

    <v-btn-toggle
      v-show="!isMobile"
      v-model="routeNavigation"
      rounded
    >
      <v-btn small @click="$router.go(-1)">
        <v-icon v-text="'mdi-chevron-left'" />
      </v-btn>

      <v-btn small @click="$router.go(1)">
        <v-icon v-text="'mdi-chevron-right'" />
      </v-btn>
    </v-btn-toggle>

    <v-divider v-show="!isMobile" class="mx-3" vertical inset />

    <toolbar-menu />
  </v-app-bar>

</template>

<script>

  import ToolbarMenu from "@/components/elements/ToolbarMenu";

  export default {
    name: 'app-toolbar',
    components: {
      ToolbarMenu
    },
    data: () => ({
      routeNavigation: null,
      searchMode: false,
    }),
  }

</script>

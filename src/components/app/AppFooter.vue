<template>

  <v-footer
    :app="!navigationCollapse"
    class="pa-0"
  >
    <template v-if="isMobile">
      <form-post-btn
        v-show="isItemRoute"
        class="floating-button"
        isFab
        isRounded
        isSmall
        @click="openPostFormDialog()"
      ></form-post-btn>

      <v-btn
        v-show="isConfigurationRoute"
        :class="['px-0 floating-button primary-gradient-color white--text']"
        @click="brandPostDialog = !brandPostDialog"
        :width="48"
        :height="48"
        fab
        small
        rounded
      >
        <v-icon v-text="'mdi-plus'" />
      </v-btn>

      <new-brand-dialog v-bind:dialog.sync="brandPostDialog" />

      <v-bottom-navigation
        v-model="value"
        :input-value="!navigationCollapse"
        :background-color="xTabsColor"
        class="elevation-1"
        grow
      >
        <v-btn class="ghost-btn" color="transparent" />

        <template v-for="item in navigationRoutes">
          <v-btn
            v-if="(navigationItems[item].type === 'items')"
            :key="navigationItems[item].title"
            :to="{ name: item }"
          >
            <span v-bind:class="[(currentRouteName === item) ? currentColorText : null]"
            >{{$t(`global.${navigationItems[item].id}`) | capitalizeFilter}}</span>

            <v-icon
              v-text="navigationItems[item].icon"
              :color="(currentRouteName === item) ? currentColor : null"
            ></v-icon>
          </v-btn>
        </template>
      </v-bottom-navigation>
    </template>
  </v-footer>

</template>

<script>

  import NewBrandDialog from "@/components/elements/Dialogs/NewBrandDialog";

  export default {
    name: 'app-footer',
    components: {
      FormPostBtn: () => import('@/components/elements/Btns/PostBtn'),
      NewBrandDialog
    },
    data: () => ({
      value: null,

      brandPostDialog: false,
    }),
    watch: {
      isItemRoute(val) {
        if(val === false)
          this.value = null;
      }
    },
    mounted() {
      if(this.isItemRoute === false)
        this.value = null;
    }
  }
</script>

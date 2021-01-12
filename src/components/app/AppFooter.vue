<template>

  <v-footer
    :app="!navigationCollapse"
    class="pa-0"
  >
    <form-post-btn
      v-if="isMobile"
      v-show="isItemRoute"
      class="floating-button"
      isFab
      isRounded
      isSmall
      @click="openPostFormDialog()"
    ></form-post-btn>

    <v-bottom-navigation
      v-if="isMobile"
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
          <span
            v-text="navigationItems[item].title"
            v-bind:class="[(currentRouteName === item) ? currentColorText : null]"
          ></span>

          <v-icon
            v-text="navigationItems[item].icon"
            :color="(currentRouteName === item) ? currentColor : null"
          ></v-icon>
        </v-btn>
      </template>
    </v-bottom-navigation>
  </v-footer>

</template>

<script>

  import FormPostBtn from "@/components/elements/Btns/FormPostBtn";

  export default {
    name: 'app-footer',
    components: {
      FormPostBtn
    },
    data: () => ({
      value: null,
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

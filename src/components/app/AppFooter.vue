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

    <v-btn
      v-if="isMobile"
      v-show="isConfigurationRoute"
      :class="['px-0 floating-button primary-gradient-color']"
      @click="brandPostDialog = !brandPostDialog"
      :width="48"
      :height="48"
      fab
      small
      rounded
    >
      <v-icon v-bind:class="[reversedFontShadeColor]" v-text="'mdi-plus'" />
    </v-btn>

    <v-dialog
      v-if="isMobile"
      v-show="isConfigurationRoute"
      v-model="brandPostDialog"
      max-width="750px"
      :hide-overlay="isMobile"
      :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
      persistent
    >
      <v-card class="rounded-0">
        <v-card-title class="headline">
          <span v-text="'New Brand'" />
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form v-model="validBrand">
                <x-title-field
                  label="Title"
                  v-bind:value.sync="defaultBrand.title"
                  :color="darkColor('primary')"
                  @keyup.enter="postBrand()"
                ></x-title-field>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            @click="brandPostDialog = false"
            v-text="'Cancel'"
            text
          ></v-btn>

          <v-btn
            @click="postBrand()"
            :class="[{'primary-gradient-color': validBrand}]"
            :disabled="!validBrand"
            depressed
          >
            <span v-text="'Add brand'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

  import XTitleField from "@/components/inputs/fields/XTitleField";

  export default {
    name: 'app-footer',
    components: {
      FormPostBtn: () => import('@/components/elements/Btns/FormPostBtn'),
      XTitleField
    },
    data: () => ({
      value: null,

      validBrand: false,
      defaultBrand: { title: '' },
      brandPostDialog: false,
    }),
    methods: {
      async postBrand() {
        if(this.validBrand === true) {
          await this.api_post_brand(this.defaultBrand);
          this.brandPostDialog = false;
          this.defaultBrand.title = '';
        }
      },
    },
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

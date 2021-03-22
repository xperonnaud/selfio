
<template>

  <div v-if="isMounted">
    <v-tabs
      v-model="tab"
      :background-color="xTabsColor"
      :fixed-tabs="isMobile"
      :color="navItemColor(itemRoutes[tab])"
    >
      <v-tab :key="'gear-tags'">
        {{$t('global.gear') | capitalizeFirstFilter}}
      </v-tab>
      <v-tab :key="'inventory-tags'">
        {{$t('global.inventories') | capitalizeFirstFilter}}
      </v-tab>
      <v-tab :key="'adventure-tags'">
        {{$t('global.adventures') | capitalizeFirstFilter}}
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="'gear-tags'">
          <v-card flat :color="xBackgroundColor">
            <v-card-text class="pa-0">
              <gear-tags-form />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item :key="'inventory-tags'">
          <v-card flat :color="xBackgroundColor">
            <v-card-text class="pa-0">
              <inventory-tags-form />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item :key="'adventure-tags'">
          <v-card flat :color="xBackgroundColor">
            <v-card-text class="pa-0">
              <adventure-tags-form />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

    <v-container v-if="!isMobile" fluid v-bind:class="(isMobile ? 'px-4 py-0' : 'px-8 py-0')">
      <v-row class="tag-row">
        <v-col cols="12" class="py-0">
          <primary-btn
            label="save"
            :block="isMobile"
            valid
            v-on:btnAction="updatePreferences()"
          ></primary-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>

  import PrimaryBtn from "@/components/elements/Btns/PrimaryBtn";
  import GearTagsForm from "@/components/forms/GearTagsForm";
  import InventoryTagsForm from "@/components/forms/InventoryTagsForm";
  import AdventureTagsForm from "@/components/forms/AdventureTagsForm";

  export default {
    name: "settings",
    components: {
      PrimaryBtn,
      GearTagsForm,
      InventoryTagsForm,
      AdventureTagsForm
    },
    data: () => ({
      isMounted: false,
      tab: 'gear-tags',
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

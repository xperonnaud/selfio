
<template>

  <div v-if="isMounted">
    <v-tabs
      v-model="tab"
      :background-color="xTabsColor"
      :fixed-tabs="isMobile"
      :color="navItemColor(itemRoutes[tab])"
    >
      <v-tab :key="'gear-tags'">
        <span v-text="'Gear'" />
      </v-tab>
      <v-tab :key="'inventory-tags'">
        <span v-text="'Inventories'" />
      </v-tab>
      <v-tab :key="'adventure-tags'">
        <span v-text="'Adventures'" />
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

    <v-container fluid v-bind:class="(isMobile ? 'px-4' : 'px-8')">
      <v-row style="max-width: 750px">
        <v-col cols="12" class="py-0">
          <primary-btn
            label="Save"
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

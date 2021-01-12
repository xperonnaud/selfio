
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
            <v-card-text v-bind:class="[{'pa-0':isMobile}]">
              <gear-tags-form />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item :key="'inventory-tags'">
          <v-card flat :color="xBackgroundColor">
            <v-card-text v-bind:class="[{'pa-0':isMobile}]">
              <inventory-tags-form />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item :key="'adventure-tags'">
          <v-card flat :color="xBackgroundColor">
            <v-card-text v-bind:class="[{'pa-0':isMobile}]">
              <adventure-tags-form />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

    <v-container v-bind:class="['py-0']" fluid>
      <v-row>
        <v-col
          v-bind:class="[
            'py-1',
            (isMobile ? 'ml-0' : 'ml-4')
          ]"
        >
          <v-btn
            v-bind:class="['elevation-0',{'max-width':isMobile},reversedFontShadeColor]"
            :color="darkColor('primary')"
            @click.stop="updatePreferences()"
          >
            <v-icon v-text="'mdi-check'"/>
            <span v-text="'Save'" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>

  import GearTagsForm from "@/components/forms/GearTagsForm";
  import InventoryTagsForm from "@/components/forms/InventoryTagsForm";
  import AdventureTagsForm from "@/components/forms/AdventureTagsForm";

  export default {
    name: "settings",
    components: {
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

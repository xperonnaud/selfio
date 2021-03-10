<template>

  <v-form v-model="valid">
    <v-container fluid v-bind:class="(isMobile ? 'px-4 py-2' : 'px-8 py-6')">
      <v-row class="tag-row">
        <v-col cols="12">
          <x-combobox
            label="inventory-tags"
            v-bind:value.sync="preferences.inventory_tags"
            v-bind:items="preferences.inventory_tags"
            v-bind:route="'inventories'"
          ></x-combobox>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>

  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'inventory-tags-form',
    components: {
      XCombobox
    },
    data: () => ({
      valid: false,
    }),
  }

</script>

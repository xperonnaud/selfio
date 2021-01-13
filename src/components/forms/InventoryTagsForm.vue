<template>

  <v-form v-model="valid">
    <v-container fluid v-bind:class="(isMobile ? 'pt-3 px-4' : 'pt-7 px-8')">
      <v-row style="max-width: 750px">
        <v-col cols="12">
          <x-combobox
            label="Inventory tags"
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

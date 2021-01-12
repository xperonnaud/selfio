<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']" fluid>
      <v-row>

        <v-col cols="12" lg="6">
          <div>
            <x-combobox
              label="Inventory tags"
              v-bind:value.sync="preferences.inventory_tags"
              v-bind:items="preferences.inventory_tags"
              v-bind:route="'inventories'"
            ></x-combobox>
          </div>
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

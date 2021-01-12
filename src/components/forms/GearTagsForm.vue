<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']" fluid>
      <v-row>

        <v-col cols="12" lg="6">
          <div>
            <x-combobox
              label="Gear tags"
              v-bind:value.sync="preferences.gear_tags"
              v-bind:items="preferences.gear_tags"
              v-bind:route="'gear'"
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
    name: 'gear-tags-form',
    components: {
      XCombobox
    },
    data: () => ({
      valid: false,
    }),
  }

</script>

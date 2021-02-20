<template>

  <v-form v-model="valid">
    <v-container fluid v-bind:class="(isMobile ? 'px-4 py-2' : 'px-8 py-6')">
      <v-row style="max-width: 750px">
        <v-col cols="12">
          <x-combobox
            label="gear-tags"
            v-bind:value.sync="preferences.gear_tags"
            v-bind:items="preferences.gear_tags"
            v-bind:route="'gear'"
          ></x-combobox>
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

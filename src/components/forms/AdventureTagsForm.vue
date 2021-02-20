<template>

  <v-form v-model="valid">
    <v-container fluid v-bind:class="(isMobile ? 'px-4 py-2' : 'px-8 py-6')">
      <v-row style="max-width: 750px">
        <v-col cols="12">
          <x-combobox
            label="adventure-tags"
            v-bind:value.sync="preferences.adventure_tags"
            v-bind:items="preferences.adventure_tags"
            v-bind:route="'adventures'"
          ></x-combobox>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>

  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'adventure-tags-form',
    components: {
      XCombobox
    },
    data: () => ({
      valid: false,
    }),
  }

</script>

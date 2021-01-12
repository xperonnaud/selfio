<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']" fluid>
      <v-row>

        <v-col cols="12" lg="6">
          <div>
            <x-combobox
              label="Adventure tags"
              v-bind:value.sync="preferences.adventure_tags"
              v-bind:items="preferences.adventure_tags"
              v-bind:route="'adventures'"
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
    name: 'adventure-tags-form',
    components: {
      XCombobox
    },
    data: () => ({
      valid: false,
    }),
  }

</script>

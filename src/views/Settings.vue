
<template>

  <div v-if="isMounted">

    <v-tabs
      :background-color="xTabsColor"
      :fixed-tabs="isMobile"
    >
      <v-tab>
        <span v-text="'Units & Formats'" />
      </v-tab>
      <v-tab>
        <span v-text="'Interface'" />
      </v-tab>

      <v-tab-item>
        <v-card flat :color="xBackgroundColor">
          <v-card-text v-bind:class="[{'pa-0':isMobile}]">
            <units-formats-form />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat :color="xBackgroundColor">
          <v-card-text v-bind:class="[{'pa-0':isMobile}]">
            <interface-settings-form />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>

</template>

<script>

  import UnitsFormatsForm from "@/components/forms/UnitsFormatsForm";
  import InterfaceSettingsForm from "@/components/forms/InterfaceSettingsForm";

  export default {
    name: "settings",
    components: {
      UnitsFormatsForm,
      InterfaceSettingsForm
    },
    data: () => ({
      isMounted: false,
    }),
    mounted() {
      this.$store.commit("updateUiSaveAction", this.updatePreferences)
      this.isMounted = true;
    }
  }

</script>

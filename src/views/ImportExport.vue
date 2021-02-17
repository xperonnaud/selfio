
<template>

  <div v-if="isMounted">

    <v-tabs
      :background-color="xTabsColor"
      :fixed-tabs="isMobile"
    >
      <v-tab>
        <span v-text="$t('global.export')" />
      </v-tab>
      <v-tab>
        <span v-text="$t('global.import')" />
      </v-tab>

      <v-tab-item>
        <v-card flat :color="xBackgroundColor">
          <v-card-text class="pa-0">
            <export-form />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat :color="xBackgroundColor">
          <v-card-text class="pa-0">
            <import-form />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>

</template>

<script>


  import ExportForm from "@/components/forms/ExportForm";
  import ImportForm from "@/components/forms/ImportForm";

  export default {
    name: "import-export",
    components: {
      ExportForm,
      ImportForm
    },
    data: () => ({
      isMounted: false,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

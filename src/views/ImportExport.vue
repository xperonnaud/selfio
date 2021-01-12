
<template>

  <div v-if="isMounted">

    <v-tabs
      :background-color="xTabsColor"
      :fixed-tabs="isMobile"
    >
      <v-tab>
        <span v-text="'Export'" />
      </v-tab>
      <v-tab>
        <span v-text="'Import'" />
      </v-tab>

      <v-tab-item>
        <v-card flat :color="xBackgroundColor">
          <v-card-text v-bind:class="[{'pa-0':isMobile}]">
            <export-form />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat :color="xBackgroundColor">
          <v-card-text v-bind:class="[{'pa-0':isMobile}]">
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

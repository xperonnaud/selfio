<template>

  <div v-if="isMounted">
    <v-sheet
      max-width="100%"
      color="transparent"
    >
      <v-container fluid class="py-0">
        <v-row>
          <v-col
              cols="12"
              v-bind:class="[
                {'pa-0':isMobile}
            ]"
          >
            <div style="max-width: 750px">
              <password-update-form />
            </div>

          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>

</template>

<script>

  import PasswordUpdateForm from "@/components/forms/PasswordUpdateForm";

  export default {
    name: "account",
    components: {
      PasswordUpdateForm,
    },
    data: () => ({
      isMounted: false,
      tab: 'password',
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

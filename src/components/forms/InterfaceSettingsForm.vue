<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']">
      <v-row>

        <v-col cols="12" sm="6" lg="4">
          <div>
            <div class="text-caption" v-text="'Theme'" />
            <v-btn-toggle v-model="preferences.theme" mandatory dense>
              <v-btn
                v-for="theme in themes"
                :key="theme"
                :value="theme"
                v-html="theme"
                @change="toggleTheme(theme);"
                class="lowercase"
              ></v-btn>
            </v-btn-toggle>
          </div>
        </v-col>

      </v-row>
    </v-container>
  </v-form>

</template>

<script>

  export default {
    name: 'interface-settings-form',
    data: () => ({
      valid: false,

      themes: ['light', 'dark'],
    }),
    methods: {
      async updatePreferences() {
        if(this.preferences)
          this.isAppLoading = true;
          await this.api_patch_preferences(this.preferences);
          this.isAppLoading = false;
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

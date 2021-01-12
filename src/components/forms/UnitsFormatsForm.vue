<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div v-bind:class="[darkColorText('primary')]" v-text="'Units'" />
        </v-col>

        <v-col cols="6" sm="4" lg="3">
          <div>
            <div class="text-caption" v-text="'Weight'" />
            <v-btn-toggle v-model="preferences.weight_unit" mandatory dense>
              <v-btn
                v-for="weightUnit in weightUnits"
                :key="weightUnit"
                :value="weightUnit"
                v-text="weightUnit"
                class="lowercase"
              ></v-btn>
            </v-btn-toggle>
          </div>
        </v-col>

        <v-col cols="6" sm="4" lg="3">
          <div>
            <div class="text-caption" v-text="'Temperature'" />
            <v-btn-toggle v-model="preferences.temperature_unit" mandatory dense>
              <v-btn
                  v-for="temperatureUnit in temperatureUnits"
                  :key="temperatureUnit"
                  :value="temperatureUnit"
                  v-html="temperatureUnit"
                  class="lowercase"
              ></v-btn>
            </v-btn-toggle>
          </div>
        </v-col>

        <v-col cols="6" sm="4" lg="3">
          <div>
            <div class="text-caption" v-text="'Distance'" />
            <v-btn-toggle v-model="preferences.distance_unit" mandatory dense>
              <v-btn
                v-for="distanceUnit in distanceUnits"
                :key="distanceUnit"
                :value="distanceUnit"
                v-text="distanceUnit"
                class="lowercase"
              ></v-btn>
            </v-btn-toggle>
          </div>
        </v-col>

        <v-col cols="6" sm="4" lg="3">
          <div>
            <div class="text-caption" v-text="'Elevation/Depth'" />
            <v-btn-toggle v-model="preferences.elevation_unit" mandatory dense>
              <v-btn
                v-for="elevationUnit in elevationUnits"
                :key="elevationUnit"
                :value="elevationUnit"
                v-text="elevationUnit"
                class="lowercase"
              ></v-btn>
            </v-btn-toggle>
          </div>
        </v-col>

        <v-col cols="6" sm="4">
          <div>
            <div class="text-caption" v-text="'Price'" />
            <v-btn-toggle v-model="preferences.price_unit" mandatory dense>
              <v-btn
                  v-for="priceUnit in priceUnits"
                  :key="priceUnit"
                  :value="priceUnit"
                  v-text="priceUnit"
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
    name: 'units-formats-form',
    data: () => ({
      valid: false,

      priceUnits: ['$', '€', '£', '¥'],
      distanceUnits: ['km', 'mi'],
      elevationUnits: ['m', 'ft'],
      weightUnits: ['g', 'lbs'],
      temperatureUnits: ['&#8451;', '&#8457;'],
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

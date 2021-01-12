
<template>

  <div v-if="isMounted">
    <v-form v-model="valid">
      <v-sheet
        max-width="100%"
        color="transparent"
      >
        <v-container>
          <v-row>
            <v-col cols="12" class="pt-3 pb-0">
              <div v-bind:class="['text-body-1',darkColorText('primary')]" v-text="'Units'" />
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

          <v-row>
            <v-col cols="12" class="pt-3 pb-0">
              <div v-bind:class="['text-body-1',darkColorText('primary')]" v-text="'Interface'" />
            </v-col>

            <v-col cols="12">
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

          <v-row>
            <v-col cols="12">
              <v-btn
                v-bind:class="['elevation-0',{'max-width':isMobile},reversedFontShadeColor]"
                :color="darkColor('primary')"
                :disabled="!valid"
                @click.stop="updatePreferences()"
              >
                <v-icon v-text="'mdi-check'"/>
                <span v-text="'Save'" />
              </v-btn>
            </v-col>
          </v-row>

        </v-container>
      </v-sheet>
    </v-form>
  </div>

</template>

<script>


  export default {
    name: "settings",
    data: () => ({
      valid: false,
      isMounted: false,

      priceUnits: ['$', '€', '£', '¥'],
      distanceUnits: ['km', 'mi'],
      elevationUnits: ['m', 'ft'],
      weightUnits: ['g', 'lbs'],
      temperatureUnits: ['&#8451;', '&#8457;'],

      themes: ['light', 'dark'],

    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

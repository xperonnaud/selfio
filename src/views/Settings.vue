
<template>

  <div v-if="isMounted">
    <v-form v-model="valid">
      <v-sheet
        max-width="100%"
        color="transparent"
      >
        <v-container fluid v-bind:class="(isMobile ? 'pa-4' : 'pa-8')">
          <v-row style="max-width: 750px">
            <v-col cols="12">
              <div>
                <div class="text-caption" v-text="'Weight Unit'" />
                <v-btn-toggle v-model="preferences.weight_unit" mandatory dense tile>
                  <v-btn
                    v-for="weightUnit in weightUnits"
                    :key="weightUnit"
                    :value="weightUnit"
                    v-text="weightUnit"
                    class="lowercase"
                    large
                  ></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <div class="text-caption" v-text="'Temperature Unit'" />
                <v-btn-toggle v-model="preferences.temperature_unit" mandatory dense tile>
                  <v-btn
                    v-for="temperatureUnit in temperatureUnits"
                    :key="temperatureUnit"
                    :value="temperatureUnit"
                    v-html="temperatureUnit"
                    class="lowercase"
                    large
                  ></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <div class="text-caption" v-text="'Distance Unit'" />
                <v-btn-toggle v-model="preferences.distance_unit" mandatory dense tile>
                  <v-btn
                    v-for="distanceUnit in distanceUnits"
                    :key="distanceUnit"
                    :value="distanceUnit"
                    v-text="distanceUnit"
                    class="lowercase"
                    large
                  ></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <div class="text-caption" v-text="'Elevation/Depth Unit'" />
                <v-btn-toggle v-model="preferences.elevation_unit" mandatory dense tile>
                  <v-btn
                    v-for="elevationUnit in elevationUnits"
                    :key="elevationUnit"
                    :value="elevationUnit"
                    v-text="elevationUnit"
                    class="lowercase"
                    large
                  ></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <div class="text-caption" v-text="'Price Unit'" />
                <v-btn-toggle v-model="preferences.price_unit" mandatory dense tile>
                  <v-btn
                    v-for="priceUnit in priceUnits"
                    :key="priceUnit"
                    :value="priceUnit"
                    v-text="priceUnit"
                    class="lowercase"
                    large
                  ></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <div class="text-caption" v-text="'Date Format'" />
                <v-btn-toggle v-model="preferences.date_format" mandatory dense tile>
                  <v-btn
                    v-for="dateFormat in dateFormats"
                    :key="dateFormat"
                    :value="dateFormat"
                    v-text="dateFormat"
                    class="lowercase"
                    large
                  ></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>

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
      weightUnits: ['g/kg', 'oz/lbs'],
      temperatureUnits: ['&#8451;', '&#8457;'],
      dateFormats: ['Day-Month-Year', 'Month-Day-Year', 'Year-Month-Day'],
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

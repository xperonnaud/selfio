
<template>

  <v-sheet v-if="isMounted">
    <v-form v-model="valid">
      <div
        max-width="100%"
        color="transparent"
      >
        <v-container fluid v-bind:class="(isMobile ? 'px-4 py-2' : 'px-8 py-6')">
          <v-row class="row-max-width">
            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.language'))"
                  :items="languages"
                  v-model="preferences.language"
                  @change="setLang(preferences.language)"
                  prepend-inner-icon="mdi-translate"
                  item-text="title"
                  item-value="id"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>
            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.theme'))"
                  :items="themes"
                  v-model="preferences.theme"
                  @change="toggleTheme(preferences.theme)"
                  prepend-inner-icon="mdi-theme-light-dark"
                  item-text="title"
                  item-value="id"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <v-sheet :color="xCardColor" rounded class="pa-2">
                <div class="mb-1">
                  <v-icon class="mr-1" v-text="'mdi-weight'" />
                  <span class="text-subtitle-2">{{$t('global.weight') | capitalizeFilter}}</span>
                  <span class="text-tiny">&nbsp;({{$t('global.unit')}})</span>
                </div>
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
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <v-sheet :color="xCardColor" rounded class="pa-2">
                <div class="mb-1">
                  <v-icon class="mr-1" v-text="'mdi-thermometer'" />
                  <span class="text-subtitle-2">{{$t('global.temperature') | capitalizeFilter}}</span>
                  <span class="text-tiny">&nbsp;({{$t('global.unit')}})</span>
                </div>
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
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <v-sheet :color="xCardColor" rounded class="pa-2">
                <div class="mb-1">
                  <v-icon class="mr-1" v-text="'mdi-map-marker-distance'" />
                <span class="text-subtitle-2">{{$t('global.distance') | capitalizeFilter}}</span>
                <span class="text-tiny">&nbsp;({{$t('global.unit')}})</span>
              </div>
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
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <v-sheet :color="xCardColor" rounded class="pa-2">
                <div class="mb-1">
                  <v-icon class="mr-1" v-text="'mdi-elevation-rise'" />
                  <span class="text-subtitle-2">{{$t('global.elevation') | capitalizeFilter}}/{{$t('global.depth') | capitalizeFilter}}</span>
                  <span class="text-tiny">&nbsp;({{$t('global.unit')}})</span>
                </div>
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
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <v-sheet :color="xCardColor" rounded class="pa-2">
                <div class="mb-1">
                  <v-icon class="mr-1" v-text="'mdi-cash'" />
                  <span class="text-subtitle-2">{{$t('global.price') | capitalizeFilter}}</span>
                  <span class="text-tiny">&nbsp;({{$t('global.unit')}})</span>
                </div>
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
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <v-sheet :color="xCardColor" rounded class="pa-2">
                <div class="mb-1">
                  <v-icon class="mr-1" v-text="'mdi-calendar'" />
                  <span class="text-subtitle-2">{{$t('global.date') | capitalizeFilter}}</span>
                  <span class="text-tiny">&nbsp;({{$t('global.format')}})</span>
                </div>
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
              </v-sheet>
            </v-col>

            <v-col cols="12">
              <primary-btn
                label="save"
                :block="isMobile"
                :valid.sync="valid"
                v-on:btnAction="updatePreferences()"
              ></primary-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-form>
  </v-sheet>

</template>

<script>

  import PrimaryBtn from "@/components/elements/Btns/PrimaryBtn";

  export default {
    name: "settings",
    components: {
      PrimaryBtn
    },
    data: () => ({
      valid: false,
      isMounted: false,

      languages: [
        {id: 'en', title: 'English'},
        {id: 'fr', title: 'Français'},
      ],
      themes: [
        {id: 'light', title: 'Light'},
        {id: 'dark', title: 'Dark'},
      ],
      priceUnits: ['$', '€', '£', '¥'],
      distanceUnits: ['km', 'mi'],
      elevationUnits: ['m', 'ft'],
      weightUnits: ['g', 'oz'],
      temperatureUnits: ['&#8451;', '&#8457;'],
      dateFormats: ['DD-MM-YY', 'MM-DD-YY', 'YY-MM-DD'],
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

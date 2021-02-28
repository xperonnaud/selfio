
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
              <div>
                <v-select
                  :label="xCap($t('global.weight'))+' ('+$t('global.unit')+')'"
                  :items="weightUnits"
                  v-model="preferences.weight_unit"
                  prepend-inner-icon="mdi-weight"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.temperature'))+' ('+$t('global.unit')+')'"
                  :items="temperatureUnits"
                  v-model="preferences.temperature_unit"
                  prepend-inner-icon="mdi-thermometer"
                  hide-details
                  filled
                  dense
                >
                  <template v-slot:item="{ item }">
                    <span v-html="item" />
                  </template>
                  <template v-slot:selection="{ item }">
                    <span v-html="item" />
                  </template>
                </v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.distance'))+' ('+$t('global.unit')+')'"
                  :items="distanceUnits"
                  v-model="preferences.distance_unit"
                  prepend-inner-icon="mdi-map-marker-distance"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.elevation'))+' ('+$t('global.unit')+')'"
                  :items="elevationUnits"
                  v-model="preferences.elevation_unit"
                  prepend-inner-icon="mdi-elevation-rise"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.elevation'))+' ('+$t('global.unit')+')'"
                  :items="elevationUnits"
                  v-model="preferences.elevation_unit"
                  prepend-inner-icon="mdi-elevation-rise"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.price'))+' ('+$t('global.unit')+')'"
                  :items="priceUnits"
                  v-model="preferences.price_unit"
                  prepend-inner-icon="mdi-cash"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-select
                  :label="xCap($t('global.date'))+' ('+$t('global.format')+')'"
                  :items="dateFormats"
                  v-model="preferences.date_format"
                  prepend-inner-icon="mdi-calendar"
                  hide-details
                  filled
                  dense
                ></v-select>
              </div>
            </v-col>

            <v-col v-if="!isMobile" cols="12">
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

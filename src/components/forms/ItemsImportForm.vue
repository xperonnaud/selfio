<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']">
      <v-row>

        <v-col v-if="!isMobile" cols="12">
          <v-data-table
            v-if="gearList && gearList.length > 0"
            v-model="selectedGear"
            :headers="gearHeaders"
            :items="gearList"
            item-key="id"
            show-select
            class="elevation-1"
            :search="gearSearch"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title v-bind:class="[navItemColorText('gear')]"
                >{{$t(`routes.inventories.gear-list`) | capitalizeFirstFilter}}</v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>

                <x-text
                  :label="$t('global.title')"
                  v-bind:value.sync="gearSearch"
                  append-icon="mdi-magnify"
                  class="mx-2"
                ></x-text>

                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>

                <v-icon left v-text="'mdi-database-export'" class="primary-gradient-color-text" />

                <vue-blob-json-csv
                    @success="handleSuccess"
                    @error="handleError"
                    tag-name="div"
                    file-type="json"
                    file-name="gear-list"
                    title="JSON"
                    :data="selectedGear"
                    v-bind:class="[
                        'v-btn v-size--default',
                        {'theme--dark':isDark},
                        {'theme--light':!isDark},
                        'x-primary-btn',
                        'mr-2',
                        'primary-gradient-color'
                    ]"
                ></vue-blob-json-csv>

                <vue-blob-json-csv
                    @success="handleSuccess"
                    @error="handleError"
                    tag-name="div"
                    file-type="csv"
                    file-name="gear-list"
                    title="CSV"
                    :data="selectedGear"
                    v-bind:class="[
                        'v-btn v-size--default',
                        {'theme--dark':isDark},
                        {'theme--light':!isDark},
                        'x-primary-btn',
                        'primary-gradient-color'
                    ]"
                ></vue-blob-json-csv>

              </v-toolbar>
              <v-divider />
            </template>

            <template v-slot:item.brand="{ item }">
              <span
                v-if="item.brand && xGearBrand(item.brand)"
                v-text="xGearBrand(item.brand).title"
                :size="LGI"
              ></span>
            </template>

            <template v-slot:item.category="{ item }">
              <v-avatar v-if="typeof item.category == 'number' && gearCategories[item.category]" :size="LGI" class="x-avatar">
                <x-svg
                  :src="gearCategories[item.category]"
                  svgPath="activities/"
                  :width="XLI"
                  :height="XLI"
                  :tooltipText="xCap($t(`categories.${gearCategories[item.category]}.desc`))"
                ></x-svg>
              </v-avatar>
            </template>

            <template v-slot:item.state="{ item }">
              <v-icon
                v-if="item.state && xGearState(item.state) && xGearState(item.state).color"
                :color="xGearState(item.state).color"
                v-text="'mdi-'+stateIcon(xGearState(item.state).title)"
                :size="MDI"
              />
            </template>

            <template v-slot:item.activity="{ item }">
              <v-chip v-if="typeof item.activity == 'number'" ripple label>
                <v-avatar left class="x-avatar">
                  <x-svg
                    :src="activities[item.activity]"
                    svgPath="activities/"
                    :width="XLI"
                    :height="XLI"
                    :tooltipText="xCap($t(`activities.${activities[item.activity]}.desc`))"
                  ></x-svg>
                </v-avatar>

                {{item.activity.title}}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>

        <v-col v-else cols="12">
          <mobile-only-feature :icon="'responsive'" />
        </v-col>

      </v-row>

    </v-container>
  </v-form>

</template>

<script>

  import XText from "@/components/inputs/fields/XText";
  import XSvg from "@/components/elements/XSvg";
  import MobileOnlyFeature from "@/components/elements/MobileOnlyFeature";

  export default {
    name: 'items-import-form',
    components: {
      XText,
      XSvg,
      MobileOnlyFeature
    },
    data: () => ({
      valid: false,
      selectedGear: [],
      gearSearch: '',
    }),
    computed: {
      gearHeaders() {
        return [
          {text: 'Category', value: 'type', align: 'start'},
          {text: 'Title', value: 'title'},
          {text: 'Description', value: 'description'},
          {text: 'Brand', value: 'brand'},
          {text: 'Weight (g)', value: 'weight'},
          {text: 'Price ('+this.priceUnit+')', value: 'price'},
          {text: 'Size', value: 'size'},
          {text: 'State', value: 'state'},
          {text: 'Purchase', value: 'purchase_date'},
          {text: 'Qty', value: 'quantity_owned'},
        ]
      },
    },
    methods: {
      async updatePreferences() {
        if(this.preferences)
          this.isAppLoading = true;
          await this.api_patch_preferences(this.preferences);
          this.isAppLoading = false;
      },
      handleSuccess() {
        alert('success !');
      },
      handleError() {
        alert('error :-(');
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

</style>

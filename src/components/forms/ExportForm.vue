<template>

  <v-form v-model="valid">
    <v-container fluid v-bind:class="(isMobile ? 'px-4 py-2' : 'px-8 py-6')">
      <v-row>
        <v-col v-if="!isMobile" cols="12">
          <v-data-table
            v-if="gearList && gearList.length > 0"
            v-model="selectedGear"
            :headers="gearHeaders"
            :items="gearList"
            item-key="id"
            show-select
            class="elevation-0"
            :search="gearSearch"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title v-bind:class="[navItemColorText('gear')]"
                >{{$t(`routes.inventories.gear-list`) | capitalizeFirstFilter}}</v-toolbar-title>

                <v-spacer />

                <x-text
                  :label="$t('global.search')"
                  v-bind:value.sync="gearSearch"
                  class="mx-2"
                  appendIcon="mdi-magnify"
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
                        'x-primary-btn white--text',
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
                        'x-primary-btn white--text',
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
              <v-avatar
                v-if="typeof item.category == 'number' && gearCategories[item.category]"
                v-bind:class="[
                  'x-avatar',
                  'py-0',
                   (isMobile ? 'my-0 mr-3' : 'ml-2 mr-5'),
                   (typeof item.category == 'number' ? getReversedVuetifyColor(item.category) : ''),
                ]"
                size="32"
              >
                <x-svg
                  :src="item"
                  svgPath="gearcategories/"
                  :width="SMI"
                  :height="SMI"
                  :tooltipText="xCap($t(`categories.${item}.desc`))"
                ></x-svg>
              </v-avatar>
            </template>

            <template v-slot:item.state="{ item }">
              <v-icon
                v-if="item.state && xGearState(item.state) && xGearState(item.state).color"
                :color="xGearState(item.state).color"
                v-text="`mdi-${stateIcon(xGearState(item.state).title)}`"
                :size="MDI"
              ></v-icon>
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

  import XText from "@/components/inputs/XText";

  export default {
    name: 'items-import-form',
    components: {
      MobileOnlyFeature: () => import('@/components/elements/MobileOnlyFeature'),
      XText,
    },
    data: () => ({
      valid: false,
      selectedGear: [],
      gearSearch: '',
    }),
    computed: {
      gearHeaders() {
        return [
          {text: this.$t('global.category'), value: 'type', align: 'start'},
          {text: this.$t('global.title'), value: 'title'},
          {text: this.$t('global.description'), value: 'description'},
          {text: this.$t('global.brand'), value: 'brand'},
          {text: this.$t('global.weight')+' ('+this.weightUnit+')', value: 'weight'},
          {text: this.$t('global.price')+' ('+this.priceUnit+')', value: 'price'},
          {text: this.$t('global.size'), value: 'size'},
          {text: this.$t('global.state'), value: 'state'},
          {text: this.$t('global.purchase'), value: 'purchase_date'},
          {text: this.$t('global.qty'), value: 'quantity_owned'},
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

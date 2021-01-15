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
                <v-toolbar-title
                  v-bind:class="[navItemColorText('gear')]"
                  v-text="'Gear list'"
                ></v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>

                <v-text-field
                  v-model="gearSearch"
                  label="Search (title)"
                  append-icon="mdi-magnify"
                  class="mx-2"
                  hide-details
                  clearable
                ></v-text-field>

                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>

                <v-icon left v-text="'mdi-database-export'" :color="darkColor('primary')" />

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
                        darkColor('primary')
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
                        darkColor('primary')
                    ]"
                ></vue-blob-json-csv>

              </v-toolbar>
              <v-divider />
            </template>

            <template v-slot:item.brand="{ item }">
              <span
                v-if="item.brand && xGearType(item.brand)"
                v-text="xGearBrand(item.brand).title"
                size="24"
              ></span>
            </template>

            <template v-slot:item.type="{ item }">
              <v-avatar v-if="item.type && xGearType(item.type) && xGearType(item.type).icon" size="24" class="x-avatar">
                <x-img
                  :src="xGearType(item.type).icon.data.full_url"
                  :tooltipText="xGearType(item.type).title"
                />
              </v-avatar>
            </template>

            <template v-slot:item.state="{ item }">
              <v-icon
                v-if="item.state && xGearState(item.state) && xGearState(item.state).color"
                :color="xGearState(item.state).color"
                v-text="'mdi-'+stateIcon(xGearState(item.state).title)"
                size="21"
              />
            </template>

            <template v-slot:item.activity="{ item }">
              <v-chip v-if="item.activity && xActivity(item.activity) && xActivity(item.activity).icon" ripple label>
                <v-avatar left class="x-avatar">
                  <v-img :src="xActivity(item.activity).icon.data.full_url" />
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

  import XImg from "@/components/elements/XImg";
  import MobileOnlyFeature from "@/components/elements/MobileOnlyFeature";

  export default {
    name: 'items-import-form',
    components: {
      XImg,
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
          {text: 'Title/Model', value: 'title'},
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

  .x-primary-btn {
    cursor: pointer;
  }

</style>

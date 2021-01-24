<template>

  <v-row>
    <v-col>
      <v-card v-bind:class="[
          'pa-3',
          {'mx-2':isMobile},
          {'my-3':isMobile},
        ]"
      >
        <div class="table-container-header d-flex grow flex-wrap">
          <div class="table-container-icon-wrapper mr-3">
            <v-sheet height="100%" color="grey lighten-4" class="pa-6 elevation-1 rounded">
              <v-icon v-text="icon" />
            </v-sheet>
          </div>
          <div class="text-h5" v-text="title" />
        </div>

        <v-row>
          <v-col>
            <v-data-table
                v-if="items && items.length > 0"
                :headers="itemHeaders"
                :items="items"
                :item-key="keyName"
                class="elevation-1"
                :search="itemSearch"
                dense
            >
              <template v-slot:top>
                <v-text-field
                  v-model="itemSearch"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </template>

              <template v-slot:item.icon="{ item }">
                <v-avatar v-if="item.icon" size="24">
                  <img :src="assetUrl+item.icon" />
                </v-avatar>
              </template>

              <template v-slot:item.category="{ item }">
                <v-avatar v-if="item.category.icon" size="24">
                  <img :src="assetUrl+item.category.icon" />
                </v-avatar>
              </template>

              <template v-slot:item.state="{ item }">
                <v-icon
                  v-if="item.state && item.state.color"
                  :color="item.state.color"
                  v-text="'mdi-'+stateIcon(item.state.title)"
                  size="21"
                ></v-icon>
              </template>

              <template v-slot:item.color="{ item }">
                <v-avatar
                  size="21"
                  :color="item.color"
                ></v-avatar>
              </template>

              <template v-slot:item.activity="{ item }">
                <v-chip
                  ripple
                  label
                  :color="item.activity.color"
                >
                  <v-avatar v-if="item.activity.icon" left>
                    <v-img :src="assetUrl+item.activity.icon" />
                  </v-avatar>

                  {{item.activity.title}}
                </v-chip>
              </template>

              <template v-slot:item.adventure_inventory="{ item }">
                <v-dialog
                  v-model="item.dialog"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item.adventure_inventory.title }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ item.adventure_inventory.title }} | {{ item.adventure_inventory.id }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        Inventory Gear List goes HERE
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="item.dialog = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="item.dialog = false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>

            </v-data-table>

            <v-alert v-else type="warning" outlined text v-text="'No '+title" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>

  export default {
    name: "table-container",
    props: {
      title: String,
      icon: String,
      items: Array,
      itemHeaders: Array,
      keyName: String
    },
    data: () => ({
      itemSearch: '',
    }),
  }

</script>

<style lang="scss">

  .table-container-header {
    margin-bottom: -16px;
  }

  .table-container-icon-wrapper {
    position: relative;
    top: -22px !important;
  }

</style>

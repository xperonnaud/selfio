<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']">
      <v-row>

        <v-col cols="12" v-bind:class="[{'pa-0':isMobile}]">
          <v-data-table
            v-if="brandsList && brandsList.length > 0"
            :headers="brandHeaders"
            :items="brandsList"
            :search="brandSearch"
            item-key="id"
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title
                  v-bind:class="[darkColorText('primary')]"
                  v-text="'Brand list'"
                ></v-toolbar-title>

                <v-spacer />

                <v-text-field
                  v-model="brandSearch"
                  label="Search (title)"
                  v-bind:class="[(isMobile ? 'mr-0' : 'mx-2')]"
                  hide-details
                  clearable
                  clear-icon="mdi-close"
                  append-icon="mdi-magnify"
                ></v-text-field>

                <v-spacer />

                <v-btn
                  :color="darkColor('primary')"
                  fab
                  icon
                  right
                  bottom
                  @click="openPostDialog()"
                  v-bind:class="[(isMobile ? 'mx-0' : 'mr-1')]"
                >
                  <v-icon :color="darkColorText('primary')" v-text="'mdi-plus'" />
                </v-btn>

              </v-toolbar>
              <v-divider />
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon
                @click="openDeleteDialog(item.id)"
                v-text="'mdi-delete-outline'"
              ></v-icon>
            </template>
          </v-data-table>
        </v-col>

      </v-row>
    </v-container>

    <v-dialog
      v-model="postDialog"
      max-width="750px"
      :hide-overlay="isMobile"
      :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
      persistent
    >
      <v-card
        v-bind:class="[
          {'rounded-0': isMobile},
        ]"
      >
        <v-card-title class="headline">
          <span v-text="'New Brand'" />
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form v-model="valid">
                <v-text-field
                  label="Title"
                  v-model="defaultBrand.title"
                  :rules="xRules.text"
                  :color="darkColor('primary')"
                  @keyup.enter="postBrand()"
                  filled
                  dense
                  hide-details="auto"
                  required
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>

          <v-spacer />

          <v-btn
            @click="postDialog = false"
            v-text="'Cancel'"
            text
          ></v-btn>

          <v-btn
            @click="postBrand()"
            :color="darkColor('primary')"
            :disabled="!valid"
          >
            <v-icon v-text="'mdi-check'" />
            <span v-text="'Add brand'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      max-width="500px"
      :hide-overlay="isMobile"
      :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
      persistent
    >
      <v-card
        v-bind:class="[
          {'rounded-0': isMobile},
        ]"
      >
        <v-card-title class="headline">
          <span v-if="hasBrandRelations" v-text="'Delete is not allowed.'" />
          <span v-else v-text="'You are about to delete an item.'" />
        </v-card-title>

        <v-card-subtitle v-if="hasBrandRelations" class="pt-2">
          <span v-text="'Remove '" />
          <span v-bind:class="[navItemColorText('gear')]" v-text="'gear'" />
          <span v-text="' relations first:'" />
        </v-card-subtitle>

        <v-card-text>
          <v-responsive
            v-if="selectedBrandId && hasBrandRelations"
            class="overflow-y-auto"
            :max-height="300"
          >
            <v-sheet :color="'grey '+(isDark ? 'darken-4' : 'lighten-4')" class="pa-2">
              <template v-for="gear in brandRelations(selectedBrandId)">
                <v-chip
                  :key="`${gear.title}-relation-${gear.id}`"
                  :color="navItemColor('gear')"
                  class="ma-1"
                  label
                  small
                  dark
                  v-text="gear.title"
                ></v-chip>
              </template>
            </v-sheet>
          </v-responsive>

          <div v-else>
            <div v-text="'This action is irreversible.'" />
            <div v-bind:class="[fontShadeColor]" v-text="'Are you sure your wish to go forward with this?'" />
          </div>

        </v-card-text>

        <v-card-actions>

          <v-spacer />

          <v-btn
            @click="deleteDialog = false"
            v-text="'Cancel'"
            text
          ></v-btn>

          <v-btn
            :color="darkColor('red')"
            :disabled="hasBrandRelations"
            @click="deleteBrand()"
          >
            <v-icon left small color="white" v-text="'mdi-alert'" />
            <span v-text="'Delete'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>

</template>

<script>


  export default {
    name: 'brand-settings--form',
    data: () => ({
      valid: false,
      postDialog: false,
      deleteDialog: false,
      hasBrandRelations: false,
      selectedBrandId: null,
      displaySearch: false,
      brandSearch: '',
      defaultBrand: { title: '' }
    }),
    computed: {
      brandHeaders() {
        return [
          {text: 'Title', value: 'title', align: 'start'},
          { text: 'Delete', value: 'actions', align: 'end', sortable: false },
        ]
      },
    },
    methods: {
      async openPostDialog() {
        this.postDialog = true;
      },
      async postBrand() {
        if(this.valid === true) {
          await this.api_post_brand(this.defaultBrand);
          this.postDialog = false;
        }
      },
      async openDeleteDialog(brandId) {
        this.selectedBrandId = brandId;
        this.hasBrandRelations = (this.brandRelations(brandId).length > 0);
        this.deleteDialog = true;
      },
      async deleteBrand() {
        let brandId = this.selectedBrandId;
        let brandIndex = (typeof brandId == 'number') ? this.brandReferences[brandId] : null;
        if(brandIndex)
          await this.api_remove_brand(brandId, brandIndex);
        this.deleteDialog = false;
      },
      brandRelations(brandId) {
        return (this.gearList.filter(gear => {
          return (typeof brandId == 'number' ? (gear.brand === brandId) : false);
        }));
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<template>

  <v-list-item-content>
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 9 : 11" class="py-0">
          <v-list-item-title
            v-text="item.title"
            v-bind:class="[{'text-body-2' : isMobile}]"
          ></v-list-item-title>
      </v-col>

      <v-col v-bind:class="['pa-0']">
        <div class="d-flex align-center justify-center">
          <v-icon
            v-if="item.owner === userId"
            @click.stop="openDeleteDialog(item.id)"
            v-text="'mdi-trash-can-outline'"
          ></v-icon>

          <v-tooltip v-else left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="xOverlayColor"
                v-text="'mdi-lock-outline'"
                v-bind="attrs"
                v-on="on"
                size="18"
              ></v-icon>
            </template>
            <span v-text="'You may only delete a Private Brand (created by you).'" />
          </v-tooltip>
        </div>
      </v-col>
    </v-row>

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
              depressed
              @click="deleteBrand()"
          >
            <v-icon left small :color="(isDark ? 'black' : 'white')" v-text="'mdi-alert'" />
            <span v-bind:class="[reversedFontShadeColor]" v-text="'Delete'" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item-content>

</template>

<script>

  export default {
    name: 'brands-list-item',
    components: {

    },
    data: () => ({
      deleteDialog: false,
      hasBrandRelations: false,
      selectedBrandId: null,
    }),
    methods: {
      async openDeleteDialog(brandId) {
        this.selectedBrandId = brandId;
        this.hasBrandRelations = (this.brandRelations(brandId).length > 0);
        this.deleteDialog = true;
      },
      async deleteBrand() {
        let brandId = this.selectedBrandId;
        let brandIndex = (typeof brandId == 'number') ? this.brandReferences[brandId] : null;

        if(typeof brandIndex == 'number' && (this.userId === this.brandsList[brandIndex].owner))
          await this.api_remove_brand(brandId, brandIndex);

        this.deleteDialog = false;
      },
      brandRelations(brandId) {
        return (this.gearList.filter(gear => {
          return (typeof brandId == 'number' ? (gear.brand === brandId) : false);
        }));
      }
    },
    props: {
      item: Object,
    }
  }

</script>

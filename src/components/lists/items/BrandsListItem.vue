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
            v-if="item.global === false"
            @click.stop="openDeleteDialog(item.id)"
            v-text="'mdi-trash-can-outline'"
          ></v-icon>

          <v-tooltip v-else left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="xCheckerColor"
                v-text="'mdi-lock-outline'"
                v-bind="attrs"
                v-on="on"
                :size="SMI"
              ></v-icon>
            </template>
            {{$t('components.brands-list-item.delete-rule') | capitalizeFirstFilter}}
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
          <span v-if="hasBrandRelations">{{$t('components.brands-list-item.delete-forbidden') | capitalizeFirstFilter}}</span>
          <span v-else>{{$t('components.brands-list-item.delete-warning') | capitalizeFirstFilter}}</span>
        </v-card-title>

        <v-card-subtitle v-if="hasBrandRelations" class="pt-2">
          <span v-text="$t('components.x-delete-dialog.remove-relations')" />
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
            <div v-text="$t('components.x-delete-dialog.irreversible')" />
            <div v-bind:class="[fontShadeColor]" v-text="$t('components.x-delete-dialog.are-you-sure')" />
          </div>

        </v-card-text>

        <v-card-actions>

          <v-spacer />

          <v-btn
              @click="deleteDialog = false"
              v-text="$t('global.cancel')"
              text
          ></v-btn>

          <v-btn
              :color="errorColor"
              :disabled="hasBrandRelations"
              depressed
              @click="deleteBrand()"
          >
            <v-icon left small :color="(isDark ? 'black' : 'white')" v-text="'mdi-alert'" />
            <span v-bind:class="[reversedFontShadeColor]" v-text="$t('global.delete')" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item-content>

</template>

<script>

  export default {
    name: 'brands-list-item',
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

        if(typeof brandIndex == 'number' && (this.brandsList[brandIndex].global === false))
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

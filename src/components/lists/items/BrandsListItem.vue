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
            :color="xCheckerColor"
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
        :max-width="isMobile ? '300' : '450'"
        :hide-overlay="isMobile"
        :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
        persistent
    >
      <v-card :style="'border-top: 2px solid '+errorColor+' !important;'">
        <div class="max-width d-flex align-center justify-center">
          <v-avatar
            :size="48"
            :color="errorColor"
            style="position: absolute; top: -26px;"
          >
            <v-icon
              :size="MDI"
              :color="reversedShadeColor"
              v-text="'mdi-trash-can-outline'"
              style="margin-top: 22px;"
            ></v-icon>
          </v-avatar>
        </div>

        <v-card-title class="text-subtitle-2 mt-3">
          <span v-if="hasBrandRelations">{{$t('components.brands-list-item.delete-forbidden') | capitalizeFirstFilter}}</span>
          <span v-else>{{$t('components.brands-list-item.delete-warning') | capitalizeFirstFilter}}</span>
        </v-card-title>

        <v-card-subtitle v-if="hasBrandRelations" class="pt-2">
          {{t('remove-relations') | capitalizeFirstFilter}}
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
            <div>{{t('are-you-sure') | capitalizeFirstFilter}}</div>
            <div v-bind:class="[fontShadeColor]">{{t('irreversible') | capitalizeFirstFilter}}</div>
          </div>

        </v-card-text>

        <v-card-actions>
          <v-btn
            @click="deleteDialog = false"
            v-text="$t('global.cancel')"
            text
          ></v-btn>

          <v-spacer />

          <v-btn
            :color="errorColor"
            :disabled="hasBrandRelations"
            depressed
            @click="deleteBrand()"
          >
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
      t(str) {
        return this.$t(`components.x-delete-dialog.${str}`)
      },
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

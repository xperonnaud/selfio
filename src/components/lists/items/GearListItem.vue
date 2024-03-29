<template>

    <v-list-item
        @click="openItemDialog(source)"
        class="pl-3"
    >
        <v-list-item-avatar
            v-bind:class="[
              'x-avatar py-0 d-flex  justify-center',
               (isMobile ? 'my-0 ml-1 mr-4' : 'ml-3 mr-5'),
            ]"
            :width="XXLI"
            :height="XXLI"
            :style="(typeof source.category == 'string' ? `border: 2px solid ${categoryColor(source.category)} !important;` : '')+'min-width: unset; padding-bottom: 2px !important;'"
        >
            <x-svg
                v-if="typeof source.category == 'string'"
                :src="source.category"
                svgPath="gearcategories/"
                :width="XSI"
                :height="XSI"
                :tooltipText="xCapFirst($t(`categories.${source.category}.desc`))"
            ></x-svg>

            <unknown-category-icon v-else :size="MDI" />
        </v-list-item-avatar>

        <v-list-item-content>
            <v-row align="center" justify="center">
                <v-col :cols="isMobile ? 7 : 3" class="py-0">
                  <div>
                    <v-list-item-title
                      v-text="xCap(source.title)"
                      v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      v-bind:class="[(source.brand && xGearBrand(source.brand) && xGearBrand(source.brand).title ? 'text-caption' : 'text-tiny-dimmed')]"
                      v-text="(source.brand && xGearBrand(source.brand)) ? xCap(xGearBrand(source.brand).title) : '.'"
                    ></v-list-item-subtitle>
                  </div>
                </v-col>

                <x-weight-col :weight="source.weight" />

                <template v-if="!isMobile">
                  <v-col class="x-col">
                    <div v-if="source.price">
                      <span class="text-caption" v-text="source.price" />
                      <span class="text-tiny-dimmed" v-text="priceUnit" />
                    </div>
                    <empty-data solo v-else />
                  </v-col>

                  <v-col class="x-col">
                    <div v-if="source.purchase_date">
                      <span class="text-caption">{{source.purchase_date | minimalDateFilter(dateFormatPref)}}</span>
                    </div>
                    <empty-data solo v-else />
                  </v-col>

                  <x-update-col :item="source" />

                  <v-col class="x-col">
                    <v-tooltip v-if="source.state && xGearState(source.state)" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :color="xGearState(source.state).color"
                          v-text="'mdi-'+stateIcon(xGearState(source.state).title)"
                          :size="SMI"
                          v-bind="attrs"
                          v-on="on"
                        ></v-icon>
                      </template>
                      <span v-text="$t(`states.${xGearState(source.state).title}`)" />
                    </v-tooltip>
                    <empty-data solo v-else />
                  </v-col>

                    <v-col class="x-col d-flex justify-center align-center">
                        <x-consumable-icon
                            v-if="source.consumable"
                            small
                        ></x-consumable-icon>
                        <empty-data solo v-else />
                    </v-col>
                </template>

                <v-col class="x-col">
                  <div v-bind:class="['ml-1', nullOrZeroColorText(source.quantity_owned)]">
                    <span
                      v-bind:class="['text-caption']"
                      v-html="source.quantity_owned ? source.quantity_owned : 0"
                    ></span>
                  </div>
                </v-col>

                <v-col cols="1" class="pa-0">
                  <div class="mx-3">
                    <edit-icon v-bind:class="['edit-icon', {'mx-4' : !isMobile}]" />
                  </div>
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item>

</template>

<script>

    import XConsumableIcon from "@/components/elements/Icons/ConsumableIcon";
    import XUpdateCol from "@/components/xcols/XUpdateCol";
    import XWeightCol from "@/components/xcols/XWeightCol";
    import EmptyData from "@/components/elements/EmptyData";
    import EditIcon from "@/components/elements/Icons/EditIcon";
    import UnknownCategoryIcon from "@/components/elements/Icons/UnknownCategoryIcon";

  export default {
    name: 'gear-list-item',
    components: {
      XConsumableIcon,
      XUpdateCol,
      XWeightCol,
      EmptyData,
      EditIcon,
      XSvg: () => import('@/components/elements/Icons/XSvg'),
      UnknownCategoryIcon
    },
    props: {
      source: {
          type: Object,
          default () {
              return {}
          }
      }
    },
    data: () => ({
      isMounted: false,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

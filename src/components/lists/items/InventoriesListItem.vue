<template>

  <v-list-item
    @click="openItemDialog(source)"
    class="pl-3"
  >
    <v-list-item-content :class="['pl-1']">
      <v-row align="center" justify="center">
        <v-col :cols="isMobile ? 7 : 6" class="py-0">
          <v-list-item-title
            v-text="xCap(source.title)"
            v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
          ></v-list-item-title>

          <v-list-item-subtitle
            v-bind:class="[(source.description ? 'text-caption' : 'text-tiny-dimmed')]"
            v-text="source.description ? xCapFirst(source.description) : '.'"
          ></v-list-item-subtitle>
        </v-col>

          <v-col class="x-col">
            <div v-if="source.inventory_gear" class="ml-1">
              <span class="text-caption">{{ sumInventoryQuantityPacked(source.inventory_gear) }}</span>
            </div>
            <empty-data solo v-else />
          </v-col>

          <v-col class="x-col">
            <div v-if="source.inventory_gear">
              <span class="text-caption">{{ sumInventoryWeight(source.inventory_gear) | weightUnitFilter(weightUnit) }}</span>
              <span class="text-tiny-dimmed" v-text="dynamicWeightUnit(sumInventoryWeight(source.inventory_gear))" />
            </div>
            <empty-data solo v-else />
          </v-col>

          <template v-if="!isMobile">
            <v-col class="x-col">
              <div v-if="source.inventory_gear">
                <span class="text-caption">{{ sumInventoryPrice(source.inventory_gear) | thousandthFilter }}</span>
                <span class="text-tiny-dimmed" v-text="'k'+priceUnit" />
              </div>
              <empty-data solo v-else />
            </v-col>

            <x-update-col :item="source" />
          </template>

        <v-col cols="1" class="pa-0">
          <div class="mx-3">
            <edit-icon v-bind:class="['edit-icon', {'mx-4': !isMobile}]" />
          </div>
        </v-col>

      </v-row>
    </v-list-item-content>
  </v-list-item>

</template>

<script>

  import XUpdateCol from "@/components/xcols/XUpdateCol";
  import EmptyData from "@/components/elements/EmptyData";
  import EditIcon from "@/components/elements/Icons/EditIcon";

  export default {
    name: 'inventories-list-item',
    components: {
      XUpdateCol,
      EmptyData,
      EditIcon,
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

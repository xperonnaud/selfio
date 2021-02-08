<template>

  <v-list-item
    v-on:click="$emit('itemAction',gear.gear_id)"
    v-bind:class="[
      'x-checklist-item',
      {'px-3':isMobile}
    ]"
  >
    <v-list-item-action :class="['ml-1',(isMobile ? 'mr-0' : ' mr-4')]">
      <x-checker
        :key="`gear-packed-checker-${gear.gear_id}-${updatedItem.packed_gear ? updatedItem.packed_gear.length : 0}`"
        :value="(updatedItem.packed_gear && updatedItem.packed_gear.includes(gear.gear_id))"
      />
    </v-list-item-action>

    <v-list-item-avatar
      v-bind:class="['x-avatar my-0 mr-2 d-flex justify-center']"
      :width="XXLI"
      :min-width="XXLI"
      :height="XXLI"
      :style="xGear(gear.gear_id).category ? `border: 2px solid ${categoryColor(xGear(gear.gear_id).category)} !important;` : ''"
    >
      <x-img
        v-if="xGear(gear.gear_id) && xGear(gear.gear_id).category"
        :src="xGearCategory(xGear(gear.gear_id).category).icon"
        :tooltipText="gear.gear_id"
        :width="XSI"
        :height="XSI"
        isCategory
      ></x-img>

      <x-unknown-category-icon v-else :size="SMI" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-row align="center" justify="center">
        <v-col :cols="isMobile ? 6 : 4" class="py-0">
          <div v-if="xGear(gear.gear_id)">
            <v-list-item-title
              v-text="xCap(xGear(gear.gear_id).title)"
              v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
            ></v-list-item-title>

            <v-list-item-subtitle
              class="text-caption"
              v-text="xGear(gear.gear_id).brand ? xCap(xGearBrand(xGear(gear.gear_id).brand).title) : '.'"
            ></v-list-item-subtitle>
          </div>
        </v-col>

        <x-weight-col
          v-if="!isMobile"
          :hasGear="typeof xGear(gear.gear_id) == 'object'"
          :weight="xGear(gear.gear_id).weight"
        />

        <v-col v-if="!isMobile" class="x-col">
          <div v-if="xGear(gear.gear_id) && xGear(gear.gear_id).price" >
            <span class="text-caption" v-text="xGear(gear.gear_id).price" />
            <span class="text-tiny-dimmed" v-text="priceUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col v-if="!isMobile" class="x-col">
          <v-tooltip v-if="xGear(gear.gear_id) && xGear(gear.gear_id).state && xGearState(xGear(gear.gear_id).state)" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="xGearState(xGear(gear.gear_id).state).color"
                class="pa-2"
                v-text="`mdi-${stateIcon(xGearState(xGear(gear.gear_id).state).title)}`"
                :size="SMI"
                v-bind="attrs"
                v-on="on"
              ></v-icon>
            </template>
            <span v-text="xGearState(xGear(gear.gear_id).state).title" />
          </v-tooltip>
          <empty-data solo v-else />
        </v-col>

        <v-col v-if="!isMobile" class="x-col">
          <div v-if="xGear(gear.gear_id).consumable">
            <x-consumable-icon small />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="gear.gear_worn">
            <x-worn-icon small />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div>
            <span class="text-caption" v-html="gear.gear_quantity_packed ? gear.gear_quantity_packed : 0" />
          </div>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>

</template>

<script>

  import XImg from "@/components/elements/XImg";
  import XWeightCol from "@/components/xcols/XWeightCol";
  import XChecker from "@/components/inputs/XChecker";
  import EmptyData from "@/components/elements/EmptyData";
  import XWornIcon from "@/components/elements/Icons/XWornIcon";
  import XConsumableIcon from "@/components/elements/Icons/XConsumableIcon";
  import XUnknownCategoryIcon from "@/components/elements/Icons/XUnknownCategoryIcon";

  export default {
    name: 'adventure-gear-list-item',
    components: {
      XImg,
      XWeightCol,
      XChecker,
      EmptyData,
      XWornIcon,
      XConsumableIcon,
      XUnknownCategoryIcon,
    },
    props: {
      gear: Object,
      updatedItem: Object,
    },
    data: () => ({
      isMounted: false,
    }),d() {
      this.isMounted = true;
    }
  }

</script>

<template>

  <v-list-item
    v-on:click="$emit('itemAction', gear)"
    v-bind:class="[
      'x-checklist-item',
      {'px-3':isMobile}
    ]"
  >
    <v-list-item-action :class="['ml-1',(isMobile ? 'mr-0' : ' mr-4')]">
      <x-checker :value="inventoryGearList.includes(gear.id)" :disabled="gear.quantity_owned === 0" />
    </v-list-item-action>

    <v-list-item-avatar
      v-bind:class="['x-avatar my-0 mr-2 d-flex justify-center']"
      :width="XXLI"
      :min-width="XXLI"
      :height="XXLI"
      :style="typeof gear.category == 'string' ? 'border: 2px solid '+(gear.quantity_owned === 0 ? xInputColor : categoryColor(gear.category))+' !important;' : ''"
    >
      <x-svg
        v-if="typeof gear.category == 'string' && gear.category"
        :src="gear.category"
        svgPath="gearcategories/"
        :width="XSI"
        :height="XSI"
        :tooltipText="xCap($t(`categories.${gear.category}.desc`))"
      ></x-svg>

      <unknown-category-icon v-else :size="SMI" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-row align="center" justify="center" :class="[{'text--disabled':gear.quantity_owned === 0}]">
        <v-col :cols="isMobile ? 6 : 3" class="py-0">
          <div>
            <v-list-item-title v-bind:class="['mb-1',{'text-body-2' : isMobile}]" v-text="xCap(gear.title)" />

            <v-list-item-subtitle
              v-if="!isMobile"
              v-bind:class="[(gear.quantity_owned === 0 ? 'text--disabled' : 'text-caption')]"
              v-text="gear.brand && xGearBrand(gear.brand) ? xCap(xGearBrand(gear.brand).title) : '.'"
            ></v-list-item-subtitle>

            <v-list-item-subtitle
              v-else-if="!gear.consumable && !(inventoryGear && inventoryGear.gear_worn)"
              v-text="'.'"
            ></v-list-item-subtitle>

            <v-list-item-subtitle v-else>
              <consumable-icon
                v-if="gear.consumable"
                :size="12"
                :disabled="gear.quantity_owned === 0"
              ></consumable-icon>

              <worn-icon
                v-if="inventoryGear && inventoryGear.gear_worn"
                :size="12"
                :disabled="gear.quantity_owned === 0"
              ></worn-icon>
            </v-list-item-subtitle>
          </div>
        </v-col>

        <x-weight-col :weight="gear.weight" :disabled="gear.quantity_owned === 0" />

        <v-col v-if="!isMobile" class="x-col">
          <div v-if="gear.price">
            <span class="text-caption" v-text="gear.price" />
            <span class="text-tiny-dimmed" v-text="priceUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col v-if="!isMobile" class="x-col">
          <v-tooltip v-if="gear.state && xGearState(gear.state)" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="xGearState(gear.state).color"
                v-text="'mdi-'+stateIcon(xGearState(gear.state).title)"
                :size="SMI"
                v-bind="attrs"
                v-on="on"
              ></v-icon>
            </template>
            <span v-text="$t(`states.${xGearState(gear.state).title}`)" />
          </v-tooltip>
          <empty-data solo v-else />
        </v-col>

        <v-col v-if="!isMobile" class="x-col">
          <div
            v-if="gear.consumable === true"
            :key="`gear_consumable-${gear.id}-${gear.consumable}`"
          >
            <consumable-icon css="margin-bottom: 3px;" :disabled="gear.quantity_owned === 0" small />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col v-if="!isMobile" class="x-col">
          <div
            v-if="inventoryGear && inventoryGear.gear_worn === true"
            :key="`gear_worn-${gear.id}-${inventoryGear.gear_worn}`"
          >
            <worn-icon css="margin-bottom: 3px;" :disabled="gear.quantity_owned === 0" small />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-bind:class="['ml-1']">
            <template v-if="gear.quantity_owned > 0">
              <span
                v-if="inventoryGear"
                :key="`gear_quantity_packed-${gear.id}-${inventoryGear.gear_quantity_packed}`"
                class="text-body-2"
                v-html="inventoryGear.gear_quantity_packed || 0"
              ></span>
              <span v-else :class="['text-body-2']" v-text="'0'" />

              <span v-bind:class="['text-tiny-dimmed']" v-text="'/'" />
            </template>

            <span
              v-bind:class="[(gear.quantity_owned > 0 ? 'text-tiny-dimmed' : 'text-body-2'), nullOrZeroColorText(gear.quantity_owned)]"
              v-text="(gear.quantity_owned || 0)"
            ></span>
          </div>
        </v-col>
      </v-row>
    </v-list-item-content>

    <v-list-item-action style="margin-right: 0 !important;">
      <v-btn
        :disabled="!inventoryGearList.includes(gear.id)"
        v-on:click.stop="$emit('inventoryGearAction', gear)"
        :loading="isMenuLoading"
        icon
      >
        <poly-icon
          :disabled="!inventoryGearList.includes(gear.id)"
          icon="mdi-dots-vertical"
        ></poly-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>

</template>

<script>

  import PolyIcon from "@/components/elements/Icons/PolyIcon";
  import XSvg from "@/components/elements/Icons/XSvg";
  import XWeightCol from "@/components/xcols/XWeightCol";
  import XChecker from "@/components/inputs/XChecker";
  import EmptyData from "@/components/elements/EmptyData";
  import WornIcon from "@/components/elements/Icons/WornIcon";
  import ConsumableIcon from "@/components/elements/Icons/ConsumableIcon";
  import UnknownCategoryIcon from "@/components/elements/Icons/UnknownCategoryIcon";

  export default {
    name: 'inventory-gear-list-item',
    components: {
      PolyIcon,
      XSvg,
      XWeightCol,
      XChecker,
      EmptyData,
      WornIcon,
      ConsumableIcon,
      UnknownCategoryIcon,
    },
    props: {
      gear: Object,
      inventoryGear: Object,
      inventoryGearList: Array,
      index: {Number, String},
    },
    data: () => ({
      isMounted: false,
      isMenuLoading: false,
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

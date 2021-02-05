<template>

  <v-list-item-content>
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 4 : 3" class="py-0">
        <div>
          <v-list-item-title
            v-text="item.title"
            v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
          ></v-list-item-title>

          <v-list-item-subtitle
            v-bind:class="[(item.brand && xGearBrand(item.brand).title ? 'text-caption' : 'text-tiny-dimmed')]"
            v-text="item.brand ? xGearBrand(item.brand).title : '.'"
          ></v-list-item-subtitle>
        </div>
      </v-col>

      <x-weight-col :weight="item.weight" />

      <template v-if="!isMobile">
        <v-col class="x-col">
          <div v-if="item.price">
            <span class="text-caption" v-text="item.price" />
            <span class="text-tiny-dimmed" v-text="priceUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="item.purchase_date">
            <span class="text-caption">{{item.purchase_date | minimalDateFilter(dateFormatPref)}}</span>
          </div>
          <empty-data solo v-else />
        </v-col>

        <x-update-col :item="item" />

        <v-col class="x-col">
          <v-tooltip v-if="item.state && xGearState(item.state)" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="xGearState(item.state).color"
                v-text="'mdi-'+stateIcon(xGearState(item.state).title)"
                :size="SMI"
                v-bind="attrs"
                v-on="on"
              ></v-icon>
            </template>
            <span v-text="xGearState(item.state).title" />
          </v-tooltip>
          <empty-data solo v-else />
        </v-col>
      </template>

      <v-col class="x-col">
        <x-consumable-icon
          v-if="item.consumable"
          small
        ></x-consumable-icon>
        <empty-data solo v-else />
      </v-col>

      <v-col class="x-col">
        <div v-bind:class="['ml-1', nullOrZeroColorText(item.quantity_owned)]">
          <span
            v-bind:class="['text-caption']"
            v-html="item.quantity_owned ? item.quantity_owned : 0"
          ></span>
        </div>
      </v-col>

      <v-col cols="1" class="pa-0">
        <div class="mx-3">
          <edit-icon v-bind:class="[{'mx-4' : !isMobile}]" :style="'padding: 9px 0'" />
        </div>
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import XConsumableIcon from "@/components/elements/Icons/XConsumableIcon";
  import XUpdateCol from "@/components/xcols/XUpdateCol";
  import XWeightCol from "@/components/xcols/XWeightCol";
  import EmptyData from "@/components/elements/EmptyData";
  import EditIcon from "@/components/elements/Icons/EditIcon";

  export default {
    name: 'gear-list-item',
    components: {
      XConsumableIcon,
      XUpdateCol,
      XWeightCol,
      EmptyData,
      EditIcon,
    },
    props: {
      item: Object,
    }
  }

</script>

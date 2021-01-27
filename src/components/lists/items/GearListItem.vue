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
            class="text-caption"
            v-text="item.brand ? xGearBrand(item.brand).title : '.'"
          ></v-list-item-subtitle>
        </div>
      </v-col>

      <v-col v-if="isMobile" class="x-col">
        <div v-if="item.weight">
          <span v-if="item.weight < 1000" class="text-caption">{{ item.weight | weightUnitFilter(weightUnit) }}</span>
          <span v-else class="text-caption">{{ item.weight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
          <span class="text-tiny-dimmed" v-text="item.weight < 1000 ? weightUnit : supWeightUnit" />
        </div>
        <empty-data solo v-else />
      </v-col>

      <template v-else>
        <v-col class="x-col">
          <div v-if="item.weight">
            <span v-if="item.weight < 1000" class="text-body-2">{{ item.weight | weightUnitFilter(weightUnit) }}</span>
            <span v-else class="text-body-2">{{ item.weight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
            <span class="text-tiny-dimmed" v-text="weightUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="item.price">
            <span class="text-body-2" v-text="item.price" />
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

        <v-col class="x-col">
          <div v-if="item.date_updated || item.date_created">
            <span v-if="item.date_updated" class="text-caption">{{item.date_updated | minimalDateFilter(dateFormatPref)}}</span>
            <span v-else class="text-caption">{{item.date_created | minimalDateFilter(dateFormatPref)}}</span>
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <v-tooltip v-if="item.state && xGearState(item.state)" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="xGearState(item.state).color"
                v-text="'mdi-'+stateIcon(xGearState(item.state).title)"
                :size="21"
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
        <v-icon
          v-if="item.consumable"
          v-text="'mdi-apple'"
          class="primary-gradient-color-text"
          style="margin-bottom: 3px;"
          small
        ></v-icon>
        <empty-data solo v-else />
      </v-col>

      <v-col class="x-col">
        <div v-bind:class="['ml-1', nullOrZeroColorText(item.quantity_owned)]">
          <span class="text-tiny" v-html="'&#215;'" />
          <span
            v-bind:class="[isMobile ? 'text-caption' : 'text-body-2']"
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

  import EmptyData from "@/components/elements/Stepper/EmptyData";
  import EditIcon from "@/components/elements/EditIcon";

  export default {
    name: 'gear-list-item',
    components: {
      EmptyData,
      EditIcon,
    },
    props: {
      item: Object,
    }
  }

</script>

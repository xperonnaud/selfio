<template>

  <v-list-item-content>
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 7 : 6" class="py-0">
        <v-list-item-title
          v-text="item.title"
          v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
        ></v-list-item-title>

        <v-list-item-subtitle
          v-bind:class="[(item.description ? 'text-caption' : 'text-tiny-dimmed')]"
          v-text="item.description ? item.description : '.'"
        ></v-list-item-subtitle>
      </v-col>

        <v-col class="x-col">
          <div v-if="item.inventory_gear" class="ml-1 text-caption">
            <span class="text-body-2">{{ sumInventoryQuantityOwned(item.inventory_gear) }}</span>
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="item.inventory_gear">
            <span class="text-body-2">{{ sumInventoryWeight(item.inventory_gear) }}</span>
            <span class="text-tiny-dimmed" v-text="supWeightUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <template v-if="!isMobile">
          <v-col class="x-col">
            <div v-if="item.inventory_gear">
              <span class="text-body-2">{{ sumInventoryPrice(item.inventory_gear) | thousandthFilter }}</span>
              <span class="text-tiny-dimmed" v-text="'k'+priceUnit" />
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
        </template>

      <v-col cols="1" class="pa-0">
        <div class="mx-3">
          <edit-icon v-bind:class="[{'mx-4': !isMobile}]" :style="'padding: 9px 0'" />
        </div>
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import EmptyData from "@/components/elements/Stepper/EmptyData";
  import EditIcon from "@/components/elements/EditIcon";

  export default {
    name: 'inventories-list-item',
    components: {
      EmptyData,
      EditIcon
    },
    props: {
      item: Object,
    }
  }

</script>

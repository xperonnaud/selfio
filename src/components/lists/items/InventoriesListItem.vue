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
          v-text="item.description ? item.description : '-'"
        ></v-list-item-subtitle>
      </v-col>

      <template v-if="item.inventory_gear">
        <v-col class="x-col">
          <div class="ml-1 text-caption">
            <span class="text-body-2" v-text="item.inventory_gear.length" />
            <span class="text-tiny-dimmed" v-text="' item'+(item.inventory_gear.length>0?'s':'')" />
          </div>
        </v-col>

        <v-col v-if="isMobile" class="x-col text-caption stacked-item-data">
          <div>
            <span>{{ sumInventoryPrice(item.inventory_gear) | thousandthFilter }}</span>
            <span class="text-tiny-dimmed" v-text="'k'+priceUnit" />
          </div>
          <div>
            <span>{{ sumInventoryWeight(item.inventory_gear) | thousandthFilter }}</span>
            <span class="text-tiny-dimmed" v-text="'k'+weightUnit" />
          </div>
        </v-col>

        <template v-else>
          <v-col class="x-col">
            <div>
              <span class="text-body-2">{{ sumInventoryPrice(item.inventory_gear) | thousandthFilter }}</span>
              <span class="text-tiny-dimmed" v-text="'k'+priceUnit" />
            </div>
          </v-col>

          <v-col class="x-col">
            <div>
              <span class="text-body-2">{{ sumInventoryWeight(item.inventory_gear) | thousandthFilter }}</span>
              <span class="text-tiny-dimmed" v-text="'k'+weightUnit" />
            </div>
          </v-col>
        </template>
      </template>

      <v-col cols="1" class="pa-0">
        <div class="mx-3">
          <edit-icon v-bind:class="[{'mx-4' : !isMobile}]" :style="'padding: 9px 0'" />
        </div>
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import EditIcon from "@/components/elements/EditIcon";

  export default {
    name: 'inventories-list-item',
    components: {
      EditIcon
    },
    props: {
      item: Object,
    }
  }

</script>

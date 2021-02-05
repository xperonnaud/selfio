<template>

  <v-card
    v-bind:class="['shadow-bottom max-width']"
    :color="xCardColor"
  >
    <v-list class="py-0">
      <v-list-item
        v-on:click="$emit('cardAction')"
        one-line
        v-ripple
      >
        <v-list-item-content class="no-wrap">
          <v-list-item-title v-text="'Gear list'" />

          <v-list-item-subtitle>
            <div class="d-flex text-caption">
              <span :class="['font-weight-bold', currentColorText]">
                {{ inventoryTotalWeight | weightUnitFilter(weightUnit) }}
              </span>
              <span
                :key="`weight-unit-${randomId()}-${inventoryTotalWeight}`"
                v-text="dynamicWeightUnit(inventoryTotalWeight)"
                class="ml-1"
              ></span>

              <span class="mx-2 text--disabled" v-text="'-'" />

              <span
                v-bind:class="[currentColorText]"
                v-text="(currentInventoryGear ? currentInventoryGear.length : 0)"
              ></span>
              <span
                class="ml-1"
                v-text="' Item'+((currentInventoryGear ? currentInventoryGear.length : 0) > 1 ? 's':'')"
              ></span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="d-flex no-wrap align-center justify-center ma-0">
          <v-btn
            v-bind:class="[reversedFontShadeColor, 'elevation-0', 'primary-gradient-color']"
            x-small
            fab
            depressed
          >
            <v-icon :size="SMI" v-text="'mdi-pencil'" />
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>

  export default {
    name: 'inventory-gear-card',
    props: {
      inventoryTotalWeight: Number,
      currentInventoryGear: [Array, Object],
    },
  }

</script>

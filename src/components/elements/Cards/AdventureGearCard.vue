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
          <v-list-item-title v-text="'Gear checklist'" />

          <v-list-item-subtitle>
            <div>
              <div class="d-flex text-caption justify-space-between font-weight-regular">
                <div>
                  <span v-bind:class="[navItemColorText('inventories')]" v-text="updatedItem.packed_gear ? updatedItem.packed_gear.length : 0" />
                  <span class="text-tiny" v-text="' / '" />
                  <span v-bind:class="[navItemColorText('inventories')]" v-text="originalInventoryGear.length" />
                  <span class="text-tiny" v-text="' packed'" />
                </div>

                <div>
                  <span v-bind:class="[navItemColorText('inventories')]">
                    {{ packedGearRatio | roundIntFilter }}
                  </span>
                  <span v-text="'%'" />
                </div>
              </div>

              <v-progress-linear
                v-if="(typeof packedGearRatio == 'number')"
                :key="`gear-checklist-${updatedItem.adventure_inventory}`"
                :value="roundedPackedGearRatio"
                :color="navItemColor('inventories')"
                :background-color="xProgressColor"
                :height="3"
                class="rounded"
              ></v-progress-linear>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="d-flex no-wrap align-center justify-center">
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
    name: 'adventure-gear-card',
    props: {
      updatedItem: Object,
      originalInventoryGear: [Array, Object],
      packedGearRatio: Number,
      roundedPackedGearRatio: Number,
    },
  }

</script>

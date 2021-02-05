<template>

  <x-action-card
    title="Gear checklist"
    v-on:xCardAction="$emit('cardAction')"
  >
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
  </x-action-card>

</template>

<script>

  import XActionCard from "@/components/elements/Cards/XActionCard";

  export default {
    name: 'adventure-gear-card',
    components: {
      XActionCard
    },
    props: {
      updatedItem: Object,
      originalInventoryGear: [Array, Object],
      packedGearRatio: Number,
      roundedPackedGearRatio: [Number, String],
    },
  }

</script>

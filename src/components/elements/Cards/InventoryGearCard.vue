<template>

  <x-action-card
    :title="t('gear-list')"
    v-on:xCardAction="$emit('cardAction')"
  >
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
        v-text="' '+t(`global.unique-item${(currentInventoryGear ? currentInventoryGear.length : 0) > 1 ? 's':''}`)"
      ></span>
    </div>
  </x-action-card>

</template>

<script>

  import XActionCard from "@/components/elements/Cards/XActionCard";

  export default {
    name: 'inventory-gear-card',
    components: {
      XActionCard
    },
    props: {
      inventoryTotalWeight: Number,
      currentInventoryGear: [Array, Object],
    },
    methods: {
      t(str) {
        return this.$t(`components.inventory-gear-card.${str}`);
      }
    }
  }

</script>

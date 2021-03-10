<template>

  <v-select
      v-model="pickerValue"
      :label="xCap($t(`global.${label}`))"
      :items="list"
      :color="currentColor"
      item-text="title"
      item-value="id"
      hide-details="auto"
      clearable
      filled
      dense
      @click:clear="$nextTick(() => resetValue())"
  >
    <template v-slot:selection="data">
      <div
        color="transparent"
        v-bind="data.attrs"
        :input-value="data.selected"
        @click.stop="data.select"
      >
        <v-avatar
          v-if="data.item.icon"
          width="21"
          height="21"
          class="x-avatar"
          tile
          left
        >
          <x-img
            :src="data.item.icon"
            :logo="logo"
            :tooltipText="data.item.title"
          ></x-img>
        </v-avatar>

        <div class="d-flex justify-space-between">
          <div>{{ xCap(data.item.title) }}</div>

          <div class="d-flex text-tiny">
            <template v-if="data.item.inventory_gear">
              <div class="text-right" :style="itemPropWidth">
                <span class="text-caption">{{ data.item.inventory_gear.length }}</span>
                <span class="text-tiny-dimmed" v-text="` item${pluralizeStr(data.item.inventory_gear.length)}`" />
              </div>

              <x-divider />

              <div class="text-center" :style="itemPropWidth">
                <span class="text-caption">{{ sumInventoryWeight(data.item.inventory_gear) | weightUnitFilter(weightUnit) }}</span>
                <span class="text-tiny-dimmed" v-text="dynamicWeightUnit(sumInventoryWeight(data.item.inventory_gear))" />
              </div>

              <template v-show="!isMobile">
                <v-divider vertical class="mx-2" />

                <div class="text-center" style="width:70px;">
                  <span class="text-caption">{{ parseInt(sumInventoryPrice(data.item.inventory_gear)) }}</span>
                  <span class="text-tiny-dimmed" v-text="priceUnit" />
                </div>
              </template>
            </template>

            <template v-else>
              <div class="text-right">
                <span class="text-caption">({{ $t('global.empty') }})</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:item="data">
      <div
        color="transparent"
        v-bind="data.attrs"
        :input-value="data.selected"
        class="max-width"
        style="height: 48px !important; padding-top: 10px !important;"
      >
        <v-avatar
          v-if="data.item.icon"
          width="21"
          height="21"
          class="x-avatar"
          tile
          left
        >
          <x-img
            :src="data.item.icon"
            :logo="logo"
            :tooltipText="data.item.title"
          ></x-img>
        </v-avatar>

        {{ xCap(data.item.title) }}

        <div class="d-flex float-right text-tiny pt-1">
          <template v-if="data.item.inventory_gear">
            <div class="text-right" :style="itemPropWidth">
              <span class="text-caption">{{ data.item.inventory_gear.length }}</span>
              <span class="text-tiny-dimmed" v-text="` item${pluralizeStr(data.item.inventory_gear.length)}`" />
            </div>

            <x-divider />

            <div class="text-center" :style="itemPropWidth">
              <span class="text-caption">{{ sumInventoryWeight(data.item.inventory_gear) | weightUnitFilter(weightUnit) }}</span>
              <span class="text-tiny-dimmed" v-text="dynamicWeightUnit(sumInventoryWeight(data.item.inventory_gear))" />
            </div>

            <template v-show="!isMobile">
              <v-divider vertical class="mx-2" />

              <div class="text-center" style="width:70px;">
                <span class="text-caption">{{ parseInt(sumInventoryPrice(data.item.inventory_gear)) }}</span>
                <span class="text-tiny-dimmed" v-text="priceUnit" />
              </div>
            </template>
          </template>

          <template v-else>
            <div class="text-right">
              <span class="text-caption">({{ $t('global.empty') }})</span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </v-select>

</template>

<script>

  import XDivider from "@/components/elements/XDivider";
  import XImg from "@/components/elements/XImg";

  export default {
    name: 'inventory-selector',
    components: {
      XDivider,
      XImg
    },
    props: {
      list: Array,
      label: String,
      value: Number,
      type: {
        type: String,
        default: null
      },
      logo: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
    }),
    computed: {
      itemPropWidth() {
        return (`width: ${this.isMobile ? '45' : '70'}px`);
      }
    },
    methods: {
      resetValue() {
        this.pickerValue = null;
      }
    },
    watch: {
      value(val) {
        if(this.isMounted)
          this.pickerValue = val;
      },
      pickerValue(val) {
        if(this.isMounted)
          this.$emit('update:value',val);
      },
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = this.value;
    }
  }
</script>
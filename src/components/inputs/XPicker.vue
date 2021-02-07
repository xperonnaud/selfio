<template>

  <v-select
      v-model="pickerValue"
      :label="$t(`global.${label}`)"
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
        <v-avatar v-if="data.item.icon" tile left width="21" height="21" class="x-avatar">
          <x-img
            :src="data.item.icon"
            :logo="logo"
            :tooltipText="data.item.title"
          />
        </v-avatar>

        {{ data.item.title }}
      </div>
    </template>

    <template v-slot:item="data">
      <div
        color="transparent"
        v-bind="data.attrs"
        :input-value="data.selected"
        class="max-width"
      >
        <v-avatar v-if="data.item.icon" tile left width="21" height="21" class="x-avatar">
          <x-img
            :src="data.item.icon"
            :logo="logo"
            :tooltipText="data.item.title"
          />
        </v-avatar>

        {{ data.item.title }}

        <div v-if="type==='inventories' && data.item.inventory_gear" class="float-right text-tiny pt-1 d-flex">
          <div class="text-right" :style="'width: '+(isMobile?'45':'70')+'px;'">
            <span>{{ data.item.inventory_gear.length }}</span>
            <span class="text-tiny-dimmed" v-text="' item'+(data.item.inventory_gear.length > 1 ? 's' : '')" />
          </div>

          <x-divider />

          <div class="text-center" :style="'width: '+(isMobile?'40':'70')+'px;'">
            <span>{{ sumInventoryWeight(data.item.inventory_gear) }}</span>
            <span class="text-tiny-dimmed" v-text="supWeightUnit" />
          </div>

          <v-divider v-show="!isMobile" vertical class="mx-2" />

          <div v-show="!isMobile" class="text-center" :style="'width:70px;'">
            <span>{{ parseInt(sumInventoryPrice(data.item.inventory_gear)) }}</span>
            <span class="text-tiny-dimmed" v-text="priceUnit" />
          </div>
        </div>
      </div>
    </template>
  </v-select>

</template>

<script>

  import XDivider from "@/components/elements/XDivider";
  import XImg from "@/components/elements/XImg";

  export default {
    name: 'x-picker',
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

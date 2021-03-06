<template>


  <x-selector
      title="weather"
      :items="weathers"
      v-bind:value.sync="pickerValue"
      :isInFilter="isInFilter"
  >
    <template v-slot:header>
      <v-text-field
        :label="xCap($t(`global.weather`))"
        :value="typeof pickerValue==='string' ? xCap($t(`weathers.${pickerValue}.title`)) : null"
        :color="currentColor"
        hide-details="auto"
        append-icon="mdi-menu-down"
        dense
        filled
        clearable
        @click:clear="pickerValue = null"
      >
        <template
          v-if="(typeof pickerValue==='string') && hasIcon"
          v-slot:prepend-inner style="margin-top: 0"
        >
          <v-icon
            :width="iconSize"
            :height="iconSize"
            v-text="`mdi-weather-${pickerValue}`"
          ></v-icon>
        </template>
      </v-text-field>
    </template>

    <template v-slot:content="{item}">
      <div>
        <div v-if="hasIcon" class="d-flex justify-space-around align-self-center">
          <v-icon v-text="`mdi-weather-${item}`" />
        </div>

        <div class="text-caption text-center">
          {{ $t(`weathers.${item}.title`) | capitalizeFilter }}
        </div>
      </div>
    </template>
  </x-selector>

</template>

<script>

  import XSelector from "@/components/inputs/XSelector";

  export default {
    name: 'x-weather-selector',
    components: {
      XSelector
    },
    props: {
      value: [Number, String],
      iconSize: {
        type: Number,
        default: 48
      },
      hasIcon: {
        type: Boolean,
        default: false
      },
      isInFilter: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
    }),
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

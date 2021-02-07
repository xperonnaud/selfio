<template>

  <v-combobox
    :label="xFilters.capitalizeFilter($t(`global.${label}`))"
    v-model="pickerValue"
    :items="items"
    color="primary"
    :item-color="navItemColor(route)"
    hide-details="auto"
    filled
    dense
    chips
    small-chips
    multiple
    clearable
  >
    <template v-slot:selection="data">
      <v-chip
        small
        label
        outlined
        :color="navItemColor(route)"
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item)"
      >
        {{ xFilters.capitalizeFilter(data.item) }}
      </v-chip>
    </template>
  </v-combobox>

</template>

<script>

  export default {
    name: 'x-combobox',
    props: {
      label: String,
      value: Array,
      items: Array,
      route: String,
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


<style lang="scss">

  .v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box.v-select--chips--small.v-input--dense .v-select__selections, .v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed.v-select--chips--small.v-input--dense .v-select__selections {
    padding: 30px 0 6px;
  }

</style>
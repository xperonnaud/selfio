<template>

  <v-card class="x-checkbox elevation-0 x-input">
    <v-checkbox
      v-model="pickerValue"
      label="Consumable"
      :color="currentColor"
      filled
      hide-details
      class="pa-0 ma-0"
    ></v-checkbox>
  </v-card>

</template>

<script>

  export default {
    name: 'x-checkbox',
    props: {
      label: String,
      value: {
        type: Boolean,
        default: false,
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

<style lang="scss">

  .x-checkbox {

    .v-input__slot {
      padding: 14px 0 !important;
    }
  }

</style>

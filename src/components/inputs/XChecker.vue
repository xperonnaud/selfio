<template>

  <v-checkbox
    :input-value="pickerValue"
    :off-icon="'mdi-checkbox-blank-outline'"
    :on-icon="'mdi-checkbox-marked-outline'"
    :disabled="disabled"
    filled
    hide-details
  ></v-checkbox>

</template>

<script>

  export default {
    name: 'x-checker',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      disabled: {
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

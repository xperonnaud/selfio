<template>

  <v-text-field
    :label="xFilters.capitalizeFilter(label)"
    v-model="pickerValue"
    :rules="rules"
    :color="color || currentColor"
    hide-details="auto"
    clearable
    dense
    filled
    :append-icon="appendIcon"
    :small="small"
    :suffix="suffix"
    :type="type"
    :required="required"
  >
    <slot />
  </v-text-field>

</template>

<script>

  export default {
    name: 'x-text',
    props: {
      label: String,
      value: {
        type: String,
        default: null,
      },
      small: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: null,
      },
      rules: Array,
      appendIcon: {
        type: String,
        default: null,
      },
      suffix: {
        type: String,
        default: null,
      },
      type: {
        type: String,
        default: null,
      },
      required: {
        type: Boolean,
        default: null,
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
    border-radius: 4px 4px 0 0 !important;
    border-bottom: 1px solid #757575 !important;

    .x-checkbox-label {
      font-size: 16px !important;
      opacity: 0.7 !important;
    }

    &.is-dark {
      border-bottom: 1px solid #BDBDBD !important;

      .x-checkbox-label {
        opacity: 0.6 !important;
      }
    }

    .v-input__slot {
      padding: 14px 0 !important;
    }
  }

</style>

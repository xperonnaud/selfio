<template>

  <v-card
    :class="['x-checkbox elevation-0 x-input d-flex x-primary-btn max-width', {'is-dark':isDark}]"
    @click="pickerValue = !pickerValue"
  >
    <x-checker
      v-bind:value.sync="pickerValue"
      :class="['pa-0 ma-0']"
    ></x-checker>

    <span class="x-checkbox-label text-body-2 my-auto" v-text="label" />
  </v-card>

</template>

<script>

  import XChecker from "@/components/inputs/XChecker";

  export default {
    name: 'x-checkbox',
    components: {
      XChecker
    },
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

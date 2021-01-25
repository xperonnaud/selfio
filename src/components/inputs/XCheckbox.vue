<template>

  <v-card
    class="x-checkbox elevation-0 x-input d-flex x-primary-btn max-width"
    @click="pickerValue = !pickerValue"
  >
    <x-checker
      v-bind:value.sync="pickerValue"
      :class="['pa-0 ma-0']"
    ></x-checker>

    <span class="text-body-2 my-auto" v-text="label" />
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

    .v-input__slot {
      padding: 14px 0 !important;
    }
  }

</style>

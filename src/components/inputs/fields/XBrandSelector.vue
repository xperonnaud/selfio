<template>

  <v-autocomplete
    :label="xFilters.capitalizeFilter($t('global.brand'))"
    v-model="pickerValue"
    :loading="loading"
    :items="brandsList"
    :search-input.sync="search"
    @click:clear="pickerValue = null"
    :color="currentColor"
    item-text="title"
    item-value="id"
    cache-items
    filled
    dense
    clearable
    hide-details="auto"
  ></v-autocomplete>

</template>

<script>

  export default {
    name: 'x-brand-selector',
    props: {
      value: Number,
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
      loading: false,
      search: ''
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

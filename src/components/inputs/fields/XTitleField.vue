<template>

  <v-text-field
    :label="label"
    v-model="value"
    :rules="xRules.text"
    :color="color || currentColor"
    hide-details="auto"
    required
    dense
    filled
  >
    <template v-slot:append>
        <v-icon size="12" :color="errorColor" v-text="'mdi-asterisk'" />
    </template>
  </v-text-field>

</template>

<script>

  export default {
    name: 'x-title-field',
    props: {
      list: Array,
      label: String,
      value: String,
      color: String,
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

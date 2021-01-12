<template>

  <v-menu
    v-if="isMounted"
    v-model="dateMenu"
    :close-on-content-click="false"
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :value="pickerValue"
        :color="currentColor"
        :rules="xRules.date"
        v-bind="attrs"
        v-on="on"
        prepend-inner-icon="mdi-calendar"
        clearable
        readonly
        hide-details
        filled
        dense
        @click:clear="resetValue()"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="pickerValue"
      :color="currentRawColor"
      @change="dateMenu = false"
      :min="minDate"
    ></v-date-picker>
  </v-menu>

</template>

<script>

  export default {
    name: 'x-date-picker',
    props: {
      label: String,
      value: {
        type: String,
        default: null
      },
      minDate: {
        type: String,
        default: null
      },
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
      dateMenu: false,
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

<template>

  <v-menu
      v-if="isMounted"
      :ref="pickerId"
      v-model="timeMenu"
      :close-on-content-click="false"
      :return-value.sync="pickerValue"
      transition="scale-transition"
      max-width="290px"
      min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          :label="label"
          v-model="pickerValue"
          :color="currentColor"
          :rules="xRules.time"
          v-bind="attrs"
          v-on="on"
          prepend-inner-icon="mdi-clock-time-four-outline"
          readonly
          filled
          dense
          clearable
          hide-details
          @click:clear="resetValue()"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="timeMenu"
      v-model="pickerValue"
      :color="currentRawColor"
      scrollable
      format="24hr"
      @click:minute="$refs[pickerId].save(pickerValue)"
    ></v-time-picker>
  </v-menu>

</template>

<script>

  export default {
    name: 'x-time-picker',
    props: {
      label: String,
      value: {
        type: String,
        default: null
      },
    },
    data: () => ({
      isMounted: false,
      pickerId: null,
      pickerValue: null,
      timeMenu: false,
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
          this.$emit('update:value', val);
      },
    },
    mounted() {
      this.pickerValue = this.value;
      this.pickerId = this.randomId();
      this.isMounted = true;
    }
  }
</script>

<template>

  <div
    @click.stop="timeMenu = !timeMenu"
    class="x-primary-btn"
  >
    <v-text-field
      :label="xFilters.capitalizeFirstFilter($t(`global.${label}`))"
      v-model="pickerValue"
      :color="currentColor"
      :rules="xRules.time"
      prepend-inner-icon="mdi-clock-time-four-outline"
      readonly
      filled
      dense
      clearable
      hide-details
      @click:clear="resetValue()"
    ></v-text-field>

    <v-dialog
      v-if="isMounted"
      :ref="pickerId"
      v-model="timeMenu"
      :close-on-content-click="false"
      :return-value.sync="pickerValue"
      transition="scale-transition"
      max-width="290px"
      min-width="290px"
      class="pa-auto"
    >
      <v-time-picker
        v-if="timeMenu"
        v-model="pickerValue"
        :color="currentRawColor"
        scrollable
        format="24hr"
        @click:minute="$refs[pickerId].save(pickerValue)"
      ></v-time-picker>
    </v-dialog>
  </div>

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

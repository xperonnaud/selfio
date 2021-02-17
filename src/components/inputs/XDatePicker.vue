<template>

  <div
    @click.stop="dateMenu = !dateMenu"
    class="x-primary-btn"
  >
    <v-text-field
      :label="xCapFirst($t(`global.${label}`))"
      :value="pickerValue"
      :color="currentColor"
      :rules="xRules.date"
      prepend-inner-icon="mdi-calendar"
      clearable
      readonly
      hide-details
      filled
      dense
      @click:clear="resetValue()"
    ></v-text-field>

    <v-dialog
      v-if="isMounted"
      v-model="dateMenu"
      class="x-date-picker"
      :close-on-content-click="false"
      max-width="290"
      min-width="290px"
    >
      <v-date-picker
        v-model="pickerValue"
        :color="currentRawColor"
        @change="dateMenu = false"
        :min="minDate"
      ></v-date-picker>
    </v-dialog>
  </div>

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

<template>

  <v-form v-model="validField">
    <v-text-field
      :label="xCap($t(`global.${label}`))"
      v-model="pickerValue"
      :rules="xRules.text"
      :color="color || currentColor"
      class="x-title-field mb-0"
      required
      dense
      filled
    >
      <template v-slot:append>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :size="validField ? 18 : 12"
                :color="validField ? currentColor : errorColor"
                v-text="validField ? 'mdi-check' : 'mdi-asterisk'"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <span v-text="validField ? 'Valid title' : 'Title is mandatory'" />
          </v-tooltip>
      </template>
    </v-text-field>
  </v-form>

</template>

<script>

  export default {
    name: 'title-field',
    props: {
      list: Array,
      label: String,
      value: String,
      color: String,
      valid: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      validField: false,
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
      valid(val) {
        if(this.isMounted)
          this.validField = val;
      },
      validField(val) {
        if(this.isMounted)
          this.$emit('update:valid',val);
      },
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = this.value;
    }
  }
</script>

<style lang="scss">

  .x-title-field {
    .v-text-field__details {
      margin-bottom: 0 !important;
    }
  }

</style>

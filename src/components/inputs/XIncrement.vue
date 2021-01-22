<template>

  <div class="d-flex">
    <v-btn
      @click="decrement()"
      :disabled="isDecDisabled"
      v-bind:class="[{'shadow-bottom':!isDecDisabled}]"
      style="border-radius: 12px 0 0 12px !important; margin-right: 2px;"
      :height="52"
    >
      <v-icon v-text="'mdi-minus'" />
    </v-btn>

    <v-text-field
      :label="label"
      v-model="pickerValue"
      :rules="rules"
      :color="currentColor"
      filled
      dense
      hide-details="auto"
      class="rounded-0"
    >
      <template v-if="append" v-slot:append>
        <span v-html="append" />
      </template>
    </v-text-field>

    <v-btn
      @click="increment()"
      :disabled="isIncDisabled"
      v-bind:class="[{'shadow-bottom':!isIncDisabled}]"
      style="border-radius: 0 12px 12px 0 !important; margin-left: 2px;"
      :height="52"
    >
      <v-icon v-text="'mdi-plus'" />
    </v-btn>
  </div>


</template>

<script>

  export default {
    name: 'x-increment',
    props: {
      label: String,
      value: [Number, String],
      append: {
        type: String,
        default: null
      },
      hint: {
        type: String,
        default: null
      },
      rules: {
        type: Array,
        default: null
      },
      min: {
        type: Number,
        default: null
      },
      max: {
        type: Number,
        default: null
      }
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
    }),
    computed: {
      isDecDisabled() {
        return (typeof this.min == 'number' && (this.pickerValue <= this.min));
      },
      isIncDisabled() {
        return (typeof this.max == 'number' && (this.pickerValue >= this.max));
      }
    },
    methods: {
      resetValue() {
        this.pickerValue = null;
      },
      increment() {
        if(!this.isIncDisabled) {
          this.pickerValue++;
        }
      },
      decrement() {
        if(!this.isDecDisabled) {
          this.pickerValue--;
        }
      }
    },
    watch: {
      value(val) {
        if(this.isMounted)
          this.pickerValue = parseFloat(val);
      },
      pickerValue(val) {
        if(this.isMounted)
          this.$emit('update:value',parseFloat(val));
      },
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = (typeof this.value == 'number') ? parseFloat(this.value) : 0 ;
    }
  }
</script>

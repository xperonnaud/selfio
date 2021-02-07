<template>

    <v-text-field
      :label="xFilters.capitalizeFilter($t(`global.${label}`))"
      v-model="pickerValue"
      :rules="rules"
      :color="currentColor"
      filled
      dense
      hide-details="auto"
      class="x-increment"
    >
        <template v-slot:prepend-inner>
            <v-btn
                @click="decrement()"
                :disabled="isDecDisabled"
                fab
                small
                v-bind:class="[(isDecDisabled ? 'elevation-0' : 'shadow-bottom')]"
            >
                <v-icon v-text="'mdi-minus'" />
            </v-btn>
        </template>

        <template v-slot:append>
            <div class="d-flex align-center mr-3">
                <span
                    v-if="append"
                    v-html="append"
                ></span>
            </div>

            <v-btn
                @click="increment()"
                :disabled="isIncDisabled"
                fab
                small
                v-bind:class="[(isIncDisabled ? 'elevation-0' : 'shadow-bottom')]"
            >
                <v-icon v-text="'mdi-plus'" />
            </v-btn>
        </template>
    </v-text-field>

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
        if(this.isMounted && typeof val=='number')
          this.pickerValue = parseFloat(val);
      },
      pickerValue(val) {
        if(this.isMounted && typeof val=='number')
          this.$emit('update:value',parseFloat(val));
      },
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = (typeof this.value == 'number') ? parseFloat(this.value) : null ;
    }
  }
</script>

<style lang="scss">

    .x-increment {
        .v-input__slot {
            padding: 0 !important;
        }

        .v-input__prepend-inner, .v-input__append-inner {
            margin: 6px !important;
        }
    }

</style>
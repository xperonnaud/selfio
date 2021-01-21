<template>



</template>

<script>

  export default {
    name: 'x-state-selector',
    props: {
      value: Number,
    },
    data: () => ({
      isMounted: false,
      stateValue: null,
    }),
    methods: {
      resetValue() {
        this.stateValue = null;
      }
    },
    watch: {
      value(val) {
        if(this.isMounted)
          this.stateValue = val;
      },
      stateValue(val) {
        if(this.isMounted)
          this.$emit('update:value',val);
      },
    },
    mounted() {
      this.isMounted = true;
      this.stateValue = this.value;
    }
  }
</script>

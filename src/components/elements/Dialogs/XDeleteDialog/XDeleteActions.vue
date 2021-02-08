<template>


      <v-card-actions>
        <v-btn
          @click="pickerValue = false"
          depressed
          text
          v-text="$t('global.cancel')"
        ></v-btn>

        <v-spacer />

        <v-btn
          :color="errorColor"
          @click="deleteAction()"
          :disabled="hasItemRelations"
          depressed
        >
          <span v-bind:class="[reversedFontShadeColor]" v-text="$t('global.delete')" />
        </v-btn>
      </v-card-actions>

</template>

<script>

  export default {
    name: 'x-delete-actions',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      deleteItem: {
        type: Boolean,
        default: false,
      },
      hasItemRelations: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
      dialogDeleteItem: false,
    }),
    methods: {
      deleteAction() {
        if(this.item)
          this.dialogDeleteItem = true;

        this.pickerValue = false;
      },
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
      dialogDeleteItem(val) {
        if(this.isMounted)
          this.$emit('update:deleteItem',val);
      },
      deleteItem(val) {
        if(this.isMounted)
          this.dialogDeleteItem = val;
      },
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = this.value;
    }
  }

</script>

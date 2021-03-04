<template>

  <v-sheet
    v-if="isMounted"
    :class="[`x-${title}-selector x-check-form max-width`]"
    :color="xTabsColor"
  >
    <div>
      <slot name="header" />
    </div>

    <v-dialog v-model="isEditing">
      <v-sheet :color="xOverlayColor">
        <v-container class="pt-0 pb-1 elevation-0">
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-card class="d-flex align-content-space-between rounded-0 mb-1">
                <v-list-item-title class="pl-4">{{$t(`global.${title}`) | capitalizeFirstFilter}}</v-list-item-title>

                <v-spacer />

                <v-btn
                  @click="toggleEditor()"
                  fab
                  icon
                >
                  <v-icon v-bind:class="[fontShadeColor]" :size="XLI" v-text="'mdi-check'" />
                </v-btn>
              </v-card>
            </v-col>
          </v-row>

          <v-responsive
            class="overflow-y-auto"
            :max-height="isMobile ? (currentWindowHeight - 100) : 600"
          >
            <slot name="content" />
          </v-responsive>
        </v-container>
      </v-sheet>
    </v-dialog>
  </v-sheet>

</template>

<script>

  export default {
    name: 'x-selector',
    props: {
      title: String,
      value: [Number, String],
      isInFilter: {
        type: Boolean,
        default: false
      },
      isEditing: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      editing: false,
      pickerValue: null,
    }),
    methods: {
      toggleEditor() {
        this.editing = !this.editing;
      },
      resetValue() {
        this.pickerValue = null;
      },
      assignValue(itemId) {
        if(this.pickerValue === itemId) {
          this.resetValue();
        } else {
          this.pickerValue = itemId;
        }

        if(this.editing === true)
          this.toggleEditor();
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
      isEditing(val) {
        if(this.isMounted)
          this.editing = val;
      },
      editing(val) {
        if(this.isMounted)
          this.$emit('update:isEditing',val);
      },
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = this.value;
    }
  }
</script>

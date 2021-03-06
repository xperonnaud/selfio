<template>

  <v-menu
    v-bind:value.sync="editing"
    origin="center center"
    transition="scale-transition"
    max-width="550px"
    bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind:class="[
          'x-check-form-card',
          'mx-0 max-width',
          'elevation-0',
          {'is-dark':isDark}
        ]"
        :color="isInFilter ? null : xBackgroundColor"
        @click.stop="toggleEditor()"
        v-bind="attrs"
        v-on="on"
      >
        <slot name="header" />
      </v-card>
    </template>

    <v-sheet :color="xSheetColor">
      <v-container fluid class="pa-0 elevation-0">
        <v-card
                class="d-flex align-content-space-between rounded-0"
                :color="reversedShadeColor"
        >
          <v-list-item-title class="pl-4">{{$t(`global.${title}`) | capitalizeFirstFilter}}</v-list-item-title>

          <v-spacer />

          <v-btn
                  @click="toggleEditor()"
                  fab
                  icon
          >
            <v-icon
                    v-bind:class="[fontShadeColor]"
                    :size="XLI"
                    v-text="'mdi-check'"
            ></v-icon>
          </v-btn>
        </v-card>

        <div class="px-2 pt-3 pb-1">
          <v-responsive
                  class="overflow-y-auto"
                  :max-height="isMobile ? (currentWindowHeight - 100) : 600"
          >
            <v-row no-gutters>
              <template v-for="(item, itemIndex) in items">
                <v-col
                        :key="`${title}-selector-${itemIndex}`"
                        :cols="isMobile || isInFilter ? 6 : 3"
                        v-bind:class="[(isMobile ? 'pa-1' : 'pt-0 pb-2 px-1')]"
                >
                  <v-card
                          v-bind:class="[
                        'selector-card',
                        'd-flex',
                        'justify-space-around',
                        'align-self-center',
                        'pt-2 pb-1 elevation-0',
                        {'x-selected-card':(pickerValue === item)}
                      ]"
                          @click.stop="assignValue(item)"
                  >
                    <slot name="content" :item="item" />
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-responsive>
        </div>
      </v-container>
    </v-sheet>
  </v-menu>

</template>

<script>

  export default {
    name: 'x-selector',
    props: {
      title: String,
      value: [Number, String],
      items: [Array, Object],
      isInFilter: {
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
      assignValue(item) {
        if(this.pickerValue === item) {
          this.resetValue();
        } else {
          this.pickerValue = item;
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
    },
    mounted() {
      this.isMounted = true;
      this.pickerValue = this.value;
    }
  }
</script>

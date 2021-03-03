<template>

  <v-sheet v-if="isMounted" :class="['x-weather-selector x-check-form max-width']" :color="xTabsColor">
    <div>
      <v-card
        v-bind:class="[
          'x-check-form-card',
          'mx-auto',
          'elevation-0',
          {'is-dark':isDark}
        ]"
        :color="isInFilter ? null : xBackgroundColor"
        @click.stop="toggleEditor()"
      >
        <v-text-field
          :label="xCap($t(`global.weather`))"
          :value="pickerValue ? xCap($t(`weathers.${pickerValue}.title`)) : null"
          :color="currentColor"
          hide-details="auto"
          append-icon="mdi-menu-down"
          dense
          filled
          clearable
          @click:clear="resetValue()"
        >
          <template
            v-if="(typeof pickerValue != 'undefined') && hasIcon"
            v-slot:prepend-inner style="margin-top: 0"
          >
            <v-icon
              :width="iconSize"
              :height="iconSize"
              v-text="`mdi-weather-${pickerValue}`"
            ></v-icon>
          </template>
        </v-text-field>
      </v-card>
    </div>

    <v-dialog v-model="isEditing">
      <v-sheet :color="xOverlayColor">
        <v-container class="pt-0 pb-1 elevation-0">
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-card class="d-flex align-content-space-between rounded-0 mb-1">
                <v-list-item-title class="pl-4">{{$t('global.weather') | capitalizeFirstFilter}}</v-list-item-title>

                <v-spacer/>

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
            <v-row>
              <template v-for="(item, itemIndex) in weathers">
                <v-col
                  :key="itemIndex"
                  :cols="(isInFilter ? 6 : (isMobile ? 4 : 3))"
                  class="pa-1"
                >
                  <v-card
                    v-bind:class="[
                      'selector-card',
                      'd-flex',
                      'justify-space-around',
                      'align-self-center',
                      'pt-2 pb-1',
                      'elevation-0',
                      {'is-dark': isDark},
                      {'selected': (pickerValue === item)}
                    ]"
                    @click.stop="assignValue(item)"
                  >
                    <div>
                      <div v-if="hasIcon" class="d-flex justify-space-around align-self-center">
                        <v-icon v-text="`mdi-weather-${item}`" />
                      </div>

                      <div class="text-caption text-center">
                        {{ $t(`weathers.${item}.title`) | capitalizeFilter }}
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-responsive>
        </v-container>
      </v-sheet>
    </v-dialog>
  </v-sheet>

</template>

<script>

  export default {
    name: 'x-weather-selector',
    props: {
      value: [Number, String],
      iconSize: {
        type: Number,
        default: 48
      },
      hasIcon: {
        type: Boolean,
        default: false
      },
      isInFilter: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      isEditing: false,
      pickerValue: null,
    }),
    methods: {
      toggleEditor() {
        this.isEditing = !this.isEditing;
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

        if(this.isEditing === true)
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

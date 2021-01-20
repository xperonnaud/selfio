<template>

  <v-sheet v-if="isMounted" class="x-check-form" :color="xTabsColor">
    <div v-if="isEditing" class="d-flex align-content-space-between">
      <v-subheader class="mt-2 ml-2" v-text="label" />

      <v-spacer/>

      <v-btn
        @click="toggleEditor()"
        class="mr-1 primary-gradient-color-text"
        icon
      >
        <v-icon v-text="'mdi-check'" />
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-show="!isEditing">
          <v-card
            v-bind:class="[
              'x-check-form-card',
              'mx-auto',
              'elevation-0',
              {'is-dark':isDark}
            ]"
            :color="xBackgroundColor"
            @click.stop="toggleEditor()"
          >
            <v-text-field
                :label="label"
                :value="pickerValue ? pickerValue : $options.filters.capitalizeFilter($options.filters.noDashFilter(label))"
                :color="currentColor"
                hide-details="auto"
                append-icon="mdi-menu-down"
                dense
                filled
            >
              <template v-if="(typeof pickerValue != 'undefined') && hasIcon" v-slot:prepend-inner style="margin-top: 0">
                <v-icon
                    :width="iconSize"
                    :height="iconSize"
                    v-text="`mdi-weather-${pickerValue}`"
                ></v-icon>
              </template>
            </v-text-field>
          </v-card>
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <v-container
        v-show="isEditing"
        v-bind:class="[
          {'py-0': isMobile},
          'elevation-3',
        ]"
      >
        <v-row>
          <template v-for="(item, itemIndex) in list">
            <v-col
              :key="itemIndex"
              :cols="isMobile ? 4 : 3"
              v-bind:class="[
                  {'pa-1': isMobile}
              ]"
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

                  <div
                    v-bind:class="[
                      'text-caption',
                      'text-center',
                    ]"
                  >
                    {{ item | noDashFilter | capitalizeFilter }}
                  </div>
                </div>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-expand-transition>
  </v-sheet>

</template>

<script>

  export default {
    name: 'x-simple-selector',
    props: {
      list: Array,
      label: String,
      value: String,
      iconSize: {
        type: String,
        default: '48'
      },
      hasIcon: {
        type: Boolean,
        default: false
      }
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

<style lang="scss">

.x-check-form {
    .v-subheader {
      font-size: 12px;
      height: 24px !important;
      padding: 0 !important;
    }

    .v-list--dense .v-subheader {
      height: 18px !important;
    }

    .selector-card {

      &.selected {
        border: 1px solid #FF9800 !important;

        &.is-dark {
          border: 1px solid #FF9800 !important;
        }
      }

      &:before {
        opacity: 0.1;
      }
    }
  }



</style>

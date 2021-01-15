<template>

  <v-sheet v-if="isMounted" class="x-check-form" :color="xTabsColor">
    <div v-if="isEditing" class="d-flex align-content-space-between">
      <v-subheader class="mt-2 ml-2" v-text="label" />

      <v-spacer/>

      <v-btn
        @click="toggleEditor()"
        class="mr-1"
        icon
      >
        <v-icon :color="darkColor('primary')" v-text="'mdi-check'" />
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
              :value="listedPickedValue ? (list[listReferences[pickerValue]].title) : $options.filters.capitalizeFilter(label)"
              :color="currentColor"
              hide-details="auto"
              append-icon="mdi-menu-down"
              dense
              filled
            >
              <template v-slot:prepend-inner style="margin-top: 0">
                <x-img
                  v-if="list[listReferences[pickerValue]] && list[listReferences[pickerValue]].icon"
                  :src="list[listReferences[pickerValue]].icon.data.full_url"
                  :tooltipText="list[listReferences[pickerValue]].title"
                  :width="iconSize"
                  :height="iconSize"
                  :logo="logo"
                ></x-img>
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
          'elevation-0',
        ]"
      >
        <v-row>
          <template v-for="(item, itemIndex) in list">
            <v-col
              :key="itemIndex"
              :cols="isMobile ? 4 : 3"
              v-bind:class="[(isMobile ? 'pa-1' : 'pt-0 px-2')]"
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
                  {'selected': (pickerValue === item.id)}
                ]"
                @click.stop="assignValue(item.id)"
              >
                <div>
                  <div class="d-flex justify-space-around align-self-center">
                    <v-avatar
                      v-bind:class="[
                        'x-avatar',
                        (isCategory ? getReversedVuetifyColor(item.id) : ''),
                      ]"
                    >
                      <x-img
                        v-if="item.icon"
                        :src="item.icon.data.full_url"
                        :width="iconSize"
                        :height="iconSize"
                        :tooltipText="item.description ? item.description : item.title"
                        :logo="logo"
                        :isCategory="isCategory"
                      ></x-img>
                    </v-avatar>

                  </div>

                  <div
                    v-bind:class="[
                      'text-caption',
                      'text-center',
                    ]"
                    v-html="item.title"
                  ></div>
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

  import XImg from "@/components/elements/XImg";

  export default {
    name: 'x-selector',
    components: {
      XImg
    },
    props: {
      list: Array,
      listReferences: Object,
      label: String,
      value: Number,
      iconSize: {
        type: String,
        default: '48'
      },
      logo: {
        type: Boolean,
        default: false
      },
      isCategory: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      isMounted: false,
      isEditing: false,
      pickerValue: null,
    }),
    computed: {
      listedPickedValue() {
        if(!this.isMounted)
          return false;
        return (typeof this.pickerValue==='number' && typeof this.listReferences[this.pickerValue]==='number');
      }
    },
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

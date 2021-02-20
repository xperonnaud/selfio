<template>

  <v-sheet v-if="isMounted" :class="['x-check-form max-width',{'is-in-filter':isInFilter}]" :color="xTabsColor">
    <div v-if="isEditing" class="d-flex align-content-space-between">
      <v-subheader class="mt-2 ml-2">{{$t(`global.${label}`)}}</v-subheader>

      <v-spacer/>

      <v-btn
        @click="toggleEditor()"
        class="mr-1 primary-gradient-color-text"
        icon
      >
        <v-icon  v-text="'mdi-check'" />
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
              :label="xCap($t(`global.${label}`))"
              :value="listedPickedValue ? xCap(dataType ? $t(`${dataType}.${selectedItem.title}.title`) : selectedItem.title) : null"
              :color="currentColor"
              hide-details="auto"
              append-icon="mdi-menu-down"
              dense
              filled
              clearable
              @click:clear="resetValue()"
            >
              <template v-slot:prepend-inner style="margin-top: 0">
                <x-img
                  v-if="selectedItem && selectedItem.icon"
                  :src="selectedItem.icon"
                  :tooltipText="xCap(dataType ? $t(`${dataType}.${selectedItem.title}.title`) : selectedItem.title)"
                  :width="avatarSize ? avatarSize : iconSize"
                  :height="avatarSize ? avatarSize : iconSize"
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
        v-bind:class="['py-0 elevation-0']"
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
                      class="x-avatar"
                      :style="((isCategory && item.title!==$t('global.unknown')) ? 'border: 2px solid '+categoryColor(item.id)+' !important;' : '')"
                    >
                      <x-img
                        v-if="item.icon"
                        :src="item.icon"
                        :width="iconSize"
                        :height="iconSize"
                        :tooltipText="xCap(dataType ? $t(`${dataType}.${item.title}.title`) : item.title)"
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
                    v-html="xCap(dataType ? $t(`${dataType}.${item.title}.title`) : item.title)"
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
      dataType: String,
      iconSize: {
        type: Number,
        default: 48
      },
      avatarSize: {
        type: Number,
        default: null
      },
      logo: {
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
    computed: {
      selectedItem() {
        if(!this.listedPickedValue)
          return null;
        return this.list[this.listReferences[this.pickerValue]]
      },
      isCategory() {
        return this.dataType === 'categories';
      },
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
      clearValue() {
        this.toggleEditor();
        this.assignValue(null);
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

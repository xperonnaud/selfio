<template>

  <v-container
    v-bind:class="[
      'pa-0',
      {'pb-3 pt-0':!isMobile},
    ]"
  >
    <v-form v-model="valid">
      <v-tabs
        v-if="isMounted"
        v-model="tab"
        :color="currentColor"
        :background-color="xTabsColor"
        fixed-tabs
      >
        <v-tab :key="'gear-general'">
          <span v-text="$t('global.general')" />
        </v-tab>
        <v-tab :key="'gear-purchase'">
          <span v-text="$t('global.purchase')" />
        </v-tab>

        <v-tabs-items v-model="tab" :style="xBackgroundStyleColorStr">
          <v-tab-item :key="'gear-general'">
            <v-responsive
              class="overflow-y-auto"
              :height="maxDialogContentHeight"
            >
              <v-card flat :color="xBackgroundColor">
                <v-card-text :class="{'py-1':isMobile}">
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <title-field
                        label="title"
                        v-bind:valid.sync="validTitle"
                        v-bind:value.sync="updatedItem.title"
                      ></title-field>
                    </v-col>

                    <v-col cols="12">
                      <category-selector v-bind:value.sync="updatedItem.category" />
                    </v-col>

                    <v-col cols="12">
                      <x-checkbox
                        label="consumable"
                        v-bind:value.sync="updatedItem.consumable"
                      ></x-checkbox>
                    </v-col>

                    <v-col cols="12">
                      <x-text
                        :label="$t('global.weight')"
                        v-bind:value.sync="updatedItem.weight"
                        :rules="xRules.decimals"
                        :suffix="weightUnit"
                      ></x-text>
                    </v-col>

                    <v-col cols="12">
                      <x-increment
                        label="quantity-owned"
                        v-bind:value.sync="updatedItem.quantity_owned"
                        :rules="xRules.decimals"
                        :color="currentColor"
                        :max="100"
                        :min="0"
                      ></x-increment>
                    </v-col>

                    <v-col cols="12">
                      <x-combobox
                        label="tags"
                        v-bind:value.sync="updatedItem.tags"
                        v-bind:items="preferences.gear_tags"
                        v-bind:route="'gear'"
                      ></x-combobox>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-responsive>
          </v-tab-item>

          <v-tab-item :key="'gear-purchase'">
            <v-responsive
              class="overflow-y-auto"
              :height="maxDialogContentHeight"
            >
              <v-card flat :color="xBackgroundColor">
                <v-card-text :class="{'py-1':isMobile}">
                  <v-row>
                    <v-col cols="12">
                      <brand-selector v-bind:value.sync="updatedItem.brand" />
                    </v-col>

                    <v-col cols="12">
                      <x-text
                        :label="$t('global.price')"
                        v-bind:value.sync="updatedItem.price"
                        :rules="xRules.decimals"
                        :suffix="priceUnit"
                      ></x-text>
                    </v-col>

                    <v-col cols="12">
                      <state-selector v-bind:value.sync="updatedItem.state" />
                    </v-col>

                    <v-col cols="12">
                      <x-date-picker
                        label="purchase"
                        v-bind:value.sync="updatedItem.purchase_date"
                      ></x-date-picker>
                    </v-col>

                    <v-col cols="12">
                      <x-text
                        :label="$t('global.size')"
                        v-bind:value.sync="updatedItem.size"
                      ></x-text>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        :label="xCapFirst($t('global.description'))"
                        v-model="updatedItem.description"
                        :color="currentColor"
                        hide-details="auto"
                        auto-grow
                        rows="1"
                        dense
                        filled
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-responsive>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>

      <v-overlay v-if="!isMobile && (!isMounted || isLoading)">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <v-text-field v-show="false" v-model="validTitle" :rules="xRules.boolean" />
    </v-form>
  </v-container>

</template>

<script>

  import Vue from 'vue'

  import XText from "@/components/inputs/XText";
  import TitleField from "@/components/inputs/TitleField";
  import BrandSelector from "@/components/inputs/selectors/BrandSelector";
  import StateSelector from "@/components/inputs/selectors/StateSelector";
  import XIncrement from "@/components/inputs/XIncrement";
  import XDatePicker from "@/components/inputs/XDatePicker";
  import CategorySelector from "@/components/inputs/selectors/CategorySelector";
  import XCombobox from "@/components/inputs/XCombobox";
  import XCheckbox from "@/components/inputs/XCheckbox";

  export default {
    name: 'gear-form',
    components: {
      XText,
      TitleField,
      StateSelector,
      BrandSelector,
      XCheckbox,
      XCombobox,
      XIncrement,
      XDatePicker,
      CategorySelector
    },
    props: {
      item: Object,
      itemIndex: Number,
      isFormMounted: {
        type: Boolean,
        default: false
      },
      isFormLoading: {
        type: Boolean,
        default: true
      },
      isFormValid: {
        type: Boolean,
        default: false
      },
      postItem: {
        type: Boolean,
        default: false
      },
      patchItem: {
        type: Boolean,
        default: false
      },
      deleteItem: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      isMounted: false,
      isLoading: null,
      valid: false,
      validTitle: false,
      tab: 'gear-general',

      updatedItem: {},
    }),
    methods: {
      async fixUpdatedItem() {
        if(this.item === null || !this.item) {
          Vue.set(this.updatedItem, 'price', null);
          Vue.set(this.updatedItem, 'weight', null);
          Vue.set(this.updatedItem, 'quantity_owned', 1);

        } else {
          if(typeof this.item.price == 'undefined' || !this.item.price)
            Vue.set(this.updatedItem, 'price', null);

          if(typeof this.item.weight == 'undefined' || !this.item.weight) {
            Vue.set(this.updatedItem, 'weight', null);
          } else {
            Vue.set(this.updatedItem, 'weight', this.weightUnitConverter(this.item.weight));
          }

          if(typeof this.item.quantity_owned == 'undefined' || !this.item.quantity_owned)
            Vue.set(this.updatedItem, 'quantity_owned', 0);
        }
      }
    },
    watch: {
      valid(val) {
        if(this.isMounted)
          this.$emit('update:isFormValid',val);
      },
      isMounted(newVal, oldVal) {
        if(newVal === true && oldVal === false)
          this.$emit('update:isFormMounted',newVal);
      },
      isLoading(val) {
          this.$emit('update:isFormLoading',val);
      },
      isFormLoading(val) {
          this.isLoading = val;
      },
      async postItem(val) {
        if(this.valid===true && val===true) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'gear');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'gear');

          await this.api_post_gear(this.updatedItem);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async patchItem(val) {
        if(this.valid===true && val===true) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'gear');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'gear');

          await this.api_patch_gear(this.updatedItem, this.itemIndex);
          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async deleteItem(val) {
        if(val===true) {
          this.isLoading = true;
          await this.api_remove_gear(this.item.id, this.itemIndex);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
          this.isLoading = false;
        }
      },
    },
    async mounted() {
      if(this.item)
        this.updatedItem = this.copyVar(this.item);

      await this.fixUpdatedItem();

      this.isMounted = true;
      this.isLoading = false;
    }
  }
</script>

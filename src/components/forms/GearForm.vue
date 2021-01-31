<template>

  <v-form v-model="valid">
    <v-container
      v-bind:class="[
        'pa-0',
        {'pb-3 pt-0':!isMobile},
      ]"
    >
      <v-tabs
        v-if="isMounted"
        v-model="tab"
        :color="currentColor"
        :background-color="xTabsColor"
        fixed-tabs
      >
        <v-tab :key="'gear-general'">
          <span v-text="'General'" />
        </v-tab>
        <v-tab :key="'gear-purchase'">
          <span v-text="'Purchase'" />
        </v-tab>

        <v-tabs-items v-model="tab" :style="xBackgroundStyleColorStr">
          <v-tab-item :key="'gear-general'">
            <v-responsive
              class="overflow-y-auto"
              :min-height="dialogContentHeight"
              :max-height="maxDialogContentHeight"
            >
              <v-card flat :color="xBackgroundColor">
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <x-title-field
                        label="Title / Model"
                        v-bind:value.sync="updatedItem.title"
                      ></x-title-field>
                    </v-col>

                    <v-col cols="12">
                      <x-selector
                        label="Category"
                        :list="typesList"
                        :listReferences="gearCategoryReferences"
                        v-bind:value.sync="updatedItem.category"
                        :iconSize="'26'"
                        isCategory
                      ></x-selector>
                    </v-col>

                    <v-col cols="12">
                      <x-checkbox
                        label="Consumable"
                        v-bind:value.sync="updatedItem.consumable"
                      ></x-checkbox>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Weight"
                        v-model="updatedItem.weight"
                        :rules="xRules.decimal"
                        :color="currentColor"
                        hide-details="auto"
                        :suffix="weightUnit"
                        dense
                        filled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <x-increment
                        label="Quantity owned"
                        v-bind:value.sync="updatedItem.quantity_owned"
                        :rules="xRules.decimal"
                        :color="currentColor"
                        :max="100"
                        :min="0"
                      ></x-increment>
                    </v-col>

                    <v-col cols="12">
                      <x-combobox
                        label="Tags"
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
              :min-height="dialogContentHeight"
              :max-height="maxDialogContentHeight"
            >
              <v-card flat :color="xBackgroundColor">
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <x-brand-selector v-bind:value.sync="updatedItem.brand" />
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Price"
                        v-model="updatedItem.price"
                        :rules="xRules.decimal"
                        :color="currentColor"
                        filled
                        dense
                        hide-details="auto"
                        :suffix="priceUnit"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <x-state-selector v-bind:value.sync="updatedItem.state" />
                    </v-col>

                    <v-col cols="12">
                      <x-date-picker
                          label="Purchase date"
                          v-bind:value.sync="updatedItem.purchase_date"
                      ></x-date-picker>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Size"
                        v-model="updatedItem.size"
                        :color="currentColor"
                        filled
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        label="Description"
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
    </v-container>
  </v-form>

</template>

<script>

  import Vue from 'vue'

  import XTitleField from "@/components/inputs/fields/XTitleField";
  import XBrandSelector from "@/components/inputs/fields/XBrandSelector";
  import XStateSelector from "@/components/inputs/fields/XStateSelector";
  import XIncrement from "@/components/inputs/XIncrement";
  import XDatePicker from "@/components/inputs/XDatePicker";
  import XSelector from "@/components/inputs/XSelector";
  import XCombobox from "@/components/inputs/XCombobox";
  import XCheckbox from "@/components/inputs/XCheckbox";

  export default {
    name: 'gear-form',
    components: {
      XTitleField,
      XStateSelector,
      XBrandSelector,
      XCheckbox,
      XCombobox,
      XIncrement,
      XDatePicker,
      XSelector,
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
        default: false
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
      isLoading: false,
      valid: false,
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
        if(this.isMounted)
          this.$emit('update:isFormLoading',val);
      },
      isFormLoading(val) {
        if(this.isMounted)
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
          this.isLoading = false;
          this.formDialog = false;
        }
      },
      async patchItem(val) {
        if(this.valid===true && val===true
          && (this.item !== this.updatedItem)
        ) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'gear');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'gear');

          await this.api_patch_gear(this.updatedItem, this.itemIndex);
          this.isLoading = false;
        }
        if(this.valid===true && val===true)
          this.formDialog = false;
      },
      async deleteItem(val) {
        if(val===true) {
          await this.api_remove_gear(this.item.id, this.itemIndex);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
        }
      },
    },
    async mounted() {
      this.isLoading = true;
      if(this.item)
        Object.assign(this.updatedItem, this.item);

      await this.fixUpdatedItem();

      this.isMounted = true;
      this.isLoading = false;
    }
  }
</script>

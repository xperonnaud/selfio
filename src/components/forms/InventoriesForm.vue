<template>

  <v-form v-model="valid">
    <v-container
      v-if="isMounted"
      style="max-width: unset;"
      v-bind:class="[
        {'py-0': isMobile},
        'pa-0'
      ]"
    >
      <v-expand-transition>
        <v-tabs
          v-show="!isEditing"
          v-model="tab"
          :color="currentColor"
          :background-color="xTabsColor"
          fixed-tabs
        >
          <v-tab :key="'inventory-details'">
            <span v-text="'Details'" />
          </v-tab>
          <v-tab :key="'inventory-gear-balance'">
            <span v-text="'Gear Balance'" />
          </v-tab>

          <v-tabs-items v-model="tab" :style="xBackgroundStyleColorStr">
            <v-tab-item :key="'inventory-details'">
              <v-responsive
                class="overflow-y-auto"
                :height="isMobile ? maxDialogContentHeight : 540"
              >
                <v-card flat :color="xBackgroundColor">
                  <v-card-text :class="{'py-1':isMobile}">
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <x-title-field
                          label="Title"
                          v-bind:value.sync="updatedItem.title"
                        ></x-title-field>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          label="Description"
                          v-model="updatedItem.description"
                          :color="currentColor"
                          filled
                          dense
                          hide-details="auto"
                          auto-grow
                          rows="1"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12">
                        <x-combobox
                          label="Tags"
                          v-bind:value.sync="updatedItem.tags"
                          v-bind:items="preferences.inventory_tags"
                          v-bind:route="'inventories'"
                        ></x-combobox>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-responsive>
            </v-tab-item>

            <v-tab-item :key="'inventory-gear-balance'">
              <v-responsive
                class="overflow-y-auto"
                :height="isMobile ? maxDialogContentHeight : 540"
              >
                <v-card flat :color="xBackgroundColor">
                  <v-card-text :class="{'py-1':isMobile}">
                    <v-row>
                      <v-col cols="12">
                        <inventory-gear-card
                          v-on:cardAction="editInventory()"
                          :inventoryTotalWeight.sync="inventoryTotalWeight"
                          :currentInventoryGear.sync="currentInventoryGear"
                        ></inventory-gear-card>
                      </v-col>

                      <v-col v-if="inventoryGearList.length > 0" cols="12" class="py-0 mb-3">
                        <x-stacked-progress-card
                          :items.sync="balance"
                        ></x-stacked-progress-card>
                      </v-col>

                      <v-col v-if="isMobile" cols="12" class="py-0 mb-3">
                        <v-tabs
                          :color="currentColor"
                          :background-color="xTabsColor"
                          fixed-tabs
                          dense
                          class="shadow-bottom"
                          style="border-radius: 4px 4px 0 0"
                        >
                          <v-tab>
                            <v-icon small v-text="'mdi-chart-bar'" />
                          </v-tab>
                          <v-tab>
                            <v-icon small v-text="'mdi-chart-donut'" :rotate="-90" />
                          </v-tab>

                          <v-tab-item>
                            <v-responsive
                              class="overflow-y-auto pr-3 "
                              :height="mobileResponsiveHeight"
                            >
                              <v-list
                                v-if="inventoryGearList && inventoryGearList.length > 0"
                                class="py-2 px-0"
                                one-line
                                dense
                              >
                                <template v-for="(gearCategoryStat) in sortedGearCategoryStats">
                                  <v-list-item :key="`gear-type-stat-${gearCategoryStat.id}`" class="pa-0">
                                    <v-list-item-avatar
                                      v-bind:class="['x-avatar my-0 ml-3 mr-1 d-flex justify-center']"
                                      :width="XXLI"
                                      :min-width="XXLI"
                                      :height="XXLI"
                                      :style="gearCategoryStat.id ? 'border: 1px solid '+categoryColor(gearCategoryStat.id)+' !important;' : ''"
                                    >
                                      <x-img
                                        v-if="gearCategoryStat.id && xGearCategory(gearCategoryStat.id) && objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0]"
                                        :src="objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0].icon"
                                        :tooltipText="xGearCategory(gearCategoryStat.id).title"
                                        :width="XSI"
                                        :height="XSI"
                                        isCategory
                                      ></x-img>

                                      <x-unknown-category-icon v-else />
                                    </v-list-item-avatar>

                                    <v-list-item-title class="mb-1">
                                      <div class="d-flex">
                                        <div class="text-caption" style="width: 80px;">
                                          <div v-if="gearCategoryStat.id && objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0]"
                                          >{{ objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0].title }}</div>
                                          <div v-else v-text="'unknown'" />
                                        </div>

                                        <div class="d-flex font-weight-regular text-caption">
                                          <x-divider />

                                          <div style="width: 60px;">
                                            <span class="text-tiny" v-text="gearCategoryStat.items" />
                                            <span class="text-tiny-dimmed" v-text="' item'" />
                                            <span class="text-tiny-dimmed" v-show="gearCategoryStat.items > 1" v-text="'s'" />
                                          </div>

                                          <x-divider />

                                          <div>
                                            <span class="text-tiny">{{ gearCategoryStat.weight | weightUnitFilter(weightUnit) }}</span>
                                            <span class="text-tiny-dimmed" v-text="dynamicWeightUnit(gearCategoryStat.weight)" :key="`weight-unit-${randomId()}-${gearCategoryStat.weight}`" />
                                          </div>
                                        </div>

                                        <v-spacer />

                                        <div class="float-right">
                                          <span class="text-caption">{{ gearCategoryStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight) }}</span>
                                          <span class="text-tiny-dimmed" v-text="'%'" />
                                        </div>
                                      </div>

                                      <v-progress-linear
                                        :value="gearCategoryStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight)"
                                        :color="getVuetifyColor((gearCategoryStat.id ? gearCategoryStat.id : 0))"
                                        :height="3"
                                        :background-color="xProgressColor"
                                        class="rounded"
                                      ></v-progress-linear>
                                    </v-list-item-title>
                                  </v-list-item>
                                </template>
                              </v-list>

                              <empty-list
                                v-else
                                label="Add gear to your inventory."
                                :color="navItemColor('gear')"
                              ></empty-list>
                            </v-responsive>
                          </v-tab-item>

                          <v-tab-item class="rounded">
                            <v-responsive
                              class="overflow-y-auto"
                              :height="mobileResponsiveHeight"
                            >
                              <empty-list
                                v-if="inventoryGearList.length <= 0"
                                label="This inventory is empty."
                                :color="navItemColor('gear')"
                              ></empty-list>

                              <x-pie-chart
                                v-else-if="isMounted && !isLoadingPieData && !isEditing  && pieChart.labels.length > 0 && pieChart.datasets.length > 0"
                                :key="`pie-chart-${updatedItem.title}-${gearCategoryStats.length}`"
                                class="mx-3 my-6"
                                :labels="pieChart.labels"
                                :datasets="pieChart.datasets"
                                style="max-height: 203px !important"
                              ></x-pie-chart>

                              <v-card
                                v-else
                                class="pa-6 my-8 d-flex justify-center align-center elevation-0"
                                style="max-height: 203px !important"
                              >
                                <v-progress-circular
                                  indeterminate
                                  size="48"
                                  :color="currentColor"
                                ></v-progress-circular>
                              </v-card>
                            </v-responsive>
                          </v-tab-item>
                        </v-tabs>
                      </v-col>

                      <v-col v-else-if="inventoryGearList" cols="12" class="py-0 rounded">
                        <v-sheet class="rounded shadow-bottom">

                          <empty-list
                            v-if="inventoryGearList.length <= 0"
                            label="This inventory is empty."
                            :color="navItemColor('gear')"
                          ></empty-list>

                          <v-row v-show="inventoryGearList.length > 0">
                            <v-col cols="5">

                              <v-list-item one-line style="min-height: unset;">
                                <v-list-item-content class="pt-0">
                                  <v-list-item-title v-text="'Weight by Gear Category'" />
                                </v-list-item-content>
                              </v-list-item>

                              <x-pie-chart
                                v-if="isMounted && !isLoadingPieData && !isEditing && pieChart.labels.length > 0 && pieChart.datasets.length > 0"
                                :key="`pie-chart-${updatedItem.title}-${gearCategoryStats.length}`"
                                :labels="pieChart.labels"
                                :datasets="pieChart.datasets"
                                style="max-height: 230px !important;"
                              ></x-pie-chart>

                              <v-card
                                v-else
                                class="pa-6 d-flex justify-center align-center elevation-0"
                                style="height: 230px; margin-top: 46px !important;"
                              >
                                <v-progress-circular
                                  indeterminate
                                  size="48"
                                  :color="currentColor"
                                ></v-progress-circular>
                              </v-card>
                            </v-col>

                            <v-col cols="7">
                              <v-responsive
                                class="overflow-y-auto pr-3 "
                                :height="300"
                              >
                                <v-list
                                  class="pa-0"
                                  one-line
                                  dense
                                >
                                  <template v-for="(gearCategoryStat) in sortedGearCategoryStats">
                                    <v-list-item :key="`gear-type-stat-${gearCategoryStat.id}`" class="pa-0" style="min-height: 36px;">
                                      <v-list-item-avatar
                                        :width="XXLI"
                                        :min-width="XXLI"
                                        :height="XXLI"
                                        v-bind:class="['x-avatar my-0 ml-3 mr-1 d-flex justify-center']"
                                        :style="gearCategoryStat.id ? 'border: 2px solid '+categoryColor(gearCategoryStat.id)+' !important;' : ''"
                                      >
                                        <x-img
                                          v-if="gearCategoryStat.id && xGearCategory(gearCategoryStat.id) && objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0]"
                                          :src="objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0].icon"
                                          :tooltipText="xGearCategory(gearCategoryStat.id).title"
                                          :width="XSI"
                                          :height="XSI"
                                          isCategory
                                        />

                                        <x-unknown-category-icon v-else />
                                      </v-list-item-avatar>

                                      <v-list-item-title class="mb-1">
                                        <div class="d-flex">
                                          <div class="text-caption" style="width: 80px;">
                                            <div v-if="gearCategoryStat.id && objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0]"
                                            >{{ objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0].title }}</div>

                                            <div v-else v-text="'unknown'" />
                                          </div>

                                          <div class="d-flex font-weight-regular text-caption">

                                            <x-divider />

                                            <div>
                                              <span class="text-tiny" v-text="gearCategoryStat.items" />
                                              <span class="text-tiny-dimmed" v-text="' item'" />
                                              <span class="text-tiny-dimmed" v-show="gearCategoryStat.items > 1" v-text="'s'" />
                                            </div>

                                            <x-divider />

                                            <div>
                                              <span class="text-tiny">{{ gearCategoryStat.weight | weightUnitFilter(weightUnit) }}</span>
                                              <span class="text-tiny-dimmed" v-text="dynamicWeightUnit(gearCategoryStat.weight)" :key="`weight-unit-${randomId()}-${gearCategoryStat.weight}`" />
                                            </div>
                                          </div>

                                          <v-spacer />

                                          <div class="float-right">
                                            <span class="text-caption">{{ gearCategoryStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight) }}</span>
                                            <span class="text-tiny-dimmed" v-text="'%'" />
                                          </div>
                                        </div>

                                        <v-progress-linear
                                          :value="gearCategoryStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight)"
                                          :color="getVuetifyColor((gearCategoryStat.id ? gearCategoryStat.id : 0))"
                                          :height="6"
                                          :background-color="xProgressColor"
                                          class="rounded"
                                        ></v-progress-linear>
                                      </v-list-item-title>
                                    </v-list-item>
                                  </template>
                                </v-list>
                              </v-responsive>
                            </v-col>
                          </v-row>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-responsive>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-expand-transition>

      <v-expand-transition>
        <div v-show="isEditing">
          <v-card class="mx-auto" flat :color="xBackgroundColor">
            <v-card-text :class="['pa-0']">
              <v-toolbar :class="['edition-toolbar', (isMobile ? 'px-0' : 'px-3')]">
                <v-btn @click="closeEditor()" icon>
                  <v-icon v-text="'mdi-arrow-left'" />
                </v-btn>

                <v-list-item two-line>
                  <v-list-item-content class="pa-0">
                    <v-list-item-title v-text="'Gear list'" />

                    <v-list-item-subtitle>
                      <div class="d-flex">
                        <div>
                          <span v-bind:class="[currentColorText]">{{ inventoryTotalWeight | weightUnitFilter(weightUnit) }}</span>
                          <span v-text="dynamicWeightUnit(inventoryTotalWeight)" :key="`weight-unit-${randomId()}-${inventoryTotalWeight}`" class="text-tiny" />
                        </div>

                        <x-divider />

                        <div>
                          <span
                            v-bind:class="[currentColorText]"
                            v-text="inventoryTotalItems || 0"
                          ></span>
                          <span v-text="' item'+(inventoryTotalItems>1?'s':'')" class="text-tiny" />
                        </div>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-spacer />

                <div class="mr-1 text-center">
                  <v-menu
                    v-model="gearFilterModeOn"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    left
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="gearFilterModeOn = !gearFilterModeOn"
                        v-bind="attrs"
                        v-on="on"
                        icon
                      >
                        <v-icon v-text="gearFilterModeOn?'mdi-filter-variant-minus':'mdi-filter-variant'" />
                      </v-btn>
                    </template>

                    <v-card>
                      <v-list class="py-1">
                        <v-list-item>
                          <v-list-item-title v-text="'Filters'" />

                          <v-spacer />

                          <v-btn
                            @click="closeGearFilterMenu()"
                            icon
                          >
                            <v-icon v-text="'mdi-close'" />
                          </v-btn>

                        </v-list-item>
                      </v-list>

                      <v-divider />

                      <v-list>
                        <v-list-item class="mb-3">
                          <x-picker
                            label="Category"
                            :list="typesList"
                            v-bind:value.sync="gearCategoryFilter"
                          ></x-picker>
                        </v-list-item>

                        <v-list-item class="mb-3">
                          <v-autocomplete
                            v-if="gearFilterModeOn"
                            label="Tags"
                            v-model="gearTagsFilter"
                            :items="preferences.gear_tags"
                            :color="currentColor"
                            filled
                            dense
                            clearable
                            hide-details="auto"
                          ></v-autocomplete>
                        </v-list-item>

                        <v-list-item class="mb-3">
                          <x-brand-selector v-bind:value.sync="gearBrandFilter" isInFilter />
                        </v-list-item>

                        <v-list-item class="mb-3">
                          <x-state-selector v-bind:value.sync="gearStateFilter" isInFilter />
                        </v-list-item>

                        <v-list-item class="mb-3">
                          <x-checkbox
                            label="Consumable"
                            v-bind:value.sync="gearConsumableFilter"
                          ></x-checkbox>
                        </v-list-item>

                        <v-list-item class="mb-3">
                          <x-checkbox
                            label="Packed"
                            v-bind:value.sync="gearIsPackedFilter"
                          ></x-checkbox>
                        </v-list-item>

                        <v-list-item class="mb-3">
                          <x-checkbox
                            label="Quantity owned > 0"
                            v-bind:value.sync="gearQuantityOwnedFilter"
                          ></x-checkbox>
                        </v-list-item>
                      </v-list>

                      <v-divider />

                      <v-card-actions>
                        <v-btn
                          @click="clearMenuFilters()"
                          :color="errorColor"
                          text
                        >
                          <span v-text="'Reset'" />
                        </v-btn>

                        <v-spacer />

                        <v-btn
                          @click="closeGearFilterMenu()"
                          text
                          class="primary-gradient-color-text"
                          icon
                        >
                          <v-icon v-text="'mdi-check'" />
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>

                <v-btn
                  @click="closeGearList()"
                  class="primary-gradient-color-text"
                  icon
                >
                  <v-icon :size="XLI" v-text="'mdi-check'" />
                </v-btn>

                <template v-slot:extension>
                  <v-list
                    v-bind:class="['rounded-0 py-0 max-width']"
                    one-line
                    flat
                    dense
                    color="transparent"
                  >
                    <v-list-item :class="[(isMobile ? 'pl-13 pr-3' : 'pl-11')]">
                      <v-list-item-avatar
                        v-bind:class="['x-avatar my-0 py-0 mr-1 d-flex justify-center']"
                        width="40"
                        height="40"
                      >
                        <v-col class="x-col py-2 x-primary-btn" @click.stop="sortGear('category')" v-ripple>
                          <div class="d-flex justify-center">
                            <x-sort-icon prop="category" />
                          </div>
                        </v-col>
                      </v-list-item-avatar>

                      <v-list-item-content class="py-0">
                        <v-row align="center" justify="center">

                          <v-col :cols="isMobile ? 6 : 3" class="py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('title')" v-ripple>
                            <div class="d-flex align-center">
                              <div class="text-tiny" v-text="'Title'" />
                              <x-sort-icon prop="title" />
                            </div>
                          </v-col>

                          <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('weight')" v-ripple>
                            <div class="d-flex justify-center align-center">
                              <div class="text-tiny" v-text="'Weight'" />
                              <x-sort-icon prop="weight" />
                            </div>
                          </v-col>

                          <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('price')" v-ripple>
                            <div class="d-flex justify-center align-center">
                              <div class="text-tiny" v-text="'Price'" />
                              <x-sort-icon prop="price" />
                            </div>
                          </v-col>

                          <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('state')" v-ripple>
                            <div class="d-flex justify-center align-center">
                              <div class="text-tiny" v-text="'State'" />
                              <x-sort-icon prop="state" />
                            </div>
                          </v-col>

                          <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('consumable')" v-ripple>
                            <div class="d-flex justify-center align-center">
                              <div class="text-tiny" v-text="'Consumable'" />
                              <x-sort-icon prop="consumable" />
                            </div>
                          </v-col>

                          <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
                            <div class="text-tiny text-center" v-text="'Worn'" />
                          </v-col>

                          <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('quantity_owned')" v-ripple>
                            <div class="d-flex justify-center align-center">
                              <div class="text-tiny text-center" v-text="'Qty'" />
                              <x-sort-icon prop="state" />
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-content>

                      <v-list-item-action class="ma-0" :style="'width: '+(isMobile ? '33' : '30')+'px !important; margin-left: '+(isMobile ? '13' : '20')+'px !important;'" />
                    </v-list-item>
                  </v-list>
                </template>
              </v-toolbar>

              <v-list
                v-if="gearList.length >= 1"
                subheader
                two-line
                dense
              >
                <v-responsive
                  class="overflow-y-auto"
                  :max-height="isMobile ? (listHeight) : 600"
                >
                  <v-scroll-y-transition group>
                    <template v-for="(gear, index) in filteredGear">
                      <inventory-gear-list-item
                        :key="`inventory-gear-${gear.id}-${index}`"
                        :gear="gear"
                        :index="index"
                        :inventoryGearList.sync="inventoryGearList"
                        :inventoryGear="inventoryGearItem(gear.id)"
                        :gearMenu.sync="inventoryGearMenu"
                        v-bind:inventoryGearIndex.sync="selectedInventoryGearIndex"
                        v-bind:inventoryGearQuantity.sync="selectedInventoryGearMaxQuantity"
                        v-on:itemAction="gear.quantity_owned > 0 ? gearListItemAction(gear) : null"
                      ></inventory-gear-list-item>

                      <v-divider
                        v-if="(index < gearList.length - 1)"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-scroll-y-transition>
                </v-responsive>
              </v-list>

              <v-list
                v-else
                subheader
                dense
              >
                <v-subheader v-text="'Gear List'" />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Empty'" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <v-dialog
            v-model="inventoryGearMenu"
            transition="dialog-right-transition"
            max-width="350"
          >
            <v-card v-if="typeof selectedInventoryGearIndex == 'number' && selectedInventoryGear">
              <v-list class="py-1">
                <v-list-item>
                  <v-list-item-title v-text="'Packing options'" />

                  <v-spacer />

                  <v-btn
                    @click.stop="unSelectInventoryGear()"
                    icon
                  >
                    <v-icon v-text="'mdi-close'" />
                  </v-btn>

                </v-list-item>
              </v-list>

              <v-divider />

              <v-list>
                <v-list-item class="mb-3">
                  <x-increment
                    label="Quantity packed"
                    v-bind:value.sync="selectedInventoryGear['gear_quantity_packed']"
                    :rules="xRules.decimal"
                    :color="currentColor"
                    :max="selectedInventoryGearMaxQuantity"
                    :min="0"
                  ></x-increment>
                </v-list-item>

                <v-list-item>
                  <x-checkbox
                    label="Worn"
                    v-bind:value.sync="selectedInventoryGear['gear_worn']"
                  ></x-checkbox>
                </v-list-item>
              </v-list>

              <v-divider />

              <v-card-actions>

                <v-spacer />

                <v-btn
                  @click.stop="unSelectInventoryGear()"
                  icon
                  class="primary-gradient-color-text"
                >
                  <v-icon v-text="'mdi-check'" />
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </div>
      </v-expand-transition>
    </v-container>
  </v-form>

</template>

<script>

  const _ = require('lodash');

  import EmptyList from "@/components/elements/EmptyList";
  import InventoryGearCard from "@/components/elements/Cards/InventoryGearCard";
  import XStackedProgressCard from "@/components/elements/StackedProgressCard/XStackedProgressCard";
  import XTitleField from "@/components/inputs/fields/XTitleField";
  import XPicker from "@/components/inputs/XPicker";
  import XBrandSelector from "@/components/inputs/fields/XBrandSelector";
  import XStateSelector from "@/components/inputs/fields/XStateSelector";
  import XIncrement from "@/components/inputs/XIncrement";
  import XCheckbox from "@/components/inputs/XCheckbox";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";
  import XDivider from "@/components/elements/XDivider";
  import XImg from "@/components/elements/XImg";
  import XCombobox from "@/components/inputs/XCombobox";
  import XUnknownCategoryIcon from "@/components/elements/Icons/XUnknownCategoryIcon";
  import InventoryGearListItem from "@/components/lists/items/InventoryGearListItem";

  export default {
    name: 'inventories-form',
    components: {
      EmptyList,
      InventoryGearCard,
      XStackedProgressCard,
      InventoryGearListItem,
      XTitleField,
      XUnknownCategoryIcon,
      XBrandSelector,
      XStateSelector,
      XPicker,
      XIncrement,
      XCheckbox,
      XSortIcon,
      XPieChart: () => import('@/components/charts/XPieChart'),
      XCombobox,
      XDivider,
      XImg
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
      },
      editMode: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      valid: false,
      tab: 'inventory-general',

      pieChart: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            borderColor: "transparent",
            data: []
          }
        ],
      },

      updatedItem: {
        inventory_gear:[]
      },

      inventoryGearList: [],
      inventoryGearReferenceList: [],
      inventoryTotalItems: 0,
      inventoryTotalWeight: 0,
      inventoryTotalPrice: 0,
      originalGearListInitialized: false,
      originalGearList: [],

      inventoryGearMenu: false,
      selectedInventoryGearIndex: null,
      selectedInventoryGearMaxQuantity: null,

      gearInventoryRelations: {},
      gearCategoryStats: {},

      overlay: false,
      isEditing: false,
      isLoading: false,
      isLoadingPieData: false,
      listHeight: 160,

      gearOrderBy: 'type',
      gearOrderOption: 'desc',

      gearFilterModeOn: false,
      gearCategoryFilter: null,
      gearIsPackedFilter: null,
      gearTagsFilter: null,
      gearStateFilter: null,
      gearBrandFilter: null,
      gearConsumableFilter: null,
      gearQuantityOwnedFilter: null,

      balance: {
        base: {
          label:'Base',
          value: 0,
          percentage: 0,
          icon: 'scale-balance',
          color: 'red'
        },
        worn: {
          label:'Worn',
          value: 0,
          percentage: 0,
          icon: 'tshirt-crew',
          color: 'light-blue'
        },
        wornConsumable: {
          label:'Worn & Cons.',
          value: 0,
          percentage: 0,
          icon: null,
          color: 'teal'
        },
        consumable: {
          label:'Cons.',
          value: 0,
          percentage: 0,
          icon: 'apple',
          color: 'light-green'
        },
      }
    }),
    computed: {
      mobileResponsiveHeight() {
        return (this.currentWindowHeight - 240);
      },
      desktopResponsiveHeight() {
        return (this.currentWindowHeight - 260);
      },
      selectedInventoryGear() {
        if(typeof this.selectedInventoryGearIndex != 'number' || !this.currentInventoryGear)
          return null;
        return (this.currentInventoryGear[this.selectedInventoryGearIndex]);
      },
      hasInventoryGear() {
        return (this.currentInventoryGear && this.currentInventoryGear.length >= 1);
      },
      currentInventoryGear() {
        if(this.updatedItem && this.updatedItem.inventory_gear && this.updatedItem.inventory_gear.length > 0)
          return this.updatedItem.inventory_gear;
        return [];
      },
      filteredGear() {
        if(this.isMounted)
          return (this.sortedGear.filter(item => {
            if(
              !this.itemSearch
              && !this.gearCategoryFilter
              && !this.gearStateFilter
              && !this.gearTagsFilter
              && !this.gearBrandFilter
              && !this.gearIsPackedFilter
              && !this.gearConsumableFilter
              && !this.gearQuantityOwnedFilter
            ) return this.gearList;

            return (
                (this.itemSearch ? (item.title && item.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
                && (this.gearCategoryFilter ? (item.category && item.category === this.gearCategoryFilter) : true)
                && (this.gearStateFilter ? (item.state && item.state === this.gearStateFilter) : true)
                && (this.gearBrandFilter ? (item.brand && item.brand === this.gearBrandFilter) : true)
                && (this.gearConsumableFilter ? (item.consumable === true) : true)
                && (this.gearTagsFilter ? (item.tags.includes(this.gearTagsFilter)) : true)
                && (this.gearIsPackedFilter ? (this.inventoryGearList && this.inventoryGearList.includes(item.id)) : true)
                && (this.gearQuantityOwnedFilter ? (item.quantity_owned > 0) : true)
            )
          }));

        return this.sortedGear;
      },
      sortedGear() {
        return _.orderBy(this.gearList, this.gearOrderBy, this.gearOrderOption);
      },
      sortedGearCategoryStats() {
        return _.orderBy(this.gearCategoryStats, 'weight', 'desc');
      }
    },
    methods: {
      clearMenuFilters() {
        this.gearCategoryFilter = null;
        this.gearTagsFilter = null;
        this.gearStateFilter = null;
        this.gearBrandFilter = null;
        this.gearConsumableFilter = null;
        this.gearIsPackedFilter = null;
        this.gearQuantityOwnedFilter = null;
      },
      closeGearFilterMenu() {
        this.gearFilterModeOn = false;
      },
      inventoryGearItem(gearId) {
        let index = this.inventoryGearList.indexOf(gearId);
        return ((index >= 0 && this.updatedItem.inventory_gear) ? this.updatedItem.inventory_gear[index] : null);
      },
      sortGear(by, option = "asc") {
        if (this.gearOrderBy == by) {
          if (this.gearOrderOption == "asc") {
            this.gearOrderOption = "desc";
          } else if (this.gearOrderOption == "desc") {
            this.gearOrderOption = "asc";
          }
        } else {
          this.gearOrderOption = option;
          this.gearOrderBy = by;
        }
      },
      async initPieChartData(gearCategoryStats) {
        if(this.isMounted && typeof Object.keys(gearCategoryStats).length == 'number' && Object.keys(gearCategoryStats).length > 0) {
          this.isLoadingPieData = true;
          let labels = [];
          let colors = [];
          let data = [];

          for (const [key, value] of Object.entries(gearCategoryStats)) {
            let gearCategory = value.id === 0 ? null : this.xGearCategory(value.id);
            let percentage = this.xFilters.percentageFilter(value.weight, this.inventoryGearList, this.inventoryTotalWeight);

            let chartLabel = (gearCategory && gearCategory.title ? gearCategory.title : 'Unknown') + `, ${percentage}%, weight(${this.dynamicWeightUnit(value.weight)})`;
            let color = this.categoryColor(gearCategory && gearCategory.id ? gearCategory.id : 14);
            let displayedWeight = this.weightUnitConverter(value.weight, false);

            labels.push(chartLabel);
            colors.push(color);
            data.push(displayedWeight);
          }

          this.pieChart.labels = labels;
          this.pieChart.datasets[0].backgroundColor = colors;
          this.pieChart.datasets[0].data = data;
          this.isLoadingPieData = false;
        }
      },
      async closeEditor() {
        await this.initGearList();
        this.isEditing = false;
      },
      unSelectInventoryGear() {
        this.selectedInventoryGearIndex = null;
        this.inventoryGearMenu = false;
      },
      closeGearList() {
        this.isEditing = false
      },
      editInventory() {
        this.isEditing = true;
      },
      gearListItemAction(gear) {
        if(this.inventoryGearList.includes(gear.id)) {
          this.removeGear(gear)
        } else {
          this.addGear(gear);
        }
      },
      addGear(gear) {
        if(gear.quantity_owned > 0 && !this.inventoryGearList.includes(gear.id)) {
          this.inventoryGearList.push(gear.id);

          let newInventoryGear = {
            gear_id: gear.id,
            gear_quantity_packed: gear.quantity_owned,
            gear_worn: false,
          };

          if(this.item && this.item.id)
            newInventoryGear.inventory_id = this.item.id;

          if(!this.updatedItem.inventory_gear)
            this.updatedItem.inventory_gear = [];

          this.updatedItem.inventory_gear.push(newInventoryGear);
        }
      },
      removeGear(gear) {
        let index = this.inventoryGearList.indexOf(gear.id);
        this.inventoryGearList.splice(index, 1);
        this.updatedItem.inventory_gear.splice(index, 1);
      },
      async initGearCategoryStats() {
        let self = this;
        let gearRefs = self.gearReferences;
        let newGearCategoryStats = {};

        let total = 0;
        let worn = 0;
        let consumable = 0;
        let wornConsumable = 0;

        this.currentInventoryGear.forEach(function(inventoryGear) {
          let gearId = inventoryGear.gear_id;
          let gearIndex = gearRefs[gearId];
          let _gear = self.gearList[gearIndex];

          if(_gear && inventoryGear.gear_quantity_packed) {
            let gearCategoryIndex = _gear.category || 0;
            let gearWeight = _gear.weight || 0;
            let gearQty = inventoryGear.gear_quantity_packed;
            let gearTotalWeight = (gearWeight * gearQty);

            if(!Object.prototype.hasOwnProperty.call(newGearCategoryStats, gearCategoryIndex) && !newGearCategoryStats[gearCategoryIndex]) {
              Object.assign(newGearCategoryStats, { [gearCategoryIndex] : {id: gearCategoryIndex, items: 1, weight: gearTotalWeight} });

            } else {
              let item = newGearCategoryStats[gearCategoryIndex];
              let items = item.items + 1;
              let weight = item.weight + gearTotalWeight;
              Object.assign(newGearCategoryStats[gearCategoryIndex],  { id: gearCategoryIndex, items: items, weight: weight } );
            }

            total += gearTotalWeight;
            worn += (inventoryGear.gear_worn === true && (_gear.consumable === false) ? gearTotalWeight : 0);
            consumable += ((_gear.consumable === true && inventoryGear.gear_worn === false) ? gearTotalWeight : 0);
            wornConsumable += (((inventoryGear.gear_worn === true) && (_gear.consumable === true)) ? gearTotalWeight : 0);
          }
        });

        if(total > 0) {
          this.balance.worn.value = worn;
          let wornPercentage = Math.floor((worn / total) * 100);
          this.balance.worn.percentage = wornPercentage;

          this.balance.consumable.value = consumable;
          let consumablePercentage = Math.floor((consumable / total) * 100);
          this.balance.consumable.percentage = consumablePercentage;

          this.balance.wornConsumable.value = wornConsumable;
          let wornConsumablePercentage = Math.floor((wornConsumable / total) * 100);
          this.balance.wornConsumable.percentage = wornConsumablePercentage;

          this.balance.base.value = (total - (worn + consumable + wornConsumable));
          this.balance.base.percentage = (100 - (wornPercentage + consumablePercentage + wornConsumablePercentage));
        }

        // resetting local GearCategoryStats
        this.gearCategoryStats = {};
        Object.assign(this.gearCategoryStats,  newGearCategoryStats);

        await this.initPieChartData(this.sortedGearCategoryStats);
      },
      async initGearList() {
        let self = this;
        if(this.updatedItem.inventory_gear && this.updatedItem.inventory_gear.length > 0) {
          while(self.inventoryGearList.length > 0) self.inventoryGearList.pop();
          Object.assign(self.gearInventoryRelations, {});

          this.updatedItem.inventory_gear.forEach(function(m2m) {
            if(typeof m2m.id == 'number') {
              self.inventoryGearList.push(m2m.gear_id);
              Object.assign(self.gearInventoryRelations, { [m2m.gear_id] : m2m.id });
            }
          });

          if(this.originalGearListInitialized === false) {
            this.originalGearList = [...self.inventoryGearList];
            this.originalGearListInitialized = true;
          }
        }
      },
      initWindowHeight() {
        this.listHeight = (window.innerHeight - 160);
      },
      sumCheckedGearProperty(prop) {
        let self = this;
        let sum = 0;

        if(!this.inventoryGearList)
          return sum;

        this.updatedItem.inventory_gear.forEach(function(inventoryGear) {
          console.log('sumCheckedGearProperty',prop);
          let gearId = inventoryGear.gear_id;
          let gearIndex = self.gearReferences[gearId];
          let _gear = self.gearList[gearIndex];

          if(inventoryGear.gear_quantity_packed > 0)
            if((prop === 'quantity_packed')) {
              sum += (inventoryGear.gear_quantity_packed > 0 ? 1 : 0);

            } else if (_gear && (typeof _gear[prop] === 'number')){
              sum += (_gear[prop] * inventoryGear.gear_quantity_packed);
            }
        });

        return sum;
      },
      async initInventoryStats() {
        this.inventoryTotalItems = this.sumCheckedGearProperty('quantity_packed');
        this.inventoryTotalWeight = this.sumCheckedGearProperty('weight');
        this.inventoryTotalPrice = this.sumCheckedGearProperty('price');
      }
    },
    watch: {
      isLoading(val) {
        if(this.isMounted)
          this.$emit('update:isFormLoading',val);
      },
      isFormLoading(val) {
        if(this.isMounted)
          this.isLoading = val;
      },
      valid(val) {
        if(this.isMounted)
          this.$emit('update:isFormValid',val);
      },
      async isMounted(newVal, oldVal) {
        if(newVal === true && oldVal === false) {
          this.$emit('update:isFormMounted',newVal);
          await this.initGearList();
        }
      },
      currentInventoryGear: {
        handler: async function() {
          await this.initGearCategoryStats();
          await this.initInventoryStats();
        },
        deep: true
      },
      isEditing(newVal) {
        this.isLoading = true;
        this.$emit('update:editMode',newVal);
        this.isLoading = false;
      },
      async postItem(val) {
        if(this.valid===true && val===true) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'inventory');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'inventory');

          await this.api_post_inventory(this.updatedItem, this.originalGearList, this.inventoryGearList, this.gearInventoryRelations);
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
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'inventory');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'inventory');

          await this.api_patch_inventory(this.updatedItem, this.itemIndex, this.originalGearList, this.inventoryGearList, this.gearInventoryRelations);
          this.isLoading = false;
        }
        if(this.valid===true && val===true)
          this.formDialog = false;
      },
      async deleteItem(val) {
        if(val===true) {
          await this.api_remove_inventory(this.item.id, this.itemIndex, this.originalGearList, this.gearInventoryRelations);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
        }
      },
      async editMode(val) {
        if(this.isMounted) {
          this.isEditing = val;

          if(val === false) {
            this.clearMenuFilters();
            await this.initGearCategoryStats();
          }
        }
      },
    },
    beforeDestroy() {
      this.isMounted = false;
    },
    async mounted() {
      this.initWindowHeight();

      if(this.item)
        this.updatedItem = this.copyVar(this.item);

      this.isMounted = true;
    }
  }

</script>

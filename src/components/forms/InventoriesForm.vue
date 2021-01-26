<template>

  <v-form v-model="valid">
    <v-container
      v-if="isMounted"
      style="max-width: unset;"
      v-bind:class="[
        {'ma-0': isMobile || isEditing},
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
          <v-tab :key="'inventory-gear-list'">
            <span v-text="'Gear List'" />
          </v-tab>
          <v-tab :key="'inventory-details'">
            <span v-text="'Details'" />
          </v-tab>

          <v-tabs-items v-model="tab" :style="xBackgroundStyleColorStr">
            <v-tab-item :key="'inventory-gear-list'">
              <v-responsive
                class="overflow-y-auto"
                :height="isMobile ? maxDialogContentHeight : 535"
              >
                <v-card v-if="isMobile" flat :color="xBackgroundColor">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Title"
                          v-model="updatedItem.title"
                          color="primary"
                          :rules="xRules.text"
                          filled
                          dense
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" class="py-0 mb-3">
                        <v-toolbar dense flat class="elevation-0" :color="xTabsColor">
                          <v-toolbar-title class="text-body-2" v-text="'Gear List'" />

                          <div
                            v-show="currentInventoryGear.length <= 0"
                            class="mx-1 text-tiny-dimmed"
                            v-text="'(empty)'"
                          />

                          <v-spacer />

                          <div v-if="item" class="d-flex text-caption">
                            <div>
                              <span
                                  v-bind:class="[currentColorText]"
                                  v-text="inventoryTotalItems"
                              ></span>
                              <span v-text="' Item'+(inventoryTotalItems>1?'s':'')" />
                            </div>

                            <x-divider />

                            <div>
                              <span v-if="item.inventory_gear" v-bind:class="[currentColorText]">{{ inventoryTotalWeight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
                              <span v-else v-bind:class="[currentColorText]" v-text="'0'" />
                              <span v-text="supWeightUnit" />
                            </div>

                            <x-divider />

                            <div>
                              <span v-if="item.inventory_gear" v-bind:class="[currentColorText]">{{ inventoryTotalPrice | thousandthFilter }}</span>
                              <span v-else v-bind:class="[currentColorText]" v-text="'0'" />
                              <span v-text="'k'+priceUnit" />
                            </div>
                          </div>

                          <v-spacer />

                          <v-btn
                            v-bind:class="[reversedFontShadeColor, 'elevation-0', 'primary-gradient-color']"
                            @click.stop="editInventory()"
                            small
                          >
                            <v-icon
                              size="18"
                              v-text="'mdi-pencil'"
                              class="mr-1"
                            />
                            <span v-text="'edit'" />
                          </v-btn>
                        </v-toolbar>

                        <v-divider />

                        <v-tabs
                          :color="currentColor"
                          :background-color="xTabsColor"
                          fixed-tabs
                          dense
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
                              :height="300"
                            >
                              <v-list
                                v-if="inventoryGearList.length > 0"
                                class="py-2 px-0"
                                one-line
                                dense
                              >
                                <template v-for="(gearCategoryStat) in sortedGearCategoryStats">
                                  <v-list-item :key="`gear-type-stat-${gearCategoryStat.id}`" class="pa-0">
                                    <v-list-item-avatar
                                        width="30"
                                        min-width="30"
                                        height="30"
                                        v-bind:class="[
                                          'x-avatar',
                                          'my-0 ml-3 mr-1',
                                        ]"
                                        :style="gearCategoryStat.id ? 'border: 1px solid '+hexColor(getVuetifyColor(gearCategoryStat.id))+' !important;' : ''"
                                    >
                                      <x-img
                                        v-if="gearCategoryStat.id && xGearCategory(gearCategoryStat.id) && objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0]"
                                        :src="objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0].icon"
                                        :tooltipText="xGearCategory(gearCategoryStat.id).title"
                                        :width="15"
                                        :height="15"
                                        isCategory
                                      ></x-img>

                                      <v-icon
                                          v-else
                                          v-text="'mdi-help-rhombus'"
                                      ></v-icon>
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
                                            <span class="text-tiny">{{ gearCategoryStat.weight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
                                            <span class="text-tiny-dimmed" v-text="supWeightUnit" />
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

                              <v-row>
                                <v-col cols="12">
                                  <div class="d-flex text-center align-center justify-center">
                                    <div class="pa-12">
                                      <div class="d-flex justify-center">
                                        <v-icon
                                          :color="navItemColor('gear')"
                                          v-text="'mdi-pickaxe'"
                                          size="30"
                                          class="mx-auto"
                                        ></v-icon>
                                      </div>

                                      <v-btn
                                        :color="navItemColor('gear')"
                                        class="my-3"
                                        outlined
                                        @click.stop="editInventory()"
                                      >
                                        <span v-bind:class="['text-body-2',fontShadeColor]" v-text="'Add Gear'" />
                                      </v-btn>
                                    </div>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-responsive>
                          </v-tab-item>

                          <v-tab-item>
                            <v-responsive
                              class="overflow-y-auto pr-3 "
                              :height="300"
                            >
                              <v-row v-if="inventoryGearList.length <= 0">
                                <v-col cols="12">
                                  <div class="d-flex text-center align-center justify-center">
                                    <div class="pa-12">
                                      <div class="d-flex justify-center">
                                        <v-icon
                                          :color="navItemColor('gear')"
                                          v-text="'mdi-pickaxe'"
                                          size="30"
                                          class="mx-auto"
                                        ></v-icon>
                                      </div>

                                      <v-btn
                                        :color="navItemColor('gear')"
                                        class="my-3"
                                        outlined
                                        @click.stop="editInventory()"
                                      >
                                        <span v-bind:class="['text-body-2',fontShadeColor]" v-text="'Add Gear'" />
                                      </v-btn>
                                    </div>
                                  </div>
                                </v-col>
                              </v-row>

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
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card v-else flat :color="xBackgroundColor">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                            label="Title"
                            v-model="updatedItem.title"
                            color="primary"
                            :rules="xRules.text"
                            filled
                            dense
                            hide-details="auto"
                            required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-toolbar dense flat class="elevation-0" :color="xTabsColor">
                          <v-toolbar-title class="text-body-1" v-text="'Gear List'" />

                          <div
                            v-show="currentInventoryGear.length <= 0"
                            class="mx-1 text-tiny-dimmed"
                            v-text="'(empty)'"
                          />

                          <v-spacer />

                          <div v-if="item" class="d-flex">
                            <div>
                              <span
                                  v-bind:class="[currentColorText]"
                                  v-text="inventoryTotalItems"
                              ></span>
                              <span v-text="' Item'+(inventoryTotalItems>1?'s':'')" />
                            </div>

                            <x-divider />

                            <div>
                              <span v-if="item.inventory_gear" v-bind:class="[currentColorText]">{{ inventoryTotalWeight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
                              <span v-else v-bind:class="[currentColorText]" v-text="'0'" />
                              <span v-text="' '+supWeightUnit" />
                            </div>

                            <x-divider />

                            <div>
                              <span v-if="item.inventory_gear" v-bind:class="[currentColorText]">{{ inventoryTotalPrice | thousandthFilter }}</span>
                              <span v-else v-bind:class="[currentColorText]" v-text="'0'" />
                              <span v-text="' k'+priceUnit" />
                            </div>
                          </div>

                          <v-spacer />

                          <v-btn
                            v-bind:class="[reversedFontShadeColor, 'elevation-0', 'primary-gradient-color']"
                            @click.stop="editInventory()"
                            small
                          >
                            <v-icon
                              size="18"
                              v-text="'mdi-pencil'"
                              class="mr-1"
                            />
                            <span v-text="'edit'" />
                          </v-btn>
                        </v-toolbar>

                        <v-divider />

                        <v-sheet class="elevation-0">
                          <v-row v-show="inventoryGearList.length <= 0">
                            <v-col cols="12">
                              <div class="d-flex text-center align-center justify-center">
                                <div class="pa-12">
                                  <div class="d-flex justify-center">
                                    <v-icon
                                      :color="navItemColor('gear')"
                                      v-text="'mdi-pickaxe'"
                                      size="30"
                                      class="mx-auto"
                                    ></v-icon>
                                  </div>

                                  <v-btn
                                    :color="navItemColor('gear')"
                                    class="my-3"
                                    outlined
                                    @click.stop="editInventory()"
                                  >
                                    <span v-bind:class="['text-body-2',fontShadeColor]" v-text="'Add Gear'" />
                                  </v-btn>
                                </div>
                              </div>
                            </v-col>
                          </v-row>

                          <v-row v-show="inventoryGearList.length > 0">
                            <v-col cols="5">
                              <x-pie-chart
                                v-if="isMounted && !isLoadingPieData && !isEditing && pieChart.labels.length > 0 && pieChart.datasets.length > 0"
                                :key="`pie-chart-${updatedItem.title}-${gearCategoryStats.length}`"
                                :labels="pieChart.labels"
                                :datasets="pieChart.datasets"
                                style="max-height: 230px !important; margin-top: 46px !important;"
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
                                :height="330"
                              >
                                <v-list
                                  class="pa-0"
                                  one-line
                                  dense
                                >
                                  <template v-for="(gearCategoryStat) in sortedGearCategoryStats">
                                    <v-list-item :key="`gear-type-stat-${gearCategoryStat.id}`" class="pa-0" style="min-height: 36px;">
                                      <v-list-item-avatar
                                        width="30"
                                        min-width="30"
                                        height="30"
                                        v-bind:class="[
                                          'x-avatar',
                                          'my-0 ml-3 mr-1',
                                        ]"
                                        :style="gearCategoryStat.id ? 'border: 1px solid '+hexColor(getVuetifyColor(gearCategoryStat.id))+' !important;' : ''"
                                      >
                                        <x-img
                                          v-if="gearCategoryStat.id && xGearCategory(gearCategoryStat.id) && objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0]"
                                          :src="objFilter(gearCategories, 'id', parseInt(gearCategoryStat.id))[0].icon"
                                          :tooltipText="xGearCategory(gearCategoryStat.id).title"
                                          :width="15"
                                          :height="15"
                                          isCategory
                                        />
                                        <v-icon
                                          v-else
                                          v-text="'mdi-help-rhombus'"
                                        />
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
                                              <span class="text-tiny">{{ gearCategoryStat.weight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
                                              <span class="text-tiny-dimmed" v-text="supWeightUnit" />
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

            <v-tab-item :key="'inventory-details'">
              <v-responsive
                class="overflow-y-auto"
                :height="isMobile ? maxDialogContentHeight : 535"
              >
                <v-card v-if="isMobile" flat :color="xBackgroundColor">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <x-combobox
                          label="Tags"
                          v-bind:value.sync="updatedItem.tags"
                          v-bind:items="preferences.inventory_tags"
                          v-bind:route="'inventories'"
                        ></x-combobox>
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
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card v-else flat :color="xBackgroundColor">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <x-combobox
                          label="Tags"
                          v-bind:value.sync="updatedItem.tags"
                          v-bind:items="preferences.inventory_tags"
                          v-bind:route="'inventories'"
                        ></x-combobox>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          label="Description"
                          v-model="updatedItem.description"
                          color="primary"
                          filled
                          dense
                          hide-details="auto"
                          auto-grow
                          rows="1"
                        ></v-textarea>
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
            <v-card-text class="pa-0">
              <v-toolbar :class="['edition-toolbar', (isMobile ? 'px-0' : 'px-3')]">
                <v-btn @click="closeEditor()" icon>
                  <v-icon v-text="'mdi-arrow-left'" />
                </v-btn>

                <v-toolbar-title v-text="'Gear'" v-bind:class="['pl-1']" />

                <v-spacer />

                <div class="d-flex">
                  <div>
                    <span
                      v-bind:class="[currentColorText]"
                      v-text="inventoryTotalItems"
                    ></span>
                    <span v-text="' item'+(inventoryTotalItems>1?'s':'')" class="text-tiny" />
                  </div>

                  <x-divider />

                  <div>
                    <span v-bind:class="[currentColorText]">{{ inventoryTotalWeight | weightUnitFilter(weightUnit) | supWeightUnitFilter(weightUnit) }}</span>
                    <span v-text="supWeightUnit" class="text-tiny" />
                  </div>
                </div>

                <v-spacer />

                <filter-menu
                  v-bind:filterMode.sync="gearFilterMode"
                  :forcedRouteName="'gear'"
                  class="mr-1"
                ></filter-menu>

                <v-btn
                  @click="closeGearList()"
                  class="primary-gradient-color-text"
                  icon
                >
                  <v-icon :size="28" v-text="'mdi-check'" />
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
                        v-bind:class="[
                          'x-avatar',
                          'my-0 py-0 mr-2',
                        ]"
                        width="40"
                        height="40"
                      >
                        <v-col class="x-col py-2 x-primary-btn" @click.stop="sortGear('type')" v-ripple>
                          <div class="d-flex justify-center">
                            <x-sort-icon prop="type" />
                          </div>
                        </v-col>
                      </v-list-item-avatar>

                      <v-list-item-content class="py-0">
                        <v-row align="center" justify="center">

                          <v-col :cols="isMobile ? 5 : 4" class="py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('title')" v-ripple>
                            <div class="d-flex align-center">
                              <div class="text-tiny" v-text="'Title / Model'" />
                              <x-sort-icon prop="title" />
                            </div>
                          </v-col>

                          <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('weight')" v-ripple>
                            <div class="d-flex justify-center align-center">
                              <div v-show="!isMobile" class="text-tiny" v-text="'Weight'" />
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

                          <v-col class="x-col px-0 py-2 col-border-r">
                            <div class="text-tiny text-center" v-text="'Worn'" />
                          </v-col>

                          <v-col class="x-col px-0 py-2 col-border-r">
                            <div class="text-tiny text-center" v-text="'Qty'" />
                          </v-col>

<!--                          <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('quantity_owned')" v-ripple>-->
<!--                            <div class="d-flex justify-center align-center">-->
<!--                              <div v-show="!isMobile" class="text-tiny ml-1" v-text="'Qty'" />-->
<!--                              <x-sort-icon prop="quantity_owned" />-->
<!--                            </div>-->
<!--                          </v-col>-->
                        </v-row>
                      </v-list-item-content>

                      <v-list-item-action style="width: 36px !important;" class="ma-0" />
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
                      <v-list-item
                        :key="`inventory-gear-${gear.id}-${index}`"
                        v-bind:class="['x-checklist-item', {'px-3':isMobile}]"
                        @click.stop="gearListItemAction(gear)"
                      >
                        <v-list-item-action :class="['ml-1',(isMobile ? 'mr-0' : ' mr-4')]">
                          <x-checker :value="inventoryGearList.includes(gear.id)" />
                        </v-list-item-action>

                        <v-list-item-avatar
                          v-bind:class="[
                            'x-avatar',
                            'my-0 mr-2',
                          ]"
                          width="32"
                          min-width="32"
                          height="32"
                          :style="'border: 2px solid '+hexColor(getVuetifyColor(gear.category))+' !important;'"
                        >
                          <x-img
                            v-if="gear.category && xGearCategory(gear.category)"
                            :src="xGearCategory(gear.category).icon"
                            :tooltipText="xGearCategory(gear.category).title"
                            :width="16"
                            :height="16"
                            isCategory
                          ></x-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-row align="center" justify="center">
                            <v-col :cols="isMobile ? 5 : 4" class="py-0">
                              <div>
                                <v-list-item-title
                                  v-text="gear.title"
                                  v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
                                ></v-list-item-title>

                                <v-list-item-subtitle
                                  class="text-caption"
                                  v-text="gear.brand ? xGearBrand(gear.brand).title : '.'"
                                ></v-list-item-subtitle>
                              </div>
                            </v-col>

                            <v-col class="x-col">
                              <div v-if="gear.weight">
                                <span class="text-caption">{{ gear.weight | weightUnitFilter(weightUnit) }}</span>
                                <span class="text-tiny-dimmed" v-text="weightUnit" />
                              </div>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col v-show="!isMobile" class="x-col">
                              <div v-if="gear.price">
                                <span class="text-caption" v-text="gear.price" />
                                <span class="text-tiny-dimmed" v-text="priceUnit" />
                              </div>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col v-show="!isMobile" class="x-col">
                              <v-tooltip v-if="gear.state && xGearState(gear.state)" bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon
                                    :color="xGearState(gear.state).color"
                                    v-text="'mdi-'+stateIcon(xGearState(gear.state).title)"
                                    :size="21"
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-icon>
                                </template>
                                <span v-text="xGearState(gear.state).title" />
                              </v-tooltip>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col class="x-col">
                              <div
                                v-if="inventoryGearItem(gear.id)"
                                :key="`gear_worn-${gear.id}-${inventoryGearItem(gear.id).gear_worn}`"
                              >
                                <v-icon
                                  v-if="inventoryGearItem(gear.id).gear_worn === true"
                                  v-text="'mdi-tshirt-crew'"
                                  class="primary-gradient-color-text"
                                  style="margin-bottom: 3px;"
                                  small
                                ></v-icon>
                              </div>
                              <empty-data solo v-else />
                            </v-col>

                            <v-col class="x-col">
                              <div v-bind:class="['ml-1']">
                                <span
                                  v-if="inventoryGearItem(gear.id)"
                                  :key="`gear_quantity_packed-${gear.id}-${inventoryGearItem(gear.id).gear_quantity_packed}`"
                                  class="text-body-2"
                                  v-html="inventoryGearItem(gear.id).gear_quantity_packed || 0"
                                ></span>
                                <span v-else class="text-body-2" v-text="'0'" />

<!--                                <span v-bind:class="['text-tiny-dimmed']" v-html="'/'+(gear.quantity_owned || 0)" />-->
                              </div>
                            </v-col>
                          </v-row>
                        </v-list-item-content>

                        <v-list-item-action style="margin-right: 0 !important;">
                          <v-btn
                            :class="[{'primary-gradient-color-text':inventoryGearList.includes(gear.id)}]"
                            :disabled="!inventoryGearList.includes(gear.id)"
                            @click.stop="inventoryGearList.includes(gear.id) ? selectInventoryGear(gear) : null"
                            icon
                          >
                            <v-icon v-text="'mdi-dots-vertical'" />
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>

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

  import Vue from 'vue'
  const _ = require('lodash');

  import XIncrement from "@/components/inputs/XIncrement";
  import XCheckbox from "@/components/inputs/XCheckbox";
  import XChecker from "@/components/inputs/XChecker";
  import XSortIcon from "@/components/elements/XSortIcon";
  import XDivider from "@/components/elements/XDivider";
  import EmptyData from "@/components/elements/Stepper/EmptyData";
  import FilterMenu from "@/components/elements/FilterMenu/FilterMenu";
  import XImg from "@/components/elements/XImg";
  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'inventories-form',
    components: {
      XIncrement,
      XCheckbox,
      XChecker,
      XSortIcon,
      XPieChart: () => import('@/components/charts/XPieChart'),
      XCombobox,
      XDivider,
      EmptyData,
      FilterMenu,
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

      updatedItem: {},

      inventoryGearList: [],
      inventoryTotalItems: 0,
      inventoryTotalWeight: 0,
      inventoryTotalPrice: 0,
      originalGearList: [],

      inventoryGearMenu: false,
      selectedInventoryGearIndex: null,
      selectedInventoryGearMaxQuantity: null,

      gearInventoryRelations: {},
      gearCategoryStats: {},
      gearFilterMode: false,

      overlay: false,
      isEditing: false,
      isLoading: false,
      isLoadingPieData: false,
      listHeight: 150,

      gearOrderBy: 'type',
      gearOrderOption: 'desc',
    }),
    computed: {
      selectedInventoryGear() {
        if(typeof this.selectedInventoryGearIndex != 'number' || !this.updatedItem.inventory_gear)
          return null;
        return (this.updatedItem.inventory_gear[this.selectedInventoryGearIndex]);
      },
      desktopMaxHeight() {
        return (this.currentWindowHeight < 660 ? this.currentWindowHeight : 1000);
      },
      itemGearCategory: {
        get() {
          return this.$store.state.ui.itemGearCategory
        }
      },
      itemGearState: {
        get() {
          return this.$store.state.ui.itemGearState
        }
      },
      itemGearBrand: {
        get() {
          return this.$store.state.ui.itemGearBrand
        }
      },
      hasInventoryGear() {
        return (this.currentInventoryGear && this.currentInventoryGear.length >= 1);
      },
      gearListDifferences() {
        let addedGear = this.inventoryGearList.filter(x => !this.originalGearList.includes(x));
        let removedGear = this.originalGearList.filter(x => !this.inventoryGearList.includes(x));
        return (addedGear.length + removedGear.length);
      },
      currentInventoryGear() {
        if(this.isMounted && this.item && this.item.inventory_gear)
          return this.item.inventory_gear;

        return [];
      },
      filteredGear() {
        if(this.isMounted)
          return (this.sortedGear.filter(item => {
            if(
              !this.itemSearch
              && !this.itemGearCategory
              && !this.itemGearState
              && !this.itemGearBrand
            ) return this.gearList;

            return (
                (this.itemSearch ? (item.title && item.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
                && (this.itemGearCategory ? (item.category && item.category === this.itemGearCategory) : true)
                && (this.itemGearState ? (item.state && item.state === this.itemGearState) : true)
                && (this.itemGearBrand ? (item.brand && item.brand === this.itemGearBrand) : true)
            )
          }));

        return this.gearList;
      },
      sortedGear() {
        return _.orderBy(this.gearList, this.gearOrderBy, this.gearOrderOption);
      },
      sortedGearCategoryStats() {
        return _.orderBy(this.gearCategoryStats, 'weight', 'desc');
      }
    },
    methods: {
      inventoryGearItem(gearId) {
        let index = this.inventoryGearList.indexOf(gearId);
        return ((index >=0 ) ? this.updatedItem.inventory_gear[index] : null);
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
            let percentage = this.$options.filters.percentageFilter(value.weight, this.inventoryGearList, this.inventoryTotalWeight);
            let chartLabel = (gearCategory && gearCategory.title ? gearCategory.title : 'Unknown') + `, ${percentage}%, weight(${this.supWeightUnit})`;
            let color = this.hexColor(this.getVuetifyColor(gearCategory && gearCategory.id ? gearCategory.id : 0));
            let displayedWeight = this.supWeightUnitConverter(value.weight);

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
        this.isEditing = false
      },
      selectInventoryGear(gear) {
        let gearIndex = this.inventoryGearList.indexOf(gear.id);
        this.selectedInventoryGearIndex = gearIndex;
        this.selectedInventoryGearMaxQuantity = gear.quantity_owned;
        this.inventoryGearMenu = true;
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
        if(!this.inventoryGearList.includes(gear.id)) {
          this.inventoryGearList.push(gear.id);

          let newInventoryGear = {
            inventory_id: this.updatedItem.id,
            gear_id: gear.id,
            gear_quantity_packed: gear.quantity_owned,
            gear_worn: false,
          };

          if(!this.updatedItem.inventory_gear)
            this.updatedItem.inventory_gear = [];

          let len = this.updatedItem.inventory_gear.length;
          Vue.set(this.updatedItem.inventory_gear, len, newInventoryGear);
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

        this.inventoryGearList.forEach(function(gearId) {
          let gearIndex = gearRefs[gearId];

          if(self.gearList[gearIndex]) {
            let gearQty = self.gearList[gearIndex].quantity_owned || 0;

            if(gearQty !== 0) {
              let gearCategoryIndex = self.gearList[gearIndex].category ? self.gearList[gearIndex].category : 0;
              let gearWeight = self.gearList[gearIndex].weight ? self.gearList[gearIndex].weight : 0;

              if(!Object.prototype.hasOwnProperty.call(newGearCategoryStats, gearCategoryIndex) && !newGearCategoryStats[gearCategoryIndex]) {
                Object.assign(newGearCategoryStats, { [gearCategoryIndex] : {id: gearCategoryIndex, items: 1, weight: (gearWeight * gearQty)} });

              } else {
                let items = newGearCategoryStats[gearCategoryIndex].items + 1;
                let weight = newGearCategoryStats[gearCategoryIndex].weight + (gearWeight * gearQty);
                Object.assign(newGearCategoryStats[gearCategoryIndex],  { id: gearCategoryIndex, items: items, weight: weight } );
              }
            }
          }
        });

        // resetting local GearCategoryStats
        this.gearCategoryStats = {};
        Object.assign(this.gearCategoryStats,  newGearCategoryStats);

        await this.initPieChartData(this.sortedGearCategoryStats);
      },
      async initGearList() {
        let self = this;
        if(this.currentInventoryGear && this.currentInventoryGear.length > 0) {
          while(self.inventoryGearList.length > 0) self.inventoryGearList.pop();
          Object.assign(self.gearInventoryRelations, {});

          this.currentInventoryGear.forEach(function(m2m) {
            self.inventoryGearList.push(m2m.gear_id);
            Object.assign(self.gearInventoryRelations, { [m2m.gear_id] : m2m.id });
          });

          this.originalGearList = [...this.inventoryGearList];
        }
      },
      initWindowHeight() {
        this.listHeight = (window.innerHeight - 122);
      },
      sumCheckedGearProperty(prop) {
        let self = this;
        let sum = 0;

        if(!this.inventoryGearList)
          return sum;

        this.inventoryGearList.forEach(function(gear) {
          let gearIndex = self.gearReferences[gear];

          if(self.gearList[gearIndex]
              && (typeof self.gearList[gearIndex][prop] === 'number')
              && (self.gearList[gearIndex]['quantity_owned'] > 0)
          ) {
            if(prop !== 'quantity_owned') {
              sum += (self.gearList[gearIndex][prop] * self.gearList[gearIndex]['quantity_owned']);
            } else {
              sum += (self.gearList[gearIndex]['quantity_owned'] > 0 ? 1 : 0);
            }
          }
        });

        return sum;
      },
      initInventoryStats() {
        this.inventoryTotalItems = this.sumCheckedGearProperty('quantity_owned');
        this.inventoryTotalWeight = this.sumCheckedGearProperty('weight');
        this.inventoryTotalPrice = this.sumCheckedGearProperty('price');
      }
    },
    watch: {
      inventoryGearList() {
        if(this.isMounted) {
          this.initInventoryStats();
        }
      },
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
      isMounted(newVal, oldVal) {
        if(newVal === true && oldVal === false)
          this.$emit('update:isFormMounted',newVal);
      },
      async currentInventoryGear() {
        await this.initGearList();
        await this.initGearCategoryStats();
      },
      async isEditing(newVal) {
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

      if(typeof this.item != 'undefined' && this.item) {
        Object.assign(this.updatedItem, this.item);
      }

      await this.initGearList();
      await this.initGearCategoryStats();

      this.isMounted = true;
    }
  }

</script>

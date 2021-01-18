<template>

  <v-form v-model="valid">
    <v-container
      v-if="isMounted"
      style="max-width: unset;"
      v-bind:class="[
        {'ma-0': isMobile || isEditing},
        {'py-0': isEditing},
        {'pa-0': isMobile},
      ]"
    >
      <v-expand-transition>
        <v-tabs
          v-if="isMobile"
          v-show="!isEditing"
          v-model="tab"
          :color="currentColor"
          :background-color="xTabsColor"
          fixed-tabs
        >
          <v-tab :key="'inventory-general'">
            <span v-text="'General'" />
          </v-tab>
          <v-tab :key="'inventory-gear-list'">
            <span v-text="'Gear list'" />
          </v-tab>

          <v-tabs-items v-model="tab">
            <v-tab-item :key="'inventory-general'">
              <v-card flat :color="xBackgroundColor">
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Title"
                        v-model="updatedItem.title"
                        :color="currentColor"
                        :rules="xRules.text"
                        filled
                        dense
                        hide-details="auto"
                        required
                      ></v-text-field>
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
            </v-tab-item>

            <v-tab-item :key="'inventory-gear-list'">
              <v-card flat :color="xBackgroundColor">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="mt-3 pt-0">
                      <div class="x-check-form">
                        <v-card
                            v-if="isMounted"
                            v-bind:class="[
                            'x-check-form-card',
                            'mx-auto',
                            'elevation-0',
                            {'is-dark':isDark}
                          ]"
                            @click.stop="editInventory()"
                        >
                          <v-list one-line dense>
                            <v-list-item class="input-list-item">

                              <v-list-item-content>
                                <v-list-item-title
                                    v-bind:class="[fontShadeColor, 'mb-2']"
                                >
                                  <span v-text="'Gear Packing List'" />
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                  <span
                                      v-bind:class="[currentColorText, 'font-weight-regular']"
                                      v-text="gearListDifferences > 0 ? gearListDifferences+' unsaved item'+(gearListDifferences>1?'s':'') : 'up to date'"
                                  ></span>
                                </v-list-item-subtitle>
                              </v-list-item-content>

                              <v-list-item-action v-if="item && item.inventory_gear">
                                <v-list-item-action-text>
                                  <div class="d-flex">
                                    <div>
                                      <span
                                          v-bind:class="['text-body-2',currentColorText]"
                                          v-text="currentInventoryGear.length"
                                      ></span>
                                      <span v-text="' Item'+(currentInventoryGear.length>1?'s':'')" />
                                    </div>

<!--                                    <x-divider />-->

<!--                                    <div>-->
<!--                                      <span v-bind:class="['text-body-2',currentColorText]">{{ sumInventoryWeight(item.inventory_gear) | thousandthFilter }}</span>-->
<!--                                      <span v-text="' k'+weightUnit" />-->
<!--                                    </div>-->

<!--                                    <x-divider />-->

<!--                                    <div>-->
<!--                                      <span v-bind:class="['text-body-2',currentColorText]">{{ sumInventoryPrice(item.inventory_gear) | thousandthFilter }}</span>-->
<!--                                      <span v-text="' k'+priceUnit" />-->
<!--                                    </div>-->
                                  </div>
                                </v-list-item-action-text>
                              </v-list-item-action>

                              <v-list-item-avatar>
                                <edit-icon isSelector />
                              </v-list-item-avatar>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </div>
                    </v-col>

                    <v-col cols="12" class="py-0 mb-3">
                      <div class="d-flex">
                        <div class="pa-2 pb-1">
                          <span class="text-caption" v-text="'Gear list'" />
                          <span
                            v-show="currentInventoryGear.length <= 0"
                            class="mx-1 text-tiny-dimmed"
                            v-text="'(empty)'"
                          />
                        </div>

                        <v-spacer />

                        <div class="d-flex pa-2 pb-1">

                          <div>
                            <span v-bind:class="['text-caption',currentColorText]">{{ sumInventoryWeight(item.inventory_gear) | thousandthFilter }}</span>
                            <span class="text-caption" v-text="' k'+weightUnit" />
                          </div>

                          <x-divider style="height:34px !important;" />

                          <div>
                            <span v-bind:class="['text-caption',currentColorText]">{{ sumInventoryPrice(item.inventory_gear) | thousandthFilter }}</span>
                            <span class="text-caption" v-text="' k'+priceUnit" />
                          </div>
                        </div>
                      </div>

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
                              v-if="currentInventoryGear.length > 0"
                              class="py-2 px-0"
                              one-line
                              dense
                            >
                              <template v-for="(gearTypeStat, gearTypeId) in gearTypeStats">
                                <v-list-item :key="`gear-type-stat-${gearTypeId}`" class="pa-0">
                                  <v-list-item-avatar
                                    width="30"
                                    min-width="30"
                                    height="30"
                                    v-bind:class="[
                                      'x-avatar',
                                      'my-0 mx-3',
                                      getReversedVuetifyColor(gearTypeId)
                                    ]"
                                  >
                                    <x-img
                                      v-if="gearTypeId && xGearType(gearTypeId) && objFilter(gearTypes, 'id', parseInt(gearTypeId))[0]"
                                      :src="objFilter(gearTypes, 'id', parseInt(gearTypeId))[0].icon.data.full_url"
                                      :tooltipText="xGearType(gearTypeId).title"
                                      isCategory
                                    />
                                    <v-icon
                                      v-else
                                      v-text="'mdi-help-rhombus'"
                                    />
                                  </v-list-item-avatar>

                                  <v-list-item-title>
                                    <div class="d-flex">
                                      <div class="text-caption" style="width: 80px;">
                                        <div v-if="gearTypeId && objFilter(gearTypes, 'id', parseInt(gearTypeId))[0]"
                                        >{{ objFilter(gearTypes, 'id', parseInt(gearTypeId))[0].title }}</div>
                                        <div
                                          v-else
                                          v-text="'unknown'"
                                        ></div>
                                      </div>

                                      <div class="d-flex font-weight-regular text-caption">

                                        <x-divider />

                                        <div style="width: 50px;">
                                          <span class="text-tiny" v-text="gearTypeStat.items" />
                                          <span class="text-tiny-dimmed" v-text="' item'" />
                                          <span class="text-tiny-dimmed" v-show="gearTypeStat.items > 1" v-text="'s'" />
                                        </div>

                                        <x-divider />

                                        <div>
                                          <span class="text-tiny" v-text="gearTypeStat.weight" />
                                          <span class="text-tiny-dimmed" v-text="weightUnit" />
                                        </div>
                                      </div>

                                      <v-spacer />

                                      <div class="float-right">
                                        <span class="text-caption">{{ gearTypeStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight) }}</span>
                                        <span class="text-tiny-dimmed" v-text="'%'" />
                                      </div>
                                    </div>

                                    <v-progress-linear
                                      :value="gearTypeStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight)"
                                      :color="getVuetifyColor((gearTypeId ? gearTypeId : 0))"
                                      :height="3"
                                      :background-color="xProgressColor"
                                    ></v-progress-linear>
                                  </v-list-item-title>
                                </v-list-item>
                              </template>
                            </v-list>

                            <empty-list
                              v-else
                              label="Add Gear"
                              icon="mdi-pickaxe"
                              :color="navItemColor('gear')"
                            ></empty-list>
                          </v-responsive>
                        </v-tab-item>

                        <v-tab-item>
                          <v-responsive
                            class="overflow-y-auto pr-3 "
                            :height="300"
                          >
                            <empty-list
                              v-if="currentInventoryGear.length <= 0"
                              label="Add Gear"
                              icon="mdi-pickaxe"
                              :color="navItemColor('gear')"
                            ></empty-list>

                            <x-pie-chart
                              v-else-if="isMounted && !isLoadingPieData && !isEditing  && pieChart.labels.length > 0 && pieChart.datasets.length > 0"
                              :key="`pie-chart-${updatedItem.title}-${gearTypeStats.length}`"
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
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-expand-transition>

      <v-expand-transition>
        <v-row v-if="!isMobile" v-show="!isEditing">
          <v-col cols="12">
            <v-text-field
              label="Title"
              v-model="updatedItem.title"
              :color="currentColor"
              :rules="xRules.text"
              filled
              dense
              hide-details="auto"
              required
            ></v-text-field>
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

          <v-col cols="12">
            <v-toolbar dense flat class="elevation-0" :color="xTabsColor">
              <v-toolbar-title class="text-body-1" v-text="'Gear List'" />

              <div
                v-show="currentInventoryGear.length <= 0"
                class="mx-1 text-tiny-dimmed"
                v-text="'(empty)'"
              />

              <v-spacer />

              <div class="d-flex">
                <div>
                  <span
                    v-bind:class="[currentColorText]"
                    v-text="currentInventoryGear.length"
                  ></span>
                  <span v-text="' Item'+(currentInventoryGear.length>1?'s':'')" />
                </div>

                <x-divider />

                <div>
                  <span v-bind:class="[currentColorText]">{{ sumInventoryWeight(item.inventory_gear) | thousandthFilter }}</span>
                  <span v-text="' k'+weightUnit" />
                </div>

                <x-divider />

                <div>
                  <span v-bind:class="[currentColorText]">{{ sumInventoryPrice(item.inventory_gear) | thousandthFilter }}</span>
                  <span v-text="' k'+priceUnit" />
                </div>
              </div>

              <v-spacer />

              <v-btn
                  outlined
                  small
                  :color="darkColor('primary')"
                  @click.stop="editInventory()"
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
              <empty-list
                v-show="currentInventoryGear.length <= 0"
                label="Add Gear"
                icon="mdi-pickaxe"
                :color="navItemColor('gear')"
              ></empty-list>

              <v-row v-show="currentInventoryGear.length > 0">
                <v-col cols="5">
                  <x-pie-chart
                    v-if="isMounted && !isLoadingPieData && !isEditing && pieChart.labels.length > 0 && pieChart.datasets.length > 0"
                    :key="`pie-chart-${updatedItem.title}-${gearTypeStats.length}`"
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
                      <template v-for="(gearTypeStat, gearTypeId) in gearTypeStats">
                        <v-list-item :key="`gear-type-stat-${gearTypeId}`" class="pa-0" style="min-height: 36px;">
                          <v-list-item-avatar
                            width="30"
                            min-width="30"
                            height="30"
                            v-bind:class="[
                              'x-avatar',
                              'my-0 mx-3',
                              getReversedVuetifyColor(gearTypeId)
                            ]"
                          >
                            <x-img
                              v-if="gearTypeId && xGearType(gearTypeId) && objFilter(gearTypes, 'id', parseInt(gearTypeId))[0]"
                              :src="objFilter(gearTypes, 'id', parseInt(gearTypeId))[0].icon.data.full_url"
                              :tooltipText="xGearType(gearTypeId).title"
                              isCategory
                            />
                            <v-icon
                              v-else
                              v-text="'mdi-help-rhombus'"
                            />
                          </v-list-item-avatar>

                          <v-list-item-title>
                            <div class="d-flex">
                              <div class="text-caption" style="width: 80px;">
                                <div
                                  v-if="gearTypeId && objFilter(gearTypes, 'id', parseInt(gearTypeId))[0]"
                                >{{ objFilter(gearTypes, 'id', parseInt(gearTypeId))[0].title }}</div>
                                <div
                                    v-else
                                    v-text="'unknown'"
                                ></div>
                              </div>

                              <div class="d-flex font-weight-regular text-caption">

                                <x-divider />

                                <div>
                                  <span class="text-tiny" v-text="gearTypeStat.items" />
                                  <span class="text-tiny-dimmed" v-text="' item'" />
                                  <span class="text-tiny-dimmed" v-show="gearTypeStat.items > 1" v-text="'s'" />
                                </div>

                                <x-divider />

                                <div>
                                  <span class="text-tiny" v-text="gearTypeStat.weight" />
                                  <span class="text-tiny-dimmed" v-text="weightUnit" />
                                </div>
                              </div>

                              <v-spacer />

                              <div class="float-right">
                                <span class="text-caption">{{ gearTypeStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight) }}</span>
                                <span class="text-tiny-dimmed" v-text="'%'" />
                              </div>
                            </div>

                            <v-progress-linear
                              :value="gearTypeStat.weight | percentageFilter(inventoryGearList, inventoryTotalWeight)"
                              :color="getVuetifyColor((gearTypeId ? gearTypeId : 0))"
                              :height="6"
                              :background-color="xProgressColor"
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
      </v-expand-transition>

      <v-expand-transition>
        <v-row v-show="isEditing">
          <v-col cols="12" class="pa-0">
              <v-card class="mx-auto" flat :color="xBackgroundColor">

                <v-card-text class="pa-0">
                  <v-toolbar class="pl-3 pr-2">
                    <v-btn @click="closeEditor()" icon>
                      <v-icon v-text="'mdi-arrow-left'" />
                    </v-btn>

                    <v-toolbar-title v-text="'Gear'" v-bind:class="[{'pa-0':isMobile}]" />

                    <v-spacer />

                    <div class="d-flex mt-1">
                      <div>
                        <span
                          v-bind:class="[currentColorText]"
                          v-text="currentInventoryGear.length"
                        />
                        <span v-text="' item'+(currentInventoryGear.length>1?'s':'')" class="text-tiny" />
                      </div>

                      <x-divider />

                      <div>
                        <span v-bind:class="[currentColorText]">{{ inventoryTotalWeight | thousandthFilter }}</span>
                        <span v-text="'k'+weightUnit" class="text-tiny" />
                      </div>

                      <x-divider />

                      <div>
                        <span v-bind:class="[currentColorText]">{{ inventoryTotalPrice | thousandthFilter }}</span>
                        <span v-text="'k'+priceUnit" class="text-tiny" />
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
                      :color="darkColor('primary')"
                      icon
                      style="margin-right: 1px !important;"
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
                        <v-list-item class="pl-15">
                          <v-list-item-avatar
                            v-bind:class="[
                              'x-avatar',
                              'my-0 py-0',
                               (isMobile ? 'mr-3' : 'mr-2'),
                            ]"
                            width="40"
                            height="40"
                            :style="isMobile ? 'margin-left: -4px;' : ''"
                          >
                            <v-col class="x-col py-2 x-primary-btn" @click.stop="sortGear('type')" v-ripple>
                              <div class="d-flex justify-center">
                                <x-sort-icon prop="type" />
                              </div>
                            </v-col>
                          </v-list-item-avatar>

                          <v-list-item-content class="py-0">
                            <v-row align="center" justify="center">

                              <v-col :cols="isMobile ? 6 : 4" class="py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('title')" v-ripple>
                                <div class="d-flex align-center">
                                  <div class="text-caption" v-text="'Title / Model'" />
                                  <x-sort-icon prop="title" />
                                </div>
                              </v-col>

                              <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('weight')" v-ripple>
                                <div class="d-flex justify-center align-center">
                                  <div v-show="!isMobile" class="text-caption" v-text="'Weight'" />
                                  <x-sort-icon prop="weight" />
                                </div>
                              </v-col>

                              <v-col v-if="!isMobile" class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('price')" v-ripple>
                                <div class="d-flex justify-center align-center">
                                  <div class="text-caption" v-text="'Price'" />
                                  <x-sort-icon prop="price" />
                                </div>
                              </v-col>

                              <v-col v-if="!isMobile" class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('state')" v-ripple>
                                <div class="d-flex justify-center align-center">
                                  <div class="text-caption" v-text="'State'" />
                                  <x-sort-icon prop="state" />
                                </div>
                              </v-col>

                              <v-col class="x-col py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('quantity_owned')" v-ripple>
                                <div class="d-flex justify-center align-center">
                                  <div v-show="!isMobile" class="text-caption ml-1" v-text="'Qty'" />
                                  <x-sort-icon prop="quantity_owned" />
                                </div>
                              </v-col>
                            </v-row>
                          </v-list-item-content>
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
                            @click.stop="gearListItemAction(gear)"
                            :key="`inventory-gear-${gear.id}-${index}`"
                            v-bind:class="['x-checklist-item', {'px-7':isMobile}]"
                          >
                            <v-list-item-action>
                              <v-checkbox :input-value="inventoryGearList.includes(gear.id)" :color="currentColor" />
                            </v-list-item-action>

                            <v-list-item-avatar
                              v-bind:class="[
                                'x-avatar',
                                'my-0 mr-3',
                                getReversedVuetifyColor(gear.type)
                              ]"
                            >
                              <x-img
                                v-if="gear.type && xGearType(gear.type)"
                                :src="xGearType(gear.type).icon.data.full_url"
                                :tooltipText="xGearType(gear.type).title"
                                :width="22"
                                :height="22"
                                isCategory
                              ></x-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-row align="center" justify="center">
                                <v-col :cols="isMobile ? 6 : 4" class="py-0">
                                  <div>
                                    <v-list-item-title
                                      v-text="gear.title"
                                      v-bind:class="['mb-1',{'text-body-2' : isMobile}]"
                                    ></v-list-item-title>

                                    <v-list-item-subtitle
                                      class="text-caption"
                                      v-text="gear.brand ? xGearBrand(gear.brand).title : '-'"
                                    ></v-list-item-subtitle>
                                  </div>
                                </v-col>

                                <v-col class="x-col">
                                  <div v-if="gear.weight">
                                    <span class="text-caption" v-text="gear.weight" />
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
                                        class="pa-2"
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
                                  <div v-bind:class="['ml-1',((!gear.quantity_owned || gear.quantity_owned===0) ? darkColorText('red') : '')]">
                                    <span class="text-tiny" v-html="'&#215;'" />
                                    <span v-bind:class="['text-body-2']" v-html="gear.quantity_owned ? gear.quantity_owned : 0" />
                                  </div>
                                </v-col>
                              </v-row>
                            </v-list-item-content>
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
          </v-col>
        </v-row>
      </v-expand-transition>
    </v-container>
  </v-form>

</template>

<script>

  const _ = require('lodash');

  import XSortIcon from "@/components/elements/XSortIcon";
  import XDivider from "@/components/elements/XDivider";
  import EmptyList from "@/components/elements/EmptyList";
  import EmptyData from "@/components/elements/Stepper/EmptyData";
  import EditIcon from "@/components/elements/EditIcon";
  import FilterMenu from "@/components/elements/FilterMenu/FilterMenu";
  import XImg from "@/components/elements/XImg";
  import XCombobox from "@/components/inputs/XCombobox";

  export default {
    name: 'inventories-form',
    components: {
      XSortIcon,
      XPieChart: () => import('@/components/charts/XPieChart'),
      XCombobox,
      XDivider,
      EmptyList,
      EmptyData,
      EditIcon,
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
      inventoryTotalWeight: 0,
      inventoryTotalPrice: 0,
      originalGearList: [],
      gearInventoryRelations: {},
      gearTypeStats: {},
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
      itemSearch: {
        get() {
          return this.$store.state.ui.itemSearch
        }
      },
      itemGearType: {
        get() {
          return this.$store.state.ui.itemGearType
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
        if(this.isMounted && this.item)
          return this.item.inventory_gear;

        return [];
      },
      filteredGear() {
        if(this.isMounted)
          return (this.sortedGear.filter(item => {
            if(
              !this.itemSearch
              && !this.itemGearType
              && !this.itemGearState
              && !this.itemGearBrand
            ) return this.gearList;

            return (
                (this.itemSearch ? (item.title && item.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
                && (this.itemGearType ? (item.type && item.type === this.itemGearType) : true)
                && (this.itemGearState ? (item.state && item.state === this.itemGearState) : true)
                && (this.itemGearBrand ? (item.brand && item.brand === this.itemGearBrand) : true)
            )
          }));

        return this.gearList;
      },
      sortedGear() {
        return _.orderBy(this.gearList, this.gearOrderBy, this.gearOrderOption);
      }
    },
    methods: {
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
      async initPieChartData(gearTypeStats) {
        if(this.isMounted && typeof Object.keys(gearTypeStats).length == 'number' && Object.keys(gearTypeStats).length > 0) {
          this.isLoadingPieData = true;
          let labels = [];
          let colors = [];
          let data = []

          for (const [key, value] of Object.entries(gearTypeStats)) {
            let gearCategory = key === 0 ? null : this.xGearType(key);
            let percentage = this.$options.filters.percentageFilter(value.weight, this.inventoryGearList, this.inventoryTotalWeight);
            let chartLabel = (gearCategory && gearCategory.title ? gearCategory.title : 'Unknown') + ` | ${percentage}% (${this.weightUnit})`;
            let color = this.hexColor(this.getVuetifyColor(gearCategory && gearCategory.id ? gearCategory.id : 0))

            labels.push(chartLabel);
            colors.push(color);
            data.push(value.weight);
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
        if(!this.inventoryGearList.includes(gear.id))
          this.inventoryGearList.push(gear.id)
      },
      removeGear(gear) {
        let index = this.inventoryGearList.indexOf(gear.id);
        this.inventoryGearList.splice(index, 1);
      },
      async initGearTypeStats() {
        let self = this;
        let gearRefs = self.gearReferences;
        let newGearTypeStats = {};

        this.inventoryGearList.forEach(function(gearId) {
          let gearIndex = gearRefs[gearId];

          if(self.gearList[gearIndex]) {
            let gearTypeIndex = self.gearList[gearIndex].type ? self.gearList[gearIndex].type : 0;
            let gearWeight = self.gearList[gearIndex].weight ? self.gearList[gearIndex].weight : 0;

            if(!Object.prototype.hasOwnProperty.call(newGearTypeStats, gearTypeIndex) && !newGearTypeStats[gearTypeIndex]) {
              Object.assign(newGearTypeStats, { [gearTypeIndex] : {items: 1, weight: gearWeight} });

            } else {
              let items = newGearTypeStats[gearTypeIndex].items + 1;
              let weight = newGearTypeStats[gearTypeIndex].weight + gearWeight;
              Object.assign(newGearTypeStats[gearTypeIndex],  { items: items, weight: weight } );
            }
          }
        });

        // resetting local GearTypeStats
        self.gearTypeStats = {};
        Object.assign(self.gearTypeStats,  newGearTypeStats );

        await this.initPieChartData(newGearTypeStats);
      },
      async initGearList() {
        let self = this;
        if(this.currentInventoryGear && this.currentInventoryGear.length > 0) {
          while(self.inventoryGearList.length > 0) self.inventoryGearList.pop();
          Object.assign(self.gearInventoryRelations, {});

          this.currentInventoryGear.forEach(function(m2m) {
            self.inventoryGearList.push(m2m.gear_id);
            Object.assign(self.gearInventoryRelations, { [m2m.gear_id] : m2m.id });
          })

          this.originalGearList = [...this.inventoryGearList];
        }
      },
      initWindowHeight() {
        this.listHeight = (window.innerHeight - 122);
      },
      sumCheckedGearProperty(prop) {
        let self = this;
        let sum = 0;

        this.inventoryGearList.forEach(function(gear) {
          let gearIndex = self.gearReferences[gear];
          if(self.gearList[gearIndex]
              && (typeof self.gearList[gearIndex][prop] === 'number')
              && (self.gearList[gearIndex]['quantity_owned'] > 0)
          )
            sum += (self.gearList[gearIndex][prop] * self.gearList[gearIndex]['quantity_owned']);
        });

        return sum;
      },
      initInventoryStats() {
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
        await this.initGearTypeStats();
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
            await this.initGearTypeStats();
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
      await this.initGearTypeStats();

      this.isMounted = true;
    }
  }

</script>

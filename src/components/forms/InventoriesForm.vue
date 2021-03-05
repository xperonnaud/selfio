<template>

  <v-container
    v-if="isMounted"
    style="max-width: unset;"
    v-bind:class="[
      {'py-0': isMobile},
      'inventories-form pa-0'
    ]"
  >
    <v-form v-model="valid">
        <v-tabs
          v-show="!isEditing"
          v-model="tab"
          :color="currentColor"
          :background-color="xTabsColor"
          fixed-tabs
        >
          <v-tab :key="'inventory-details'">
            <span v-text="$t('global.details')" />
          </v-tab>
          <v-tab :key="'inventory-gear-balance'">
            <span v-text="$t('global.gear')" />
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
                          label="title"
                          v-bind:valid.sync="validTitle"
                          v-bind:value.sync="updatedItem.title"
                        ></x-title-field>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          :label="xCap($t('global.description'))"
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
                          label="tags"
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

                      <v-col v-if="inventoryGearList && inventoryGearList.length > 0" cols="12" class="py-0 mb-3">
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
                                      :style="gearCategoryStat.id ? `border: 2px solid ${categoryColor(gearCategoryStat.id)} !important;` : ''"
                                    >
                                      <x-svg
                                        v-if="typeof gearCategoryStat.id == 'string'"
                                        :src="gearCategoryStat.id"
                                        svgPath="gearcategories/"
                                        :width="XSI"
                                        :height="XSI"
                                        :tooltipText="xCap($t(`categories.${gearCategoryStat.id}.desc`))"
                                      ></x-svg>

                                      <x-unknown-category-icon v-else :size="MDI" />
                                    </v-list-item-avatar>

                                    <v-list-item-title class="mb-1">
                                      <div class="d-flex">
                                        <div class="text-caption" style="width: 80px;">
                                          <div v-if="typeof gearCategoryStat.id == 'string'"
                                          >{{ $t(`categories.${gearCategoryStat.id}.title`) | capitalizeFilter }}</div>
                                          <div v-else v-text="xCap($t('global.unknown'))" />
                                        </div>

                                        <div class="d-flex font-weight-regular text-caption">
                                          <x-divider />

                                          <div style="width: 60px;">
                                            <span class="text-tiny" v-text="gearCategoryStat.items" />
                                            <span class="text-tiny-dimmed" v-text="` ${$t(`global.item${gearCategoryStat.items > 1 ? 's' : ''}`)}`" />
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
                                        :color="getVuetifyColor((gearCategoryStat.id ? gearCategoryStat.id : 14))"
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
                                :label="t('add-gear')"
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
                                v-if="inventoryGearList && inventoryGearList.length <= 0"
                                :label="t('add-gear')"
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
                            :label="t('add-gear')"
                            :color="navItemColor('gear')"
                          ></empty-list>

                          <v-row v-show="inventoryGearList.length > 0">
                            <v-col cols="5">

                              <v-list-item one-line style="min-height: unset;">
                                <v-list-item-content class="pt-0">
                                  <v-list-item-title>{{t(`weight-by-gear-category`) | capitalizeFirstFilter}}</v-list-item-title>
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
                                        <x-svg
                                          v-if="typeof gearCategoryStat.id == 'string'"
                                          :src="gearCategoryStat.id"
                                          svgPath="gearcategories/"
                                          :width="XSI"
                                          :height="XSI"
                                          :tooltipText="xCap($t(`categories.${gearCategoryStat.id}.desc`))"
                                        ></x-svg>

                                        <x-unknown-category-icon v-else />
                                      </v-list-item-avatar>

                                      <v-list-item-title class="mb-1">
                                        <div class="d-flex">
                                          <div class="text-caption" style="width: 80px;">
                                            <div v-if="typeof gearCategoryStat.id == 'string'"
                                            >{{ $t(`categories.${gearCategoryStat.id}.title`) | capitalizeFilter }}</div>

                                            <div v-else v-text="xCapFirst($t('global.unknown'))" />
                                          </div>

                                          <div class="d-flex font-weight-regular text-caption">

                                            <x-divider />

                                            <div>
                                              <span class="text-tiny" v-text="gearCategoryStat.items" />
                                              <span class="text-tiny-dimmed" v-text="' '+$t(`global.item${gearCategoryStat.items > 1 ? 's' : ''}`)" />
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
                                          :color="getVuetifyColor((gearCategoryStat.id ? gearCategoryStat.id : 14))"
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

        <div v-show="isEditing">
          <v-card class="mx-auto" flat :color="xBackgroundColor">
            <v-app-bar :app="isMobile" :class="['edition-toolbar', (isMobile ? 'px-0' : 'px-2')]">
              <v-btn @click="closeEditor()" icon>
                <v-icon v-text="'mdi-arrow-left'" />
              </v-btn>

              <v-list-item two-line :class="[{'px-0':isMobile}]">
                <v-list-item-content class="pa-0">
                  <v-list-item-title>{{t(`gear-list`) | capitalizeFirstFilter}}</v-list-item-title>

                  <v-list-item-subtitle>
                    <div class="d-flex">
                      <div>
                        <span v-bind:class="[currentColorText]">{{ inventoryTotalWeight | weightUnitFilter(weightUnit) }}</span>
                        <span v-text="' '+dynamicWeightUnit(inventoryTotalWeight)" :key="`weight-unit-${randomId()}-${inventoryTotalWeight}`" class="text-tiny" />
                      </div>

                      <x-divider />

                      <div>
                          <span
                                  v-bind:class="[currentColorText]"
                                  v-text="inventoryTotalItems || 0"
                          ></span>
                        <span class="text-tiny" v-text="' '+$t(`components.inventory-gear-card.unique-item${inventoryTotalItems > 1 ? 's' : ''}`)" />
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
                        min-width="333"
                        max-width="333"
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
                        <v-list-item-title>{{$t('global.filters') | capitalizeFirstFilter}}</v-list-item-title>

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
                        <x-category-selector v-bind:value.sync="gearCategoryFilter" isInFilter />
                      </v-list-item>

                      <v-list-item class="mb-3">
                        <v-autocomplete
                                v-if="gearFilterModeOn"
                                :label="xCapFirst($t('global.tags'))"
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
                                label="consumable"
                                v-bind:value.sync="gearConsumableFilter"
                        ></x-checkbox>
                      </v-list-item>

                      <v-list-item class="mb-3">
                        <x-checkbox
                                label="packed"
                                v-bind:value.sync="gearIsPackedFilter"
                        ></x-checkbox>
                      </v-list-item>

                      <v-list-item class="mb-3">
                        <x-checkbox
                                label="quantity-positive"
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
                        <span v-text="$t('global.reset')" />
                      </v-btn>

                      <v-spacer />

                      <v-btn
                              @click="closeGearFilterMenu()"
                              text
                              icon
                      >
                        <poly-icon icon="mdi-check" />
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>

              <v-btn
                      @click="closeGearList()"
                      icon
              >
                <poly-icon
                        :size="XLI"
                        icon="mdi-check"
                ></poly-icon>
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
                            <div v-bind:class="['text-tiny', ((gearOrderBy === 'title') ? currentColorText : '')]">{{$t('global.title') | capitalizeFirstFilter}}</div>
                            <x-sort-icon prop="title" />
                          </div>
                        </v-col>

                        <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('weight')" v-ripple>
                          <div class="d-flex justify-center align-center">
                            <div v-bind:class="['text-tiny', ((gearOrderBy === 'weight') ? currentColorText : '')]">{{$t('global.weight') | capitalizeFirstFilter}}</div>
                            <x-sort-icon prop="weight" />
                          </div>
                        </v-col>

                        <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('price')" v-ripple>
                          <div class="d-flex justify-center align-center">
                            <div v-bind:class="['text-tiny', ((gearOrderBy === 'price') ? currentColorText : '')]">{{$t('global.price') | capitalizeFirstFilter}}</div>
                            <x-sort-icon prop="price" />
                          </div>
                        </v-col>

                        <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('state')" v-ripple>
                          <div class="d-flex justify-center align-center">
                            <div v-bind:class="['text-tiny', ((gearOrderBy === 'state') ? currentColorText : '')]">{{$t('global.state') | capitalizeFirstFilter}}</div>
                            <x-sort-icon prop="state" />
                          </div>
                        </v-col>

                        <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('consumable')" v-ripple>
                          <div class="d-flex justify-center align-center">
                            <div v-bind:class="['text-tiny', ((gearOrderBy === 'consumable') ? currentColorText : '')]">{{$t('global.consumable') | minifyTextFilter | capitalizeFirstFilter}}</div>
                            <x-sort-icon prop="consumable" />
                          </div>
                        </v-col>

                        <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
                          <div class="text-tiny text-center">{{$t('global.worn') | capitalizeFirstFilter}}</div>
                        </v-col>

                        <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" @click.stop="sortGear('quantity_owned')" v-ripple>
                          <div class="d-flex justify-center align-center">
                            <div v-bind:class="['text-tiny text-center', ((gearOrderBy === 'quantity_owned') ? currentColorText : '')]">{{$t('global.qty') | capitalizeFirstFilter}}</div>
                            <x-sort-icon prop="state" />
                          </div>
                        </v-col>
                      </v-row>
                    </v-list-item-content>

                    <v-list-item-action class="ma-0" :style="'width: '+(isMobile ? '33' : '30')+'px !important; margin-left: '+(isMobile ? '13' : '20')+'px !important;'" />
                  </v-list-item>
                </v-list>
              </template>
            </v-app-bar>

            <v-card-text :class="['pa-0']">
              <v-list
                v-if="filteredGear.length > 0"
                subheader
                two-line
                dense
              >
                  <DynamicScroller
                    :style="`height: ${isMobile ? (listHeight) : 600}px`"
                    :items.sync="filteredGear"
                    :minItemSize="xListItemsHeight"
                    key-field="id"
                  >
                    <template v-slot="{ item, index, active }">
                      <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[item.title]"
                        :data-index="index"
                      >
                        <inventory-gear-list-item
                          :key="`inventory-gear-${item}-${index}`"
                          :gear="item"
                          :index="index"
                          :inventoryGearList.sync="inventoryGearList"
                          :inventoryGear="inventoryGearItem(item.id)"
                          v-on:itemAction="item.quantity_owned > 0 ? gearListItemAction(item) : null"
                          v-on:inventoryGearAction="inventoryGearAction(item)"
                        ></inventory-gear-list-item>

                        <v-divider />
                      </DynamicScrollerItem>
                    </template>
                  </DynamicScroller>
              </v-list>

              <empty-list
                v-else
                :height="currentDialogHeight"
                :label="t(`add-inventory-gear`)"
                :color="navItemColor('gear')"
              ></empty-list>
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
                  <v-list-item-title>{{$t('global.packing-options') | capitalizeFirstFilter}}</v-list-item-title>

                  <v-spacer />

                  <v-btn
                    @click.stop="unSelectInventoryGear()"
                    icon
                    :disabled="isGearMenuLoading"
                  >
                    <v-icon v-text="'mdi-close'" />
                  </v-btn>

                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item class="mb-3">
                  <x-increment
                    label="quantity-packed"
                    v-bind:value.sync="temporaryInventoryGear.gear_quantity_packed"
                    :rules="xRules.decimals"
                    :color="currentColor"
                    :max="selectedInventoryGearMaxQuantity"
                    :min="0"
                  ></x-increment>
                </v-list-item>

                <v-list-item>
                  <x-checkbox
                    label="worn"
                    v-bind:value.sync="temporaryInventoryGear.gear_worn"
                  ></x-checkbox>
                </v-list-item>
              </v-list>

              <v-card-actions>

                <v-spacer />

                <v-btn
                  @click.stop="saveInventoryGear()"
                  icon
                  class="mr-2"
                  :loading="isGearMenuLoading"
                >
                  <poly-icon icon="mdi-check" />
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </div>

      <v-text-field v-show="false" v-model="validTitle" :rules="xRules.boolean" />
    </v-form>
  </v-container>

</template>

<script>

  const _ = require('lodash');

  import PolyIcon from "@/components/elements/Icons/PolyIcon";
  import InventoryGearListItem from "@/components/lists/items/InventoryGearListItem";
  import InventoryGearCard from "@/components/elements/Cards/InventoryGearCard";
  import XCategorySelector from "@/components/inputs/XCategorySelector";
  import XBrandSelector from "@/components/inputs/XBrandSelector";
  import XStateSelector from "@/components/inputs/XStateSelector";
  import XTitleField from "@/components/inputs/XTitleField";
  import XCombobox from "@/components/inputs/XCombobox";
  import XSortIcon from "@/components/elements/Icons/XSortIcon";
  import XCheckbox from "@/components/inputs/XCheckbox";
  import XIncrement from "@/components/inputs/XIncrement";
  import XSvg from "@/components/elements/XSvg";
  import XDivider from "@/components/elements/XDivider";
  import EmptyList from "@/components/elements/EmptyList";
  import XUnknownCategoryIcon from "@/components/elements/Icons/XUnknownCategoryIcon";

  export default {
    name: 'inventories-form',
    components: {
      PolyIcon,
      InventoryGearListItem,
      EmptyList,
      InventoryGearCard,
      XTitleField,
      XUnknownCategoryIcon,
      XCategorySelector,
      XBrandSelector,
      XStateSelector,
      XIncrement,
      XCheckbox,
      XSortIcon,
      XCombobox,
      XDivider,
      XSvg,
      XPieChart: () => import('@/components/charts/XPieChart'),
      XStackedProgressCard: () => import('@/components/elements/StackedProgressCard/XStackedProgressCard'),
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
      },
      editMode: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      isGearMenuLoading: false,
      valid: false,
      validTitle: false,
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

      temporaryInventoryGear: {
        inventory_id: null,
        gear_id: null,
        gear_quantity_packed: null,
        gear_worn: null
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
      isLoading: null,
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
      gearQuantityOwnedFilter: true,

      balance: {
        base: {
          label:'base',
          value: 0,
          percentage: 0,
          icon: 'scale-balance',
          color: 'red'
        },
        worn: {
          label:'worn',
          value: 0,
          percentage: 0,
          icon: 'tshirt-crew',
          color: 'light-blue'
        },
        wornConsumable: {
          label: null,
          value: 0,
          percentage: 0,
          icon: null,
          color: 'teal'
        },
        consumable: {
          label:'consumable',
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
              && typeof this.gearCategoryFilter != 'number'
              && !this.gearStateFilter
              && !this.gearTagsFilter
              && typeof this.gearBrandFilter != 'number'
              && !this.gearIsPackedFilter
              && !this.gearConsumableFilter
              && !this.gearQuantityOwnedFilter
            ) return this.gearList;

            return (
                (this.itemSearch ? (item.title && item.title.toLowerCase().includes(this.itemSearch.toLowerCase())) : true)
                && (typeof this.gearCategoryFilter != 'number' ? (typeof this.gearCategoryFilter != 'number' && (item.category === this.gearCategoryFilter)) : true)
                && (this.gearStateFilter ? (item.state && (item.state === this.gearStateFilter)) : true)
                && (typeof this.gearBrandFilter != 'number' ? (typeof this.gearBrandFilter != 'number' && (item.brand === this.gearBrandFilter)) : true)
                && (this.gearConsumableFilter ? (item.consumable === true) : true)
                && (this.gearTagsFilter ? (item.tags && item.tags.includes(this.gearTagsFilter)) : true)
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
      t(str) {
        return this.$t(`routes.inventories.${str}`);
      },
      async inventoryGearAction(gear) {
        if(this.inventoryGearList.includes(gear.id)) {
          await this.selectInventoryGear(gear);
          await this.toggleGearMenu();
        }
      },
      async selectInventoryGear(gear) {
        let gearIndex = this.inventoryGearList.indexOf(gear.id);
        this.selectedInventoryGearIndex = gearIndex;
        this.selectedInventoryGearMaxQuantity = gear.quantity_owned;
      },
      async toggleGearMenu() {
        this.inventoryGearMenu = true;
      },
      async resetTemporaryInventoryGear() {
        this.temporaryInventoryGear.inventory_id = null;
        this.temporaryInventoryGear.gear_id = null;
        this.temporaryInventoryGear.gear_quantity_packed = null;
        this.temporaryInventoryGear.gear_worn = null;
      },
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
            let gearCategory = (value.id === 'unknown') ? null : value.id;
            let percentage = this.xFilters.percentageFilter(value.weight, this.inventoryGearList, this.inventoryTotalWeight);

            let chartLabel = (value.id ? this.$t(`categories.${gearCategory}.title`) : this.$t('global.unknown')) + `, ${percentage}%, ${this.$t('global.weight')}(${this.dynamicWeightUnit(value.weight)})`;
            let color = this.categoryColor(value && value.id ? value.id : 14);
            let displayedWeight = this.weightUnitConverter(value.weight, false);

            labels.push(this.xCapFirst(chartLabel));
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
      async saveInventoryGear() {
        this.isGearMenuLoading = true;
        await this.tempToCurrentInventoryGear();
        await this.unSelectInventoryGear();
        this.isGearMenuLoading = false;
      },
      async tempToCurrentInventoryGear() {
        this.currentInventoryGear[this.selectedInventoryGearIndex].inventory_id = this.temporaryInventoryGear.inventory_id;
        this.currentInventoryGear[this.selectedInventoryGearIndex].gear_id = this.temporaryInventoryGear.gear_id;
        this.currentInventoryGear[this.selectedInventoryGearIndex].gear_quantity_packed = this.temporaryInventoryGear.gear_quantity_packed;
        this.currentInventoryGear[this.selectedInventoryGearIndex].gear_worn = this.temporaryInventoryGear.gear_worn;
      },
      async unSelectInventoryGear() {
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
            let gearCategory = _gear.category;
            let gearWeight = _gear.weight || 0;
            let gearQty = inventoryGear.gear_quantity_packed;
            let gearTotalWeight = (gearWeight * gearQty);

            if(!Object.prototype.hasOwnProperty.call(newGearCategoryStats, gearCategory) && !newGearCategoryStats[gearCategory]) {
              Object.assign(newGearCategoryStats, { [gearCategory] : {id: gearCategory, items: 1, weight: gearTotalWeight} });

            } else {
              let item = newGearCategoryStats[gearCategory];
              let items = item.items + 1;
              let weight = item.weight + gearTotalWeight;
              Object.assign(newGearCategoryStats[gearCategory],  { id: gearCategory, items: items, weight: weight } );
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

        if(!this.inventoryGearList || !this.updatedItem.inventory_gear || this.updatedItem.inventory_gear.length <= 0)
          return sum;

        this.updatedItem.inventory_gear.forEach(function(inventoryGear) {
          let gearId = inventoryGear.gear_id;
          let gearIndex = self.gearReferences[gearId];
          let _gear = self.gearList[gearIndex];

          if(inventoryGear.gear_quantity_packed > 0)
            if((prop === 'quantity_packed')) {
              sum += 1;

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
      async selectedInventoryGearIndex(newVal, oldVal) {
        if(!newVal || (newVal === oldVal)) {
          await this.resetTemporaryInventoryGear();
        } else {
          let invGear = this.currentInventoryGear[this.selectedInventoryGearIndex];
          this.temporaryInventoryGear.inventory_id = invGear.inventory_id;
          this.temporaryInventoryGear.gear_id = invGear.gear_id;
          this.temporaryInventoryGear.gear_quantity_packed = invGear.gear_quantity_packed;
          this.temporaryInventoryGear.gear_worn = invGear.gear_worn;
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
      async isMounted(newVal, oldVal) {
        if(newVal === true && oldVal === false) {
          this.$emit('update:isFormMounted',newVal);
          await this.initGearList();
        }
      },
      currentInventoryGear: {
        handler: async function() {
          await this.initInventoryStats();
          await this.initGearCategoryStats();
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
          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async patchItem(val) {
        if(this.valid===true && val===true) {
          this.isLoading = true;
          let finalArray = this.initPreferenceTagArray(this.updatedItem.tags, 'inventory');

          if(finalArray)
            await this.api_patch_preference_tag(finalArray, 'inventory');

          await this.api_patch_inventory(this.updatedItem, this.itemIndex, this.originalGearList, this.inventoryGearList, this.gearInventoryRelations);
          this.formDialog = false;
          this.isLoading = false;
        }
      },
      async deleteItem(val) {
        if(val===true) {
          this.isLoading = true;
          await this.api_remove_inventory(this.item.id, this.itemIndex, this.originalGearList, this.gearInventoryRelations);
          Object.assign(this.updatedItem, {});
          this.formDialog = false;
          this.isLoading = false;
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
    async mounted() {
      this.initWindowHeight();

      if(this.item)
        this.updatedItem = this.copyVar(this.item);

      this.isMounted = true;
      this.isLoading = false;
    }
  }

</script>
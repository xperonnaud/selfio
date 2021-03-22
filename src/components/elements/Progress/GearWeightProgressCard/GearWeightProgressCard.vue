<template>

    <v-list
        v-if="isMounted"
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

                    <unknown-category-icon v-else :size="MDI" />
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
                                <span class="text-tiny-dimmed" v-text="` ${$t(`global.item${pluralizeStr(gearCategoryStat.items)}`)}`" />
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

                    <gear-weight-progress
                        :gearCategoryStat.sync="gearCategoryStat"
                        :inventoryGearList.sync="inventoryGearList"
                        :inventoryTotalWeight.sync="inventoryTotalWeight"
                    ></gear-weight-progress>
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-list>

</template>

<script>

    import GearWeightProgress from "@/components/elements/Progress/GearWeightProgressCard/GearWeightProgress";

    export default {
        name: 'gear-weight-progress-card',
        components: {
            GearWeightProgress
        },
        props: {
            sortedGearCategoryStats: [Array, Object],
            inventoryGearList: [Array, Object],
            inventoryTotalWeight: Number,
        },
        data: () => ({
            isMounted: false,
        }),
        mounted() {
            this.isMounted = true;
        }
    }


</script>

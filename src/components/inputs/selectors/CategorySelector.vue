<template>

    <x-selector
        title="category"
        :items="gearCategories"
        v-bind:value.sync="pickerValue"
        :isInFilter="isInFilter"
    >
        <template v-slot:header>
            <v-text-field
                :label="xCapFirst($t('global.category'))"
                :value="typeof pickerValue==='string' ? xCap($t(`categories.${pickerValue}.title`)) : null"
                :color="currentColor"
                hide-details="auto"
                append-icon="mdi-menu-down"
                dense
                filled
                clearable
                @click:clear="pickerValue = null"
            >
                <template
                    v-if="typeof pickerValue==='string'"
                    v-slot:prepend-inner
                    style="margin-top: 0"
                >
                    <v-avatar
                        class="x-avatar"
                        :width="XXLI"
                        :height="XXLI"
                        :style="((pickerValue !== 'unknown') ? 'border: 2px solid '+categoryColor(pickerValue)+' !important;' : '')+'min-width: unset;'"
                    >
                        <x-svg
                            :src="pickerValue"
                            svgPath="gearcategories/"
                            :width="XSI"
                            :height="XSI"
                            :tooltipText="xCap($t(`categories.${pickerValue}.desc`))"
                        ></x-svg>
                    </v-avatar>
                </template>
            </v-text-field>
        </template>

        <template v-slot:content="{item}">
            <div>
                <div class="d-flex justify-space-around align-self-center">
                    <v-avatar
                        class="x-avatar"
                        :width="40"
                        :height="40"
                        :style="((item !== 'unknown') ? 'border: 2px solid '+categoryColor(item)+' !important;' : '')+'min-width: unset;'"
                    >
                        <x-svg
                            :src="item"
                            svgPath="gearcategories/"
                            :width="SMI"
                            :height="SMI"
                            :tooltipText="xCap($t(`categories.${item}.desc`))"
                        ></x-svg>
                    </v-avatar>
                </div>

                <div class="text-caption text-center">{{xCapFirst($t(`categories.${item}.title`))}}</div>
            </div>
        </template>
    </x-selector>

</template>

<script>

    import XSelector from "@/components/inputs/selectors/XSelector";
    import XSvg from "@/components/elements/Icons/XSvg";

    export default {
        name: 'category-selector',
        components: {
            XSelector,
            XSvg
        },
        props: {
            value: String,
            isInFilter: {
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            isMounted: false,
            pickerValue: null,
        }),
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

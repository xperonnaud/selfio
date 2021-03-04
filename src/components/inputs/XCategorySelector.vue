<template>

    <x-selector
        title="category"
        v-bind:value.sync="pickerValue"
        v-bind:isEditing.sync="isEditing"
    >
        <template v-slot:header>
            <v-card
                v-bind:class="[
                    'x-check-form-card',
                    'mx-auto',
                    'elevation-0',
                    {'is-dark':isDark}
                ]"
                :color="isInFilter ? null : xBackgroundColor"
                @click.stop="toggleEditor()"
            >
                <v-text-field
                    :label="xCapFirst($t('global.category'))"
                    :value="listedPickedValue ? xCap($t(`categories.${pickerValue}.title`)) : null"
                    :color="currentColor"
                    hide-details="auto"
                    append-icon="mdi-menu-down"
                    dense
                    filled
                    clearable
                    @click:clear="pickerValue = null"
                >
                    <template
                        v-if="listedPickedValue"
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
            </v-card>
        </template>

        <template v-slot:content>
            <v-row>
                <template v-for="(item, itemIndex) in gearCategories">
                    <v-col
                        :key="`category-selector-${itemIndex}`"
                        :cols="isMobile || isInFilter ? 6 : 3"
                        v-bind:class="[(isMobile ? 'pa-1' : 'pt-0 pb-2 px-1')]"
                    >
                        <v-card
                            v-bind:class="[
                              'selector-card',
                              'd-flex',
                              'justify-space-around',
                              'align-self-center',
                              'pt-2 pb-1 elevation-0',
                              {'is-dark': ((isDark && !(pickerValue === item)) || (!isDark && (pickerValue === item)))},
                            ]"
                            :dark="((isDark && !(pickerValue === item)) || (!isDark && (pickerValue === item)))"
                            @click.stop="assignValue(item)"
                        >
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
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </template>
    </x-selector>

</template>

<script>

    import XSelector from "@/components/inputs/XSelector";
    import XSvg from "@/components/elements/XSvg";

    export default {
        name: 'x-category-selector',
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
            isEditing: false,
            pickerValue: null,
        }),
        computed: {
            listedPickedValue() {
                if(!this.isMounted)
                    return false;

                return (typeof this.pickerValue==='string');
            }
        },
        methods: {
            toggleEditor() {
                this.isEditing = !this.isEditing;
            },
            resetValue() {
                this.pickerValue = null;
            },
            assignValue(item) {
                if(this.pickerValue === item) {
                    this.resetValue();
                } else {
                    this.pickerValue = item;
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

<template>

    <x-selector
        title="landscape"
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
                    :label="xCapFirst($t('global.landscape'))"
                    :value="listedPickedValue ? xCap($t(`landscapes.${pickerValue}.title`)) : null"
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
                        >
                            <x-svg
                                :src="pickerValue"
                                svgPath="landscapes/"
                                :width="XLI"
                                :height="XLI"
                                :tooltipText="xCapFirst($t(`landscapes.${pickerValue}.title`))"
                                logo
                            ></x-svg>
                        </v-avatar>
                    </template>
                </v-text-field>
            </v-card>
        </template>

        <template v-slot:content>
            <v-row>
                <template v-for="(item, itemIndex) in landscapes">
                    <v-col
                        v-if="item"
                        :key="`landscape-selector-${itemIndex}`"
                        :cols="isMobile || isInFilter ? 6 : 3"
                        v-bind:class="[(isMobile ? 'pa-1' : 'pt-0 pb-2 px-1')]"
                    >
                        <v-card
                            v-bind:class="[
                              'selector-card',
                              'd-flex',
                              'justify-space-around',
                              'align-self-center',
                              'pt-2 pb-1',
                              'elevation-0',
                              {'is-dark': (isDark && !([pickerValue] === item)) || (!isDark && ([pickerValue] === item))},
                            ]"
                            :dark="(isDark && !([pickerValue] === item)) || (!isDark && ([pickerValue] === item))"
                            @click.stop="assignValue(item)"
                        >
                            <div v-if="item">
                                <div class="d-flex justify-space-around align-self-center">
                                    <v-avatar
                                        class="x-avatar"
                                        :width="XXLI"
                                        :height="XXLI"
                                    >
                                        <x-svg
                                            :src="item"
                                            svgPath="landscapes/"
                                            :width="XLI"
                                            :height="XLI"
                                            :tooltipText="xCapFirst($t(`landscapes.${item}.title`))"
                                            logo
                                        ></x-svg>
                                    </v-avatar>
                                </div>

                                <div class="text-caption text-center">{{xCapFirst($t(`landscapes.${item}.title`))}}</div>
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
        name: 'x-landscape-selector',
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

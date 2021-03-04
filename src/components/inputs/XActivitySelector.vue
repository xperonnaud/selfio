<template>

    <x-selector
        title="activity"
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
                        :label="xCapFirst($t('global.activity'))"
                        :value="listedPickedValue ? xCap($t(`activities.${activities[pickerValue]}.title`)) : null"
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
                                    :src="activities[pickerValue]"
                                    svgPath="activities/"
                                    :width="XLI"
                                    :height="XLI"
                                    :tooltipText="xCap($t(`activities.${activities[pickerValue]}.desc`))"
                            ></x-svg>
                        </v-avatar>
                    </template>
                </v-text-field>
            </v-card>
        </template>

        <template v-slot:content>
            <v-row>
                <template v-for="(item, itemIndex) in activities">
                    <v-col
                        :key="`activity-selector-${itemIndex}`"
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
                              {'is-dark': ((isDark && !(activities[pickerValue]) === item) || (!isDark && (activities[pickerValue]) === item))},
                            ]"
                            :dark="(isDark && !(activities[pickerValue]) === item) || (!isDark && (activities[pickerValue]) === item)"
                            @click.stop="assignValue(itemIndex)"
                        >
                            <div>
                                <div class="d-flex justify-space-around align-self-center">
                                    <v-avatar
                                        class="x-avatar"
                                        :width="XXLI"
                                        :height="XXLI"
                                    >
                                        <x-svg
                                            :src="item"
                                            svgPath="activities/"
                                            :width="XLI"
                                            :height="XLI"
                                            :tooltipText="xCapFirst($t(`activities.${item}.desc`))"
                                        ></x-svg>
                                    </v-avatar>
                                </div>

                                <div class="text-caption text-center">{{xCap($t(`activities.${item}.title`))}}</div>
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
        name: 'x-activity-selector',
        components: {
            XSelector,
            XSvg
        },
        props: {
            value: Number,
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

                return (
                    typeof this.pickerValue==='number'
                    && typeof this.activities[this.pickerValue]==='string'
                );
            }
        },
        methods: {
            toggleEditor() {
                this.isEditing = !this.isEditing;
            },
            resetValue() {
                this.pickerValue = null;
            },
            assignValue(itemId) {
                if(this.pickerValue === itemId) {
                    this.resetValue();
                } else {
                    this.pickerValue = itemId;
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

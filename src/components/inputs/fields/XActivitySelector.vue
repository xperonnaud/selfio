<template>

    <v-sheet v-if="isMounted" :class="['x-category-selector x-check-form max-width']" :color="xTabsColor">
        <div v-if="isEditing" class="d-flex align-content-space-between">
            <v-subheader class="mt-2 ml-2">{{$t('global.activity') | capitalizeFirstFilter}}</v-subheader>

            <v-spacer/>

            <v-btn
                @click="toggleEditor()"
                class="mr-1 primary-gradient-color-text"
                icon
            >
                <v-icon  v-text="'mdi-check'" />
            </v-btn>
        </div>

        <v-expand-transition>
            <div v-show="!isEditing">
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
            </div>
        </v-expand-transition>

        <v-expand-transition>
            <v-container
                v-show="isEditing"
                v-bind:class="['py-0 elevation-0']"
            >
                <v-row class="px-1">
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
                                  {'is-dark': isDark},
                                  {'selected': ((pickerValue) === item)}
                                ]"
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
            </v-container>
        </v-expand-transition>
    </v-sheet>

</template>

<script>

    import XSvg from "@/components/elements/XSvg";

    export default {
        name: 'x-activity-selector',
        components: {
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

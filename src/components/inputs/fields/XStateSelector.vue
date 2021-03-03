<template>

    <v-sheet v-if="isMounted" :class="['x-state-selector x-check-form max-width']" :color="xTabsColor">
        <div>
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
                    :label="xCapFirst($t('global.state'))"
                    :value="listedPickedValue ? xCap((gearStates[pickerValue-1].title)) : null"
                    :color="currentColor"
                    hide-details="auto"
                    append-icon="mdi-menu-down"
                    dense
                    filled
                    clearable
                    @click:clear="pickerValue = null"
                >
                    <template v-slot:prepend-inner style="margin-top: 0">
                        <v-avatar v-if="listedPickedValue" tile left min-width="26" width="26" height="26">
                            <v-icon
                                :color="gearStates[pickerValue-1].color"
                                v-text="'mdi-'+stateIcon(gearStates[pickerValue-1].title)"
                                :size="MDI"
                            ></v-icon>
                        </v-avatar>
                    </template>
                </v-text-field>
            </v-card>
        </div>

        <v-dialog v-model="isEditing">
            <v-sheet :color="xOverlayColor">
                <v-container class="pt-0 pb-1 elevation-0">
                    <v-row>
                        <v-col cols="12" class="pa-0">
                            <v-card class="d-flex align-content-space-between rounded-0 mb-1">
                                <v-list-item-title class="pl-4">{{$t('global.state') | capitalizeFirstFilter}}</v-list-item-title>

                                <v-spacer/>

                                <v-btn
                                    @click="toggleEditor()"
                                    fab
                                    icon
                                >
                                    <v-icon v-bind:class="[fontShadeColor]" :size="XLI" v-text="'mdi-check'" />
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-responsive
                        class="overflow-y-auto"
                        :max-height="isMobile ? (currentWindowHeight - 100) : 600"
                    >
                        <v-row>
                            <template v-for="(item, itemIndex) in gearStates">
                                <v-col
                                    :key="`state-selector-${itemIndex}`"
                                    :cols="isMobile ? 6 : 3"
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
                                          {'selected': ((pickerValue) === item.id)}
                                        ]"
                                        @click.stop="assignValue(item.id)"
                                    >
                                        <div>
                                            <div class="d-flex justify-space-around align-self-center">
                                                <v-avatar tile left min-width="21" width="21" height="21">
                                                    <v-icon
                                                        :color="item.color"
                                                        v-text="'mdi-'+stateIcon(item.title)"
                                                        :size="SMI"
                                                        style="padding-bottom: 6px;"
                                                    ></v-icon>
                                                </v-avatar>
                                            </div>

                                            <div
                                                class="text-caption text-center"
                                                v-html="xCap($t(`states.${item.title}`))"
                                            ></div>
                                        </div>
                                    </v-card>
                                </v-col>
                            </template>
                        </v-row>
                    </v-responsive>
                </v-container>
            </v-sheet>
        </v-dialog>
    </v-sheet>

</template>

<script>


    export default {
        name: 'x-state-selector',
        components: {},
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
                return (typeof this.pickerValue==='number' && typeof this.gearStates[this.pickerValue-1]==='object');
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

<template>

    <x-selector
        title="state"
        :items="gearStates"
        v-bind:value.sync="pickerValue"
    >
        <template v-slot:header>
            <v-text-field
                    :label="xCapFirst($t('global.state'))"
                    :value="typeof pickerValue==='number' ? xCap((gearStates[pickerValue-1].title)) : null"
                    :color="currentColor"
                    hide-details="auto"
                    append-icon="mdi-menu-down"
                    dense
                    filled
                    clearable
                    @click:clear="pickerValue = null"
            >
                <template v-slot:prepend-inner style="margin-top: 0">
                    <v-avatar v-if="typeof pickerValue==='number'" tile left min-width="26" width="26" height="26">
                        <v-icon
                            :color="gearStates[pickerValue-1].color"
                            v-text="'mdi-'+stateIcon(gearStates[pickerValue-1].title)"
                            :size="MDI"
                        ></v-icon>
                    </v-avatar>
                </template>
            </v-text-field>
        </template>

        <template v-slot:content="{item}">
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
        </template>
    </x-selector>

</template>

<script>

    import XSelector from "@/components/inputs/XSelector";

    export default {
        name: 'x-state-selector',
        components: {
            XSelector
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

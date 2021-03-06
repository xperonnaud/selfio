<template>

    <x-selector
        title="activity"
        :items="activities"
        v-bind:value.sync="pickerValue"
        :isInFilter="isInFilter"
    >
        <template v-slot:header>
            <v-text-field
                :label="xCapFirst($t('global.activity'))"
                :value="typeof pickerValue==='string' ? xCap($t(`activities.${pickerValue}.title`)) : null"
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
                    >
                        <x-svg
                            :src="pickerValue"
                            svgPath="activities/"
                            :width="XLI"
                            :height="XLI"
                            :tooltipText="xCap($t(`activities.${pickerValue}.desc`))"
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

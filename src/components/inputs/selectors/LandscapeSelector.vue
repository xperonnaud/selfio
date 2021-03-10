<template>

    <x-selector
        title="landscape"
        :items="landscapes"
        v-bind:value.sync="pickerValue"
        :isInFilter="isInFilter"
    >
        <template v-slot:header>
            <v-text-field
                :label="xCapFirst($t('global.landscape'))"
                :value="typeof pickerValue==='string' ? xCap($t(`landscapes.${pickerValue}.title`)) : null"
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
                            svgPath="landscapes/"
                            :width="XLI"
                            :height="XLI"
                            :tooltipText="xCapFirst($t(`landscapes.${pickerValue}.title`))"
                            logo
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
        </template>
    </x-selector>

</template>

<script>

    import XSelector from "@/components/inputs/selectors/XSelector";
    import XSvg from "@/components/elements/Icons/XSvg";

    export default {
        name: 'landscape-selector',
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

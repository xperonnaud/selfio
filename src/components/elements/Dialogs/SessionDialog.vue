<template>

    <v-dialog
        v-if="isMounted"
        v-model="dialog"
        :max-width="maxDialogWidth"
        :transition="dialogTransition"
        persistent
    >
        <div class="session-dialog">
            <v-card>
                <div class="max-width d-flex align-center justify-center">
                    <v-avatar :size="48" class="primary-gradient-color dialog-avatar">
                        <v-icon :size="MDI" v-text="'mdi-alarm'" style="margin-top: 23px;" />
                    </v-avatar>
                </div>

                <v-card-title class="text-h6 mt-6" v-text="xCapFirst(t('session-expired'))" />

                <v-card-subtitle v-text="xCapFirst(t('please-login'))" />

                <v-divider />

                <v-card-actions>

                    <v-spacer />

                    <v-btn
                        @click="api_logout()"
                        class="primary-gradient-color"
                        depressed
                    >
                        <span v-text="xCapFirst(t('log-back'))" />
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>

    </v-dialog>

</template>

<script>

    export default {
        name: 'session-dialog',
        props: {
            dialog: Boolean
        },
        data: () => ({
            isMounted: false,
        }),
        methods: {
            t(str) {
                return this.$t(`components.session-dialog.${str}`);
            }
        },
        mounted() {
            this.isMounted = true;
        }
    }

</script>

<style lang="scss">

    .session-dialog {
        padding-top: 2px !important;
        background-image: linear-gradient(45deg, #9C27B0, #2196F3, #009688);
    }

</style>

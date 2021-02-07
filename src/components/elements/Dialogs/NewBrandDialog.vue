<template>

  <v-dialog
    v-if="isMounted"
    v-model="brandDialog"
    :max-width="isMobile ? '300' : '450'"
    :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
    persistent
  >
    <div class="new-brand-dialog">
      <v-card>
        <div class="max-width d-flex align-center justify-center">
          <v-avatar :size="48" class="primary-gradient-color" style="position: absolute; top: -26px;">
            <v-icon :size="MDI" v-text="'mdi-label-multiple'" style="margin-top: 21px;" dark />
          </v-avatar>
        </div>

        <v-card-title class="headline mt-3">
          {{t('new-brand') | capitalizeFilter}}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="pb-0">
              <x-title-field
                label="title"
                v-bind:value.sync="defaultBrand.title"
                v-bind:valid.sync="validBrand"
                :color="darkColor('primary')"
                @keyup.enter="postBrand()"
              ></x-title-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn
            @click="brandDialog = false"
            depressed
            text
            v-text="$t('global.cancel')"
          ></v-btn>

          <v-spacer />

          <primary-btn
            label="add"
            :valid.sync="validBrand"
            v-on:btnAction="postBrand()"
          ></primary-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>

</template>

<script>

  import PrimaryBtn from "@/components/elements/Btns/PrimaryBtn";
  import XTitleField from "@/components/inputs/fields/XTitleField";

  export default {
    name: 'new-brand-dialog',
    components: {
      PrimaryBtn,
      XTitleField
    },
    props: {
      dialog: Boolean
    },
    data: () => ({
      isMounted: false,
      brandDialog: false,
      validBrand: false,
      defaultBrand: { title: '' },
    }),
    methods: {
      t(str) {
        return this.$t(`components.new-brand-dialog.${str}`);
      },
      async postBrand() {
        if(this.validBrand === true) {
          await this.api_post_brand(this.defaultBrand);
          this.brandDialog = false;
          this.defaultBrand.title = '';
        }
      },
    },
    watch: {
      dialog(val) {
          this.brandDialog = val;
      },
      brandDialog(val) {
          this.$emit('update:dialog',val);
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .new-brand-dialog {
      padding-top: 2px !important;
      background-image: linear-gradient(45deg, #9C27B0, #2196F3, #009688);
  }

</style>

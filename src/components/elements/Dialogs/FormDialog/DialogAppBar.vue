<template>

    <v-app-bar
      v-if="isMounted"
      :color="editMode ? xOverlayColor : xTabsColor"
      :dense="editMode"
      :class="[
        {'pt-1 px-2' : (!isMobile && !editMode)},
        {'px-0' : (isMobile && !editMode)},
        {'px-3' : (!isMobile && editMode)},
        {'px-2' : (isMobile && editMode)},
      ]"
      :app="isMobile && !editMode"
    >
      <v-btn
        @click="leftArrowAction()"
        :disabled="editMode || !isFormMounted"
        :small="editMode"
        :class="[
          {'mr-0' : (!isMobile && !editMode)},
          {'mr-4' : (!isMobile && editMode)},
          {'mr-3' : (isMobile && editMode)},
          {'mr-1' : (isMobile && !editMode)},
        ]"
        icon
      >
        <v-icon :small="editMode" v-text="'mdi-arrow-left'" />
      </v-btn>

      <v-toolbar-title v-bind:class="['pl-0',{'pa-0':isMobile}]">
        <template>
          <v-list-item two-line v-bind:class="[{'px-0':isMobile}]">
            <v-list-item-content class="pa-0">
              <v-list-item-title>
                <span v-if="item" :class="[{'text-body-2 text--disabled':editMode}]">{{item.title | capitalizeFilter}}</span>
                <span v-else :class="[{'text-body-2 text--disabled':editMode}]">{{ $t(`global.${currentRouteId}`) | capitalizeFilter }}</span>
              </v-list-item-title>

              <v-list-item-subtitle>
                <span v-if="item" :class="[{'text-tiny-dimmed':editMode}]" v-text="$t(`global.${formDialogType}`)" />
                <span v-else :class="[{'text-tiny-dimmed':editMode}]" v-text="$t('global.new')" />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-toolbar-title>

      <v-spacer />

      <x-delete-dialog
        v-if="formDialogType === 'update'"
        v-bind:item.sync="item"
        v-bind:value.sync="deleteDialog"
        v-bind:editMode.sync="editMode"
        v-bind:isFormMounted.sync="isFormMounted"
        v-bind:isFormValid.sync="isFormValid"
        v-bind:hasItemRelations.sync="hasItemRelations"
        v-bind:deleteItem.sync="dialogDeleteItem"
        :isActionLoading.sync="isActionLoading"
      ></x-delete-dialog>

      <v-btn
        @click="formDialogAction()"
        :disabled="editMode || !isFormValid || !isFormMounted"
        :loading="isActionLoading"
        icon
      >
        <poly-icon
          :disabled="(editMode || !isFormValid || !isFormMounted)"
          :size="editMode ? MDI : XLI"
          icon="mdi-check"
        ></poly-icon>
      </v-btn>
    </v-app-bar>

</template>

<script>

  import PolyIcon from "@/components/elements/Icons/PolyIcon";
  import XDeleteDialog from "@/components/elements/Dialogs/XDeleteDialog/XDeleteDialog";

  export default {
    name: "dialog-app-bar",
    components: {
      PolyIcon,
      XDeleteDialog
    },
    props: {
      item: {
        type: Object,
        default: null
      },
      editMode: {
        type: Boolean,
        default: false
      },
      isActionLoading: {
        type: Boolean,
        default: false
      },
      isFormMounted: {
        type: Boolean,
        default: false
      },
      isFormValid: {
        type: Boolean,
        default: false
      },
      hasItemRelations: {
        type: Boolean,
        default: false
      },
      postItem: {
        type: Boolean,
        default: false
      },
      patchItem: {
        type: Boolean,
        default: false
      },
      deleteItem: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isMounted: false,
        deleteDialog: false,
        isValid: this.isFormValid,
        dialogEditMode: this.editMode,
        dialogPostItem: this.postItem,
        dialogPatchItem: this.patchItem,
        dialogDeleteItem: false,
      }
    },
    computed: {

    },
    methods: {
      apiPostItem() {
        this.dialogPostItem = true;
      },
      apiPatchItem() {
        this.dialogPatchItem = true;
      },
      leftArrowAction() {
        if(this.dialogEditMode === true) {
          this.dialogEditMode = false;
        } else {
          this.formDialog = false;
        }
      },
      formDialogAction() {
        if(this.formDialogType === 'post') {
          this.apiPostItem();

        } else if(this.formDialogType === 'update') {
          this.apiPatchItem();

        } else {
          alert('No Action ?!..');
        }
      },
    },
    watch: {
      isValid(val) {
        if(this.isMounted)
          this.$emit('update:isFormValid',val);
      },
      isFormValid(val) {
        if(this.isMounted)
          this.isValid = val;
      },
      dialogEditMode(val) {
        if(this.isMounted)
          this.$emit('update:editMode',val);
      },
      editMode(val) {
        if(this.isMounted)
          this.dialogEditMode = val;
      },
      dialogPostItem(val) {
        if(this.isMounted)
          this.$emit('update:postItem',val);
      },
      postItem(val) {
        if(this.isMounted)
          this.dialogPostItem = val;
      },
      dialogPatchItem(val) {
        if(this.isMounted)
          this.$emit('update:patchItem',val);
      },
      patchItem(val) {
        if(this.isMounted)
          this.dialogPatchItem = val;
      },
      dialogDeleteItem(val) {
        if(this.isMounted)
          this.$emit('update:deleteItem',val);
      },
      deleteItem(val) {
        if(this.isMounted)
          this.dialogDeleteItem = val;
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }
</script>
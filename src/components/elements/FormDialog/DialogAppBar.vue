<template>

    <v-app-bar
      v-if="isMounted"
      :color="editMode ? xOverlayColor : xTabsColor"
      :dense="editMode"
      :class="[(isMobile ? 'px-0' : 'px-3')]"
    >
      <v-btn
        @click="leftArrowAction()"
        :disabled="editMode || !isFormMounted"
        :small="editMode"
        class="mr-1"
        icon
      >
        <v-icon :small="editMode" v-text="'mdi-arrow-left'" />
      </v-btn>

      <v-toolbar-title v-bind:class="['pl-0',{'pa-0':isMobile}]">
        <template>
          <v-list-item two-line>
            <v-list-item-content class="pa-0">
              <v-list-item-title>
                <span v-if="item" :class="[{'text-tiny-dimmed':editMode}]">{{item.title | capitalizeFilter}}</span>
                <span v-else>{{ currentRouteName | singularFilter | capitalizeFilter }}</span>
              </v-list-item-title>

              <v-list-item-subtitle>
                <span v-if="item" :class="[{'text-tiny-dimmed':editMode}]" v-text="formDialogType" />
                <span v-else v-text="'new'" />
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
      ></x-delete-dialog>

      <v-btn
        @click="formDialogAction()"
        v-bind:class="[{'primary-gradient-color-text': !(editMode || !isFormValid || !isFormMounted)}]"
        :disabled="editMode || !isFormValid || !isFormMounted"
        icon
      >
        <v-icon
          :size="editMode ? MDI : XLI"
          v-text="'mdi-check'"
        />
      </v-btn>
    </v-app-bar>

</template>

<script>

  import XDeleteDialog from "@/components/elements/DeleteDialog/XDeleteDialog";

  export default {
    name: "dialog-app-bar",
    components: {
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
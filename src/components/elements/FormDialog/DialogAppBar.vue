<template>

    <v-app-bar
      v-if="isMounted"
      :color="editMode ? 'secondary' : xTabsColor"
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
        <template v-if="item">
          <span
            v-bind:class="[
              {'text-subtitle-1':editMode},
              {'grey--text':editMode},
            ]"
          >{{item.title | capitalizeFilter}}</span>
          <span v-bind:class="['text-tiny-dimmed mx-2 mb-1']" v-text="formDialogType" />
        </template>

        <template v-else>
          <span v-bind:class="[{currentColorText : !editMode}]">{{ currentRouteName | singularFilter | capitalizeFilter }}</span>
          <span v-bind:class="['text-tiny-dimmed mx-2 mb-1']" v-text="'new'" />
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
          :size="editMode ? 24 : 28"
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
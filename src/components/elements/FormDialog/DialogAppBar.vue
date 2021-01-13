<template>

    <v-app-bar
      v-if="isMounted"
      :color="editMode ? 'secondary' : xTabsColor"
      :dense="editMode"
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
          <span v-bind:class="['text-tiny-dimmed mx-2 mb-1', currentColorText]" v-text="'('+formDialogType+')'" />
        </template>

        <template v-else>
          <span v-bind:class="[{currentColorText : !editMode}]">{{ currentRouteName | singularFilter | capitalizeFilter }}</span>
          <span v-bind:class="['text-tiny-dimmed mx-2 mb-1', currentColorText]" v-text="'(new)'" />
        </template>
      </v-toolbar-title>

      <v-spacer />

      <v-dialog
        v-if="formDialogType === 'update'"
        v-model="deleteDialog"
        :max-width="isMobile ? '290' : '450'"
        :fullscreen="isMobile"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind:class="[{'mr-1':!isMobile}]"
            v-bind="attrs"
            v-on="on"
            :disabled="editMode || !isFormMounted"
            icon
          >
            <v-icon :small="editMode" v-text="'mdi-trash-can-outline'" />
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            <span v-if="hasItemRelations" v-text="'Delete is not allowed.'" />
            <span v-else v-text="'You are about to delete an item.'" />
          </v-card-title>

          <v-card-subtitle v-if="hasItemRelations">
            <span v-text="'Remove relations first:'" />
          </v-card-subtitle>

          <v-card-text>
            <v-responsive
                v-if="hasItemRelations"
                class="overflow-y-auto"
                :max-height="300"
            >
              <v-sheet :color="'grey '+(isDark ? 'darken-4' : 'lighten-4')" class="pa-2">
                <relation-chip
                  :relationType="'inventories'"
                  :list="inventoriesList"
                ></relation-chip>

                <relation-chip
                  :relationType="'gear'"
                  :list="gearList"
                ></relation-chip>

                <v-divider
                    v-if="selectedItemRelations.gear && selectedItemRelations.gear.length > 0
                        && selectedItemRelations.adventures && selectedItemRelations.adventures.length > 0"
                ></v-divider>

                <relation-chip
                  :relationType="'adventures'"
                  :list="adventuresList"
                ></relation-chip>
              </v-sheet>
            </v-responsive>

            <div v-else>
              <div v-text="'This action is irreversible.'" />
              <div v-bind:class="[reversedFontShadeColor]" v-text="'Are you sure your wish to go forward with this?'" />
            </div>

          </v-card-text>

          <v-card-actions>

            <v-spacer />

            <v-btn
              @click="deleteDialog = false"
              text
              v-text="'Cancel'"
            ></v-btn>

            <v-btn
              :color="darkColor('red')"
              @click="deleteAction()"
              :disabled="hasItemRelations"
              depressed
            >
              <v-icon left small :color="(isDark ? 'black' : 'white')" v-text="'mdi-alert'" />
              <span v-bind:class="[reversedFontShadeColor]" v-text="'Delete'" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        @click="formDialogAction()"
        v-bind:class="[{'mr-1':!isMobile}]"
        :color="darkColor('primary')"
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

  import RelationChip from "@/components/elements/FormDialog/RelationChip";

  export default {
    name: "dialog-app-bar",
    components: {
      RelationChip
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
        dialogDeleteItem: this.deleteItem,
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
      apiDeleteItem() {
        this.dialogDeleteItem = true;
      },
      leftArrowAction() {
        if(this.dialogEditMode === true) {
          this.dialogEditMode = false;
        } else {
          this.formDialog = false;
        }
      },
      deleteAction() {
        this.deleteDialog = false;
        if(this.item)
          this.apiDeleteItem();
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
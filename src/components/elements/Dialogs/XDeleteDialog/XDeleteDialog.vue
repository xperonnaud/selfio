<template>

  <v-dialog
    v-if="isMounted && formDialogType === 'update'"
    v-model="pickerValue"
    :max-width="isMobile ? '300' : '450'"
    :transition="isMobile ? 'slide-x-transition' : 'fade-transition'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind:class="[{'mr-1':!isMobile}]"
        v-bind="attrs"
        v-on="on"
        :disabled="editMode || !isFormMounted"
        icon
      >
        <v-icon :small="editMode" v-text="'mdi-trash-can-outline'" :color="xCheckerColor" />
      </v-btn>
    </template>

    <v-card :style="'border-top: 2px solid '+errorColor+' !important;'">
      <x-delete-avatar />

      <v-card-title class="text-subtitle-2 mt-3">
        <span>{{t(`deleting-${currentRouteId}`) | capitalizeFirstFilter}}</span>
        <span v-html="':&nbsp;'" />
        <span v-if="hasItemRelations" v-text="t('not-allowed')">{{t('not-allowed') | capitalizeFilter}}</span>
        <span v-else v-text="item.title">{{item.title | capitalizeFirstFilter}}</span>
      </v-card-title>

      <v-card-subtitle v-if="hasItemRelations">
        {{t('remove-relations') | capitalizeFirstFilter}}
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

        <x-delete-sure v-else />
      </v-card-text>

      <v-divider />

      <x-delete-actions
        v-bind:value.sync="pickerValue"
        v-bind:deleteItem.sync="dialogDeleteItem"
        :hasItemRelations.sync="hasItemRelations"
      ></x-delete-actions>
    </v-card>
  </v-dialog>

</template>

<script>

  import RelationChip from "@/components/elements/RelationChip";
  import XDeleteSure from "@/components/elements/Dialogs/XDeleteDialog/XDeleteSure";
  import XDeleteAvatar from "@/components/elements/Dialogs/XDeleteDialog/XDeleteAvatar";
  import XDeleteActions from "@/components/elements/Dialogs/XDeleteDialog/XDeleteActions";

  export default {
    name: 'x-delete-dialog',
    components: {
      XDeleteSure,
      XDeleteAvatar,
      XDeleteActions,
      RelationChip
    },
    props: {
      item: {
        type: Object,
        default: null
      },
      value: {
        type: Boolean,
        default: false,
      },
      editMode: {
        type: Boolean,
        default: false
      },
      isFormMounted: {
        type: Boolean,
        default: false
      },
      hasItemRelations: {
        type: Boolean,
        default: false
      },
      isFormValid: {
        type: Boolean,
        default: false
      },
      deleteItem: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      isMounted: false,
      pickerValue: null,
      dialogDeleteItem: false,
    }),
    methods: {
      t(str) {
        return this.$t(`components.x-delete-dialog.${str}`)
      },
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
      this.pickerValue = this.value;
    }
  }

</script>

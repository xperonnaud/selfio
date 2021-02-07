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
        <v-icon :small="editMode" v-text="'mdi-trash-can-outline'" />
      </v-btn>
    </template>

    <v-card :style="'border-top: 2px solid '+errorColor+' !important;'">
      <div class="max-width d-flex align-center justify-center">
        <v-avatar
          :size="48"
          :color="errorColor"
          style="position: absolute; top: -26px;"
        >
          <v-icon
            :size="MDI"
            :color="reversedShadeColor"
            v-text="'mdi-trash-can-outline'"
            style="margin-top: 22px;"
          ></v-icon>
        </v-avatar>
      </div>

      <v-card-title class="text-subtitle-2 mt-3">
        <span>{{t(`deleting-${currentRouteId}`) | capitalizeFirstFilter}}</span>
        <span v-html="':&nbsp;'" />
        <span v-if="hasItemRelations" v-text="t('not-allowed')">{{t('not-allowed') | capitalizeFilter}}</span>
        <span v-else v-text="item.title" />
      </v-card-title>

      <v-card-subtitle v-if="hasItemRelations">
        <span v-text="t('remove-relations')" />
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
          <div>{{t('are-you-sure') | capitalizeFirstFilter}}</div>
          <div v-bind:class="[fontShadeColor]">{{t('irreversible') | capitalizeFirstFilter}}</div>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          @click="pickerValue = false"
          depressed
          text
          v-text="$t('global.cancel')"
        ></v-btn>

        <v-spacer />

        <v-btn
          :color="darkColor('error')"
          @click="deleteAction()"
          :disabled="hasItemRelations"
          depressed
        >
          <span v-bind:class="[reversedFontShadeColor]" v-text="$t('global.delete')" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

  import RelationChip from "@/components/elements/RelationChip";

  export default {
    name: 'x-delete-dialog',
    components: {
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
    computed: {

    },
    methods: {
      t(str) {
        return this.$t(`components.x-delete-dialog.${str}`)
      },
      deleteAction() {
        if(this.item)
          this.dialogDeleteItem = true;

        this.pickerValue = false;
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

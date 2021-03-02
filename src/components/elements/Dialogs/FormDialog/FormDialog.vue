<template>
  <v-dialog
    v-model="formDialog"
    max-width="900px"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
    :transition="dialogTransition"
    persistent
    style="overflow-y: unset;"
  >
    <v-card
      v-bind:class="[{'rounded-0': isMobile}]"
      :color="xBackgroundColor"
      :min-height="isMobile ? '100%' : 450"
    >
      <dialog-app-bar
        :item="item"
        v-bind:hasItemRelations="hasItemRelations"
        v-bind:editMode.sync="editMode"
        v-bind:isFormMounted.sync="isFormMounted"
        v-bind:isFormValid.sync="isFormValid"
        v-bind:postItem.sync="postItem"
        v-bind:patchItem.sync="patchItem"
        v-bind:deleteItem.sync="deleteItem"
        :isActionLoading.sync="isFormLoading"
      ></dialog-app-bar>

      <v-card-text v-bind:class="['pb-0 px-0']">
        <component
          v-if="formComponent"
          v-show="!isLoading"
          :is="formComponent"
          :ref="formRef"
          :item="item"
          :itemIndex="itemIndex"
          v-bind:isFormLoading.sync="isFormLoading"
          v-bind:isFormMounted.sync="isFormMounted"
          v-bind:isFormValid.sync="isFormValid"
          v-bind:postItem.sync="postItem"
          v-bind:patchItem.sync="patchItem"
          v-bind:deleteItem.sync="deleteItem"
          v-bind:editMode.sync="editMode"
        ></component>

        <v-overlay :value="!formComponent || !isMounted || isLoading || isFormLoading || !isFormMounted">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

  import DialogAppBar from "@/components/elements/Dialogs/FormDialog/DialogAppBar";

  export default {
    name: "form-dialog",
    components: {
      DialogAppBar
    },
    props: {
      item: {
        type: Object,
        default: null
      },
      itemIndex: {
        type: Number,
        default: null
      },
    },
    data() {
      return {
        isMounted: false,
        isLoading: true,
        isFormLoading: true,
        isFormValid: false,
        isFormMounted: false,
        editMode: false,
        patchItem: false,
        postItem: false,
        deleteItem: false,
        deleteDialog: false,
        formRef: this.randomId(),
        formComponent: null,
        formComponentCalled: null,
        hasItemRelations: false,
      }
    },
    computed: {
      loader() {
        let self = this;
        let formId = this.xCap(this.currentRouteName);
        self.formComponentCalled = `@/components/forms/${formId}Form.vue`;
        return () => import(`@/components/forms/${formId}Form.vue`)
      },
      gearInventories: {
        get() {
          return this.$store.state.ui.tempGearInventories
        },
      },
      inventoryGear: {
        get() {
          return this.$store.state.selfio.inventoryGear
        },
      },
      inventoryAdventures: {
        get() {
          return this.$store.state.selfio.inventoryAdventures
        },
      },
    },
    methods: {
      componentLoad() {
        let self = this;
        this.resetUniqueStepRef();
        let route = this.xFilters.removeSlashFilter(this.$router.currentRoute.path);

        if(this.itemRoutes.includes(route))
          this.loader()
              .then(() => {
                self.formComponent = () => self.loader();
              })
              .catch((e) => {
                console.log('componentLoad ERROR',e);
              })
      },
      resetUniqueStepRef() {
        if(
          this.isMounted
          && this.formRef
          && this.$refs[this.formRef]
        )
          this.$refs[this.formRef].$destroy();

        this.formRef = this.randomId();
      },
      async assignItemRelations() {
        let self = this;
        let relations = {};

        switch(this.currentRouteName) {
          case 'gear':
            await self.api_get_gear_inventories(self.item.id);
            if(self.gearInventories && self.gearInventories.length > 0) {
              Object.assign(relations, {['inventories'] : self.gearInventories});
            }
            break;

          case 'inventories':
            if(self.inventoryAdventures[self.item.id] && self.inventoryAdventures[self.item.id].length > 0) {
              Object.assign(relations, {['adventures'] : self.inventoryAdventures[self.item.id]});
            }
            break;

          default:
            // code block
        }

        this.$store.commit("updateUiSelectedItemRelations", relations);
      },
      initItemRelationState() {
        this.hasItemRelations = (
            ('gear' in this.selectedItemRelations && this.selectedItemRelations.gear.length > 0)
            || ('inventories' in this.selectedItemRelations && this.selectedItemRelations.inventories.length > 0)
            || ('adventures' in this.selectedItemRelations && this.selectedItemRelations.adventures.length > 0)
        );
      },
    },
    watch: {
      currentRouteName(value) {
        if (!value)
          return null;

          this.componentLoad();
      },
      postItem(value) {
        let self = this;
        if(value === true)
          setTimeout(function() {
            self.postItem = false;
          },50);
      },
      patchItem(value) {
        let self = this;
        if(value === true)
          setTimeout(function() {
            self.patchItem = false;
          },50);
      },
      deleteItem(value) {
        let self = this;
        if(value === true)
          setTimeout(function() {
            self.deleteItem = false;
          },50);
      },
    },
    create() {
      this.isAppLoading = false;
    },
    async mounted() {
      let self = this;

      if(this.isItemRoute)
        self.componentLoad();

      this.isMounted = true;

      if(this.formDialogType === 'update')
        await this.assignItemRelations().then(function() {
          self.initItemRelationState();
        });

      this.isLoading = false;
    }
  }
</script>
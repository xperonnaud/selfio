
import C from '@/constants'

export default {
    data () {
        return {
            isStoreMounted: false,
            itemRoutes: [
                'gear',
                'inventories',
                'adventures'
            ]
        }
    },
    computed: {
        store: {
            get() {
                return this.$store.state;
            }
        },
        xUi: {
            get() {
                return this.store.ui;
            }
        },
        xSelfio: {
            get() {
                return this.store.selfio;
            }
        },
        xFilters() {
            return this.$options.filters
        },
        itemOrderBy: {
            get() {
                return this.xUi.itemOrderBy
            },
            set(value) {
                this.$store.commit("updateUiItemOrderBy", value)
            }
        },
        itemOrderOption: {
            get() {
                return this.xUi.itemOrderOption
            },
            set(value) {
                this.$store.commit("updateUiItemOrderOption", value)
            }
        },
        formDialog: {
            get() {
                return this.xUi.formDialog
            },
            set(value) {
                this.$store.commit("updateUiFormDialog", value)
            }
        },
        formDialogType: {
            get() {
                return this.xUi.formDialogType
            },
            set(value) {
                this.$store.commit("updateUiFormDialogType", value)
            }
        },
        selectedItem: {
            get() {
                return this.xUi.selectedItem
            },
            set(value) {
                this.$store.commit("updateUiSelectedItem", value)
            }
        },
        selectedItemIndex: {
            get() {
                return this.xUi.selectedItemIndex
            },
            set(value) {
                this.$store.commit("updateUiSelectedItemIndex", value)
            }
        },
        snackbarDisplay: {
            get() {
                return this.xUi.snackbarDisplay
            },
            set(value) {
                this.$store.commit("updateUiSnackbarDisplay", value)
            }
        },
        snackbarType: {
            get() {
                return this.xUi.snackbarType
            },
            set(value) {
                this.$store.commit("updateUiSnackbarType", value)
            }
        },
        snackbarText: {
            get() {
                return this.xUi.snackbarText
            },
            set(value) {
                this.$store.commit("updateUiSnackbarText", value)
            }
        },
        navigationCollapse: {
            get() {
                return this.xUi.navigationCollapse
            },
            set(value) {
                this.$store.commit("updateUiNavigationCollapse", value)
            }
        },
        isAppLoading: {
            get() {
                return this.xUi.isAppLoading
            },
            set(value) {
                this.$store.commit("updateUiIsAppLoading", value)
            }
        },
        weathers: {
            get() {
                return this.xUi.weathers
            },
        },
        user: {
            get() {
                return this.xSelfio.user
            },
        },
        userId() {
            return parseInt(this.user.id);
        },
        preferences: {
            get() {
                return this.xSelfio.preferences
            },
        },
        dateFormatPref() {
            return this.preferences.date_format;
        },
        weightUnit: {
            get() {
                if(this.preferences && this.preferences.weight_unit)
                    return this.preferences.weight_unit;
                return 'g'
            },
        },
        supWeightUnit() {
            switch(this.weightUnit) {
                case 'g':
                    return 'kg';

                case 'oz':
                    return 'lb';

                default:
                    return 'g';
            }
        },
        priceUnit: {
            get() {
                if(this.preferences && this.preferences.price_unit)
                    return this.preferences.price_unit;
                return '$'
            },
        },
        distanceUnit: {
            get() {
                if(this.preferences && this.preferences.distance_unit)
                    return this.preferences.distance_unit;
                return 'km'
            },
        },
        elevationUnit: {
            get() {
                if(this.preferences && this.preferences.elevation_unit)
                    return this.preferences.elevation_unit;
                return 'm'
            },
        },
        temperatureUnit: {
            get() {
                if(this.preferences && this.preferences.temperature_unit)
                    return this.preferences.temperature_unit;
                return '&#8457;'
            },
        },
        gearCategories: {
            get() {
                return this.xSelfio.gearCategories
            },
        },
        gearStates: {
            get() {
                return this.xUi.gearStates
            },
        },
        gearReferences: {
            get() {
                return this.xSelfio.gearReferences
            },
        },
        adventureReferences: {
            get() {
                return this.xSelfio.adventureReferences
            },
        },
        brandReferences: {
            get() {
                return this.xSelfio.brandReferences
            },
        },
        landscapeReferences: {
            get() {
                return this.xSelfio.landscapeReferences
            },
        },
        weatherReferences: {
            get() {
                return this.xSelfio.weatherReferences
            },
        },
        gearStateReferences: {
            get() {
                return this.xSelfio.gearStateReferences
            },
        },
        gearCategoryReferences: {
            get() {
                return this.xSelfio.gearCategoryReferences
            },
        },
        activityReferences: {
            get() {
                return this.xSelfio.activityReferences
            },
        },
        inventoryReferences: {
            get() {
                return this.xSelfio.inventoryReferences
            },
        },
        navigationRoutes: {
            get() {
                return this.xUi.navigationRoutes
            },
        },
        navigationItems: {
            get() {
                return this.xUi.navigationItems
            },
        },
        tempInventoryGear: {
            get() {
                return this.xUi.tempInventoryGear
            },
        },
        selectedItemRelations: {
            get() {
                return this.xUi.selectedItemRelations
            },
        },
        itemSearch: {
            get() {
                return this.xUi.itemSearch
            },
            set(value) {
                this.$store.commit("updateUiItemSearch", value)
            }
        },
    },
    methods: {
        xGear(gearId) {
            if(gearId && this.gearList)
                return (this.gearList[this.gearReferences[gearId]]);
            return null;
        },
        xGearBrand(brandId) {
            if(brandId && this.brandsList)
                return (this.brandsList[this.brandReferences[brandId]]);
            return null;
        },
        xGearCategory(gearCategoryId) {
            if(gearCategoryId && this.gearCategories)
                return (this.gearCategories[this.gearCategoryReferences[gearCategoryId]]);
            return null;
        },
        xGearState(gearStateId) {
            if(gearStateId && this.gearStates)
                return (this.gearStates[gearStateId - 1]);
            return null;
        },
        xInventory(inventoryId) {
            if(inventoryId && this.inventoriesList)
                return (this.inventoriesList[this.inventoryReferences[inventoryId]]);
            return null;
        },
        xActivity(activityId) {
            if(activityId && this.activitiesList)
                return (this.activitiesList[this.activityReferences[activityId]]);
            return null;
        },
        xLandscape(landscapeId) {
            if(landscapeId && this.landscapesList)
                return (this.landscapesList[this.landscapeReferences[landscapeId]]);
            return null;
        },
        clearMenuFilters() {
            this.$store.commit("updateUiItemSearch", '');
            this.$store.commit("updateUiItemOwned", null);
            this.$store.commit("updateUiItemLocation", null);
            this.$store.commit("updateUiItemTag", null);
            this.$store.commit("updateUiItemQuantityOwned", null);
            this.$store.commit("updateUiItemConsumable", null);
            this.$store.commit("updateUiItemGearCategory", null);
            this.$store.commit("updateUiItemGearState", null);
            this.$store.commit("updateUiItemGearBrand", null);
            this.$store.commit("updateUiItemActivity", null);
            this.$store.commit("updateUiItemInventory", null);
            this.$store.commit("updateUiItemLandscape", null);
            this.$store.commit("updateUiItemWeather", null);
        },
        updateSnackbar(type, text) {
            this.snackbarDisplay = true;
            this.snackbarType = type;
            this.snackbarText = text;
        },

    },
    mounted() {
        this.isStoreMounted = true;
    }
}
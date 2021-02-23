
export default {
    data () {
        return {
            isStoreMounted: false,
            itemRoutes: [
                'gear',
                'inventories',
                'adventures'
            ],
            NAVIGATION_ROUTES: [
                'gear',
                'inventories',
                'adventures',
                'home',
                'account',
                'brands',
                'tags',
                'import_export',
                'settings',
                'feedback',
                'info',
            ],
            NAVIGATION_ITEMS: {
                home: {
                    title: 'Home',
                    id: 'home',
                    icon: 'mdi-view-dashboard',
                    type: 'misc',
                },
                gear: {
                    title: 'Gear',
                    id: 'gear',
                    icon: 'mdi-knife-military',
                    color: 'blue',
                    type: 'items'
                },
                inventories: {
                    title: 'Inventories',
                    id: 'inventories',
                    icon: 'mdi-semantic-web',
                    color: 'purple',
                    type: 'items'
                },
                adventures: {
                    title: 'Adventures',
                    id: 'adventures',
                    icon: 'mdi-image-filter-hdr',
                    color: 'teal',
                    type: 'items'
                },
                account: {
                    title: 'Account',
                    id: 'account',
                    icon: 'mdi-account-circle',
                    type: 'account',
                },
                brands: {
                    title: 'Brands',
                    id: 'brands',
                    icon: 'mdi-label-multiple',
                    type: 'configuration',
                },
                tags: {
                    title: 'Tags',
                    id: 'tags',
                    icon: 'mdi-tag-multiple',
                    type: 'settings',
                },
                settings: {
                    title: 'Settings',
                    id: 'settings',
                    icon: 'mdi-cog',
                    type: 'settings',
                },
                feedback: {
                    title: 'Feedback',
                    id: 'feedback',
                    icon: 'mdi-comment-text',
                    type: 'misc',
                },
                import_export: {
                    title: 'Import / Export',
                    id: 'import-export',
                    icon: 'mdi-database',
                    type: 'misc',
                },
                info: {
                    title: 'Info',
                    id: 'info',
                    icon: 'mdi-chart-timeline-variant-shimmer',
                    type: 'undefined',
                },
            },
            WEATHERS: [
                'cloudy',
                'fog',
                'hail',
                'hazy',
                'lightning',
                'lightning-rainy',
                'partly-cloudy',
                'partly-rainy',
                'partly-snowy',
                'pouring',
                'rainy',
                'snowy',
                'snowy-heavy',
                'sunny',
                'windy',
            ],
            GEAR_STATES: [
                { id: 1, title: 'poor', color: 'red' },
                { id: 2, title: 'used', color: 'orange' },
                { id: 3, title: 'ok', color: 'green' },
                { id: 4, title: 'new', color: 'blue' },
            ],
            GEAR_CATEGORIES: [
                'activity',
                'clothing',
                'cooking',
                'documents',
                'electronics',
                'emergency',
                'food-snacks',
                'hydration',
                'hygiene',
                'miscellanous',
                'packs-bags',
                'shelter',
                'sleeping',
                'tools',
            ],
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
        isLoggedIn: {
            get() {
                return this.$store.state.ui.isLoggedIn;
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
                return this.WEATHERS
            },
        },
        navigationRoutes: {
            get() {
                return this.NAVIGATION_ROUTES
            },
        },
        navigationItems: {
            get() {
                return this.NAVIGATION_ITEMS;
            },
        },
        gearStates: {
            get() {
                return this.GEAR_STATES
            },
        },
        gearCategories: {
            get() {
                return this.GEAR_CATEGORIES
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
        xCap(str) {
            if(!str) return '';
            if(typeof str == 'number') return str;
            return this.xFilters.capitalizeFilter(str);
        },
        xCapFirst(str) {
            if(!str) return '';
            if(typeof str == 'number') return str;
            return this.xFilters.capitalizeFirstFilter(str);
        },
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

export default {
    data () {
        return {
            isMounted: false,
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
        formDialog: {
            get() {
                return this.$store.state.ui.formDialog
            },
            set(value) {
                this.$store.commit("updateUiFormDialog", value)
            }
        },
        formDialogType: {
            get() {
                return this.$store.state.ui.formDialogType
            },
            set(value) {
                this.$store.commit("updateUiFormDialogType", value)
            }
        },
        selectedItem: {
            get() {
                return this.$store.state.ui.selectedItem
            },
            set(value) {
                this.$store.commit("updateUiSelectedItem", value)
            }
        },
        selectedItemIndex: {
            get() {
                return this.$store.state.ui.selectedItemIndex
            },
            set(value) {
                this.$store.commit("updateUiSelectedItemIndex", value)
            }
        },
        snackbarDisplay: {
            get() {
                return this.$store.state.ui.snackbarDisplay
            },
            set(value) {
                this.$store.commit("updateUiSnackbarDisplay", value)
            }
        },
        snackbarType: {
            get() {
                return this.$store.state.ui.snackbarType
            },
            set(value) {
                this.$store.commit("updateUiSnackbarType", value)
            }
        },
        snackbarText: {
            get() {
                return this.$store.state.ui.snackbarText
            },
            set(value) {
                this.$store.commit("updateUiSnackbarText", value)
            }
        },
        navigationCollapse: {
            get() {
                return this.$store.state.ui.navigationCollapse
            },
            set(value) {
                this.$store.commit("updateUiNavigationCollapse", value)
            }
        },
        isAppLoading: {
            get() {
                return this.$store.state.ui.isAppLoading
            },
            set(value) {
                this.$store.commit("updateUiIsAppLoading", value)
            }
        },
        weathers: {
            get() {
                return this.$store.state.ui.weathers
            },
        },
        user: {
            get() {
                return this.$store.state.selfio.user
            },
        },
        userId() {
            return parseInt(this.user.id);
        },
        preferences: {
            get() {
                return this.$store.state.selfio.preferences
            },
        },
        weightUnit: {
            get() {
                if(this.preferences && this.preferences.weight_unit)
                    return this.preferences.weight_unit;
                return 'g'
            },
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
        gearTypes: {
            get() {
                return this.$store.state.selfio.gearTypes
            },
        },
        gearStates: {
            get() {
                return this.$store.state.selfio.gearStates
            },
        },
        gearReferences: {
            get() {
                return this.$store.state.selfio.gearReferences
            },
        },
        brandReferences: {
            get() {
                return this.$store.state.selfio.brandReferences
            },
        },
        landscapeReferences: {
            get() {
                return this.$store.state.selfio.landscapeReferences
            },
        },
        weatherReferences: {
            get() {
                return this.$store.state.selfio.weatherReferences
            },
        },
        gearStateReferences: {
            get() {
                return this.$store.state.selfio.gearStateReferences
            },
        },
        gearTypeReferences: {
            get() {
                return this.$store.state.selfio.gearTypeReferences
            },
        },
        activityReferences: {
            get() {
                return this.$store.state.selfio.activityReferences
            },
        },
        inventoryReferences: {
            get() {
                return this.$store.state.selfio.inventoryReferences
            },
        },
        navigationRoutes: {
            get() {
                return this.$store.state.ui.navigationRoutes
            },
        },
        navigationItems: {
            get() {
                return this.$store.state.ui.navigationItems
            },
        },
        tempInventoryGear: {
            get() {
                return this.$store.state.ui.tempInventoryGear
            },
        },
        selectedItemRelations: {
            get() {
                return this.$store.state.ui.selectedItemRelations
            },
        },
        vuetifyColors: {
            get() {
                return this.$store.state.ui.colors
            },
        },
        currentRoutePath() {
            if(this.isMounted && this.$route)
                return this.$route.path;
        },
        currentRouteName() {
            if(this.isMounted && this.$route)
                return this.$route.name;
            return 'home';
        },
        currentRouteTitle() {
            if(this.isMounted && this.$router)
                return this.$options.filters.capitalizeFilter(this.currentRouteName);
        },
    },
    methods: {
        xGear(gearId) {
            if(gearId, this.gearList)
                return (this.gearList[this.gearReferences[gearId]]);
            return null;
        },
        xGearBrand(brandId) {
            if(brandId, this.brandsList)
                return (this.brandsList[this.brandReferences[brandId]]);
            return null;
        },
        xGearType(gearTypeId) {
            if(gearTypeId, this.gearTypes)
                return (this.gearTypes[this.gearTypeReferences[gearTypeId]]);
            return null;
        },
        xGearState(gearStateId) {
            if(gearStateId, this.gearStates)
                return (this.gearStates[this.gearStateReferences[gearStateId]]);
            return null;
        },
        xInventory(inventoryId) {
            if(inventoryId, this.inventoriesList)
                return (this.inventoriesList[this.inventoryReferences[inventoryId]]);
            return null;
        },
        xActivity(activityId) {
            if(activityId, this.activitiesList)
                return (this.activitiesList[this.activityReferences[activityId]]);
            return null;
        },
        xLandscape(landscapeId) {
            if(landscapeId, this.landscapesList)
                return (this.landscapesList[this.landscapeReferences[landscapeId]]);
            return null;
        },
        objFilter(object, prop, value) {
            if(object) {
                let result = object.filter(obj => {
                    return obj[prop] === value
                })
                return result;
            } else {
                return null
            }
        },
        clearMenuFilters() {
            this.$store.commit("updateUiItemSearch", '');
            this.$store.commit("updateUiItemTag", null);
            this.$store.commit("updateUiItemGearType", null);
            this.$store.commit("updateUiItemGearState", null);
            this.$store.commit("updateUiItemGearBrand", null);
            this.$store.commit("updateUiItemActivity", null);
            this.$store.commit("updateUiItemInventory", null);
            this.$store.commit("updateUiItemLandscape", null);
            this.$store.commit("updateUiItemWeather", null);
        },
        updateSnackbar(type, text, icon) {
            this.snackbarDisplay = true;
            this.snackbarType = type;
            this.snackbarText = text;
        },
        initIsItemRoute() {
            let route = this.$options.filters.removeSlashFilter(this.$router.currentRoute.path);
            this.isItemRoute = this.itemRoutes.includes(route);
        },
        stateIcon(title) {
            let icon = 'battery-off';

            switch(title) {
                case 'New':
                    icon =  'battery-high';
                    break;
                case 'Ok':
                    icon =  'battery-medium';
                    break;
                case 'Used':
                    icon =  'battery-low';
                    break;
                case 'Poor':
                    icon =  'battery-off-outline';
                    break;
                default:
                    return null;
            }

            return icon;
        },
        sumInventoryProperty(inventoryGear, prop) {
            let self = this;
            let sum = 0;

            inventoryGear.forEach(function(gear) {
                let gearIndex = self.gearReferences[gear.gear_id];

                if(self.gearList[gearIndex]
                    && (typeof self.gearList[gearIndex][prop] === 'number')
                    && (self.gearList[gearIndex]['quantity_owned'] > 0)
                )
                    sum += (self.gearList[gearIndex][prop] * self.gearList[gearIndex]['quantity_owned']);
            });

            return sum;
        },
        sumInventoryPrice(inventoryGear) {
            return this.sumInventoryProperty(inventoryGear, 'price').toFixed(2);
        },
        sumInventoryWeight(inventoryGear) {
            return this.sumInventoryProperty(inventoryGear, 'weight').toFixed(0);
        },
        randomId(length = 16) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        },
        getRandomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getVuetifyColor(index) {
            let colorArray = (this.isDark ? this.vuetifyColors.dark : this.vuetifyColors.light);
            let randomNumber = index ? (index % colorArray.length) : Math.floor(Math.random() * colorArray.length);
            return colorArray[randomNumber];
        },
    },
    watch: {
        currentRoute() {
            this.initIsItemRoute();
        },
    },
    mounted() {
        this.isMounted = true;
    }
}
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
            authTimer: null,
            login: 'x.peronnaud@gmail.com',
            password: 'poppers78',
            accessToken: null,
            baseUrl: 'http://localhost:8080/selfio/',
            isTokenRefreshed: false
        },
        selfio: {
            user: {},
            preferences: {},
            relations: [],
            files: [],
            brands: [],
            brandReferences: {},
            landscapes: [],
            landscapeReferences: {},
            weatherReferences: {},
            gearStates: [],
            gearStateReferences: {},
            gearTypes: [],
            gearTypeReferences: {},
            activities: [],
            activityReferences: {},
            gear: [],
            gearReferences: {},
            inventories: [],
            inventoryReferences: {},
            inventoryGear: {},
            inventoryAdventures: {},
            adventures: [],
        },
        ui: {
            formDialog: false,
            formDialogType: null,
            selectedItemRelations: {},
            selectedItem: null,
            selectedItemIndex: null,

            itemSearch: '',
            itemOwned: null,
            itemTag: null,
            itemGearType: null,
            itemGearState: null,
            itemGearBrand: null,
            itemActivity: null,
            itemLandscape: null,
            itemWeather: null,
            itemInventory: null,

            itemOrderBy: "title",
            itemOrderOption: "asc",

            snackbarDisplay: false,
            snackbarType: null,
            snackbarText: null,

            isAppLoading: false,
            isConfigurationReady: false,
            navigationCollapse: true,

            isItemRoute: false,

            navigationRoutes: [
                'gear',
                'inventories',
                'adventures',
                'account',
                'brands',
                'tags',
                'import_export',
                'settings',
                'info',
            ],
            navigationItems: {
                home: {
                    title: 'Home',
                    icon: 'mdi-home',
                    type: 'app',
                },
                gear: {
                    title: 'Gear',
                    icon: 'mdi-pickaxe',
                    color: 'blue',
                    type: 'items'
                },
                inventories: {
                    title: 'Inventories',
                    icon: 'mdi-package-variant',
                    color: 'purple',
                    type: 'items'
                },
                adventures: {
                    title: 'Adventures',
                    icon: 'mdi-image-filter-hdr',
                    color: 'teal',
                    type: 'items'
                },
                account: {
                    title: 'Account',
                    icon: 'mdi-account-circle',
                    type: 'account',
                },
                brands: {
                    title: 'Brands',
                    icon: 'mdi-label-multiple',
                    type: 'configuration',
                },
                tags: {
                    title: 'Tags',
                    icon: 'mdi-tag-multiple',
                    type: 'settings',
                },
                settings: {
                    title: 'Settings',
                    icon: 'mdi-cog',
                    type: 'settings',
                },
                import_export: {
                    title: 'Import / Export',
                    icon: 'mdi-swap-vertical-bold',
                    type: 'misc',
                },
                info: {
                    title: 'Info',
                    icon: 'mdi-chart-timeline-variant-shimmer',
                    type: 'undefined',
                },
            },

            tempInventoryGear: [],
            tempGearInventories: [],

            weathers: [
                'cloudy',
                'fog',
                'hail',
                'hazy',
                'lightning',
                'lightning-rainy',
                'partly-cloudy',
                'partly-rainy',
                'partly-snowy',
                'partly-snowy-rainy',
                'pouring',
                'rainy',
                'snowy',
                'snowy-heavy',
                'snowy-rainy',
                'sunny',
                'windy',
            ],
            colors: [
                'red',
                'pink',
                'purple',
                'deep-purple',
                'indigo',
                'blue',
                'cyan',
                'teal',
                'green',
                'light-green',
                'yellow',
                'orange',
                'deep-orange',
                'brown',
                'blue-grey',
            ],
        },
    },
    mutations: {
        // Api
        updateApiAuthTimer(state, authTimer) {
            state.api.authTimer = authTimer;
        },
        updateApiLogin(state, login) {
            state.api.login = login;
        },
        updateApiPassword(state, password) {
            state.api.password = password;
        },
        updateApiAccessToken(state, accessToken) {
            state.api.accessToken = accessToken;
        },
        updateApiIsTokenRefreshed(state, isTokenRefreshed) {
            state.api.isTokenRefreshed = isTokenRefreshed;
        },
        // Selfio
        updateRelations(state, relations) {
            while(state.selfio.relations.length > 0)state.selfio.relations.pop();
            for(const r of relations) state.selfio.relations.push(r);
        },
        updateFiles(state, files) {
            while(state.selfio.files.length > 0)state.selfio.files.pop();
            for(const f of files) state.selfio.files.push(f);
        },
        updateBrands(state, brands) {
            while(state.selfio.brands.length > 0)state.selfio.brands.pop();
            for(const b of brands) {
                state.selfio.brands.push(b);
                Object.assign(state.selfio.brandReferences, { [b.id] : (state.selfio.brands.length - 1) });
            }
        },
        addBrand(state, brand) {
            let len = state.selfio.brands.length;
            if (brand !== state.selfio.brands[len - 1]) {
                Vue.set(state.selfio.brands, len, brand);
                Object.assign(state.selfio.brandReferences, { [brand.id] : (len - 1) });
            }
        },
        removeBrand(state, brandIndex) {
            if (state.selfio.brands[brandIndex])
                state.selfio.brands.splice(brandIndex,1);
        },
        updateLandscapes(state, landscapes) {
            while(state.selfio.landscapes.length > 0)state.selfio.landscapes.pop();
            for(const b of landscapes) {
                state.selfio.landscapes.push(b);
                Object.assign(state.selfio.landscapeReferences, { [b.id] : (state.selfio.landscapes.length - 1) });
            }
        },
        updateGearStates(state, gearStates) {
            while(state.selfio.gearStates.length > 0) state.selfio.gearStates.pop();
            for(const gs of gearStates) {
                state.selfio.gearStates.push(gs);
                Object.assign(state.selfio.gearStateReferences, { [gs.id] : (state.selfio.gearStates.length - 1) });
            }
        },
        updateGearTypes(state, gearTypes) {
            while(state.selfio.gearTypes.length > 0) state.selfio.gearTypes.pop();
            for(const gt of gearTypes) {
                state.selfio.gearTypes.push(gt);
                Object.assign(state.selfio.gearTypeReferences, { [gt.id] : (state.selfio.gearTypes.length - 1) });
            }
        },
        updateUser(state, user) {
            Object.assign(state.selfio.user, user);
        },
        updatePreferences(state, preferences) {
            Object.assign(state.selfio.preferences, preferences);
        },
        updateGear(state, gear) {
            while(state.selfio.gear.length > 0) state.selfio.gear.pop();
            for(const g of gear) {
                state.selfio.gear.push(g);
                Object.assign(state.selfio.gearReferences, { [g.id] : (state.selfio.gear.length - 1) });
            }
        },
        addGear(state, gear) {
            let len = state.selfio.gear.length;
            if (gear !== state.selfio.gear[len - 1]) {
                Vue.set(state.selfio.gear, len, gear);
                Object.assign(state.selfio.gearReferences, { [gear.id] : (len - 1) });
            }
        },
        removeGear(state, gearIndex) {
            if (state.selfio.gear[gearIndex])
                state.selfio.gear.splice(gearIndex,1);
        },
        initInventoryGear(state, inventoryGear) {
            while(state.selfio.inventoryGear.length > 0) state.selfio.inventoryGear.pop();
            for(const g of inventoryGear) {
                state.selfio.inventoryGear.push(g.gear_id);
            }
        },
        updateInventoryGear(state, inventoryId, inventoryGear) {
            if(!state.selfio.inventoryGear[inventoryId])
                Object.assign(state.selfio.inventoryGear, { [inventoryId] : [] });

            while(state.selfio.inventoryGear[inventoryId].length > 0) state.selfio.inventoryGear[inventoryId].pop();
            for(const g of inventoryGear) {
                state.selfio.inventoryGear[inventoryId].push(g.gear_id);
            }
        },
        addInventoryGear(state, inventoryId, inventoryGear) {
            if(!state.selfio.inventoryGear[inventoryId])
                Object.assign(state.selfio.inventoryGear, { [inventoryId] : [] });

            let len = state.selfio.inventoryGear[inventoryId].length;
            if (inventoryGear !== state.selfio.inventoryGear[inventoryId]) {
                Vue.set(state.selfio.inventoryGear[inventoryId], len, inventoryGear);
            }
        },
        removeInventoryGear(state, inventoryId) {
            if(state.selfio.inventoryGear[inventoryId])
                delete state.selfio.inventoryGear[inventoryId];
        },
        resetInventoryGear(state, payload) {
            if(state.selfio.inventoryGear[payload.inventoryId])
                while(state.selfio.inventoryGear[payload.inventoryId].length > 0) state.selfio.inventoryGear[payload.inventoryId].pop();

            if(state.selfio.inventories[payload.inventoryIndex] && state.selfio.inventories[payload.inventoryIndex].inventory_gear)
                while(state.selfio.inventories[payload.inventoryIndex].inventory_gear.length > 0)
                    state.selfio.inventories[payload.inventoryIndex].inventory_gear.pop();
        },

        updateInventories(state, inventories) {
            while(state.selfio.inventories.length > 0)state.selfio.inventories.pop();

            for(const i of inventories) {
                state.selfio.inventories.push(i);
                if(state.selfio.inventoryReferences[i.id] && state.selfio.inventoryReferences[i.id].length > 0) {
                    console.log('inventory already exists');
                }
                Object.assign(state.selfio.inventoryReferences, { [i.id] : (state.selfio.inventories.length - 1) });

                if(!state.selfio.inventoryGear[i.id])
                    Object.assign(state.selfio.inventoryGear, { [i.id] : [] });

                while(state.selfio.inventoryGear[i.id].length > 0) state.selfio.inventoryGear[i.id].pop();
                for(const g of i.inventory_gear) {
                    state.selfio.inventoryGear[i.id].push(g.gear_id);
                }
            }
        },
        addInventory(state, inventory) {
            let len = state.selfio.inventories.length;

            if (inventory !== state.selfio.inventories[len - 1]) {
                if(!inventory.inventory_gear)
                    Object.assign(inventory, { 'inventory_gear' : [] });

                if(state.ui.tempInventoryGear && state.ui.tempInventoryGear.length > 0)
                    Object.assign(inventory.inventory_gear, state.ui.tempInventoryGear);

                Vue.set(state.selfio.inventories, len, inventory);

                if(state.selfio.inventoryReferences[inventory.id] && state.selfio.inventoryReferences[inventory.id].length > 0) {
                    console.log('inventory already exists');
                }
                Object.assign(state.selfio.inventoryReferences, { [inventory.id] : len });
            }
        },
        updateInventory(state, payload) {
            if(state.selfio.inventories[payload.inventoryIndex])
                Object.assign(state.selfio.inventories[payload.inventoryIndex], payload.inventory);
        },
        removeInventory(state, inventoryIndex) {
            if (state.selfio.inventories[inventoryIndex])
                state.selfio.inventories.splice(inventoryIndex,1);
        },
        addInventoryGearList(state, payload) {
            if(!state.selfio.inventories[payload.inventory_ref].inventory_gear)
                Object.assign(state.selfio.inventories[payload.inventory_ref], { 'inventory_gear' : [] });

            let len = state.selfio.inventories[payload.inventory_ref].inventory_gear.length;
            if (len === 0 || (payload.inventory_gear !== state.selfio.inventories[payload.inventory_ref].inventory_gear[len - 1])) {
                Vue.set(state.selfio.inventories[payload.inventory_ref].inventory_gear, len, payload.inventory_gear);
            }
        },
        updateActivities(state, activities) {
            while(state.selfio.activities.length > 0) state.selfio.activities.pop();
            for(const a of activities) {
                state.selfio.activities.push(a);
                Object.assign(state.selfio.activityReferences, { [a.id] : (state.selfio.activities.length - 1) });
            }
        },
        updateAdventures(state, adventures) {
            while(state.selfio.adventures.length > 0) state.selfio.adventures.pop();

            for(const a of adventures) {
                state.selfio.adventures.push(a);

                if(a.adventure_inventory) {
                    if(!state.selfio.inventoryAdventures[a.adventure_inventory])
                        Object.assign(state.selfio.inventoryAdventures, {[a.adventure_inventory] : []});

                    state.selfio.inventoryAdventures[a.adventure_inventory].push(a.id);
                }
            }
        },
        patchAdventure(state, payload) {
            Object.assign(state.selfio.adventures[payload.adventureIndex], payload.adventure);

            // removing old inventory-adventure references
            if(payload.oldAdventureInventory
                && state.selfio.inventoryAdventures[payload.oldAdventureInventory]
                && state.selfio.inventoryAdventures[payload.oldAdventureInventory].includes(payload.adventure.id)
            ) {
                let indexToRemove = state.selfio.inventoryAdventures[payload.oldAdventureInventory].indexOf(payload.adventure.id);

                if (typeof indexToRemove === 'number') {
                    state.selfio.inventoryAdventures[payload.oldAdventureInventory].splice(indexToRemove,1);

                    if(state.selfio.inventoryAdventures[payload.oldAdventureInventory].length <= 0)
                        delete state.selfio.inventoryAdventures[payload.oldAdventureInventory]
                }
            }

            // adding new inventory-adventure reference
            if(payload.adventure.adventure_inventory) {
                if(!state.selfio.inventoryAdventures[payload.adventure.adventure_inventory])
                    Object.assign(state.selfio.inventoryAdventures, {[payload.adventure.adventure_inventory] : []});

                state.selfio.inventoryAdventures[payload.adventure.adventure_inventory].push(payload.adventure.id);
            }
        },
        addAdventure(state, adventure) {
            let len = state.selfio.adventures.length;
            if (adventure !== state.selfio.adventures[len - 1]) {
                Vue.set(state.selfio.adventures, len, adventure);

                if(adventure.adventure_inventory) {
                    if(!state.selfio.inventoryAdventures[adventure.adventure_inventory])
                        Object.assign(state.selfio.inventoryAdventures, {[adventure.adventure_inventory] : []});

                    state.selfio.inventoryAdventures[adventure.adventure_inventory].push(adventure.id);
                }
            }
        },
        removeAdventure(state, adventureIndex) {
            if (state.selfio.adventures[adventureIndex]) {
                let adventureId = state.selfio.adventures[adventureIndex].id;
                let inventoryId = state.selfio.adventures[adventureIndex].adventure_inventory ? state.selfio.adventures[adventureIndex].adventure_inventory : null;

                state.selfio.adventures.splice(adventureIndex,1);

                if(inventoryId && state.selfio.inventoryAdventures[inventoryId]) {
                    let indexToRemove = state.selfio.inventoryAdventures[inventoryId].indexOf(adventureId);

                    if (typeof indexToRemove === 'number') {
                        state.selfio.inventoryAdventures[inventoryId].splice(indexToRemove, 1);

                        if(state.selfio.inventoryAdventures[inventoryId].length <= 0)
                            delete state.selfio.inventoryAdventures[inventoryId];
                    }
                }
            }
        },
        // Ui
        updateUiFormDialog(state, formDialog) {
            state.ui.formDialog = formDialog;
        },
        updateUiFormDialogType(state, formDialogType) {
            state.ui.formDialogType = formDialogType;
        },
        updateUiSelectedItemRelations(state, selectedItemRelations) {
            for (const key of Object.entries(state.ui.selectedItemRelations)) {
                delete state.ui.selectedItemRelations[key[0]];
            }

            Object.assign(state.ui.selectedItemRelations, selectedItemRelations);
        },
        updateUiSelectedItem(state, selectedItem) {
            state.ui.selectedItem = selectedItem;
        },
        updateUiSelectedItemIndex(state, selectedItemIndex) {
            state.ui.selectedItemIndex = selectedItemIndex;
        },
        updateUiItemSearch(state, itemSearch) {
            state.ui.itemSearch = itemSearch;
        },
        updateUiItemOwned(state, itemOwned) {
            state.ui.itemOwned = itemOwned;
        },
        updateUiItemGearType(state, itemGearType) {
            state.ui.itemGearType = itemGearType;
        },
        updateUiItemTag(state, itemTag) {
            state.ui.itemTag = itemTag;
        },
        updateUiItemGearState(state, itemGearState) {
            state.ui.itemGearState = itemGearState;
        },
        updateUiItemGearBrand(state, itemGearBrand) {
            state.ui.itemGearBrand = itemGearBrand;
        },
        updateUiItemActivity(state, itemActivity) {
            state.ui.itemActivity = itemActivity;
        },
        updateUiItemLandscape(state, itemLandscape) {
            state.ui.itemLandscape = itemLandscape;
        },
        updateUiItemWeather(state, itemWeather) {
            state.ui.itemWeather = itemWeather;
        },
        updateUiItemInventory(state, itemInventory) {
            state.ui.itemInventory = itemInventory;
        },
        updateUiItemOrderBy(state, itemOrderBy) {
            state.ui.itemOrderBy = itemOrderBy;
        },
        updateUiItemOrderOption(state, itemOrderOption) {
            state.ui.itemOrderOption = itemOrderOption;
        },
        updateUiSnackbarDisplay(state, snackbarDisplay) {
            state.ui.snackbarDisplay = snackbarDisplay;
        },
        updateUiSnackbarType(state, snackbarType) {
            state.ui.snackbarType = snackbarType;
        },
        updateUiSnackbarText(state, snackbarText) {
            state.ui.snackbarText = snackbarText;
        },
        updateUiIsAppLoading(state, isAppLoading) {
            state.ui.isAppLoading = isAppLoading;
        },
        updateUiIsConfigurationReady(state, isConfigurationReady) {
            state.ui.isConfigurationReady = isConfigurationReady;
        },
        updateUiNavigationCollapse(state, navigationCollapse) {
            state.ui.navigationCollapse = navigationCollapse;
        },
        updateUiIsItemRoute(state, isItemRoute) {
            state.ui.isItemRoute = isItemRoute;
        },
        updateUiTempGearInventories(state, tempGearInventories) {
            if (tempGearInventories) {
                while(state.ui.tempGearInventories.length > 0) state.ui.tempGearInventories.pop();

                for(const i of tempGearInventories)
                    state.ui.tempGearInventories.push(i.inventory_id);
            }
        },
        updateUiTempInventoryGear(state, tempInventoryGearItem) {
            if (tempInventoryGearItem)
                state.ui.tempInventoryGear.push({
                    id: tempInventoryGearItem.id,
                    gear_id: tempInventoryGearItem.gear_id,
                    inventory_id: tempInventoryGearItem.inventory_id,
                });
        },
        resetUiTempInventoryGear(state) {
            while(state.ui.tempInventoryGear.length > 0) state.ui.tempInventoryGear.pop();
        },
    }
})
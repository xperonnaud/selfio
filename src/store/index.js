import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        api: {
            baseUrl: 'https://servo-13475.nodechef.com/',
        },
        selfio: {
            user: {},
            preferences: {},
            brands: [],
            brandReferences: {},
            landscapes: [],
            landscapeReferences: {},
            gearCategoryReferences: {},
            activities: [],
            activityReferences: {},
            gear: [],
            gearReferences: {},
            inventories: [],
            inventoryReferences: {},
            inventoryGear: {},
            inventoryAdventures: {},
            adventures: [],
            adventureReferences: {},
        },
        ui: {
            isSessionExpired: false,
            formDialog: false,
            formDialogType: null,
            selectedItemRelations: {},
            selectedItem: null,
            selectedItemIndex: null,

            filters: {
                title: '',
                gear: {
                    tag: null,
                    quantityOwned: null,
                    brand: null,
                    state: null,
                    category: null,
                    consumable: null,
                },
                inventories: {
                    tag: null,
                },
                adventures: {
                    tag: null,
                    location: null,
                    activity: null,
                    landscape: null,
                    weather: null,
                    inventory: null,
                },
                brands: {
                    owned: null,
                },
            },

            itemOrderBy: "title",
            itemOrderOption: "asc",

            snackbarDisplay: false,
            snackbarType: null,
            snackbarText: null,

            isLoggedIn: false,
            isAppLoading: false,
            isConfigurationReady: false,
            displayApp: false,
            navigationCollapse: false,

            isItemRoute: false,

            tempInventoryGear: [],
            tempGearInventories: [],
        },
    },
    mutations: {
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
        patchGear(state, payload) {
            let gearIndex = payload.index;
            let gear = payload.data;
            Vue.set(state.selfio.gear, gearIndex, gear);
        },
        addGear(state, gear) {
            let len = state.selfio.gear.length;
            if (gear !== state.selfio.gear[len - 1]) {
                Vue.set(state.selfio.gear, len, gear);
                Object.assign(state.selfio.gearReferences, { [gear.id] : (len) });
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
        updateInventoryGear(state, inventoryIndex) {
            if(typeof inventoryIndex == 'number' && state.selfio.inventories[inventoryIndex] && state.selfio.inventories[inventoryIndex]['inventory_gear']) {
                while(state.selfio.inventories[inventoryIndex]['inventory_gear'].length > 0) state.selfio.inventories[inventoryIndex]['inventory_gear'].pop();
                Object.assign(state.selfio.inventories[inventoryIndex]['inventory_gear'], state.ui.tempInventoryGear);
            }
        },
        removeInventoryGear(state, inventoryId) {
            if(state.selfio.inventoryGear[inventoryId])
                delete state.selfio.inventoryGear[inventoryId];
        },

        updateInventories(state, inventories) {
            while(state.selfio.inventories.length > 0)state.selfio.inventories.pop();

            for(const i of inventories) {
                state.selfio.inventories.push(i);

                Object.assign(state.selfio.inventoryReferences, { [i.id] : (state.selfio.inventories.length - 1) });

                if(!state.selfio.inventoryGear[i.id])
                    Object.assign(state.selfio.inventoryGear, { [i.id] : [] });

                while(state.selfio.inventoryGear[i.id].length > 0) state.selfio.inventoryGear[i.id].pop();

                if(i.inventory_gear)
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

                // if(state.ui.tempInventoryGear && state.ui.tempInventoryGear.length > 0)
                //     Object.assign(inventory.inventory_gear, state.ui.tempInventoryGear);

                Vue.set(state.selfio.inventories, len, inventory);

                if(state.selfio.inventoryReferences[inventory.id] && state.selfio.inventoryReferences[inventory.id].length > 0)
                    console.log('inventory already exists');

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
                Object.assign(state.selfio.adventureReferences, { [a.id] : (state.selfio.adventures.length - 1) });

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
                Object.assign(state.selfio.adventureReferences, { [adventure.id] : len });

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
        updateUiIsSessionExpired(state, isSessionExpired) {
            state.ui.isSessionExpired = isSessionExpired;
        },
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
        updateTitleSearchFilter(state, title) {
            state.ui.filters.title = title;
        },
        updateBrandGearFilter(state, brand) {
            state.ui.filters.gear.brand = brand;
        },
        updateTagGearFilter(state, tag) {
            state.ui.filters.gear.tag = tag;
        },
        updateQuantityOwnedGearFilter(state, quantityOwned) {
            state.ui.filters.gear.quantityOwned = quantityOwned;
        },
        updateStateGearFilter(state, gearState) {
            state.ui.filters.gear.state = gearState;
        },
        updateCategoryGearFilter(state, gearCategory) {
            state.ui.filters.gear.category = gearCategory;
        },
        updateConsumableGearFilter(state, consumable) {
            state.ui.filters.gear.consumable = consumable;
        },
        updateTagInventoryFilter(state, tag) {
            state.ui.filters.inventories.tag = tag;
        },
        updateTagAdventureFilter(state, tag) {
            state.ui.filters.adventures.tag = tag;
        },
        updateLocationAdventureFilter(state, location) {
            state.ui.filters.adventures.location = location;
        },
        updateActivityAdventureFilter(state, activity) {
            state.ui.filters.adventures.activity = activity;
        },
        updateLandscapeAdventureFilter(state, landscape) {
            state.ui.filters.adventures.landscape = landscape;
        },
        updateWeatherAdventureFilter(state, weather) {
            state.ui.filters.adventures.weather = weather;
        },
        updateInventoryAdventureFilter(state, inventory) {
            state.ui.filters.adventures.inventory = inventory;
        },
        updateUiItemOwned(state, itemOwned) {
            state.ui.itemOwned = itemOwned;
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
        updateUiIsLoggedIn(state, isLoggedIn) {
            state.ui.isLoggedIn = isLoggedIn;
        },
        updateUiIsAppLoading(state, isAppLoading) {
            state.ui.isAppLoading = isAppLoading;
        },
        updateUiDisplayApp(state, displayApp) {
            state.ui.displayApp = displayApp;
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
        addTempInventoryGear(state, tempInventoryGear) {
            if (tempInventoryGear)
                if(tempInventoryGear.length) {
                    for(const i of tempInventoryGear) {
                        let len = state.ui.tempInventoryGear.length;
                        Vue.set(state.ui.tempInventoryGear, len, i);
                    }
                } else {
                    let len = state.ui.tempInventoryGear.length;
                    Vue.set(state.ui.tempInventoryGear, len, tempInventoryGear);
                }
        },
        resetTempInventoryGear(state) {
            while(state.ui.tempInventoryGear.length > 0) state.ui.tempInventoryGear.pop();
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

const axios = require('axios').default;
import DirectusSDK from '@directus/sdk-js';

class MemoryStore {
    constructor() {
        this.values = {};
    }
    getItem(key) {
        return this.values[key];
    }
    setItem(key, value) {
        return this.values[key] = value;
    }
}

const directus = new DirectusSDK('https://servo-13475.nodechef.com/', {
    auth: {
        storage: new MemoryStore(), // Storage adapter where refresh tokens are stored in JSON mode
        mode: 'json', // What login mode to use. One of `json`, `cookie`
    },
});

const gToKg = 0.001;
const gToOz = 0.035274;
const ozToLb = 0.0625;

const kmToMi = 0.621371;
const mToFt = 3.28084;

export default {
    computed: {
        apiAuthTimer() {
            return this.$store.state.api.authTimer;
        },
        apiAccessToken: {
            get() {
                return this.$store.state.api.accessToken;
            }
        },
        apiRefreshToken: {
            get() {
                return this.$store.state.api.refreshToken;
            }
        },
        apiLogin: {
            get() {
                return this.$store.state.api.login;
            }
        },
        apiPassword: {
            get() {
                return this.$store.state.api.password;
            }
        },
        apiBaseUrl: {
            get() {
                return this.$store.state.api.baseUrl;
            }
        },
        activitiesList: {
            get() {
                return this.$store.state.selfio.activities;
            }
        },
        brandsList: {
            get() {
                return this.$store.state.selfio.brands;
            }
        },
        landscapesList: {
            get() {
                return this.$store.state.selfio.landscapes;
            }
        },
        gearList: {
            get() {
                return this.$store.state.selfio.gear;
            }
        },
        typesList: {
            get() {
                return this.$store.state.selfio.gearCategories;
            }
        },
        inventoriesList: {
            get() {
                return this.$store.state.selfio.inventories;
            }
        },
        adventuresList: {
            get() {
                return this.$store.state.selfio.adventures;
            }
        },
        isTokenRefreshed: {
            get() {
                return this.$store.state.selfio.isTokenRefreshed
            },
            set(value) {
                this.$store.commit("updateApiIsTokenRefreshed", value)
            }
        },
    },
    methods: {
        async updatePassword() {
            alert('Updating PWD. [method implementation in progress...]');
        },
        async updatePreferences() {
            if(this.preferences) {
                this.isAppLoading = true;
                await this.api_patch_preferences(this.preferences);
                this.isAppLoading = false;
            }
        },
        async handleResponse(responseType, message, response, callback, ...args) {
            const ERROR_STR = 'Request failed with status code ';
            let hasError = (responseType === 'error');
            let errorCode = (hasError && message.includes(ERROR_STR)) ? message.replace(ERROR_STR,'') : null;

            if(hasError && (typeof errorCode == 'string') && callback) {
                console.log('handleResponse',response);

                if(errorCode === '403') {
                    await callback(...args);
                }
            }

            if(message)
                this.updateSnackbar(responseType, message);
        },
        async asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        },

        async api_login() {
            let self = this;
            directus.auth; // let the constructor run
            directus.auth.autoRefresh = true; // enable autoRefresh again

            await directus.auth.login({
                    email: self.apiLogin,
                    password: self.apiPassword
                }
            ).then(async function (response) {
                if(response && response.data) {
                    let data = response.data;
                    self.$store.commit('updateApiAccessToken',data.access_token);
                    self.$store.commit('updateApiRefreshToken',data.refresh_token);

                    await directus.auth.refresh();

                    let user = await directus.users.me.read();
                    self.$store.commit('updateUser',user.data);

                    await self.handleResponse('success');
                }
            }).catch(async function (error) {
                await self.handleResponse('error', 'Incorrect credentials', error);
            })
        },
        async api_get_user() {
            let self = this;

            await directus.users.me.read()
            .then(async function (response) {
                if(response && response.data) {
                    self.$store.commit('updateUser',response.data)

                    await self.handleResponse('success');
                }
            }).catch(async function (error) {
                await self.handleResponse('error', 'Incorrect Username/Password', error);
            })
        },
        async api_logout() {
            let self = this;

            this.$store.commit("updateUiIsAppLoading", true);

            await axios.post(
            self.apiBaseUrl+'auth/logout',
                {
                    refresh_token: self.apiRefreshToken
                }
            )
            .then(async function (response) {
                await self.handleResponse('success', 'Logged out', response.data);
                self.reset_api_data();
                self.reset_user_data();
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            });

            this.$store.commit("updateUiIsAppLoading", false);
        },
        async logout() {
            await this.api_logout();
        },
        async api_reset_password() {
            let self = this;

            this.$store.commit("updateUiIsAppLoading", true);

            await directus.auth.password.request(self.apiLogin)
            .then(async function (response) {
                await self.handleResponse('success', 'Reset Password', response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            });

            this.$store.commit("updateUiIsAppLoading", false);
        },
        async api_forgot_password(newPassword = 'abcde12345') {
            let self = this;

            this.$store.commit("updateUiIsAppLoading", true);

            // TODO :: pass in input password
            await directus.auth.password.reset(self.apiLogin, newPassword)
            .then(async function (response) {
                await self.handleResponse('success', 'Forgot Password', response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            });

            this.$store.commit("updateUiIsAppLoading", false);
        },

        reset_user_data() {
            this.$store.commit("updateApiPassword", null);
            this.$store.commit("updateApiAccessToken", null);
            this.$store.commit("updateApiRefreshToken", null);
            this.$store.commit("updateUser", null);
        },
        reset_api_data() {
            this.$store.commit("updateBrands",[]);
            this.$store.commit("updateLandscapes",[]);
            this.$store.commit("updateGearCategories",[]);
            this.$store.commit("updateGear",[]);
            this.$store.commit("updateInventories",[]);
            this.$store.commit("updateActivities",[]);
            this.$store.commit("updateAdventures",[]);
        },

        async postFeedback(feedback) {
            if(feedback) {
                this.isAppLoading = true;
                await this.api_post_feedback(feedback);
                this.isAppLoading = false;
            }
        },
        async api_post_feedback(feedback) {
            let self = this;

            await directus.items('feedbacks').create(feedback)
            .then(async function () {
                await self.handleResponse('success', 'Feedback sent. Thank You!');
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        async api_get_brands() {
            let self = this;
            await directus.items('brands').read()
            .then(function (response) {
                self.$store.commit("updateBrands",response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_post_brand(brand) {
            let self = this;

            await directus.items('brands').create(brand)
            .then(async function (response) {
                self.$store.commit("addBrand",response.data);
                await self.handleResponse('success', 'Brand added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_remove_brand(brandId, brandIndex) {
            let self = this;
            await directus.items('brands').delete(brandId)
            .then(async function () {
                self.$store.commit("removeBrand", brandIndex);
                await self.handleResponse('success', 'Brand deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        async api_get_landscapes() {
            let self = this;
            await directus.items('landscapes').read()
            .then(function (response) {
                self.$store.commit("updateLandscapes",response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_get_gear_categories() {
            let self = this;

            await directus.items('gear_categories').read()
            .then(function (response) {
                self.$store.commit("updateGearCategories",response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_get_activities() {
            let self = this;

            await directus.items('activities').read()
            .then(function (response) {
                self.$store.commit("updateActivities", response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        initPreferenceTagArray(itemTags, tagType) {
            if(itemTags && tagType) {
                let typedTags = (this.preferences[tagType+'_tags'] ? this.preferences[tagType+'_tags'] : []);
                let finalArray = itemTags.concat(typedTags);
                finalArray = [...new Set([...itemTags,...typedTags])];

                if(finalArray && finalArray.length > 0)
                    finalArray = finalArray.sort();

                return finalArray;
            }
            return [];
        },
        async api_get_preferences(userId) {
            let self = this;

            await directus.items('preferences').read({
                filter: {
                    user_created: {
                        _eq: userId,
                    },
                },
            })
            .then(async function (response) {
                if(response.data.length > 0) {
                    self.$store.commit("updatePreferences", response.data[0]);
                } else {
                    await self.api_init_preferences();
                }
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_init_preferences() {
            let self = this;
            let preferences = {
                distance_unit:"km",
                elevation_unit:"m",
                price_unit:"$",
                weight_unit:"g",
                temperature_unit:"&#8451;",
                date_format:"DD-MM-YY",
                theme:"light",
                gear_tags:[],
                inventory_tags:[],
                adventure_tags:[],
            };

            await directus.items('preferences').create(preferences)
            .then(function (response) {
                self.$store.commit("updatePreferences",response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_patch_preferences(preferences, noMessage) {
            let self = this;

            if(preferences.date_created)
                delete preferences.date_created;

            if(preferences.date_updated)
                delete preferences.date_updated;

            await directus.items('preferences').update(preferences.id, preferences)
            .then(async function (response) {
                Object.assign(self.$store.state.selfio.preferences, response.data);
                await self.handleResponse('success', (!noMessage ? 'Preferences updated' : null));

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_patch_preference_tag(tags = [], tagType) {
            let self = this;

            Object.assign(self.$store.state.selfio.preferences[tagType+'_tags'], tags);

            if(self.$store.state.selfio.preferences.date_created)
                delete self.$store.state.selfio.preferences.date_created;

            if(self.$store.state.selfio.preferences.date_updated)
                delete self.$store.state.selfio.preferences.date_updated;

            await directus.items('preferences').update(self.$store.state.selfio.preferences.id, self.$store.state.selfio.preferences)
            .then(async function (response) {
                Object.assign(self.$store.state.selfio.preferences, response.data);
                await self.handleResponse('success', 'Tags updated');
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        async api_get_gear() {
            let self = this;

            await directus.items('gear').read()
            .then(function (response) {
                self.$store.commit("updateGear",response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        fixGear(gear) {

            if(gear.date_created)
                delete gear.date_created;

            if(gear.date_updated)
                delete gear.date_updated;

            if(typeof gear.state == 'undefined')
                gear.state = null;

            if(!this.propExists(gear.price))
                gear.price = 0;

            if(!this.propExists(gear.tags))
                gear.tags = [];

            if(!this.propExists(gear.weight)) {
                gear.weight = 0;

            } else {
                if(this.weightUnit === 'oz')
                    gear.weight = (Math.round(gear.weight / gToOz * 10) / 10)
            }

            if(!this.propExists(gear.quantity_owned))
                gear.quantity_owned = 0;

            return gear;
        },
        async api_post_gear(gear) {
            let self = this;

            gear = this.fixGear(gear);

            await directus.items('gear').create(gear)
            .then(async function (response) {
                self.$store.commit("addGear",response.data);
                await self.handleResponse('success', 'Gear added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_patch_gear(gear, gearIndex) {
            let self = this;

            gear = this.fixGear(gear);

            await directus.items('gear').update(gear.id, gear)
            .then(async function (response) {
                self.$store.commit("patchGear", { index: gearIndex, data: response.data });
                await self.handleResponse('success', 'Gear updated');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_remove_gear(gearId, gearIndex) {
            let self = this;

            await directus.items('gear').delete(gearId)
            .then(async function () {
                self.$store.commit("removeGear", gearIndex);
                await self.handleResponse('success', 'Gear deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        fixInventory(inventory) {

            if(inventory.date_created)
                delete inventory.date_created;

            if(inventory.date_updated)
                delete inventory.date_updated;

            if(inventory.inventory_gear)
                delete inventory.inventory_gear;

            if(!this.propExists(inventory.tags))
                inventory.tags = [];

            return inventory;
        },
        async api_get_inventories() {
            let self = this;

            // await directus.items('inventories').read()
            await axios.get(
                self.apiBaseUrl
                +'items/inventories?access_token='
                +self.apiAccessToken
                +'&fields=*,inventory_gear.*'
                +'&sort=title',
            )
            .then(function (response) {
                self.$store.commit("updateInventories",response.data.data);

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_post_inventory(inventory, originalGearList, gearList, gearInventoryRelations) {
            let self = this;

            let inventoryGear = inventory.inventory_gear;
            inventory = this.fixInventory(inventory);

            await directus.items('inventories').create(inventory)
            .then(async function (response) {
                await self.updateGearList(
                    response.data.id,
                    self.inventoryReferences[response.data.id],
                    originalGearList,
                    gearList,
                    inventoryGear,
                    gearInventoryRelations
                )
                .then(function () {
                    self.$store.commit("addInventory", response.data);
                    self.$store.commit("updateInventoryGear", self.inventoryReferences[response.data.id]);
                    self.$store.commit("resetTempInventoryGear");
                });

                await self.handleResponse('success', 'Inventory added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            });
        },
        async api_patch_inventory(inventory, inventoryIndex, originalGearList, gearList, gearInventoryRelations) {
            let self = this;

            let inventoryGear = inventory.inventory_gear;
            inventory = this.fixInventory(inventory);

            await directus.items('inventories').update(inventory.id, inventory)
            .then(async function (response) {
                await self.updateGearList(
                    response.data.id,
                    inventoryIndex,
                    originalGearList,
                    gearList,
                    inventoryGear,
                    gearInventoryRelations
                )
                .then(function () {
                    let patched_inventory = {};
                    Object.assign(patched_inventory, response.data);
                    self.$store.commit("updateInventory",{ inventoryIndex: inventoryIndex, inventory: patched_inventory });
                    self.$store.commit("updateInventoryGear", self.inventoryReferences[response.data.id]);
                    self.$store.commit("resetTempInventoryGear");
                });

                await self.handleResponse('success', 'Inventory updated');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_remove_inventory(inventoryId, inventoryIndex, originalGearList, gearInventoryRelations) {
            let self = this;

            await directus.items('inventories').delete(inventoryId)
            .then(async function () {
                await self.updateGearList(
                    inventoryId,
                    inventoryIndex,
                    originalGearList,
                    [],
                    gearInventoryRelations
                )
                .then(function () {
                    self.$store.commit("removeInventoryGear",inventoryId);
                    self.$store.commit("resetUiTempInventoryGear");
                });

                self.$store.commit("removeInventory", inventoryIndex);
                await self.handleResponse('success', 'Inventory deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        async updateGearList(inventoryId, inventoryIndex, originalGearList, gearList, inventoryGear, gearInventoryRelations) {
            let self = this;

            let sameGear = inventoryGear.filter(x => originalGearList.includes(x.gear_id));
            let mappedSameGear = sameGear.filter(inv_gear => (inv_gear.id && typeof inv_gear.id == 'number'));

            let mappedAddedGear_1 = sameGear.filter(inv_gear => (!inv_gear.id || typeof inv_gear.id == 'undefined'));
            let addedGear = inventoryGear.filter(x => !originalGearList.includes(x.gear_id));
            let mappedAddedGear_2 = addedGear.map((inv_gear) => {
                if(!inv_gear.inventory_id || typeof inv_gear.inventory_id == 'undefined')
                    inv_gear['inventory_id'] = inventoryId;
                return inv_gear;
            });
            let mappedAddedGear = mappedAddedGear_1.concat(mappedAddedGear_2);

            let removedGear_1 = originalGearList.filter(x => !gearList.includes(x));
            let removedGear_2 = sameGear.filter(x => !mappedSameGear.includes(x)).map((inv_gear) => { return inv_gear.gear_id; });
            let removedGear = removedGear_1.concat(removedGear_2);
            let mappedRemovedGear = removedGear.map((gearId) => {
                return gearInventoryRelations[gearId];
            });

            if(mappedSameGear.length > 0)
                await self.api_update_inventory_gear(mappedSameGear);

            if(mappedAddedGear.length > 0)
                await self.api_create_inventory_gear(mappedAddedGear);

            if(mappedRemovedGear.length > 0)
                await self.api_delete_inventory_gear(mappedRemovedGear);
        },
        async api_get_gear_inventories(gearId) {
            let self = this;
            await directus.items('inventory_gear').read({
                filter: {
                    gear_id: {
                        _eq: gearId,
                    },
                },
                fields: ['inventory_id']
            })
            .then(function (response) {
                self.$store.commit("updateUiTempGearInventories",response.data);

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_create_inventory_gear(inventoryGear) {
            let self = this;

            await directus.items('inventory_gear').create(inventoryGear)
                .then(async function (response) {
                    self.$store.commit("addTempInventoryGear", response.data);

                }).catch(async function (error) {
                    await self.handleResponse('error', error.message, error);
                });
        },
        async api_update_inventory_gear(inventoryGear) {
            let self = this;

            await directus.items('inventory_gear').update(inventoryGear)
                .then(async function (response) {
                    self.$store.commit("addTempInventoryGear", response.data);

                }).catch(async function (error) {
                    await self.handleResponse('error', error.message, error);
                });
        },
        async api_delete_inventory_gear(inventoryGear) {
            let self = this;

            await directus.items('inventory_gear').delete(inventoryGear)
                .then(async function () {

                }).catch(async function (error) {
                    await self.handleResponse('error', error.message, error);
                });
        },

        async api_get_adventures() {
            let self = this;

            await directus.items('adventures').read()
            .then(function (response) {
                self.$store.commit("updateAdventures",response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        propExists(prop) {
            return (typeof prop != 'undefined')
        },
        fixAdventure(adventure) {

            if(adventure.date_created)
                delete adventure.date_created;

            if(adventure.date_updated)
                delete adventure.date_updated;

            if(adventure.tags === null || adventure.tags === '')
                adventure.tags = [];

            if(typeof adventure.adventure_inventory != 'number')
                adventure.packed_gear = [];

            if(!this.propExists(adventure.distance)) {
                adventure.distance = null;
            } else {
                adventure.distance = parseFloat(adventure.distance);

                if(this.distanceUnit === 'mi')
                    adventure.distance = Math.round(adventure.distance / kmToMi * 100) / 100;
            }

            if(!this.propExists(adventure.elevation)) {
                adventure.elevation = null;
            } else {
                adventure.elevation = parseFloat(adventure.elevation);

                if(this.elevationUnit === 'ft')
                    adventure.elevation = Math.round(adventure.elevation / mToFt * 100) / 100;
            }

            if(!this.propExists(adventure.temp_max)) {
                adventure.temp_max = null;
            } else {
                adventure.temp_max = parseInt(adventure.temp_max);

                if(this.temperatureUnit === '&#8457;') // fahrenheit
                    adventure.temp_max = (Math.round((adventure.temp_max - 32) * 5/9 * 100) / 100);
            }

            if(!this.propExists(adventure.temp_min)) {
                adventure.temp_min = null;
            } else {
                adventure.temp_min = parseInt(adventure.temp_min);

                if(this.temperatureUnit === '&#8457;') // fahrenheit
                    adventure.temp_min = (Math.round((adventure.temp_min - 32) * 5/9 * 100) / 100);
            }

            if(!this.propExists(adventure.humidity))
                adventure.humidity = 0;

            if(adventure.start_time && typeof adventure.start_time != 'undefined') {
                if(!adventure.start_time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) // hh:mm:ss
                    && adventure.start_time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) { // hh:mm
                    adventure.start_time += ':00';
                }
            }

            if(adventure.end_time && typeof adventure.end_time != 'undefined') {
                if(!adventure.end_time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) // hh:mm:ss
                    && adventure.end_time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) { // hh:mm
                    adventure.end_time += ':00';
                }
            }

            return adventure;
        },
        async api_post_adventure(adventure) {
            let self = this;

            adventure = this.fixAdventure(adventure);

            await directus.items('adventures').create(adventure)
            .then(async function (response) {
                self.$store.commit("addAdventure", response.data);
                await self.handleResponse('success', 'Adventure added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_patch_adventure(adventure, adventureIndex, oldAdventureInventory) {
            let self = this;

            adventure = this.fixAdventure(adventure);

            let payload = {
                adventure: adventure,
                adventureIndex: adventureIndex,
                oldAdventureInventory: oldAdventureInventory,
            };

            await directus.items('adventures').update(adventure.id, adventure)
            .then(async function () {
                self.$store.commit("patchAdventure", payload);
                await self.handleResponse('success', 'Adventure updated');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_patch_adventure, adventure, adventureIndex, oldAdventureInventory);
            })
        },
        async api_remove_adventure(adventureId, adventureIndex) {
            let self = this;

            await directus.items('adventures').delete(adventureId)
            .then(async function (response) {
                self.$store.commit("removeAdventure", adventureIndex);
                await self.handleResponse('success', 'Adventure deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
    },
}
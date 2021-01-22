
const axios = require('axios').default

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
        async postFeedback(feedback) {
            if(feedback) {
                this.isAppLoading = true;
                await this.api_post_feedback(feedback);
                this.isAppLoading = false;
            }
        },
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
        async api_auth_refresh(callback, ...args) {
            let self = this;
            await axios.post(
                self.apiBaseUrl+'auth/refresh',
                { token: self.apiAccessToken }
            )
            .then(async function (response) {
                self.$store.commit('updateApiAccessToken',response.data.data.token);
                await self.handleResponse('success');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_auth() {
            let self = this;
            await axios.post(
                self.apiBaseUrl+'auth/login',
                {
                    email: self.apiLogin,
                    password: self.apiPassword
                }
            ).then(async function (response) {
                if(response && response.data) {
                    let data = response.data.data;
                    self.$store.commit('updateUser',data.user);
                    self.$store.commit('updateApiAccessToken',data.access_token);
                    self.$store.commit('updateApiRefreshToken',data.refresh_token);
                    // await self.api_auth_refresh();
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
            })

            this.$store.commit("updateUiIsAppLoading", false);
        },
        async logout() {
            await this.api_logout();
        },
        async api_reset_password() {
            let self = this;

            this.$store.commit("updateUiIsAppLoading", true);

            await axios.post(
                self.apiBaseUrl+'auth/password/reset',
                {
                    email: self.apiLogin,
                }
            )
            .then(async function (response) {
                await self.handleResponse('success', 'Reset Password', response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })

            this.$store.commit("updateUiIsAppLoading", false);
        },
        async api_forgot_password() {
            let self = this;

            this.$store.commit("updateUiIsAppLoading", true);

            await axios.post(
                self.apiBaseUrl+'auth/password/request',
                {
                    email: self.apiLogin,
                }
            )
            .then(async function (response) {
                await self.handleResponse('success', 'Forgot Password', response.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })

            this.$store.commit("updateUiIsAppLoading", false);
        },
        reset_user_data() {
            this.$store.commit("updateApiPassword", null);
            this.$store.commit("updateApiAccessToken", null);
            this.$store.commit("updateApiRefreshToken", null);
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

        async api_post_feedback(feedback) {
            let self = this;

            await axios.post(
                self.apiBaseUrl
                +'items/feedbacks?access_token='
                +self.apiAccessToken,
                feedback
            )
                .then(async function () {
                    await self.handleResponse('success', 'Feedback sent. Thank You!');

                }).catch(async function (error) {
                    await self.handleResponse('error', error.message, error);
                })
        },

        async api_get_brands() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/brands?access_token='
                +self.apiAccessToken
                +'&fields=*'
                +'&sort=title',
            )
            .then(function (response) {
                self.$store.commit("updateBrands",response.data.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_post_brand(brand) {
            let self = this;

            await axios.post(
                self.apiBaseUrl
                +'items/brands?access_token='
                +self.apiAccessToken,
                brand
            )
            .then(async function (response) {
                self.$store.commit("addBrand",response.data.data);
                await self.handleResponse('success', 'Brand added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_remove_brand(brandId, brandIndex) {
            let self = this;
            await axios.delete(
                self.apiBaseUrl
                + 'items/brands/'
                + brandId
                + '?access_token='
                + self.apiAccessToken
            )
            .then(async function () {
                self.$store.commit("removeBrand", brandIndex);
                await self.handleResponse('success', 'Brand deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        async api_get_landscapes() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/landscapes?access_token='
                +self.apiAccessToken
                +'&fields=id,title,icon'
                +'&sort=title',
            )
            .then(function (response) {
                self.$store.commit("updateLandscapes",response.data.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_get_gear_categories() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/gear_categories?access_token='
                +self.apiAccessToken
                +'&fields=id,title,icon'
                +'&sort=id',
            )
            .then(function (response) {
                self.$store.commit("updateGearCategories",response.data.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_get_activities() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/activities?access_token='
                +self.apiAccessToken
                +'&fields=id,title,color,icon'
                +'&sort=title',
            )
            .then(function (response) {
                self.$store.commit("updateActivities",response.data.data);
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
        async api_get_preferences() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/preferences?access_token='
                +self.apiAccessToken
                +'&fields=*'
            )
            .then(async function (response) {
                if(response.data.data.length > 0) {
                    self.$store.commit("updatePreferences",response.data.data[0]);
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
            }

            await axios.post(
                self.apiBaseUrl
                +'items/preferences?access_token='
                +self.apiAccessToken,
                preferences
            )
            .then(function (response) {
                console.log('api_init_preferences',response.data.data)
                self.$store.commit("updatePreferences",response.data.data);
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

            await axios.patch(
                self.apiBaseUrl
                +'items/preferences/'
                +preferences.id
                +'?access_token='
                +self.apiAccessToken,
                preferences
            )
            .then(async function (response) {
                Object.assign(self.$store.state.selfio.preferences, response.data.data);
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

            await axios.patch(
                self.apiBaseUrl
                +'items/preferences/'
                +self.$store.state.selfio.preferences.id
                +'?access_token='
                +self.apiAccessToken,
                self.$store.state.selfio.preferences
            )
            .then(async function (response) {
                Object.assign(self.$store.state.selfio.preferences, response.data.data);
                await self.handleResponse('success', 'Tags updated');
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },

        async api_get_gear() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/gear?access_token='
                +self.apiAccessToken
                +'&fields=*'
                +'&sort=category,title',
            )
            .then(function (response) {
                self.$store.commit("updateGear",response.data.data);
            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        fixedGear(gear) {

            if(gear.date_created)
                delete gear.date_created;

            if(gear.date_updated)
                delete gear.date_updated;

            if(typeof gear.state == 'undefined')
                gear.state = null;

            if(gear.price === '')
                gear.price = null;

            if(gear.tags === null || gear.tags === '')
                gear.tags = [];

            if(!gear.weight || gear.weight === '') {
                gear.weight = null;

            } else {
                if(this.weightUnit === 'oz')
                    gear.weight = (Math.round(gear.weight / gToOz * 10) / 10)
            }

            if(gear.quantity_owned === '')
                gear.quantity_owned = null;

            return gear;
        },
        async api_post_gear(gear) {
            let self = this;

            gear = this.fixedGear(gear);

            await axios.post(
                self.apiBaseUrl
                +'items/gear?access_token='
                +self.apiAccessToken,
                gear
            )
            .then(async function (response) {
                self.$store.commit("addGear",response.data.data);
                await self.handleResponse('success', 'Gear added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_post_gear, gear);
            })
        },
        async api_patch_gear(gear, gearIndex) {
            let self = this;

            gear = this.fixedGear(gear);

            await axios.patch(
                self.apiBaseUrl
                +'items/gear/'
                +gear.id
                +'?access_token='
                +self.apiAccessToken,
                gear
            )
            .then(async function (response) {
                self.$store.commit("patchGear", { index: gearIndex, data: response.data.data });
                await self.handleResponse('success', 'Gear updated');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_patch_gear, gear, gearIndex);
            })
        },
        async api_remove_gear(gearId, gearIndex) {
            let self = this;
            await axios.delete(
                self.apiBaseUrl
                + 'items/gear/'
                + gearId
                + '?access_token='
                + self.apiAccessToken
            )
            .then(async function () {
                self.$store.commit("removeGear", gearIndex);
                await self.handleResponse('success', 'Gear deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_remove_gear, gearId, gearIndex);
            })
        },

        fixedInventory(inventory) {

            if(inventory.date_created)
                delete inventory.date_created;

            if(inventory.date_updated)
                delete inventory.date_updated;

            if(inventory.tags === null || inventory.tags === '')
                inventory.tags = [];

            if(inventory.inventory_gear)
                delete inventory.inventory_gear;

            return inventory;
        },
        async api_get_inventories() {
            let self = this;
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

            inventory = this.fixedInventory(inventory);

            await axios.post(
                self.apiBaseUrl
                +'items/inventories?access_token='
                +self.apiAccessToken,
                inventory
            )
            .then(async function (response) {
                await self.updateGearList(
                    response.data.data.id,
                    self.inventoryReferences[response.data.data.id],
                    originalGearList,
                    gearList,
                    gearInventoryRelations
                )
                .then(function () {
                    self.$store.commit("addInventory", response.data.data);
                    self.$store.commit("resetUiTempInventoryGear");
                });

                await self.handleResponse('success', 'Inventory added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_post_inventory, inventory, originalGearList, gearList, gearInventoryRelations);
            })
        },
        async api_patch_inventory(inventory, inventoryIndex, originalGearList, gearList, gearInventoryRelations) {
            let self = this;

            inventory = this.fixedInventory(inventory);

            await axios.patch(
                self.apiBaseUrl
                +'items/inventories/'
                +inventory.id
                +'?access_token='
                +self.apiAccessToken,
                inventory
            )
            .then(async function (response) {
                await self.updateGearList(
                    response.data.data.id,
                    inventoryIndex,
                    originalGearList,
                    gearList,
                    gearInventoryRelations
                )
                .then(function () {
                    let patched_inventory = {};
                    Object.assign(patched_inventory, response.data.data);

                    if(self.tempInventoryGear && self.tempInventoryGear.length > 0) {
                        if(!patched_inventory.inventory_gear)
                            Object.assign(patched_inventory, { 'inventory_gear' : [] });

                        self.tempInventoryGear.forEach(function(inventoryGearItem) {
                            patched_inventory.inventory_gear.push(inventoryGearItem)
                        })
                    }

                    self.$store.commit("updateInventory",{ inventoryIndex: inventoryIndex, inventory: patched_inventory });
                    self.$store.commit("resetUiTempInventoryGear");
                });

                await self.handleResponse('success', 'Inventory updated');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_patch_inventory, inventory, inventoryIndex, originalGearList, gearList, gearInventoryRelations);
            })
        },
        async api_remove_inventory(inventoryId, inventoryIndex, originalGearList, gearInventoryRelations) {
            let self = this;
            await axios.delete(
                self.apiBaseUrl
                + 'items/inventories/'
                + inventoryId
                + '?access_token='
                + self.apiAccessToken
            )
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
                await self.handleResponse('error', error.message, error, self.api_remove_inventory, inventoryId, inventoryIndex, originalGearList, gearInventoryRelations);
            })
        },

        async updateGearList(inventoryId, inventoryIndex, originalGearList, gearList, gearInventoryRelations) {
            let self = this;

            let sameGear = gearList.filter(x => originalGearList.includes(x));
            let addedGear = gearList.filter(x => !originalGearList.includes(x));
            let removedGear = originalGearList.filter(x => !gearList.includes(x));

            self.$store.commit("resetInventoryGear", {
                inventoryId: inventoryId,
                inventoryIndex: inventoryIndex
            });

            await this.asyncForEach(sameGear, async (gearId) => {
                let relationId = gearInventoryRelations[gearId];
                await self.api_keep_inventory_gear(inventoryId, gearId, relationId);
            })

            await this.asyncForEach(addedGear, async (gearId) => {
                await self.api_add_inventory_gear(inventoryId, gearId, inventoryIndex);
            })

            await this.asyncForEach(removedGear, async (gearId) => {
                let relationId = gearInventoryRelations[gearId];
                await self.api_remove_inventory_gear(relationId);
            })
        },
        async api_get_gear_inventories(gearId) {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/inventory_gear?access_token='
                +self.apiAccessToken
                +'&filter[gear_id][_eq]='+gearId
                +'&fields=inventory_id',
            )
            .then(function (response) {
                self.$store.commit("updateUiTempGearInventories",response.data.data);

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_get_inventory_gear(inventoryId) {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/inventory_gear?access_token='
                +self.apiAccessToken
                +'&filter[inventory_id][_eq]='+inventoryId
                +'&fields=gear_id',
            )
            .then(function (response) {
                self.$store.commit("initInventoryGear",response.data.data);

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        async api_keep_inventory_gear(inventoryId, gearId, relationId) {
            let inventory_gear = {
                inventory_id: inventoryId,
                gear_id: gearId,
                id: relationId
            };

            this.$store.commit("updateUiTempInventoryGear",inventory_gear);
            this.$store.commit("addInventoryGear", gearId);
        },
        async api_add_inventory_gear(inventoryId, gearId) {//, inventoryRef
            let self = this;
            await axios.post(
                self.apiBaseUrl
                +'items/inventory_gear?access_token='
                +self.apiAccessToken,
                {
                    inventory_id: inventoryId,
                    gear_id: gearId
                }
            )
            .then(function (response) {
                let inventory_gear = {
                    inventory_id: inventoryId,
                    gear_id: gearId,
                    id: response.data.data.id
                };
                self.$store.commit("updateUiTempInventoryGear",inventory_gear);

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_add_inventory_gear, inventoryId, gearId);
            })
        },
        async api_remove_inventory_gear(relationId) {
            let self = this;
            await axios.delete(
                self.apiBaseUrl
                +'items/inventory_gear/'
                + relationId
                +'?access_token='
                +self.apiAccessToken
            )
            .then(async function () {
                await self.handleResponse('success', 'Gear deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_remove_inventory_gear, relationId);
            })
        },
        async api_patch_inventory_gear(inventory_gear) {
            let self = this;
            await axios.patch(
                self.apiBaseUrl
                +'items/inventory_gear/'
                + inventory_gear.id
                +'?access_token='
                +self.apiAccessToken,
                inventory_gear
            )
            .then(async function () {
                self.updateSnackbar('success', 'Gear packed');
            }).catch(function (error) {
                console.log('ERROR api_patch_inventory_gear',error);
                self.updateSnackbar('error', error.message);
            })
        },

        async api_get_adventures() {
            let self = this;
            await axios.get(
                self.apiBaseUrl
                +'items/adventures?access_token='
                +self.apiAccessToken
                +'&fields=*'
                +'&sort=start_date,start_time,title',
            )
            .then(function (response) {
                self.$store.commit("updateAdventures",response.data.data);

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error);
            })
        },
        fixedAdventure(adventure) {

            if(adventure.date_created)
                delete adventure.date_created;

            if(adventure.date_updated)
                delete adventure.date_updated;

            if(adventure.tags === null || adventure.tags === '')
                adventure.tags = [];

            if(!adventure.distance || adventure.distance === '') {
                adventure.distance = null;
            } else {
                adventure.distance = parseFloat(adventure.distance);

                if(this.distanceUnit === 'mi')
                    adventure.distance = Math.round(adventure.distance / kmToMi * 100) / 100;
            }

            if(!adventure.elevation || adventure.elevation === '') {
                adventure.elevation = null;
            } else {
                adventure.elevation = parseFloat(adventure.elevation);

                if(this.elevationUnit === 'ft')
                    adventure.elevation = Math.round(adventure.elevation / mToFt * 100) / 100;
            }

            if(parseInt(adventure.temp_max) === 50 || adventure.temp_max === '') {
                adventure.temp_max = null;
            } else {
                adventure.temp_max = parseInt(adventure.temp_max);

                if(this.temperatureUnit === '&#8457;') // fahrenheit
                    adventure.temp_max = (Math.round((adventure.temp_max - 32) * 5/9 * 100) / 100);
            }

            if(parseInt(adventure.temp_min) === -50 || adventure.temp_min === '') {
                adventure.temp_min = null;
            } else {
                adventure.temp_min = parseInt(adventure.temp_min);

                if(this.temperatureUnit === '&#8457;') // fahrenheit
                    adventure.temp_min = (Math.round((adventure.temp_min - 32) * 5/9 * 100) / 100);
            }

            if(!adventure.humidity || adventure.humidity === '')
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

            adventure = this.fixedAdventure(adventure);

            await axios.post(
                self.apiBaseUrl
                +'items/adventures?access_token='
                +self.apiAccessToken,
                adventure
            ).then(async function (response) {
                self.$store.commit("addAdventure",response.data.data);
                await self.handleResponse('success', 'Adventure added');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_post_adventure, adventure);
            })
        },
        async api_patch_adventure(adventure, adventureIndex, oldAdventureInventory) {
            let self = this;

            adventure = this.fixedAdventure(adventure);

            let payload = {
                adventure: adventure,
                adventureIndex: adventureIndex,
                oldAdventureInventory: oldAdventureInventory,
            }

            await axios.patch(
                self.apiBaseUrl
                +'items/adventures/'
                +adventure.id
                +'?access_token='
                +self.apiAccessToken,
                adventure
            )
            .then(async function (response) {
                self.$store.commit("patchAdventure", payload);
                await self.handleResponse('success', 'Adventure updated');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_patch_adventure, adventure, adventureIndex, oldAdventureInventory);
            })
        },
        async api_remove_adventure(adventureId, adventureIndex) {
            let self = this;
            await axios.delete(
                self.apiBaseUrl
                + 'items/adventures/'
                + adventureId
                + '?access_token='
                + self.apiAccessToken
            )
            .then(async function (response) {
                self.$store.commit("removeAdventure", adventureIndex);
                await self.handleResponse('success', 'Adventure deleted');

            }).catch(async function (error) {
                await self.handleResponse('error', error.message, error, self.api_remove_adventure, adventureId, adventureIndex);
            })
        },
    },
}
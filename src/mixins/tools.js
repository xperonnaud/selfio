

export default {
    computed: {
        currentRouteName() {
            if(this.isStoreMounted && this.$route)
                return this.$route.name;
            return 'home';
        },
        currentRouteTitle() {
            if(this.isStoreMounted && this.$router)
                return this.xCap(this.currentRouteName);
        },
        currentRouteId() {
            if(!this.currentNavItem)
                return null;
            return this.currentNavItem['id'];
        },
        currentNavItem() {
            return this.navigationItems[this.currentRouteName]
        },
        currentTitle() {
            if(!this.currentNavItem)
                return null;
            return (this.currentNavItem.title);
        },
        currentIcon() {
            if(!this.currentNavItem)
                return null;
            return (this.currentNavItem.icon);
        },
        currentType() {
            if(!this.currentNavItem)
                return null;
            return (this.currentNavItem.type);
        },
        isItemRoute() {
            return (this.currentType === 'items');
        },
        isConfigurationRoute() {
            return (this.currentType === 'configuration');
        },
        isSettingsRoute() {
            return (this.currentType === 'settings');
        },
        xRules() {
            return {
                password: [
                    v => !!v || this.$t('rules.required'),
                ],
                text: [
                    v => !!v || this.$t('rules.required'),
                ],
                object: [
                    v => !!v || this.$t('rules.required'),
                ],
                message: [
                    v => !!v || this.$t('rules.required'),
                    v => (v.length <= 500) || this.$t('rules.message')
                ],
                required: [
                    v => !!v || this.$t('rules.required'),
                ],
                email: [
                    v => !!v || this.$t('rules.required'),
                    v => /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b$/
                        .test(v.toUpperCase()) || this.$t('rules.email')
                ],
                id: [
                    v => (v === null)
                        || /^([0-9]{1,5}])*$/.test(v)
                        || 'id syntax'
                ],
                temperature: [
                    v => (v === '')
                        || (v === null)
                        || /^(-?[0-9]+(\.[0-9][0-9]?)?)*$/.test(v)
                        || this.$t('rules.temperature')
                ],
                elevation: [
                    v => (v === '')
                        || (v === null)
                        || /^(-?[0-9]+(\.[0-9][0-9]?)?)*$/.test(v)
                        || this.$t('rules.elevation')
                ],
                integer: [
                    v => (v === '')
                        || (v === null)
                        || /^([0-9]+)*$/.test(v)
                        || this.$t('rules.integer')
                ],
                decimal: [
                    v => (v === '')
                        || (v === null)
                        || /^([0-9]+(\.[0-9][0-9]?)?)*$/.test(v)
                        || this.$t('rules.decimal')
                ],
                date: [
                    v => (v === '')
                        || (v === null)
                        || /^(\d{4})-(\d{2})-(\d{2})$/.test(v)
                        || this.$t('rules.date')
                ],
                time: [
                    v => (v === '')
                        || (v === null)
                        || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
                        || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(v)
                        || this.$t('rules.time')
                ],
                select: [
                    v => !!v || v === 'na' || v === 'unknown' || 'select required'
                ],
                null: [
                    v => (typeof v != 'undefined') || 'empty required'
                ],
                boolean: [
                    v => !!v || v === 'unknown' || this.$t('rules.required'),
                    v => (v === true) || this.$t('rules.required'),
                    v => (typeof v === "boolean") || this.$t('rules.required'),
                ],
            }
        },
    },
    methods: {
        sumInventoryProperty(inventoryGear, prop) {
            let self = this;
            let sum = 0;

            inventoryGear.forEach(function(gear) {
                if(typeof gear.gear_quantity_packed == 'number' && gear.gear_quantity_packed > 0) {
                    if(prop === 'quantity_packed') {
                        sum += 1;
                    } else {
                        let gearIndex = self.gearReferences[gear.gear_id];

                        if(self.gearList[gearIndex] && (typeof self.gearList[gearIndex][prop] == 'number'))
                            sum += (self.gearList[gearIndex][prop] * gear.gear_quantity_packed);
                    }
                }
            });

            return sum;
        },
        sumInventoryPrice(inventoryGear) {
            return this.sumInventoryProperty(inventoryGear, 'price').toFixed(2);
        },
        sumInventoryWeight(inventoryGear) {
            return this.sumInventoryProperty(inventoryGear, 'weight');
        },
        sumInventoryQuantityPacked(inventoryGear) {
            return this.sumInventoryProperty(inventoryGear, 'quantity_packed');
        },
        randomId(length = 16) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        },
        objFilter(object, prop, value) {
            if(object) {
                let result = object.filter(obj => {
                    return obj[prop] === value
                });
                return result;
            } else {
                return null
            }
        },
        sortItems(by, option = "asc") {
            if (this.itemOrderBy == by) {
                if (this.itemOrderOption == "asc") {
                    this.itemOrderOption = "desc";
                } else if (this.itemOrderOption == "desc") {
                    this.itemOrderOption = "asc";
                }
            } else {
                this.itemOrderOption = option;
                this.itemOrderBy = by;
            }
        },
        copyVar(val) {
            return JSON.parse(JSON.stringify(val));
        },
        propExists(prop) {
            return (typeof prop != 'undefined')
        },
        async asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        },
        arrayUnique(array) {
            let a = array.concat();
            for(let i=0; i<a.length; ++i) {
                for(let j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        },
        freezeEvent(e) {
            // stop the immediate action of this event
            e.preventDefault();
            // prevent the event fro bubbling up
            e.stopPropagation();
        },
        copyStringToClipboard(str) {
            // Create new element
            let el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = str;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand('copy');
            // Remove temporary element
            document.body.removeChild(el);
        },
        reloadApp() {
            location.reload();
        },
        inArray(needle, haystack) {
            let length = haystack.length;
            for (let i = 0; i < length; i++) {
                if (haystack[i] === needle) return i;
            }
            return -1;
        },
    }
}
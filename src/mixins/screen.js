
import vuetifyColors from 'vuetify/lib/util/colors'

export default {
    data () {
        return {
            windowHeight: 500,
        }
    },
    computed: {
        currentWindowHeight() {
            return this.windowHeight;
        },
        imgSize() {
            return (this.isMobile ? 22 : 22);
        },
        xOverlayColor() {
            return ('grey '+(this.isDark ? 'darken-1' : 'lighten-1'));
        },
        xProgressColor() {
            return ('grey '+(this.isDark ? 'darken-3' : 'lighten-4'));
        },
        xTabsColor() {
            return ('grey '+(this.isDark ? 'darken-4' : 'lighten-5'));
        },
        xCardColor() {
            return (this.isDark ? 'grey darken-4' : 'white');
        },
        xBackgroundColor() {
            return (this.isDark ? 'black' : 'grey lighten-3');
        },
        xInputColor() {
            return (this.isDark ? '#141414' : '#E0E0E0');
        },
        fontShadeColor() {
            return (this.isDark ? 'white--text' : 'black--text');
        },
        reversedFontShadeColor() {
            return (this.isDark ? 'black--text' : 'white--text');
        },
        currentColorText() {
            return this.darkColorText(this.currentNavItem.color);
        },
        currentRawColor() {
            return this.currentNavItem.color;
        },
        currentColor() {
            return this.darkColor(this.currentRawColor);
        },
        currentNavItem() {
            return this.navigationItems[this.currentRouteName]
        },
        currentTitle() {
            return (this.currentNavItem.title);
        },
        currentIcon() {
            return (this.currentNavItem.icon);
        },
        currentType() {
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
        isDark() {
            return this.$vuetify.theme.dark;
        },
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
        maxDialogContentHeight() {
            return (this.currentWindowHeight < 660 ? this.currentWindowHeight : 660);
        },
        xRules() {
            return {
                phone: [
                    v => !!v || 'phone is required',
                    v => (v && v.length === 12) || 'phone length',
                ],
                niv: [
                    v => (v && v.length === 17) || 'niv length',
                ],
                card: [
                    v => !!v || v === 'unknown' || 'card required'
                ],
                password: [
                    v => !!v || 'password required',
                ],
                text: [
                    v => !!v || 'text required',
                ],
                comment: [
                    v => (v.length <= 500) || 'comment length'
                ],
                firstname: [
                    v => !!v || 'firstname required',
                    v => (v && v.length <= 25) || 'firstname length'
                ],
                lastname: [
                    v => !!v || 'lastname required',
                    v => (v && v.length <= 25) || 'lastname length'
                ],
                email: [
                    v => !!v || 'email required',
                    v => /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b$/
                        .test(v.toUpperCase()) || 'email syntax'
                ],
                id: [
                    v => (v === null)
                        || /^([0-9]{1,5}])*$/.test(v)
                        || 'id syntax'
                ],
                temperature: [
                    v => (v === '')
                        || (v === null)
                        || /^(-?[0-9]+)*$/.test(v)
                        || 'temperature only (-40, 40)'
                ],
                elevation: [
                    v => (v === '')
                        || (v === null)
                        || /^(-?[0-9]+)*$/.test(v)
                        || '-+ integers only'
                ],
                integer: [
                    v => (v === '')
                        || (v === null)
                        || /^([0-9]+)*$/.test(v)
                        || 'integers only'
                ],
                decimal: [
                    v => (v === '')
                        || (v === null)
                        || /^([0-9]+(\.[0-9][0-9]?)?)*$/.test(v)
                        || 'integers && decimals only'
                ],
                date: [
                    v => (v === '')
                        || (v === null)
                        || /^(\d{4})-(\d{2})-(\d{2})$/.test(v)
                        || 'date syntax'
                ],
                time: [
                    v => (v === '')
                        || (v === null)
                        || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
                        || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(v)
                        || 'time syntax'
                ],
                select: [
                    v => !!v || v === 'na' || v === 'unknown' || 'select required'
                ],
                null: [
                    v => (typeof v != 'undefined') || 'empty required'
                ],
                expansion: [
                    v => !!v || 'expansion required'
                ],
                postalCode: [
                    v => !!v || 'zipcode required',
                    v => /^(?!.*[dfioquDFIOQU])[a-vxyA-VXY][0-9][a-zA-Z] ?[0-9][a-zA-Z][0-9]$/.test(v) || 'zipcode.value',
                ],
                test: [
                    v => (v > 1) || 'test value'
                ],
                boolean: [
                    v => !!v || v === 'unknown' || 'boolean required',
                    v => (v === true) || 'boolean value',
                    v => (typeof v === "boolean") || 'boolean type',
                ],
            }
        },
    },
    methods: {
        nullOrZeroColorText(prop) {
            return ((!prop || prop===0) ? this.darkColorText('red') : '');
        },
        hexColor(colorStr) {
            const [nameFamily, nameModifier] = colorStr.split(' ')

            const [firstWord, secondWord] = nameFamily.split('-')
            let family = `${ firstWord }${ secondWord
                ? secondWord.charAt(0).toUpperCase() + secondWord.slice(1)
                : '' }`

            let modifier = nameModifier
                ? nameModifier.replace('-', '')
                : 'base'

            return vuetifyColors[family][modifier]
        },
        navItemColor(item) {
            if(item && this.navigationItems[item])
                return this.darkColor(this.navigationItems[item].color);

            return this.darkColor('primary');
        },
        navItemColorText(item) {
            return this.darkColorText(this.navigationItems[item].color);
        },
        activityColor(color = 'blue-grey') {
            return (this.isDark ? color+' lighten-1' : color+' darken-2');
        },
        reversedActivityColor(color = 'blue-grey') {
            return (this.isDark ? color+' darken-4' : color+' lighten-3');
        },
        getRandomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getVuetifyColor(categoryId) {
            return this.activityColor(this.vuetifyColors[this.gearTypeReferences[categoryId]]);
        },
        getReversedVuetifyColor(categoryId) {
            return this.reversedActivityColor(this.vuetifyColors[this.gearTypeReferences[categoryId]]);
        },
        darkColorText(color) {
            if(typeof color == 'undefined' || !color || color === 'black')
                return (this.isDark ? 'white--text' : 'grey--text text--darken-4');
            return (this.isDark ? (color+'--text text--accent-2') : (color+'--text text--darken-1'))
        },
        darkColor(color) {
            if(typeof color == 'undefined' || !color || color === 'black')
                return (this.isDark ? 'white' : 'grey darken-4');
            return (this.isDark ? color+' accent-2' : color+' darken-1')
        },
        darkBackground(color) {
            if(typeof color == 'undefined' || !color || color === 'black')
                return (this.isDark ? 'black' : 'grey lighten-5');
            return (this.isDark ? color+' darken-4' : color+' lighten-5')
        },
        darkBackgroundText(color) {
            if(typeof color == 'undefined' || !color || color === 'black')
                return (this.isDark ? 'white' : 'grey darken-4');
            return (this.isDark ? (color+' accent-1') : (color+' darken-1'))
        },
        openPostFormDialog() {
            let self = this;
            this.isAppLoading = true;
            setTimeout(function(){
                self.formDialog = true;
                self.formDialogType = 'post';
            }, 50);
        },
        async toggleTheme(theme) {
            this.$vuetify.theme.dark = theme
                ? (theme === 'dark')
                : (this.$vuetify.theme.dark = !this.$vuetify.theme.dark);

            let preferences = this.preferences;
            preferences.theme = (this.$vuetify.theme.dark ? 'dark' : 'light');
            await this.api_patch_preferences(preferences, true);
        },
        convertMinutes(num){
            let d = Math.floor(num/1440); // 60*24
            let h = Math.floor((num-(d*1440))/60);
            let m = Math.round(num%60);

            return(
                (d !== 0 ? '<span class="text-tiny '+this.fontShadeColor+'">'+d+'</span>' : '')
                + (d !== 0 ? '<span class="text-tiny-dimmed">'+(this.isMobile ? 'd' : 'day'+(d > 1 ? 's' : ''))+'</span> ' : '')

                + (h !== 0 ? '<span class="text-tiny '+this.fontShadeColor+'">'+h+'</span>' : '')
                + (h !== 0 ? '<span class="text-tiny-dimmed">'+(this.isMobile ? 'h' : 'hr'+(h > 1 ? 's' : ''))+'</span> ' : '')

                + (m !== 0 ? '<span class="text-tiny '+this.fontShadeColor+'">'+m+'</span>' : '')
                + (m !== 0 ? '<span class="text-tiny-dimmed">'+(this.isMobile ? 'min' : 'min')+(m > 1 ? 's' : '')+'</span>' : '')
            );
        },
        initWindowHeight() {
            this.windowHeight = (window.innerHeight - 92);
        },
    }
}
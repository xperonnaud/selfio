
import CONSTANTS from '@/constants'
import vuetifyColors from 'vuetify/lib/util/colors'

export default {
    data () {
        return {
            window: {
                width: 0,
                height: 0
            },
            COLORS: [
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
                'red',
                'brown',
                'blue-grey',
            ],
        }
    },
    computed: {
        skeletonItemWidth() {
            return (this.isMobile ? 20 : 60);
        },
        xListHeight() {
            return (this.xListItemsHeight * this.xListMaxItems);
        },
        xListMaxItems() {
            return (this.isMobile ? 20 : 50);
        },
        xListItemsHeight() {
            return (this.isMobile ? 61 : 64);
        },
        vuetifyColors: {
            get() {
                return this.COLORS
            },
        },
        XSI() {
            return CONSTANTS.XSI;
        },
        SMI() {
            return CONSTANTS.SMI;
        },
        MDI() {
            return CONSTANTS.MDI;
        },
        LGI() {
            return CONSTANTS.LGI;
        },
        XLI() {
            return CONSTANTS.XLI;
        },
        XXLI() {
            return CONSTANTS.XXLI;
        },
        currentWindowHeight() {
            return (window.innerHeight - 92);
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
        xCheckerColor() {
            return (this.isDark ? 'grey lighten-4' : 'grey darken-2');
        },
        xCardColor() {
            return (this.isDark ? 'grey darken-4' : 'white');
        },
        xBackgroundStyleColorStr() {
            return 'background-color: #'+(this.isDark ? '000000' : 'EEEEEE');
        },
        xBackgroundColor() {
            return (this.isDark ? 'black' : 'grey lighten-3');
        },
        xInputColor() {
            return (this.isDark ? 'input' : '#E0E0E0');
        },
        errorColor() {
            return (this.isDark ? '#ff5252' : '#E53935');
        },
        shadeColor() {
            return (this.isDark ? 'white' : 'black');
        },
        reversedShadeColor() {
            return (this.isDark ? 'black' : 'white');
        },
        fontShadeColor() {
            return (this.shadeColor+'--text');
        },
        reversedFontShadeColor() {
            return (this.reversedShadeColor+'--text');
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
        isDark() {
            return this.$vuetify.theme.dark;
        },
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
        dialogTransition() {
            return (this.isMobile ? 'slide-x-transition' : 'fade-transition');
        },
        maxDialogWidth() {
            return (this.isMobile ? '300' : '450');
        },
        maxDialogContentHeight() {
            return this.currentWindowHeightOrValue(660)
        },
        dialogContentHeight() {
            return this.currentWindowHeightOrValue(500);
        },
    },
    methods: {
        isIOS() {
            return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
        },
        currentWindowHeightOrValue(value) {
            return (this.currentWindowHeight < value ? this.currentWindowHeight : value);
        },
        openItemDialog(item) {
            if(item) {
                this.isAppLoading = true;
                let self = this;

                let references = null;
                if(this.currentRouteName === 'gear') {
                    references = this.gearReferences;

                } else if(this.currentRouteName === 'inventories') {
                    references = this.inventoryReferences;

                } else if(this.currentRouteName === 'adventures') {
                    references = this.adventureReferences;
                }

                if(references) {
                    let itemIndex = references[item.id];

                    setTimeout(function(){
                        self.selectedItem = item;
                        self.selectedItemIndex = itemIndex;
                        self.formDialog = true;
                        self.formDialogType = 'update';
                    }, 50);
                } else {
                    self.formDialog = false;
                }
            }
        },
        stateIcon(title) {
            let icon = 'battery-off';

            switch(title) {
                case 'new':
                    icon =  'battery-high';
                    break;
                case 'ok':
                    icon =  'battery-medium';
                    break;
                case 'used':
                    icon =  'battery-low';
                    break;
                case 'poor':
                    icon =  'battery-off-outline';
                    break;
                default:
                    return null;
            }

            return icon;
        },
        dynamicWeightUnit(weight) {
            switch(this.weightUnit) {
                case 'g':
                    return (weight >= 1000 ? 'kg' : this.weightUnit);

                case 'oz':
                    return (((Math.round(weight * CONSTANTS.G_TO_OZ * 10) / 10) >= 96) ? 'lb' : this.weightUnit);

                default:
                    return this.weightUnit;
            }
        },
        weightUnitConverter(weight, sup = true) {
            if(!weight || !this.weightUnit)
                return null;
            return parseFloat(this.xFilters.weightUnitFilter(weight, this.weightUnit, sup));
        },
        distanceUnitConverter(distance) {
            if(!distance || !this.distanceUnit)
                return null;
            return parseFloat(this.xFilters.distanceUnitFilter(distance, this.distanceUnit));
        },
        elevationUnitConverter(elevation) {
            if(!elevation || !this.elevationUnit)
                return null;
            return parseFloat(this.xFilters.elevationUnitFilter(elevation, this.elevationUnit));
        },
        temperatureUnitConverter(temperature) {
            if(!temperature || !this.temperatureUnit)
                return null;
            return parseInt(this.xFilters.temperatureUnitFilter(temperature, this.temperatureUnit));
        },
        cardSize(size) {
            return (this.isMobile ? '100%' : (typeof size == 'number' ? size : 600));
        },
        nullOrZeroColorText(prop) {
            return ((!prop || prop===0) ? this.darkColorText('error') : '');
        },
        categoryColor(categoryId = 14) {
            return this.hexColor(this.getVuetifyColor(categoryId));
        },
        hexColor(colorStr) {
            const [nameFamily, nameModifier] = colorStr.split(' ');

            const [firstWord, secondWord] = nameFamily.split('-');
            let family = `${ firstWord }${ secondWord
                ? secondWord.charAt(0).toUpperCase() + secondWord.slice(1)
                : '' }`;

            let modifier = nameModifier
                ? nameModifier.replace('-', '')
                : 'base';

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
            return (this.isDark ? color+' darken-1' : color+' lighten-1');
        },
        reversedActivityColor(color = 'blue-grey') {
            return (this.isDark ? color+' darken-3' : color+' lighten-3');
        },
        getRandomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getVuetifyColor(categoryIndex) {
            return this.activityColor(this.vuetifyColors[categoryIndex]);
        },
        getReversedVuetifyColor(categoryIndex) {
            return this.reversedActivityColor(this.vuetifyColors[categoryIndex]);
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
                + (d !== 0 ? '<span class="text-tiny-dimmed">d</span> ' : '')

                + (h !== 0 ? '<span class="text-tiny '+this.fontShadeColor+'">'+(d === 0 && m > 29 ? h : h+1)+'</span>' : '')
                + (h !== 0 ? '<span class="text-tiny-dimmed">h</span> ' : '')

                + (d === 0 && m !== 0 ? '<span class="text-tiny '+this.fontShadeColor+'">'+m+'</span>' : '')
                + (d === 0 && m !== 0 ? '<span class="text-tiny-dimmed">m</span>' : '')
            );
        },
        handleScreenResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },
    created() {
        window.addEventListener('resize', this.handleScreenResize);
        this.handleScreenResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleScreenResize);
    },
}
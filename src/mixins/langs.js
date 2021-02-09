

export default {
    computed: {
        lang() {
            if (typeof this.$i18n != 'undefined')
                return this.$i18n.locale;
            return this.getNavigatorLanguage();
        },
    },
    methods: {
        getNavigatorLanguage() {
            let langs = window.navigator.language || window.navigator.userLanguage;
            let lang = '';

            if(Array.isArray(langs) && langs.length > 0)
                lang = langs[0];

            if(typeof langs === 'string')
                lang = langs;

            if(lang)
                lang = lang.slice(0, 2);

            return lang;
        },
        setLang(lang) {
            this.$i18n.locale = lang;
            document.documentElement.setAttribute('lang',lang);
        },
    },
}
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import minifyTheme from 'minify-css-string'
import LRU from "lru-cache";

Vue.use(Vuetify);

const themeCache = new LRU({
    max: 10,
    maxAge: 1000 * 60 * 60, // 1 hour
});

const vuetify = new Vuetify({
    breakpoint: { mobileBreakpoint: 900 },
    theme: {
        themes: {
            light: {
                primary: '#000000',
            },
            dark: {
                primary: '#FFFFFF',
            }
        },
        options: {
            minifyTheme,
            themeCache
        },
    }
});

export default vuetify
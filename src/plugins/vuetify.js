import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

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
        }
    }
});

export default vuetify
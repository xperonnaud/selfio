import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    breakpoint: { mobileBreakpoint: 700 },
    theme: {
        themes: {
            light: {
                primary: '#FF9800',
            },
            dark: {
                primary: '#FF9800',
            }
        }
    }
});

export default vuetify
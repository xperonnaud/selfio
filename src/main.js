
// ç é â/ê/î/ô/û à/è/ì/ò/ù ë/ï/ü É À È Ç

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueBlobJsonCsv from 'vue-blob-json-csv';
import VueI18n from 'vue-i18n';
import {mapState} from 'vuex';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

import GlobalCss from "@/assets/scss/global.scss"
import CssVariables from "@/assets/scss/variables.scss"

import ToolsMixin from './mixins/tools'
import LangsMixin from './mixins/langs'
import ApiMixin from './mixins/api'
import StoreMixin from './mixins/store'
import ScreenMixin from './mixins/screen'

import './filters'

// Vue extensions
Vue.use(Vuex);
Vue.use(VueBlobJsonCsv);
Vue.use(VueI18n);

//Config
Vue.config.productionTip = false;

// Vue Mixins
Vue.mixin(ToolsMixin);
Vue.mixin(LangsMixin);
Vue.mixin(ApiMixin);
Vue.mixin(StoreMixin);
Vue.mixin(ScreenMixin);

// VueVirtualScroller external library component registration
Vue.component('RecycleScroller', RecycleScroller);
Vue.component('DynamicScroller', DynamicScroller);
Vue.component('DynamicScrollerItem', DynamicScrollerItem);

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: { // translation files
    en: require('@/assets/langs/en.json'),
    fr: require('@/assets/langs/fr.json'),
  }
});

import store from './store';

new Vue({
  router,
  GlobalCss,
  CssVariables,
  vuetify,
  i18n,
  store,
  axios,
  VueAxios,
  computed: mapState([
    'api',
    'selfio',
    'ui'
  ]),
  render: h => h(App)
}).$mount('#app');

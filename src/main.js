import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import localforage from 'localforage';
import VueAxios from 'vue-axios';
import VueBlobJsonCsv from 'vue-blob-json-csv';
import VueI18n from 'vue-i18n';
import {mapState} from 'vuex';

import VueObserveVisibility from 'vue-observe-visibility'
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
Vue.use(VueObserveVisibility);

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
  localforage,
  VueAxios,
  computed: mapState([
    'api',
    'selfio',
    'ui'
  ]),
  created: async function () {
    // init isLoggedIn global prop
    localforage.getItem('is-logged-in')
        .then(function (value) {
          store.commit('updateUiIsLoggedIn', value);
        }).catch(function (err) {
      console.log('is-logged-in',err)
    });

    router.beforeEach((to, from, next) => {
      if (typeof to.path === 'string') {
        store.commit('updateLoadingRoute', to.name);
        store.commit('updateUiIsAppLoading', true);
        setTimeout(function(){
          next();
        }, 10);
      } else {
        next() // make sure to always call next()!
      }
    });

    router.afterEach((to, from) => {
      if (typeof to.path === 'string') {
        store.commit('updateLoadingRoute', null);
        store.commit('updateUiIsAppLoading', false);
      }
    });
  },
  render: h => h(App)
}).$mount('#app');

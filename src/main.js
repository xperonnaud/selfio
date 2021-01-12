import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueBlobJsonCsv from 'vue-blob-json-csv';

import ApiMixin from './mixins/api'
import StoreMixin from './mixins/store'
import ScreenMixin from './mixins/screen'

import './filters'

Vue.use(Vuex)
Vue.use(VueBlobJsonCsv)

Vue.config.productionTip = false

Vue.mixin(ApiMixin);
Vue.mixin(StoreMixin);
Vue.mixin(ScreenMixin);

import store from './store';

const moment = require('moment');

new Vue({
  router,
  vuetify,
  store,
  axios,
  // moment,
  VueAxios,
  render: h => h(App)
}).$mount('#app')

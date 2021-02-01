import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

import Gear from './views/Gear.vue';
import Inventories from './views/Inventories.vue';
import Adventures from './views/Adventures.vue';

import Account from './views/Account.vue';
import Tags from './views/Tags.vue';
import Brands from './views/Brands.vue';
import Settings from './views/Settings.vue';
import ImportExport from './views/ImportExport.vue';

import Feedback from './views/Feedback.vue';
import Info from './views/Info.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/gear',
      name: 'gear',
      component: Gear
    },
    {
      path: '/inventories',
      name: 'inventories',
      component: Inventories
    },
    {
      path: '/adventures',
      name: 'adventures',
      component: Adventures
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags
    },
    {
      path: '/brands',
      name: 'brands',
      component: Brands
    },
    {
      path: '/import-export',
      name: 'import_export',
      component: ImportExport
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
  ]
});

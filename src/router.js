
import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

const Overview = () => import('./views/Overview.vue');

const Gear = () => import('./views/Gear.vue');
const Inventories = () => import('./views/Inventories.vue');
const Adventures = () => import('./views/Adventures.vue');

const Account = () => import('./views/Account.vue');
const Tags = () => import('./views/Tags.vue');
const Brands = () => import('./views/Brands.vue');
const Settings = () => import('./views/Settings.vue');
const ImportExport = () => import('./views/ImportExport.vue');

const Feedback = () => import('./views/Feedback.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/overview',
      name: 'overview',
      component: Overview
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
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard
    // },
    // {
    //   path: '/info',
    //   name: 'info',
    //   component: Info
    // },
  ]
});

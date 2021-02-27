import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

// const Gear = () => import('./views/Gear.vue');
// const Inventories = () => import('./views/Inventories.vue');
// const Adventures = () => import('./views/Adventures.vue');
//
// const Account = () => import('./views/Account.vue');
// const Tags = () => import('./views/Tags.vue');
// const Brands = () => import('./views/Brands.vue');
// const Settings = () => import('./views/Settings.vue');
// const ImportExport = () => import('./views/ImportExport.vue');
//
// const Feedback = () => import('./views/Feedback.vue');
// const Info = () => import('./views/Info.vue');
// const Dashboard = () => import('./views/Dashboard.vue');
import Gear from "@/views/Gear";
import Inventories from "@/views/Inventories";
import Adventures from "@/views/Adventures";

import Account from "@/views/Account";
import Tags from "@/views/Tags";
import Brands from "@/views/Brands";
import Settings from "@/views/Settings";
import ImportExport from "@/views/ImportExport";

import Feedback from "@/views/Feedback";


Vue.use(Router);

export default new Router({
  routes: [
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

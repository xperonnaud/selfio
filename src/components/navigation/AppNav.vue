<template>

  <v-navigation-drawer
    v-model="navigationCollapse"
    :color="xTabsColor"
    class="elevation-2"
    floating
    app
    left

  >
    <template v-slot:prepend>
      <v-list-item one-line :to="'home'">
        <v-list-item-icon v-bind:class="[{'mr-7':!isMobile}]">
          <v-icon
            v-text="'mdi-cogs'"
            :color="darkColor('red')"
            :size="24"
          ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-h5" v-text="'Cosmic Gear'" />
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider v-if="apiAccessToken" />

    <v-list v-if="apiAccessToken" dense>
      <template v-for="item in navigationRoutes">
        <v-list-item
            v-if="(navigationItems[item].type === 'app') || (navigationItems[item].type === 'items')"
            :key="navigationItems[item].title"
            :to="{ name: item }"
            link
        >
          <v-list-item-icon>
            <v-icon v-text="navigationItems[item].icon" :color="darkColor(navigationItems[item].color)" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="navigationItems[item].title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-divider />

    <v-list v-if="apiAccessToken" dense>
      <template v-for="item in navigationRoutes">
        <v-list-item
            v-if="(navigationItems[item].type === 'settings') || (navigationItems[item].type === 'misc') || (navigationItems[item].type === 'account')"
            :key="navigationItems[item].title"
            :to="{ name: item }"
            link
        >
          <v-list-item-icon>
            <v-icon v-text="navigationItems[item].icon" :color="darkColor(navigationItems[item].color)" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="navigationItems[item].title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <template v-if="apiAccessToken" v-slot:append>
      <div v-bind:class="{'pa-2':!navigationCollapse}">
        <v-btn
          @click="logout()"
          :large="!isMobile"
          block
        >
          <span v-text="'Logout'" />

          <v-icon
            v-text="'mdi-logout'"
            :size="20"
          ></v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

</template>

<script>

  export default {
    name: 'app-nav',
    methods: {
      test() {
        alert('coucou');
      }
    }
  }

</script>

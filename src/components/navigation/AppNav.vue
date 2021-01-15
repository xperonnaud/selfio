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

    <v-divider />

    <v-list dense>
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

    <v-list dense>
      <template v-for="item in navigationRoutes">
        <v-list-item
            v-if="(navigationItems[item].type === 'settings')
              || (navigationItems[item].type === 'misc')
              || (navigationItems[item].type === 'configuration')
              || (navigationItems[item].type === 'account')"
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

    <v-list dense>
      <v-list-item link @click.stop="toggleTheme()">
        <v-list-item-icon>
          <v-icon v-text="'mdi-theme-light-dark'" color="black" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="'Theme'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list v-bind:class="{'pa-2':!navigationCollapse}" dense>
        <v-divider />
        <v-list-item
            @click.stop="logout()"
            link
        >
          <v-list-item-icon>
            <v-icon
              v-text="'mdi-logout'"
              :color="darkColor()"
            ></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'Logout'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>

</template>

<script>

  export default {
    name: 'app-nav',
    methods: {

    }
  }

</script>

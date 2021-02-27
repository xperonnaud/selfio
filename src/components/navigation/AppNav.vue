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
      <v-list-item one-line :to="'/home'">
        <v-list-item-icon v-bind:class="[{'mr-7':!isMobile}]">
          <v-icon
            v-text="'mdi-cogs'"
            :color="shadeColor"
            :size="LGI"
          ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <span v-text="$t('global.app-name')" class="text-h5 primary-gradient-color-text" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider v-bind:class="[(isMobile ? 'mb-1' : 'mb-2')]" />

    <template v-for="item in navigationRoutes">
      <v-list-item
        v-if="(navigationItems[item].type === 'app') || (navigationItems[item].type === 'items')"
        :key="navigationItems[item].title"
        :to="{ name: item }"
        link
        dense
        :active-class="darkColorText(navigationItems[item].color)"
      >
        <v-list-item-icon>
          <v-icon
            v-text="navigationItems[item].icon"
            :color="darkColor(navigationItems[item].color)"
          ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{$t(`global.${navigationItems[item].id}`) | capitalizeFilter}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider v-bind:class="[(isMobile ? 'my-1' : 'my-2')]" />

    <template v-for="item in navigationRoutes">
      <v-list-item
          v-if="(navigationItems[item].type === 'settings')
            || (navigationItems[item].type === 'misc')
            || (navigationItems[item].type === 'configuration')
            || (navigationItems[item].type === 'account')"
          :key="navigationItems[item].title"
          :to="{ name: item }"
          class="app-nav-list-item"
          link
          dense
      >
        <v-list-item-icon>
          <v-icon v-if="navigationItems[item].icon!=='mdi-database'" :size="LGI" v-text="navigationItems[item].icon+(currentRouteTitle!==navigationItems[item].title ? '' : '-outline')" />
          <v-icon v-else :size="LGI" v-text="'mdi-database'+(currentIcon==='mdi-database' ? '-outline' : '')" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <span>{{$t(`global.${navigationItems[item].id}`) | capitalizeFilter}}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-if="isMobile">
      <v-divider />

      <v-list-item
        v-bind:class="[(isMobile ? 'my-1' : 'my-2')]"
        @click.stop="api_logout()"
        link
        dense
      >
        <v-list-item-icon>
          <v-icon
            v-text="'mdi-logout'"
            :color="darkColor()"
          ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{$t(`global.logout`) | capitalizeFilter}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-else v-slot:append>
      <v-divider />

      <v-list-item
        v-bind:class="[(isMobile ? 'my-1' : 'my-2')]"
        @click.stop="api_logout()"
        link
        dense
      >
        <v-list-item-icon>
          <v-icon
            v-text="'mdi-logout'"
            :color="darkColor()"
          ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{$t(`global.logout`) | capitalizeFilter}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>

</template>

<script>

  export default {
    name: 'app-nav',
  }

</script>

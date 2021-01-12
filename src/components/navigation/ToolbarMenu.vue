<template>

  <div>
    <v-menu
        left
        bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn icon>
            EN
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn icon @click="toggleTheme()">
            <v-icon v-text="'mdi-theme-light-dark'" />
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

</template>

<script>

  export default {
    name: 'toolbar-menu',
  }

</script>

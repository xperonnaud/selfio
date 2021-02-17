<template>

  <v-card
    v-bind:class="['max-width']"
    :color="xCardColor"
  >
    <v-list class="py-0">
      <v-list-item
        v-on:click="$emit('xCardAction')"
        one-line
        v-ripple
      >
        <v-list-item-content class="no-wrap">
          <v-list-item-title>{{title | capitalizeFirstFilter}}</v-list-item-title>

          <v-list-item-subtitle>
            <slot />
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="d-flex no-wrap align-center justify-center">
          <v-btn
            v-bind:class="['elevation-0']"
            x-small
            fab
            depressed
          >
            <v-icon class="primary-gradient-color-text" :size="SMI" v-text="'mdi-pencil'" />
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>

  export default {
    name: 'x-action-card',
    props: {
      title: String,
    },
  }

</script>

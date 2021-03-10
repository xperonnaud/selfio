<template>

  <div class="max-width d-flex align-center justify-center">
    <v-avatar
      :size="48"
      :color="errorColor"
      class="dialog-avatar"
    >
      <v-icon
        :size="MDI"
        :color="xDimmedCheckerColor"
        v-text="'mdi-trash-can-outline'"
        style="margin-top: 22px;"
      ></v-icon>
    </v-avatar>
  </div>

</template>

<script>

  export default {
    name: 'x-delete-avatar'
  }

</script>

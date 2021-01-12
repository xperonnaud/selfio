<template>

  <v-main>
    <v-card height="100%" :color="apiAccessToken ? xBackgroundColor : 'transparent'">
      <login-form v-if="!apiAccessToken" />

      <router-view
        v-else
        v-show="!(formDialog && isMobile) && (isMobile ? !navigationCollapse : true)"
        v-bind:class="['router-view', {'is-dark':isDark}]"
      />

      <form-dialog
        v-if="apiAccessToken && formDialogType"
        :item="selectedItem"
        :itemIndex="selectedItemIndex"
      ></form-dialog>
    </v-card>
  </v-main>

</template>

<script>

  import LoginForm from "@/components/forms/LoginForm";

  export default {
    name: 'app-body',
    components: {
      LoginForm,
      FormDialog: () => import('@/components/forms/FormDialog')
    },
  }

</script>

<style lang="scss">

  .router-view {
    height: 100%;

    background-color: #EEEEEE !important;

    &.is-dark {
      background-color: black !important;
    }
  }

</style>

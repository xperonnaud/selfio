<template>

  <v-sheet
    class="d-flex justify-center align-center"
    height="100%"
    color="transparent"
  >
    <v-card dark flat max-width="369" class="login-card mx-2">
      <v-card-title>
        <span class="title font-weight-light" v-text="'Authentication'" />
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-container class="pa-0">
            <v-row>

              <v-col cols="12" class="py-0">
                <v-text-field
                  label="Login"
                  v-model="userLogin"
                  :rules="xRules.email"
                  filled
                  dense
                  required
                  @keyup.enter="login()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-text-field
                  label="Password"
                  v-model="userPassword"
                  :rules="xRules.password"
                  type="password"
                  filled
                  dense
                  required
                  @keyup.enter="login()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-btn
                  block
                  large
                  :class="['elevation-0', {'primary-gradient-color': !(!valid || isLoading)}]"
                  @click="login()"
                  @keyup.enter="login()"
                  :disabled="!valid || isLoading"
                  :loading="isLoading"
                >
                  <v-icon left v-text="'mdi-login'" />
                  <span
                    v-bind:class="[{'text-disabled': !valid}]"
                    v-text="'Login'"
                  ></span>
                </v-btn>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-btn
                  class="mt-2 mb-1 elevation-0"
                  @click="forgotPassword()"
                  :disabled="isLoading"
                  block
                  text
                  small
                >
                  <span
                    :class="['text-tiny-dimmed']"
                    v-text="'Forgot password ?'"
                  ></span>
                </v-btn>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-sheet>

</template>

<script>

  export default {
    name: 'login-form',
    data: () => ({
      valid: false,
      isLoading: false,
    }),
    computed: {
      userLogin: {
        get() {
          return this.$store.state.api.login
        },
        set(value) {
          this.$store.commit("updateApiLogin", value)
        }
      },
      userPassword: {
        get() {
          return this.$store.state.api.password
        },
        set(value) {
          this.$store.commit("updateApiPassword", value)
        }
      },
    },
    methods: {
      async login() {
        this.isLoading = true;
        // await this.api_auth();
        await this.api_login();
        this.isLoading = false;
      },
      async forgotPassword() {
        this.isLoading = true;
        await this.api_forgot_password();
        this.isLoading = false;
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

  .login-card {
    background-color: rgba(0,0,0,0.6) !important;
  }

</style>

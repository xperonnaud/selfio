<template>

  <v-sheet
    class="d-flex justify-center align-center"
    height="100%"
    color="transparent"
  >
    <v-card dark flat max-width="369" class="login-card mx-2">
      <v-card-title>
        <span v-text="'PackHub.io'" class="text-h5 primary-gradient-color-text" />
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-container class="pa-0">
            <v-row>

              <v-col cols="12" class="py-0">
                <v-text-field
                  :label="$t('global.email')"
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
                  :label="$t('routes.login.password')"
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
                <primary-btn
                  label="login"
                  v-on:btnAction="login()"
                  :valid.sync="valid"
                  :isLoading.sync="isLoading"
                  block
                  large
                ></primary-btn>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-btn
                  class="mt-1 elevation-0"
                  @click="forgotPassword()"
                  :disabled="isLoading"
                  block
                  text
                  small
                >
                  <span
                    style="font-size: 10px;"
                    class="text-tiny-dimmed"
                    v-text="$t('routes.login.forgot-password')"
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

  import PrimaryBtn from "@/components/elements/Btns/PrimaryBtn";

  export default {
    name: 'login-form',
    components: {
      PrimaryBtn
    },
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
        await this.api_login();

        if(this.$router.currentRoute.path !== '/home')
          this.$router.push('home');

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

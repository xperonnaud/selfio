<template>

  <div v-if="isMounted">
    <v-sheet
      max-width="100%"
      color="transparent"
    >
      <v-form v-model="valid">
        <v-container fluid v-bind:class="(isMobile ? 'px-4 py-3' : 'pa-8')">
          <v-row style="max-width: 600px">
            <v-col cols="12">
              <v-card
                v-bind:class="['shadow-bottom', (isMobile ? 'my-0' : 'mr-3')]"
                :width="isMobile ? '100%' : 400"
                :color="xCardColor"
              >
                <v-list>
                  <v-list-item two-line>
                    <v-list-item-avatar :color="xBackgroundColor">
                      <v-icon
                        :class="'primary-gradient-color-text'"
                        v-text="navigationItems['account'].icon"
                      ></v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="text-h6" v-text="userLogin" />
                      <v-list-item-subtitle v-text="'Login'" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Password"
                v-model="newPassword"
                :rules="xRules.password"
                :color="shadeColor"
                type="password"
                filled
                dense
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                  label="Password confirmation"
                  v-model="newPasswordConfirmation"
                  :rules="xRules.password"
                  :color="shadeColor"
                  type="password"
                  filled
                  dense
                  required
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-show="false">
              <v-text-field
                  label="Password"
                  v-model="newPassword"
                  :rules="xRules.password"
                  :color="darkColor('primary')"
                  type="password"
                  filled
                  dense
                  required
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-show="false">
              <v-text-field
                  v-show="false"
                  label="samePwd"
                  v-model="samePwd"
                  :rules="xRules.boolean"
                  type="password"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="max-width: 750px">
            <v-col cols="12">
              <v-btn
                v-bind:class="['elevation-0',{'max-width':isMobile}, reversedFontShadeColor]"
                :disabled="!valid"
                @click.stop="updatePassword()"
                class="primary-gradient-color"
              >
                <v-icon v-text="'mdi-check'"/>
                <span v-text="'Save'" />
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </div>

</template>

<script>

  // import PasswordUpdateForm from "@/components/forms/PasswordUpdateForm";

  export default {
    name: "account",
    components: {
      // PasswordUpdateForm,
    },
    data: () => ({
      isMounted: false,
      tab: 'password',
      valid: false,
      newPassword: '',
      newPasswordConfirmation: '',
    }),
    computed: {
      samePwd() {
        return (
            (this.newPassword === this.newPasswordConfirmation)
            && (this.newPassword !== '')
        )
      },
      userLogin: {
        get() {
          return this.$store.state.api.login
        },
        set(value) {
          this.$store.commit("updateApiLogin", value)
        }
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<template>

  <div v-if="isMounted">
    <v-sheet
      max-width="100%"
      color="transparent"
    >
      <v-form v-model="valid">
        <v-container fluid v-bind:class="(isMobile ? 'px-4 py-2' : 'px-8 py-6')">
          <v-row class="row-max-width">
            <v-col cols="12">
              <v-card
                v-bind:class="['shadow-bottom', (isMobile ? 'my-0' : 'mr-4')]"
                :width="cardSize(600)"
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

                    <v-list-item-content class="no-wrap">
                      <v-list-item-title class="text-h6" v-text="xCap(`${user.first_name} ${user.last_name}`)" />
                      <v-list-item-subtitle v-text="user.email" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :label="xCapFirst($t('routes.account.password-new'))"
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
                  :label="xCapFirst($t('routes.account.password-confirmation'))"
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

          <v-row class="row-max-width">
            <v-col cols="12">
              <primary-btn
                label="save"
                :block="isMobile"
                :valid.sync="valid"
                v-on:btnAction="updatePassword()"
              ></primary-btn>
            </v-col>
          </v-row>

<!--          <v-row class="row-max-width">-->
<!--            <v-col cols="12">-->
<!--              <v-btn-->
<!--                label="request password"-->
<!--                :block="isMobile"-->
<!--                :valid.sync="valid"-->
<!--                @click.stop="api_request_password()"-->
<!--              ></v-btn>-->
<!--            </v-col>-->
<!--          </v-row>-->
        </v-container>
      </v-form>
    </v-sheet>
  </div>

</template>

<script>

  import PrimaryBtn from "@/components/elements/Btns/PrimaryBtn";

  export default {
    name: "account",
    components: {
      PrimaryBtn,
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
          return this.$store.state.selfio.user.email
        },
      },
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

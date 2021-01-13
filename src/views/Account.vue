<template>

  <div v-if="isMounted">
    <v-sheet
      max-width="100%"
      color="transparent"
    >
      <v-container fluid v-bind:class="(isMobile ? 'pa-4' : 'pa-8')">
        <v-row style="max-width: 750px">
          <v-col cols="12">
            <v-sheet :color="xCardColor" class="pa-3">
              <div v-text="'Login'" class="text-caption" />
              <div v-text="userLogin" v-bind:class="darkColorText('primary')" />
            </v-sheet>
          </v-col>

          <v-col cols="12">
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

          <v-col cols="12">
            <v-text-field
                label="Password confirmation"
                v-model="newPasswordConfirmation"
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
                v-bind:class="['elevation-0',{'max-width':isMobile},reversedFontShadeColor]"
                :color="darkColor('primary')"
                :disabled="!valid"
                @click.stop="updatePassword()"
            >
              <v-icon v-text="'mdi-check'"/>
              <span v-text="'Save'" />
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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

<template>

  <v-form v-model="valid">
    <v-container v-bind:class="['py-0']">
      <v-row style="max-width: 900px;">

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
    </v-container>

    <v-container v-bind:class="['pb-0 pt-2']">
      <v-row>
        <v-col cols="12" class="py-1">
          <save-btn
            isOutlined
            forceText
            :disabled="!valid"
            :action="saveAction"
          ></save-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>

  import SaveBtn from "@/components/elements/Btns/SaveBtn";

  export default {
    name: 'password-update-form',
    components: {
      SaveBtn
    },
    data: () => ({
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

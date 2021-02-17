
<template>

  <div v-if="isMounted">
    <v-form v-model="valid">
      <v-sheet
        max-width="100%"
        color="transparent"
      >
        <v-container fluid v-bind:class="(isMobile ? 'pa-4' : 'pa-8')">
          <v-row class="row-max-width">
            <v-col cols="12">
              <v-card
                v-bind:class="['shadow-bottom', (isMobile ? 'my-0' : 'mr-3')]"
                :width="cardSize(600)"
                :color="xCardColor"
              >
                <v-list>
                  <v-list-item two-line>
                    <v-list-item-avatar :color="xBackgroundColor">
                      <v-icon
                        :class="'primary-gradient-color-text'"
                        v-text="navigationItems['feedback'].icon"
                      ></v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content class="no-wrap">
                      <v-list-item-title class="text-h6" v-text="$t(`routes.feedback.title`)" />
                      <v-list-item-subtitle v-text="$t(`routes.feedback.sub-title`)" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :label="xCap($t('global.object'))"
                v-model="feedback.object"
                :rules="xRules.object"
                :color="darkColor('primary')"
                hide-details="auto"
                filled
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                :label="xCap($t('global.message'))"
                v-model="feedback.message"
                :rules="xRules.message"
                :color="darkColor('primary')"
                hide-details="auto"
                filled
                dense
                required
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row class="row-max-width">
            <v-col cols="12">
              <primary-btn
                label="send"
                :block="isMobile"
                :valid.sync="valid"
                v-on:btnAction="postFeedback(feedback)"
              ></primary-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-form>
  </div>

</template>

<script>

  import PrimaryBtn from "@/components/elements/Btns/PrimaryBtn";

  export default {
    name: "feedback",
    components: {
      PrimaryBtn
    },
    data: () => ({
      isMounted: false,
      valid: false,

      feedback: { object: '', message: '' }
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

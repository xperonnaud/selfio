
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
                      <v-list-item-title class="text-h6" v-text="'Your feedback is very important to us!'" />
                      <v-list-item-subtitle v-text="'Please, tell us how we can improve this application for you.'" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Object"
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
              <v-select
                :items="feedbackCategories"
                :color="darkColor('primary')"
                hide-details="auto"
                label="Category"
                filled
                dense
                optional
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Message"
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
                label="Send"
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

      feedbackCategories: [
        'Interface Bug',
        'Functionalities Bug',
        'Interface Suggestion',
        'Functionalities Suggestion',
      ],

      feedback: { object: '', message: '' }
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>


<template>

  <div v-if="isMounted">
    <v-form v-model="valid">
      <v-sheet
        max-width="100%"
        color="transparent"
      >
        <v-container fluid v-bind:class="(isMobile ? 'pa-4' : 'pa-8')">
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
                        v-text="navigationItems['feedback'].icon"
                      ></v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="text-h6" v-text="'Please give us your feedback!'" />
                      <v-list-item-subtitle v-text="'Tell us about bugs, broken or needed features.'" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Object"
                v-model="feedback.object"
                :rules="xRules.text"
                :color="darkColor('primary')"
                hide-details="auto"
                filled
                dense
                required
              ></v-text-field>
          </v-col>

            <v-col cols="12">
              <v-textarea
                label="Message"
                v-model="feedback.message"
                :color="darkColor('primary')"
                hide-details="auto"
                filled
                dense
                required
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row style="max-width: 600px">
            <v-col cols="12">
              <v-btn
                v-bind:class="[
                  'elevation-0',
                  {'max-width':isMobile},
                  reversedFontShadeColor,
                  'primary-gradient-color'
                ]"
                :disabled="!valid"
                @click.stop="postFeedback(feedback)"
              >
                <span v-text="'Send'" />
                <v-icon small class="mx-1" v-text="'mdi-send'"/>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-form>
  </div>

</template>

<script>


  export default {
    name: "feedback",
    data: () => ({
      isMounted: false,
      valid: false,

      feedback: { object: null, message: null }
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

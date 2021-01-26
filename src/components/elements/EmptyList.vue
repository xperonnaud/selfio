<template>

  <v-row>
    <v-col cols="12">
      <div class="d-flex text-center align-center justify-center">
        <div class="pa-12">
          <div class="d-flex justify-center">
            <v-icon
              v-if="icon"
              :color="color"
              v-text="icon"
              size="30"
              class="mx-auto"
            ></v-icon>
          </div>

          <v-btn
            v-if="isLink && label"
            :color="color"
            class="my-3"
            outlined
            @click="openPostFormDialog()"
          >
            <span v-bind:class="['text-body-2',fontShadeColor]" v-text="label" />
          </v-btn>

          <div
            v-else-if="label"
            class="text-body-2"
            v-text="label"
          />
        </div>
      </div>
    </v-col>
  </v-row>

</template>

<script>

  export default {
    name: 'empty-list',
    props: {
      isLink: {
        type: Boolean,
        default: null
      },
      label: {
        type: String,
        default: null
      },
      icon: {
        type: String,
        default: null
      },
      color: {
        type: String,
        default: null
      },
    }
  }

</script>

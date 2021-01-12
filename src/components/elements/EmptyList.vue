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
                size="36"
                class="mx-auto"
            ></v-icon>
          </div>

          <div
            v-if="label"
            class="text-body-1"
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

<template>

  <v-list-item-content v-bind:class="[{'py-1':isMobile}]">

    <v-row align="center" justify="center">
      <v-col cols="12" class="py-0">
        <div>
          <v-list-item-title
            v-text="'Title'"
            v-bind:class="['mb-1',{'text-caption' : isMobile}]"
          ></v-list-item-title>
        </div>
      </v-col>
    </v-row>

  </v-list-item-content>

</template>

<script>

  export default {
    name: 'brand-list-header',
  }

</script>

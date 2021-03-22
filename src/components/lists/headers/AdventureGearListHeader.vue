<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 4" :class="['py-2 col-border-r',{'ml-3':!isMobile}]">
        <div class="d-flex align-center">
          <div class="text-tiny">{{$t('global.title') | capitalizeFirstFilter}}</div>
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
        <div class="d-flex justify-center align-center">
          <div class="text-tiny">{{$t('global.weight') | capitalizeFirstFilter}}</div>
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
        <div class="d-flex justify-center align-center">
          <div class="text-tiny">{{$t('global.price') | capitalizeFirstFilter}}</div>
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
        <div class="d-flex justify-center align-center">
          <div class="text-tiny">{{$t('global.state') | capitalizeFirstFilter}}</div>
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
        <div class="text-tiny text-center">{{$t('global.consumable') | minifyTextFilter | capitalizeFirstFilter}}</div>
      </v-col>

      <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'gear_worn')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny text-center', ((gearOrderBy === 'gear_worn') ? currentColorText : '')]">{{$t('global.worn') | capitalizeFirstFilter}}</div>
          <sort-icon prop="gear_worn" />
        </div>
      </v-col>

      <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'gear_quantity_packed')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny text-center', ((gearOrderBy === 'gear_quantity_packed') ? currentColorText : '')]">{{$t('global.qty') | capitalizeFirstFilter}}</div>
          <sort-icon prop="gear_quantity_packed" />
        </div>
      </v-col>
    </v-row>
  </v-list-item-content>

</template>

<script>

  import SortIcon from "@/components/elements/Icons/SortIcon";

  export default {
    name: 'adventure-gear-list-header',
    components: {
      SortIcon
    },
    props: {
      gearOrderBy: String,
    }
  }

</script>

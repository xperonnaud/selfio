<template>

  <v-list-item-content class="py-0">
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 3" class="py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'title')" v-ripple>
        <div class="d-flex align-center">
          <div v-bind:class="['text-tiny', ((gearOrderBy === 'title') ? currentColorText : '')]">{{$t('global.title') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="title" />
        </div>
      </v-col>

      <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'weight')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny', ((gearOrderBy === 'weight') ? currentColorText : '')]">{{$t('global.weight') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="weight" />
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'price')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny', ((gearOrderBy === 'price') ? currentColorText : '')]">{{$t('global.price') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="price" />
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'state')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny', ((gearOrderBy === 'state') ? currentColorText : '')]">{{$t('global.state') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="state" />
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'consumable')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny', ((gearOrderBy === 'consumable') ? currentColorText : '')]">{{$t('global.consumable') | minifyTextFilter | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="consumable" />
        </div>
      </v-col>

      <v-col v-if="!isMobile" class="x-col px-0 py-2 col-border-r">
        <div class="text-tiny text-center">{{$t('global.worn') | capitalizeFirstFilter}}</div>
      </v-col>

      <v-col class="x-col px-0 py-2 col-border-r x-primary-btn rounded" v-on:click="$emit('sortGear', 'quantity_owned')" v-ripple>
        <div class="d-flex justify-center align-center">
          <div v-bind:class="['text-tiny text-center', ((gearOrderBy === 'quantity_owned') ? currentColorText : '')]">{{$t('global.qty') | capitalizeFirstFilter}}</div>
          <x-sort-icon prop="state" />
        </div>
      </v-col>
    </v-row>
  </v-list-item-content>

</template>

<script>

  import XSortIcon from "@/components/elements/Icons/XSortIcon";

  export default {
    name: 'inventory-gear-list-header',
    components: {
      XSortIcon
    },
    props: {
      gearOrderBy: String,
    }
  }

</script>

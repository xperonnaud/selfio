<template>

  <v-col
    class="x-col py-2 col-border-r x-primary-btn rounded"
    @click.stop="sortItems(prop)"
    v-ripple
  >
    <div :class="['d-flex justify-center', {isMobile: 'flex-column'}]">
      <div v-bind:class="['text-tiny', ((itemOrderBy === prop) ? currentColorText : '')]">
        <span v-if="!mini">{{$t(`global.${text}`) | capitalizeFirstFilter}}</span>
        <span v-else>{{$t(`global.${text}`) | minifyTextFilter | capitalizeFirstFilter}}</span>
      </div>

      <sort-icon :prop="prop" />
    </div>
  </v-col>

</template>

<script>

  import SortIcon from "@/components/elements/Icons/SortIcon";

  export default {
    name: 'x-col',
    components: {
      SortIcon
    },
    props: {
      text: String,
      prop: String,
      mini: {
        type: Boolean,
        default: false
      },
    },
  }

</script>

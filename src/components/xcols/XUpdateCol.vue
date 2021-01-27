<template>

  <v-col class="x-col">
    <div v-if="item.date_updated || item.date_created">
      <span v-if="item.date_updated" class="text-caption">{{item.date_updated | minimalDateFilter(dateFormatPref)}}</span>
      <span v-else class="text-caption">{{item.date_created | minimalDateFilter(dateFormatPref)}}</span>
    </div>
    <empty-data solo v-else />
  </v-col>

</template>

<script>

  import EmptyData from "@/components/elements/EmptyData";

  export default {
    name: 'x-update-col',
    components: {
      EmptyData
    },
    props: {
      item: Object,
    }
  }

</script>

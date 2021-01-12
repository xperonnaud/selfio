<template>

  <div>
    <list-container
      v-show="isMobile"
      :icon="icon"
      :title="title"
      :items="items"
      :color="color"
      :itemHeaders="itemHeaders"
      :keyName="keyName"
    ></list-container>

    <table-container
      v-show="!isMobile"
      :icon="icon"
      :title="title"
      :color="color"
      :items="items"
      :itemHeaders="itemHeaders"
      :keyName="keyName"
    ></table-container>
  </div>

</template>

<script>

import ListContainer from "@/components/containers/ListContainer";
import TableContainer from "@/components/containers/TableContainer";

  export default {
    name: "data-container",
    components: {
      ListContainer,
      TableContainer
    },
    props: {
      title: String,
      color: String,
      icon: String,
      items: Array,
      itemHeaders: Array,
      keyName: String
    }
  }

</script>

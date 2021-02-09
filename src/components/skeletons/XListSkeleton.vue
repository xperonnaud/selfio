<template>

  <v-card
    v-bind:class="['x-list mx-auto elevation-0']"
    :color="xBackgroundColor"
  >
    <v-list
      v-bind:class="['rounded-0', (isMobile ? 'py-1' : 'py-2')]"
      one-line
      flat
    >
      <template v-for="index in maxListItems">
        <v-list-item :key="`x-list-skeleton-${randomId()}-${index}`" class="x-list-item pl-3">
          <v-list-item-content :class="[{'pl-1':currentRouteId === 'inventories'}]">
            <x-list-item-skeleton />
          </v-list-item-content>
        </v-list-item>

        <v-divider
          v-if="index < maxListItems - 1"
          :key="index"
        ></v-divider>
      </template>

    </v-list>
  </v-card>

</template>

<script>

  export default {
    name: "x-list-skeleton",
    components: {
      XListItemSkeleton: () => import('@/components/skeletons/XListItemSkeleton'),
    },
  }

</script>
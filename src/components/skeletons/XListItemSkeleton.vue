<template>

  <div class="x-list-item-skeleton">
    <component
      v-if="skeletonComponent"
      :key="`${currentRouteId}-list-item-skeleton`"
      :is="skeletonComponent"
      :ref="skeletonRef"
    ></component>
  </div>

</template>

<script>

  export default {
    name: "x-list-item-skeleton",
    data: () => ({
      isMounted: false,
      loading: true,

      skeletonRef: null,
      skeletonComponent: null,
      skeletonComponentCalled: null,
    }),

    computed: {
      loader() {
        let self = this;
        let skeletonId = this.xCap(this.currentRouteName);
        self.skeletonComponentCalled = `@/components/skeletons/${skeletonId}ListItemSkeleton.vue`;
        return () => import(`@/components/skeletons/${skeletonId}ListItemSkeleton.vue`)
      },
    },

    methods: {
      async componentLoad() {
        let self = this;

        if(this.isItemRoute || this.isConfigurationRoute)
          this.loader()
            .then(() => {
              self.skeletonComponent = () => self.loader();
            })
            .catch((e) => {
              console.log('componentLoad ERROR',e);
            })
      },
    },
    async mounted() {
      this.skeletonRef = this.randomId();
      await this.componentLoad();
      this.isMounted = true;
      this.loading = false;
    }
  }

</script>
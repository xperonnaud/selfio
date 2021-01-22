<template>

  <v-chip
    v-if="isMounted && activity"
    :color="activity.color"
    ripple
    label
  >
    <v-avatar v-if="hasIcon" class="x-avatar" left>
      <v-img :src="assetUrl+activity.icon" class="svg-image" />
    </v-avatar>

    <strong>{{activity.title}}</strong>
  </v-chip>

</template>

<script>

  export default {
    name: 'activity-chip',
    props: {
      activity: Object
    },
    data: () => ({
      isMounted: false,
      activityIcon: null,
    }),
    computed: {
      hasIcon() {
        return (
            this.activity.icon
            && this.activity.icon.data
        )
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }
</script>

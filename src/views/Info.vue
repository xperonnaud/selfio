
<template>

  <div v-if="isMounted">

    <div class="d-flex justify-center">
      <v-sheet
        class="timeline-sheet"
        :max-width="cardSize(1200)"
        color="transparent"
      >
        <v-timeline
          v-bind:class="[
            {'is-small':isMobile}
          ]"
          align-top
          :dense="isMobile"
        >
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="item.color"
            :icon="item.icon"
            fill-dot
          >
            <v-card>
              <v-card-title
                v-bind:class="[
                  'title',
                  item.color+'--text'
                ]"
                v-text="item.title"
              ></v-card-title>

              <v-card-text class="">
                <template v-for="text in item.texts">
                  <p
                    :key="`item-text-${text}`"
                    v-html="text"
                  ></p>
                </template>
              </v-card-text>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
              color="black"
              icon="mdi-image-filter-hdr"
              fill-dot
          >
            <v-card>
              <v-card-title v-bind:class="['title']">
                Enjoy !
              </v-card-title>
            </v-card>
          </v-timeline-item>
        </v-timeline>

      </v-sheet>
    </div>

  </div>

</template>

<script>


  export default {
    name: "info",
    data: () => ({
      isMounted: false,
      items: [
        {
          title: 'Add Gear',
          btns: {
            route: {
              name: 'inventories',
              text: 'Gear'
            },
            add: {
              text: 'Add'
            }
          },
          texts: [
            'Fill up your gear list as fully as you can. Fill in as many properties as you can for a precise return on its use.',
            'Update their state to see its evolution in time and replacement needs.',
            'Gear data is used to fuel your many upcoming adventures !'
          ],
          color: 'purple',
          icon: 'mdi-pickaxe',
        },
        {
          title: 'Create an Inventory',
          btns: {
            route: {
              name: 'inventories',
              text: 'Inventories'
            },
            add: {
              text: 'Create'
            }
          },
          texts: [
            'Setup various inventories for different activities and/or adventures. Improve them as you review them.',
            'Easily add and manage Gear and create a checklist to never forget an important item again for your Adventures.',
          ],
          color: 'blue',
          icon: 'mdi-package-variant',
        },
        {
          title: 'Plan an Adventure',
          btns: {
            route: {
              name: 'adventures',
              text: 'Adventures'
            },
            add: {
              text: 'Plan'
            }
          },
          texts: [
            'Planning to go on an adventure? Your gear is ready?.',
            'Plan an upcoming adventure or create a passed one to follow your personal improvement and gear follow up.',
          ],
          color: 'teal',
          icon: 'mdi-compass',
        },
      ],
    }),
    mounted() {
      this.isMounted = true;
    }
  }

</script>

<style lang="scss">

    .is-small .timeline-sheet {
      padding-right: 12px;
    }

    .v-application--is-ltr .is-small.v-timeline--dense:not(.v-timeline--reverse)::before {
      left: calc(48px - 16px) !important;
    }

</style>

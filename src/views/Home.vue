
<template>

  <v-sheet
    v-if="isMounted"
    v-bind:class="[(isMobile ? 'px-4 py-0' : 'px-8 py-6')]"
    height="100%"
    max-width="100%"
    color="transparent"
  >
    <v-row>
      <v-col cols="12">
        <div v-bind:class="['d-flex flex-wrap']">
          <template v-for="(item, index) in NAVIGATION_ROUTES">
            <v-card
              v-if="navigationItems[item].type === 'items'"
              :key="index"
              v-bind:class="['shadow-bottom', (isMobile ? 'my-2' : 'mb-4 mr-4')]"
              :width="cardSize(300)"
              :color="xCardColor"
            >
              <v-list>
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <v-icon
                      :color="darkBackgroundText(navigationItems[item].color)"
                      :class="[darkBackground(navigationItems[item].color)]"
                      v-text="navigationItems[item].icon"
                    ></v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      <span v-if="countersInitialized">{{countItems(navigationItems[item].title)}}</span>
                      <v-skeleton-loader v-else :width="72" :height="24" type="heading" />
                    </v-list-item-title>
                    <v-list-item-subtitle>{{$t(`global.${navigationItems[item].id}`) | capitalizeFilter}}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action v-if="navigationItems[item].id !== 'inventories'">
                    <v-list-item-action-text>
                      <template v-if="navigationItems[item].id === 'gear'">
                        <span v-if="countersInitialized" :class="['text-subtitle-2', fontShadeColor]">{{ totalWeight | weightUnitFilter(weightUnit) }}</span>
                        <v-skeleton-loader v-else :width="48" type="text" />
                        <span v-show="countersInitialized" class="ml-1 text-caption" v-text="dynamicWeightUnit(totalWeight)" :key="`weight-unit-${randomId()}-${totalWeight}`" />
                      </template>

                      <template v-else-if="navigationItems[item].id === 'adventures'">
                        <span v-if="countersInitialized" :class="['text-subtitle-2', fontShadeColor]">{{ totalDistance | distanceUnitFilter(distanceUnit) }}</span>
                        <v-skeleton-loader v-else :width="48" type="text" />
                        <span v-show="countersInitialized" class="ml-1 text-caption" v-text="distanceUnit" />
                      </template>
                    </v-list-item-action-text>

                    <v-list-item-action-text>
                      <template v-if="navigationItems[item].id === 'gear'">
                        <span v-if="countersInitialized" :class="['text-subtitle-2', fontShadeColor]" v-text="totalPrice" />
                        <v-skeleton-loader v-else :width="48" type="text" />
                        <span v-show="countersInitialized" class="ml-2 text-caption" v-text="priceUnit" />
                      </template>

                      <template v-else-if="navigationItems[item].id === 'adventures'">
                        <span v-if="countersInitialized" :class="['text-subtitle-2', fontShadeColor]">{{ totalElevation | elevationUnitFilter(elevationUnit) }}</span>
                        <v-skeleton-loader v-else :width="48" type="text" />
                        <span v-show="countersInitialized" class="ml-2 text-caption" v-text="elevationUnit" />
                      </template>
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-sheet>

</template>

<script>

  export default {
    name: "home",
    data: () => ({
      isMounted: false,
      countersInitialized: false,

      nbInventoryGear: 0,
      totalPrice: 0,
      totalWeight: 0,
      totalElevation: 0,
      totalDepth: 0,
      totalDistance: 0,
    }),
    methods: {
      async initGearTotals() {
        let totalPrice = 0;
        let totalWeight = 0;

        this.gearList.forEach(function(gear) {
          if(gear.quantity_owned && gear.quantity_owned > 0)
            totalPrice += (gear.price * gear.quantity_owned);

          if(gear.quantity_owned && gear.quantity_owned > 0)
            totalWeight += (gear.weight * gear.quantity_owned);
        });

        this.totalPrice = totalPrice.toFixed(2);
        this.totalWeight = totalWeight;
      },
      async initAdventureTotals() {
        let totalDistance = 0;
        let totalElevation = 0;
        let totalDepth = 0;

        this.adventuresList.forEach(function(adventure) {
          if(adventure.elevation > 0)
            totalElevation += parseInt(adventure.elevation);

          if(adventure.elevation < 0)
            totalDepth += parseInt(adventure.elevation);

          if(adventure.distance > 0)
            totalDistance += parseInt(adventure.distance);
        });

        this.totalElevation = totalElevation;
        this.totalDepth = totalDepth;
        this.totalDistance = totalDistance;
      },
      async initCounters() {
        let self = this;

        await self.initGearTotals();
        await self.initAdventureTotals();

        setTimeout(async function(){
          if(!self.countersInitialized)
            self.countersInitialized = true;
        }, 50);
      },
      countItems(title) {
        if(title === 'Gear')
          return this.gearList.length;

        if(title === 'Inventories')
          return this.inventoriesList.length;

        if(title === 'Adventures')
          return this.adventuresList.length;
      },
    },
    watch: {
      async isMounted(val) {
        let self = this;
        if(val === true && !this.isAppLoading)
          await self.initCounters();
      },
      async isAppLoading(val) {
        let self = this;
        if(val === false)
          await self.initCounters();
      }
    },
    mounted() {
      this.isMounted = true;
    }
  }

</script>

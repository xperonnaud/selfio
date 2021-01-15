
<template>

  <v-sheet
    v-if="isMounted"
    height="100%"
    max-width="100%"
    color="transparent"
    v-bind:class="[(isMobile ? 'pa-4' : 'pa-8')]"
  >
    <v-row>
      <v-col cols="12">
        <div v-bind:class="['d-flex flex-wrap']">
          <template v-for="(item, index) in navigationRoutes">
            <v-card
                v-if="navigationItems[item].type === 'items'"
                :key="index"
                v-bind:class="['shadow-bottom', (isMobile ? 'my-2' : 'mb-3 mr-3')]"
                :width="isMobile ? '100%' : 300"
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
                    <v-list-item-title class="text-h6" v-text="countItems(navigationItems[item].title)" />
                    <v-list-item-subtitle v-text="navigationItems[item].title" />
                  </v-list-item-content>

                  <v-list-item-action v-if="navigationItems[item].title !== 'Inventories'">
                    <v-list-item-action-text class="text-subtitle-2">
                      <template v-if="navigationItems[item].title === 'Gear'">
                        <span class="text-subtitle-2" v-text="totalPrice" />
                        <span class="ml-1 text-caption" v-text="priceUnit" />
                      </template>

                      <template v-if="navigationItems[item].title === 'Adventures'">
                        <span class="text-subtitle-2" v-text="totalDistance" />
                        <span class="ml-1 text-caption" v-text="distanceUnit" />
                      </template>
                    </v-list-item-action-text>

                    <v-list-item-action-text>
                      <template v-if="navigationItems[item].title === 'Gear'">
                        <span class="text-subtitle-2" v-text="totalWeight" />
                        <span class="ml-1 text-caption" v-text="weightUnit" />
                      </template>

                      <template v-if="navigationItems[item].title === 'Adventures'">
                        <span class="text-subtitle-2" v-text="totalElevation" />
                        <span class="ml-1 text-caption" v-text="elevationUnit" />
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

    <v-row>
      <v-col cols="12">
        <v-card
            v-if="!isMobile"
            v-bind:class="['shadow-bottom', (isMobile ? 'my-2' : 'mr-3')]"
            :width="isMobile ? '100%' : 300"
            :color="xCardColor"
        >
          Desktop Only Card
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>

</template>

<script>

  export default {
    name: "home",
    data: () => ({
      isMounted: false,
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

        this.totalPrice = totalPrice;
        this.totalWeight = totalWeight;
      },
      async initInventoryTotals() {
        let nbInventoryGear = 0;

        this.inventoriesList.forEach(function(inventory) {
          nbInventoryGear += inventory.inventory_gear.length;
        });

        this.nbInventoryGear = nbInventoryGear;
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
        await this.initGearTotals();
        await this.initInventoryTotals();
        await this.initAdventureTotals();
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

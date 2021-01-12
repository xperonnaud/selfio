
<template>

  <div v-if="isMounted">
    <v-sheet
      height="100%"
      max-width="100%"
      color="transparent"
    >
      <div v-bind:class="['d-flex flex-wrap', {'pa-6':!isMobile}]">
        <v-card
          v-bind:class="['home-item pa-3 mr-3 elevation-0', {'mb-1':isMobile}]"
          :width="isMobile ? '100%' : 200"
          :color="xCardColor"
        >
          Hello
        </v-card>
        <v-card
            v-bind:class="['home-item pa-3 mr-3 elevation-0', {'mb-1':isMobile}]"
            :width="isMobile ? '100%' : 200"
            :color="xCardColor"
        >
          Hello
        </v-card>
        <v-card
            v-bind:class="['home-item pa-3 mr-3 elevation-0', {'mb-1':isMobile}]"
            :width="isMobile ? '100%' : 200"
            :color="xCardColor"
        >
          Hello
        </v-card>
      </div>

      <v-container class="py-0">
<!--        <v-row>-->
<!--          <template v-for="(item, index) in navigationRoutes">-->
<!--            <v-col-->
<!--              v-if="(navigationItems[item].type === 'items')"-->
<!--              :key="index"-->
<!--              cols="6"-->
<!--              sm="6"-->
<!--              md="4"-->
<!--              lg="2"-->
<!--              xl="2"-->
<!--            >-->
<!--              <v-card :to="{ name: item }" v-ripple>-->
<!--                <v-list-item three-line>-->
<!--                  <v-list-item-content>-->

<!--                    <div class="text-button text-center mb-1">-->
<!--                      <div class="d-flex justify-center">-->
<!--                        <div class="text-body-1 pt-1 mr-1">-->
<!--                          <v-icon-->
<!--                            v-text="navigationItems[item].icon"-->
<!--                            :color="darkColor(navigationItems[item].color)"-->
<!--                            size="21"-->
<!--                            class="mr-auto"-->
<!--                          ></v-icon>-->
<!--                        </div>-->
<!--                        <div v-text="navigationItems[item].title" />-->
<!--                      </div>-->
<!--                      <div style="line-height:24px" v-text="countItems(navigationItems[item].title)" />-->
<!--                    </div>-->

<!--                    <v-divider />-->

<!--                    <v-list-item-title class="d-flex">-->
<!--                      <div v-if="navigationItems[item].title === 'Inventories'">-->
<!--                        <span v-bind:class="[darkColorText(navigationItems[item].color), 'text-caption']" v-text="nbInventoryGear" />-->
<!--                        <span class="text-caption" v-text="' listed gear'" />-->
<!--                      </div>-->

<!--                      <div v-if="navigationItems[item].title === 'Gear'">-->
<!--                        <span v-bind:class="[darkColorText(navigationItems[item].color), 'text-caption']">{{ totalPrice | thousandthFilter }}</span>-->
<!--                        <span class="text-caption" v-text="' k'+priceUnit" />-->
<!--                      </div>-->

<!--                      <v-spacer v-if="navigationItems[item].title === 'Gear'" />-->

<!--                      <div v-if="navigationItems[item].title === 'Gear'">-->
<!--                        <span v-bind:class="[darkColorText(navigationItems[item].color), 'text-caption']">{{ totalWeight | thousandthFilter }}</span>-->
<!--                        <span class="text-caption" v-text="' k'+weightUnit" />-->
<!--                      </div>-->

<!--                      <div v-if="navigationItems[item].title === 'Adventures'">-->
<!--                          <span v-bind:class="[darkColorText(navigationItems[item].color), 'text-caption']" v-text="totalDistance" />-->
<!--                          <span class="text-caption" v-text="' '+distanceUnit" />-->
<!--                      </div>-->

<!--                      <v-spacer v-if="navigationItems[item].title === 'Adventures'" />-->

<!--                      <div v-if="navigationItems[item].title === 'Adventures'">-->
<!--                          <span v-bind:class="[darkColorText(navigationItems[item].color), 'text-caption']">{{ totalElevation | thousandthFilter }}</span>-->
<!--                          <span class="text-caption" v-text="' k'+elevationUnit" />-->
<!--                      </div>-->

<!--                      <v-spacer v-if="navigationItems[item].title === 'Adventures'" />-->

<!--                      <div v-if="navigationItems[item].title === 'Adventures'">-->
<!--                          <span v-bind:class="[darkColorText(navigationItems[item].color), 'text-caption']" v-text="totalDepth" />-->
<!--                          <span class="text-caption" v-text="' '+elevationUnit" />-->
<!--                      </div>-->
<!--                    </v-list-item-title>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </v-card>-->
<!--            </v-col>-->
<!--          </template>-->
<!--        </v-row>-->
      </v-container>
    </v-sheet>
  </div>

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

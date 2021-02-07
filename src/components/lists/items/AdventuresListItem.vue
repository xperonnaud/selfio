<template>

  <v-list-item-content>
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 2" class="py-0">
        <v-list-item-title
          v-text="item.title"
          v-bind:class="[{'text-body-2' : isMobile}]"
        ></v-list-item-title>

        <v-list-item-subtitle
          v-if="isMobile"
          v-bind:class="[(item.start_date ? 'text-caption' : 'text-tiny-dimmed')]"
        >
          <span v-if="item.start_date">{{item.start_date | dayMonthFilter}}</span>
          <span v-else v-text="'.'" />
        </v-list-item-subtitle>

        <v-list-item-subtitle
          v-else
          v-bind:class="[(item.location ? 'text-caption' : 'text-tiny-dimmed')]"
          v-text="item.location ? item.location : '.'"
        ></v-list-item-subtitle>
      </v-col>

      <v-col class="py-0 px-1">
        <div class="d-flex justify-center">
          <v-tooltip v-if="item.adventure_inventory && (typeof packedGearRatio == 'number')" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-circular
                :key="`adventure-checklist-${item.id}`"
                :size="isMobile ? 35 : 37"
                :width="2"
                :rotate="-90"
                :value="packedGearRatio"
                :color="navItemColor('inventories')"
                v-bind="attrs"
                v-on="on"
              >
                <span v-show="packedGearRatio !== 100" class="text-caption">
                  <span v-bind:class="[fontShadeColor]">{{packedGearRatio | roundIntFilter}}</span>
                  <span class="text-tiny-dimmed" v-text="'%'" />
                </span>

                <v-icon
                  v-show="packedGearRatio === 100"
                  v-text="'mdi-check'"
                  :color="navItemColor('inventories')"
                  small
                ></v-icon>
              </v-progress-circular>
            </template>
            <span v-text="inventoryTitle+' '+$t('global.checklist')" />
          </v-tooltip>

          <empty-data solo v-else />
        </div>
      </v-col>

      <template v-if="!isMobile">
        <v-col class="py-0 px-1">
          <div class="d-flex justify-center">
            <div v-bind:class="['text-center max-width']">
              <v-tooltip v-if="item.landscape" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="list-icon-wrapper"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <x-img
                      :src="xLandscape(item.landscape).icon"
                      :width="35"
                      :height="35"
                      :tooltipText="xLandscape(item.landscape).title"
                      noMargin
                      logo
                    ></x-img>
                  </div>
                </template>
                <span v-text="xLandscape(item.landscape).title" />
              </v-tooltip>

              <empty-data solo v-else />
            </div>
          </div>
        </v-col>

        <v-col class="x-col">
          <div v-if="item.distance" v-bind:class="['ml-1 text-caption']">
            <span>{{ item.distance | distanceUnitFilter(distanceUnit) }}</span>
            <span class="text-tiny-dimmed" v-text="' '+distanceUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="item.elevation" v-bind:class="['ml-1 text-caption']">
            <span>{{ item.elevation | elevationUnitFilter(elevationUnit) }}</span>
            <span class="text-tiny-dimmed" v-text="' '+elevationUnit" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col py-0 px-1">
          <div class="d-flex justify-center">
            <div
              v-bind:class="[
                (isMobile ? 'mr-0' : 'mx-2'),
                'text-center max-width justify-center'
              ]"
            >
              <v-tooltip v-if="item.weather" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-sheet
                    :color="isDark ? 'black' : 'grey lighten-4'"
                    class="list-icon-wrapper"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      class="pa-2"
                      v-text="`mdi-weather-${item.weather}`"
                    ></v-icon>
                  </v-sheet>
                </template>
                <span>{{item.weather | noDashFilter}}</span>
              </v-tooltip>
              <empty-data v-else />
            </div>
          </div>
        </v-col>

        <v-col class="x-col py-0 px-1">
          <div class="d-flex justify-center">
            <div class="text-caption stacked-item-data text-center max-width">
              <div v-if="item.temp_max">
                <span>{{ item.temp_max | temperatureUnitFilter(temperatureUnit) }}</span>
                <span class="text-tiny-dimmed" v-html="' '+temperatureUnit" />
              </div>
              <empty-data v-else />

              <div v-if="item.temp_min">
                <span>{{ item.temp_min | temperatureUnitFilter(temperatureUnit) }}</span>
                <span class="text-tiny-dimmed" v-html="' '+temperatureUnit" />
              </div>
              <empty-data v-else />
            </div>
          </div>
        </v-col>

        <v-col class="x-col">
          <div v-if="item.humidity" v-bind:class="['ml-1 text-caption']">
            <span v-bind:class="['light-blue--text']" v-text="item.humidity" />
            <span class="text-tiny-dimmed" v-text="'%'" />
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="item.start_date">
            <span class="text-caption">{{item.start_date | minimalDateFilter(dateFormatPref)}}</span>
          </div>
          <empty-data solo v-else />
        </v-col>

        <v-col class="x-col">
          <div v-if="duration" v-bind:class="['ml-1 text-caption']">
            <span
              v-bind:class="[
                { 'text-tiny-dimmed text-center':!duration }
              ]"
              v-html="convertMinutes(duration)"
            />
          </div>
          <empty-data solo v-else />
        </v-col>

        <x-update-col :item="item" />
      </template>

      <v-col class="py-0 px-1">
        <div class="d-flex justify-start">
          <div
            v-bind:class="[
              (isMobile ? 'mr-0' : 'mx-2'),
              'text-center max-width'
            ]"
          >
            <v-sheet
              v-if="item.start_date"
              class="list-icon-wrapper"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="pa-2"
                    :size="MDI"
                    v-text="'mdi-'+dateStatusIcon(item.start_date)"
                    :color="dateStatusColor(item.start_date)"
                    v-bind="attrs"
                    v-on="on"
                  ></v-icon>
                </template>
                <span v-text="dateStatusText(item.start_date)" />
              </v-tooltip>
            </v-sheet>
            <empty-data v-else solo />
          </div>
        </div>
      </v-col>

      <v-col cols="1" class="pa-0">
        <div class="mx-3">
          <edit-icon v-bind:class="[{'mx-4' : !isMobile}]" :style="'padding: 9px 0'" />
        </div>
      </v-col>

    </v-row>
  </v-list-item-content>

</template>

<script>

  import moment from 'moment';

  import XUpdateCol from "@/components/xcols/XUpdateCol";
  import EmptyData from "@/components/elements/EmptyData";
  import EditIcon from "@/components/elements/Icons/EditIcon";
  import XImg from "@/components/elements/XImg";

  export default {
    name: 'adventures-list-item',
    components: {
      XUpdateCol,
      EmptyData,
      EditIcon,
      XImg
    },
    props: {
      item: Object,
    },
    data: () => ({
      isMounted: false,
      duration: null,

      inventory_gear: null
    }),
    computed: {
      packedGearRatio() {
        if(this.isMounted && this.inventory_gear && this.inventory_gear.length > 0)
          return (((this.item.packed_gear ? this.item.packed_gear.length : 0) / this.inventory_gear.length) * 100);
        return null;
      },
      inventoryTitle() {
        if(typeof this.item.adventure_inventory != 'number')
          return null;
        return this.xInventory(this.item.adventure_inventory).title;
      },
      adventureInventory() {
        return this.item.adventure_inventory;
      }
    },
    methods: {
      isDatePassed(startDate) {
        if(startDate)
         return moment().isAfter(startDate);
      },
      dateStatusText(startDate) {
        return (moment(startDate).format(this.dateFormatPref) === moment().format(this.dateFormatPref)
            ? 'today'
            : (this.isDatePassed(startDate) ? 'done' : 'planned'));
      },
      dateStatusColor(startDate) {
        return (moment(startDate).format(this.dateFormatPref) === moment().format(this.dateFormatPref)
            ? this.errorColor
            : (this.isDatePassed(startDate)
                ? this.darkColor('green')
                : this.darkColor('deep-orange')));
      },
      dateStatusIcon(startDate) {
        return (moment(startDate).format(this.dateFormatPref) === moment().format(this.dateFormatPref)
            ? 'clock-alert-outline'
            : (this.isDatePassed(startDate)
                ? 'clock-check-outline'
                : 'progress-clock'));
      },
      initInventoryGear() {
        if(this.item.adventure_inventory
            && this.xInventory(this.item.adventure_inventory)
            && this.xInventory(this.item.adventure_inventory).inventory_gear
        ) {
          this.inventory_gear = this.xInventory(this.item.adventure_inventory).inventory_gear;
        }
      },
      adventureDaySpan(item) {
        let startDatetime = null;
        let endDatetime = null;
        let unitOfTime = 'minute';

        if(item.start_date && item.end_date) {
          if(item.start_time && item.end_time) {
            startDatetime = moment(item.start_date + " " + item.start_time);
            endDatetime = moment(item.end_date + " " + item.end_time);

          } else {
            startDatetime = moment(item.start_date);
            endDatetime = moment(item.end_date);
            unitOfTime = 'day'
          }
        } else if(item.start_time && item.end_time) {
          startDatetime = moment(item.start_time);
          endDatetime = moment(item.end_time);
        }

        unitOfTime = unitOfTime > 1 ? unitOfTime+'s' : unitOfTime

        this.duration = (startDatetime && endDatetime) ? endDatetime.diff(startDatetime, unitOfTime) : 0;
      }
    },
    watch: {
      item: {
        handler: function(newVal) {
          this.adventureDaySpan(newVal);
        },
        deep: true
      },
      adventureInventory(val) {
        if(this.isMounted && val)
          this.initInventoryGear();
      }
    },
    mounted() {
      this.initInventoryGear();
      this.adventureDaySpan(this.item);

      this.isMounted = true;
    }
  }

</script>

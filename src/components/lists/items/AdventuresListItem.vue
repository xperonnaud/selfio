<template>

  <v-list-item-content>
    <v-row align="center" justify="center">

      <v-col :cols="isMobile ? 6 : 2" class="py-0">
        <v-list-item-title
          v-text="item.title"
          v-bind:class="[{'text-body-2' : isMobile}]"
        ></v-list-item-title>

        <v-list-item-subtitle>
          <span v-if="item.start_date" class="text-caption">
            <span>{{item.start_date | dayMonthFilter}}</span>
          </span>

          <span v-else v-text="'-'" class="text-tiny-dimmed" />
        </v-list-item-subtitle>
      </v-col>

      <v-col class="py-0 px-1">
        <div class="d-flex justify-center">
          <v-tooltip v-if="(typeof packedGearRatio == 'number')" bottom>
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
                <span class="text-caption">
                  <span v-bind:class="[fontShadeColor]">{{packedGearRatio | roundIntFilter}}</span>
                  <span class="text-tiny-dimmed" v-text="'%'" />
                </span>
              </v-progress-circular>
            </template>
            <span v-text="inventoryTitle+' checklist'" />
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
                    style="margin-top: 2px"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <x-img
                      :src="xLandscape(item.landscape).icon.data.full_url"
                      :width="isMobile ? 35 : 37"
                      :height="isMobile ? 35 : 37"
                      :tooltipText="xLandscape(item.landscape).title"
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

        <v-col class="py-0 px-1">
          <div class="d-flex justify-center">
            <div class="text-caption stacked-item-data  text-center max-width">
              <div v-if="item.elevation">
                <span v-text="item.elevation" />
                <span v-show="!isMobile" v-html="'&nbsp;'" />
                <span class="text-tiny-dimmed" v-text="elevationUnit" />
              </div>
              <empty-data v-else />

              <div v-if="item.distance">
                <span v-text="item.distance" />
                <span v-show="!isMobile" v-html="'&nbsp;'" />
                <span class="text-tiny-dimmed" v-html="distanceUnit" />
              </div>
              <empty-data v-else />
            </div>
          </div>
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
                <span v-text="item.temp_max" />
                <span v-html="'&nbsp;'" />
                <span class="text-tiny-dimmed" v-html="temperatureUnit" />
              </div>
              <empty-data v-else />
              <div v-if="item.temp_min">
                <span v-text="item.temp_min" />
                <span v-html="'&nbsp;'" />
                <span class="text-tiny-dimmed" v-html="temperatureUnit" />
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

        <v-col class="x-col">
          <div v-if="item.updated_on">
            <span class="text-caption">{{item.updated_on | minimalDateFilter(dateFormatPref)}}</span>
          </div>
          <empty-data solo v-else />
        </v-col>
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
                    :size="21"
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

  import EmptyData from "@/components/elements/Stepper/EmptyData";
  import EditIcon from "@/components/elements/EditIcon";
  import XImg from "@/components/elements/XImg";

  export default {
    name: 'adventures-list-item',
    components: {
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
      }
    },
    methods: {
      isDatePassed(startDate) {
        if(startDate)
         return moment().isAfter(startDate);
      },
      dateStatusText(startDate) {
        return (moment(startDate).format(this.dateFormatPref) === moment().format(this.dateFormatPref) ? 'today' : (this.isDatePassed(startDate) ? 'done' : 'planned'));
      },
      dateStatusColor(startDate) {
        return (moment(startDate).format(this.dateFormatPref) === moment().format(this.dateFormatPref) ? this.darkColor('red') : (this.isDatePassed(startDate) ? this.darkColor('green') : this.darkColor('deep-orange')));
      },
      dateStatusIcon(startDate) {
        return (moment(startDate).format(this.dateFormatPref) === moment().format(this.dateFormatPref) ? 'clock-alert-outline' : (this.isDatePassed(startDate) ? 'clock-check-outline' : 'progress-clock'));
      },
      initInventoryGear() {
        if(this.item.adventure_inventory) {
          this.inventory_gear = this.xInventory(this.item.adventure_inventory).inventory_gear;
        }
      },
      adventureDaySpan(item) {
        let startDatetime = null;
        let endDatetime = null;
        let unitOfTime = 'minutes';

        if(item.start_date && item.end_date) {
          if(item.start_time && item.end_time) {
            startDatetime = moment(item.start_date + " " + item.start_time);
            endDatetime = moment(item.end_date + " " + item.end_time);

          } else {
            startDatetime = moment(item.start_date);
            endDatetime = moment(item.end_date);
            unitOfTime = 'days'

          }
        } else if(item.start_time && item.end_time) {
          startDatetime = moment(item.start_time);
          endDatetime = moment(item.end_time);
        }

        this.duration = (startDatetime && endDatetime) ? endDatetime.diff(startDatetime, unitOfTime) : 0;
      }
    },
    watch: {
      item: {
        handler: function(newVal) {
          this.adventureDaySpan(newVal);
        },
        deep: true
      }
    },
    mounted() {
      this.initInventoryGear(this.item);
      this.adventureDaySpan(this.item);

      this.isMounted = true;
    }
  }

</script>

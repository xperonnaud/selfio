<template>

  <v-list-item
    @click="openItemDialog(source)"
    class="pl-3"
  >
    <v-list-item-avatar
      v-bind:class="[
        'x-avatar py-0 d-flex  justify-center',
         (isMobile ? 'my-0 mr-3' : 'ml-2 mr-5'),
      ]"
      :width="XXLI"
      :height="XXLI"
    >
      <x-svg
        v-if="typeof source.activity == 'number' && activities[source.activity]"
        :src="activities[source.activity]"
        svgPath="activities/"
        :tooltipText="xCapFirst($t(`activities.${activities[source.activity]}.desc`))"
        :width="XLI"
        :height="XLI"
      ></x-svg>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-row align="center" justify="center">

        <v-col :cols="isMobile ? 6 : 2" class="py-0">
          <v-list-item-title
            v-text="xCap(source.title)"
            v-bind:class="[{'text-body-2' : isMobile}]"
          ></v-list-item-title>

          <v-list-item-subtitle
            v-if="isMobile"
            v-bind:class="[(source.start_date ? 'text-caption' : 'text-tiny-dimmed')]"
          >
            <span v-if="source.start_date">{{source.start_date | dayMonthFilter}}</span>
            <span v-else class="empty-data" v-text="'.'" />
          </v-list-item-subtitle>

          <v-list-item-subtitle
            v-else
            v-bind:class="[(source.location ? 'text-caption' : 'text-tiny-dimmed')]"
            v-text="source.location ? xCap(source.location) : '.'"
          ></v-list-item-subtitle>
        </v-col>

        <v-col class="py-0 px-1">
          <div class="d-flex justify-center">
            <v-tooltip v-if="source.adventure_inventory && (typeof packedGearRatio == 'number')" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-progress-circular
                  :key="`adventure-checklist-${source.id}`"
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
                <div
                  v-if="typeof source.landscape == 'number'"
                  class="list-icon-wrapper"
                >
                  <x-svg
                    v-if="typeof source.landscape == 'number' && landscapes[source.landscape]"
                    :src="landscapes[source.landscape]"
                    svgPath="landscapes/"
                    :width="XXLI"
                    :height="XXLI"
                    :tooltipText="xCapFirst($t(`landscapes.${landscapes[source.landscape]}.title`))"
                    logo
                  ></x-svg>
                </div>

                <empty-data solo v-else />
              </div>
            </div>
          </v-col>

          <v-col class="x-col">
            <div v-if="source.distance" v-bind:class="['ml-1 text-caption']">
              <span>{{ source.distance | distanceUnitFilter(distanceUnit) }}</span>
              <span class="text-tiny-dimmed" v-text="' '+distanceUnit" />
            </div>
            <empty-data solo v-else />
          </v-col>

          <v-col class="x-col">
            <div v-if="source.elevation" v-bind:class="['ml-1 text-caption']">
              <span>{{ source.elevation | elevationUnitFilter(elevationUnit) }}</span>
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
                <v-tooltip v-if="source.weather" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-sheet
                      :color="isDark ? '#121212' : 'grey lighten-4'"
                      class="list-icon-wrapper"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon
                        class="pa-2"
                        v-text="`mdi-weather-${source.weather}`"
                      ></v-icon>
                    </v-sheet>
                  </template>
                  <span>{{xCap($t(`weathers.${source.weather}.title`))}}</span>
                </v-tooltip>
                <empty-data v-else />
              </div>
            </div>
          </v-col>

          <v-col class="x-col py-0 px-1">
            <div class="d-flex justify-center">
              <div class="text-caption stacked-item-data text-center max-width">
                <div v-if="source.temp_max">
                  <span>{{ temperatureUnitConverter(source.temp_max) }}</span>
                  <span class="text-tiny-dimmed" v-html="' '+temperatureUnit" />
                </div>
                <empty-data v-else />

                <div v-if="source.temp_min">
                  <span>{{ temperatureUnitConverter(source.temp_min) }}</span>
                  <span class="text-tiny-dimmed" v-html="' '+temperatureUnit" />
                </div>
                <empty-data v-else />
              </div>
            </div>
          </v-col>

          <v-col class="x-col">
            <div v-if="source.humidity" v-bind:class="['ml-1 text-caption']">
              <span v-bind:class="['light-blue--text']" v-text="source.humidity" />
              <span class="text-tiny-dimmed" v-text="'%'" />
            </div>
            <empty-data solo v-else />
          </v-col>

          <v-col class="x-col">
            <div v-if="source.start_date">
              <span class="text-caption">{{source.start_date | minimalDateFilter(dateFormatPref)}}</span>
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

          <x-update-col :item="source" />
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
                v-if="source.start_date"
                class="list-icon-wrapper"
                color="transparent"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="pa-2"
                      :size="MDI"
                      v-text="'mdi-'+dateStatusIcon(source.start_date)"
                      :color="dateStatusColor(source.start_date)"
                      v-bind="attrs"
                      v-on="on"
                    ></v-icon>
                  </template>
                  <span v-text="dateStatusText(source.start_date)" />
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
  </v-list-item>

</template>

<script>

  import moment from 'moment';

  import XUpdateCol from "@/components/xcols/XUpdateCol";
  import EmptyData from "@/components/elements/EmptyData";
  import EditIcon from "@/components/elements/Icons/EditIcon";

  export default {
    name: 'adventures-list-item',
    components: {
      XUpdateCol,
      EmptyData,
      EditIcon,
      XSvg: () => import('@/components/elements/XSvg'),
    },
    props: {
      source: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data: () => ({
      isMounted: false,
      duration: null,

      inventory_gear: null
    }),
    computed: {
      packedGearRatio() {
        if(this.isMounted && this.inventory_gear && this.inventory_gear.length > 0)
          return (((this.source.packed_gear ? this.source.packed_gear.length : 0) / this.inventory_gear.length) * 100);
        return null;
      },
      inventoryTitle() {
        if(typeof this.source.adventure_inventory != 'number')
          return null;
        return this.xInventory(this.source.adventure_inventory).title;
      },
      adventureInventory() {
        return this.source.adventure_inventory;
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
        if(this.source.adventure_inventory
            && this.xInventory(this.source.adventure_inventory)
            && this.xInventory(this.source.adventure_inventory).inventory_gear
        ) {
          this.inventory_gear = this.xInventory(this.source.adventure_inventory).inventory_gear;
        }
      },
      adventureDaySpan(source) {
        let startDatetime = null;
        let endDatetime = null;
        let unitOfTime = 'minute';

        if(source.start_date && source.end_date) {
          if(source.start_time && source.end_time) {
            startDatetime = moment(source.start_date + " " + source.start_time);
            endDatetime = moment(source.end_date + " " + source.end_time);

          } else {
            startDatetime = moment(source.start_date);
            endDatetime = moment(source.end_date);
            unitOfTime = 'day'
          }
        } else if(source.start_time && source.end_time) {
          startDatetime = moment(source.start_time);
          endDatetime = moment(source.end_time);
        }

        unitOfTime = unitOfTime > 1 ? unitOfTime+'s' : unitOfTime;

        this.duration = (startDatetime && endDatetime) ? endDatetime.diff(startDatetime, unitOfTime) : 0;
      }
    },
    watch: {
      source: {
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
      this.adventureDaySpan(this.source);

      this.isMounted = true;
    }
  }

</script>

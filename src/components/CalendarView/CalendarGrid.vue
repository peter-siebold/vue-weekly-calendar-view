<template>
  <section>
    <StationSelector />
    <label>Select a Week</label>
    <input type="date" v-model="startDate" />
    
  </section>
  <CalendarNavigation />
  <hr />
  <br />

  <div class="">
    <div class="title">{{ startOfWeek.format("dddd DD.MM.YY ") }} - {{ endOfWeek.format("dddd DD.MM.YY ") }}</div>
    <div class="days">
      <div class="filler"></div>
      <div class="filler"></div>
      <div
        v-for="(day, index) in daysOfWeek"
        :key="`header-day-${index}`"
        class="day"
      >
        {{ day }}
      </div>
      <!-- <div class="day current">Fri 8</div> -->
    </div>
    <div class="content">
      <div
        v-for="(item, index) in timeScale"
        class="time"
        :style="{ 'grid-row': index + 1 }"
        :key="`scale-${item}-${index + 1}`"
      >
        {{ item }}
      </div>

      <div class="filler-col"></div>
      <div class="col" style="grid-column: 3"></div>
      <div class="col" style="grid-column: 4"></div>
      <div class="col" style="grid-column: 5"></div>
      <div class="col" style="grid-column: 6"></div>
      <div class="col" style="grid-column: 7"></div>
      <div class="col weekend" style="grid-column: 8"></div>
      <div class="col weekend" style="grid-column: 9"></div>
      <div
        v-for="(item, index) in timeScale"
        class="row"
        :style="{ 'grid-row': index + 1 }"
        :key="`row-${item}-${index + 1}`"
      ></div>



    <template v-for="(bookinggroup, bookingIndex) in groupedBookings" :key="bookinggroup.key">
      <GridItem
        v-for="booking in bookinggroup.bookings"
        :key="booking.key"
        :booking="booking"
        :url="`/stations/${booking.pickupReturnStationId}/bookings/${booking.id}`"
        class="event calendar1"
        :style="{
          'grid-row': moment(booking.dueDate).format('H'),
          'grid-column': bookingIndex+3
        }"

      />
    </template>

      <div class="current-time">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import GridItem from "./GridItem/GridItem.vue";
import StationSelector from "../StationSelector/StationSelector.vue";
import CalendarNavigation from "./CalendarNavigation.vue";
import { Booking } from "../../api/typings";
import {
  getBookingsGroupedByWeekday,
  getDaysOfWeek,
} from "../../utils/bookingHelper";

const store = useStore();
const router = useRouter();
const route = useRoute();

const today = new Date();
const startDate = ref(null);

const timeScale = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const startOfWeek = computed(() => {
  return moment(store.getters.getFromDate) || route?.query?.from
    ? moment(route.query.from as string)
    : moment(today).startOf("week");
});
const endOfWeek = computed(() => {
  return moment(store.getters.getToDate) || route?.query?.to
    ? moment(route.query.to as string)
    : moment(today).endOf("week");
});
const daysOfWeek = computed(() => {
  return getDaysOfWeek(startOfWeek.value);
});

const filteredBookings = computed<Booking[]>(
  () => store.getters.getFilteredBookings
);

const groupedBookings = computed(() => {
  return getBookingsGroupedByWeekday(
    filteredBookings.value,
    startOfWeek.value,
    endOfWeek.value
  );
});

// Navigation
watch(
  route,
  (to) => {
    const qryFrom =
      to.query.from !== undefined
        ? moment(to.query.from as string)
        : moment(today).startOf("week");
    const qryTo = moment(qryFrom).endOf("week");
    const qryStationId = to?.query.stationId ?? store.getters.getStationId;

    store.commit("SET_WEEK", {
      fromDate: moment(qryFrom),
      toDate: moment(qryTo),
    });
    store.commit("SET_FILTER_BY_STATION_ID", qryStationId);
    store.dispatch("fetchBookings");
  },

  { flush: "pre", immediate: true, deep: true }
);

// Datepicker
watch(
  () => startDate.value,
  () => {
    const startOfWeek = moment(startDate.value).startOf("week");
    const endOfWeek = moment(startOfWeek).endOf("week");
    store.commit("SET_WEEK", {
      fromDate: startOfWeek,
      toDate: endOfWeek,
    });
    const stationId = route.params.stationId || store.getters.getStationId;
    router.push({
      path: "/bookings",
      query: {
        stationId,
        from: startOfWeek.format("YYYY-MM-DD"),
        to: endOfWeek.format("YYYY-MM-DD"),
      },
    });
  }
);
</script>
<style lang="scss">

$title-height: 3em;
$days-height: 3em;
$time-width: 3em;
$time-height: 3em;
$grid-color: #dadce0;
$calendar-template: $time-width 10px repeat(7, 1fr);
$current-time-color: #ea4335;

* {
  box-sizing: border-box;
}

body {
  background: #fff;
}

.container {
  width: 100%;
  display: grid;
  grid-template-rows: $title-height $days-height auto;
  position: absolute;
}

.title {
  background: #217346;
  text-align: center;
  display: grid;
  place-content: center;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.days {
  background: #f3f2f1;
  display: grid;
  place-content: center;
  text-align: center;
  grid-template-columns: $calendar-template;
  position: sticky;
  top: $title-height;
  z-index: 10;
  border-bottom: 2px solid $grid-color;
}

.day {
  border-left: 1px solid $grid-color;
}

.content {
  display: grid;
  grid-template-columns: $calendar-template;
  grid-template-rows: repeat(24, $time-height);
}

.time {
  grid-column: 1;
  text-align: right;
  align-self: end;
  font-size: 80%;
  position: relative;
  bottom: -1ex;
  color: #70757a;
  padding-right: 2px;
}

.col {
  border-right: 1px solid $grid-color;
  grid-row: 1 / span 24;
  grid-column: span 1;
}

.filler-col {
  grid-row: 1 / -1;
  grid-column: 2;
  border-right: 1px solid $grid-color;
}

.row {
  grid-column: 2 / -1;
  border-bottom: 1px solid $grid-color;
}

.event {
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 80%;
}

.weekend {
  background-color: #f1f3f4;
}

.calendar1 {
  background-color: #d7dbef;
  border-color: #bcc3e5;
}

.calendar2 {
  background-color: #b3e1f7;
  border-color: #81cdf2;
}

.event1 {
  grid-column: 3;
  grid-row: 9 / span 4;
}

.event2 {
  grid-column: 5;
  grid-row: 10 / span 6;
}

.event3 {
  grid-column: 7;
  grid-row: 8 / span 10;
}

.event4 {
  grid-column: 8;
  grid-row: 21 / span 2;
}

.current-time {
  grid-column: 7;
  grid-row: 10;
  border-top: 2px solid $current-time-color;
  position: relative;
  top: calc(50% - 1px);
}

.circle {
  width: 12px;
  height: 12px;
  border: 1px solid $current-time-color;
  border-radius: 50%;
  background: $current-time-color;
  position: relative;
  top: -6px;
  left: -6px;
}

.current {
  font-weight: bold;
}
</style>

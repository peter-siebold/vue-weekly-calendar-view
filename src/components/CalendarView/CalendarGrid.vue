<template>
  <section>
    <StationSelector />
    <input type="date" v-model="startDate" />
  </section>
  <CalendarNavigation />
  <div class="grid grid-cols-7 gap-4">
    <div>Monday</div>
    <div>Tuesday</div>
    <div>Wednesday</div>
    <div>Thursday</div>
    <div>Friday</div>
    <div>Saturday</div>
    <div>Sunday</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
    <div>07</div>
    <div>08</div>
  </div>
  <section class="calendar-grid">
    <GridItem
      v-for="booking in filteredBookings"
      :key="booking.id"
      :booking="booking"
      :url="`/stations/${booking.pickupReturnStationId}/bookings/${booking.id}`"
    ></GridItem>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import moment from "moment";
import GridItem from "./GridItem/GridItem.vue";
import StationSelector from "../StationSelector/StationSelector.vue";
import CalendarNavigation from "./CalendarNavigation.vue";
import { Booking } from "../../api/typings";

const store = useStore();
const router = useRouter();
const route = useRoute();

const today = new Date();
const startDate = ref(null);

watch(
  route,
  (to) => {
    const qryFrom =
      moment(to.query.from as string) || moment(today).startOf("week");
    const qryTo =
      moment(to.query.to as string) || moment(qryFrom).endOf("week");
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

const filteredBookings = computed<Booking[]>(
  () => store.getters.getFilteredBookings
);

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
    console.log("startDate.value has changed", startOfWeek, endOfWeek);
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
.calendar-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>

<template>
  <section>
    <!-- <AutoComplete :items="stations" /> -->
    <StationSelector />
    <input type="date" v-model="startDate">
  </section>
  <section>
    <button @click="setPreviousWeek">Previous Week</button> |
    <button @click="setNextWeek">Next Week</button>
  </section>
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
import moment from "moment";
import GridItem from "./GridItem/GridItem.vue";
import StationSelector from "../StationSelector/StationSelector.vue";
import { Booking } from "../../api/typings";

const store = useStore();
const filteredBookings = computed<Booking[]>(() => store.getters.getFilteredBookings);

const today = new Date();
const startDate = ref(null);

watch(() => startDate.value, () => {
  const startOfWeek = moment(startDate.value).startOf("week");
  const endOfWeek = moment(startOfWeek).endOf("week");
    store.commit("SET_WEEK", {
    fromDate: startOfWeek,
    toDate: endOfWeek,
  });
  store.dispatch("fetchBookings");
});

function setNextWeek() {
  const currentStartOfWeek = store.getters.getFromDate;
  const nextStartOfWeek = moment(currentStartOfWeek).add(7, "days");
  const currentEndOfWeek = store.getters.getToDate;
  const nextEndOfWeek = moment(currentEndOfWeek).add(7, "days");
  store.commit("SET_WEEK", {
    fromDate: nextStartOfWeek,
    toDate: nextEndOfWeek,
  });
  store.dispatch("fetchBookings");
}

function setPreviousWeek() {
  const currentStartOfWeek = store.getters.getFromDate;
  const previousStartOfWeek = moment(currentStartOfWeek).subtract(7, "days");
  const currentEndOfWeek = store.getters.getToDate;
  const previousEndOfWeek = moment(currentEndOfWeek).subtract(7, "days");
  store.commit("SET_WEEK", {
    fromDate: previousStartOfWeek,
    toDate: previousEndOfWeek,
  });
  store.dispatch("fetchBookings");
}

onMounted(() => {
  const startOfWeek = moment(today).startOf("week");
  const endOfWeek = moment(today).endOf("week");

  store.commit("SET_WEEK", {
    fromDate: startOfWeek,
    toDate: endOfWeek,
  });
  store.dispatch("fetchBookings");
});
</script>
<style lang="scss">
.calendar-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>

<template>
  <section>
    <!-- <AutoComplete :items="stations" /> -->
    <StationSelector />
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
    ></GridItem>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import GridItem from "./GridItem/GridItem.vue";
import StationSelector from "../StationSelector/StationSelector.vue";

const store = useStore();
const filteredBookings = computed(() => store.getters.getFilteredBookings);

const today = new Date();

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

<template>
  <section>
    <button @click="setPreviousWeek">Previous Week</button> |
    <button @click="setNextWeek">Next Week</button>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const store = useStore();

function setNextWeek() {
  const currentStartOfWeek = store.getters.getFromDate;
  const nextStartOfWeek = moment(currentStartOfWeek).add(7, "days");
  const currentEndOfWeek = store.getters.getToDate;
  const nextEndOfWeek = moment(currentEndOfWeek).add(7, "days");
  store.commit("SET_WEEK", {
    fromDate: nextStartOfWeek,
    toDate: nextEndOfWeek,
  });
  const stationId = route.params.stationId || store.getters.getStationId;
  router.push({
    path: "/bookings",
    query: {
      stationId,
      from: nextStartOfWeek.format("YYYY-MM-DD"),
      to: nextEndOfWeek.format("YYYY-MM-DD"),
    },
  });
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
  const stationId = route.params.stationId || store.getters.getStationId;
  router.push({
    path: "/bookings",
    query: {
      stationId,
      from: previousStartOfWeek.format("YYYY-MM-DD"),
      to: previousEndOfWeek.format("YYYY-MM-DD"),
    },
  });
}
</script>

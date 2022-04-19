<template>
  <section>
    <AutoComplete
      :items="stationNames"
      @input="handleInput"
      @select="handleSelect"
      :selected="selectedStationName"
    />
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import AutoComplete from "../AutoComplete/AutoComplete.vue";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const selectedStationName = ref("");

watch(
  route,
  (to) => {
    // const qryStationId = to?.query.stationId ?? store.getters.getStationId;
    const qryStationId =
      to?.query?.stationId !== undefined
        ? to.query.stationId
        : store.getters.getStationId;

    const stationName = store.getters.getStationNameById(qryStationId);
    if (stationName) {
      selectedStationName.value = stationName;
    }
  },
  { flush: "pre", immediate: true, deep: true }
);

const suggestions = computed<
  {
    name: string;
    id: number;
  }[]
>(() => useStore().getters.getSuggestedStations);

const stationNames = computed(() =>
  suggestions.value.map((station) => station.name)
);
function handleInput(value: string): void {
  if (value.length) {
    console.log("handleInput", value);
  }
}
function handleSelect(value: string): void {
  // get id from value and commit to store
  if (value && value.length) {
    const identified = suggestions.value.findIndex(
      ({ name }) => name === value
    );
    const id = identified >= 0 ? suggestions.value[identified].id : null;

    store.commit("SET_FILTER_BY_STATION_ID", id);
    store.dispatch("fetchBookings");
  } else {
    store.commit("SET_FILTER_BY_STATION_ID", undefined);
    store.dispatch("fetchBookings");
  }
}
</script>

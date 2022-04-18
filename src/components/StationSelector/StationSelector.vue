<template>
  <section>
    <AutoComplete :items="stationNames" @input="handleInput" @select="handleSelect" />
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import AutoComplete from "../AutoComplete/AutoComplete.vue";
const store = useStore();
const suggestions = computed<
  {
    name: string;
    id: number;
  }[]
>(() => useStore().getters.getSuggestedStations);
// const stationNames = ref<string[]>([]);
const stationNames = computed(() => suggestions.value.map(station => station.name));
function handleInput(value: string): void {
  if (value.length) {
    console.log("handleInput", value);
    // get id from name
    // const id = suggestions.value.findIndex(({ name }) => name === value);
    // console.log("id", id);
  }
}
function handleSelect(value: string): void {
  // get id from value and commit to store
  const identified = suggestions.value.findIndex(({ name }) => name === value);
  const id = identified ? suggestions.value[identified].id : null;

  store.commit("SET_FILTER_BY_STATION_ID", id);
   store.dispatch("fetchBookings");
}
</script>

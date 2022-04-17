<template>
  <Header />
  <LoadIndicator v-if="isLoading" />
  <ErrorComponent v-else-if="hasError" :message="errorMessage" />
  <CalendarGridVue v-else />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

import { key } from "./store";

import Header from "./components/Header/Header.vue";
import CalendarGridVue from "./components/CalendarView/CalendarGrid.vue";
import ErrorComponent from "./components/ErrorPage/ErrorPage.vue";
import LoadIndicator from "./components/LoadIndicator/LoadIndicator.vue";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
const hasError = computed(() => store.state.hasError);
const errorMessage = computed(() => store.state.error);
// const stations = computed(() => store.state.stations);

onMounted(() => {
  store.dispatch("requestStations");
});
</script>

<style lang="scss">
html {
  font-family: sans-serif;
  font-size: 16px;
  color: $text-color;
  background-color: $background-color;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin-top: 60px;
}
</style>

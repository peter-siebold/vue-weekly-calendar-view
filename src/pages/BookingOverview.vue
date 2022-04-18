<template>
  <LoadIndicator v-if="isLoading" />
  <ErrorComponent v-else-if="hasError" :message="errorMessage" />
  <CalendarGridVue v-else />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import CalendarGridVue from "../components/CalendarView/CalendarGrid.vue";
import ErrorComponent from "../components/ErrorPage/ErrorPage.vue";
import LoadIndicator from "../components/LoadIndicator/LoadIndicator.vue";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
const hasError = computed(() => store.state.hasError);
const errorMessage = computed(() => store.state.error);

onMounted(() => {
  store.dispatch("requestStations");
});
</script>
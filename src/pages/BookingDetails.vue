<template>
  <section v-if="booking">
    <h2>{{ booking.customerName }}</h2>
    <h3>{{ startDate }} - {{ endDate }}</h3>
    <p>{{ pickupReturnStationName }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Booking } from "../api/typings";
import moment from "moment";

const props = defineProps<{
  stationId: string;
  bookingId: string;
}>();

const store = useStore();

const booking = computed<Booking>(() => store.getters.getBookingDetails);

const startDate = computed(() => {
  return moment(booking.value.startDate).format("Do MMM YYYY HH:mm");
});

const endDate = computed(() => {
  return moment(booking.value.endDate).format("Do MMM YYYY HH:mm");
});

const pickupReturnStationName = computed(() => store.getters.getStationNameById(props.stationId));


onMounted(() => {
    const stations = store.getters.getStations;
    if (!stations) {
      store.dispatch("requestStations");
    }
    const { stationId, bookingId } = props;
    store.dispatch("fetchBookingDetails", {
      stationId,
      bookingId
    });
});

</script>

<style scoped>
section {
  margin: 3rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>

<template>
  <router-link :to="url">
  <section class="item">
    <time>{{ startDate }} - {{ endDate }} </time>
    <h4>{{ customerName }}</h4>
    <address>{{ pickupStationName }}</address>
  </section>
  </router-link>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import moment from "moment";
import { useStore } from "vuex";
import { Booking } from "../../../api/typings";
const store = useStore();
const props = defineProps<{
  booking: Booking;
  url: string;
}>();

const { booking, url } = props;
const { id, customerName, pickupReturnStationId } = booking;
const startDate = computed(() => {
  return moment(props.booking.startDate).format("Do MMM YYYY");
});
const endDate = computed(() => {
  return moment(props.booking.endDate).format("Do MMM YYYY");
});

const pickupStation = computed(() => {
  return store.getters.getStationById(pickupReturnStationId);
});
const pickupStationName = computed(() => {
  return pickupStation.value.name;
});
</script>

<style lang="scss">
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  max-width: calc((100vw - 20px) / 7);
  time {
    font-size: 12px;
  }
}
</style>

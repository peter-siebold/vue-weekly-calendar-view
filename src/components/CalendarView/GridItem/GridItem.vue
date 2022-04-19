<template>
  <router-link :to="url">
  <div class="item">
    <time class="datetime">{{ startDate }} - {{ endDate }} </time>
    <h4>{{ customerName }}</h4>
    <!-- <address>{{ pickupStationName }}</address> -->
  </div>
  </router-link>
</template>

<script setup lang="ts">
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
  return moment(props.booking.startDate).format("DD.MM.YY  HH:mm");
});
const endDate = computed(() => {
  return moment(props.booking.endDate).format("DD.MM.YY HH:mm");
});

const pickupStation = computed(() => {
  return store.getters.getStationById(pickupReturnStationId);
});
const pickupStationName = computed(() => {
  return pickupStation.value.name;
});
</script>

<style lang="scss">
// .item {
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   margin: 5px;
// }
.datetime {
  font-size: 10px;
  color: rgb(146, 143, 143);
}
</style>

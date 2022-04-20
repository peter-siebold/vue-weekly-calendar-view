<template>
  <router-link :to="url">
    <div class="item">
      <!-- <address v-if="!filteredByStation">{{ pickupStationName }}</address> -->
      <time class="datetime">{{ dueDate?.format("DD.MM.YY  HH:mm") }} </time>
      <section class="customer-name">{{ customerName }}</section>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import moment from "moment";
import { useStore } from "vuex";
import { Booking, GroupedBooking } from "../../../api/typings";
const store = useStore();
const props = defineProps<{
  booking: GroupedBooking;
  url: string;
}>();

const { booking, url } = props;
const { id, customerName, pickupReturnStationId, dueDate } = booking;
const startDate = computed(() => {
  return moment(props.booking.startDate).format("DD.MM.YY  HH:mm");
});
const endDate = computed(() => {
  return moment(props.booking.endDate).format("DD.MM.YY HH:mm");
});

// const pickupStation = computed(() => {
//   return store.getters.getStationById(pickupReturnStationId);
// });
// const pickupStationName = computed(() => {
//   return pickupStation.value.name;
// });
// const filteredByStation = computed(() => {
//   return store.getters.getStationId !== undefined;
// });

</script>

<style lang="scss" scoped>
.item {
  width: 100%;
}
.datetime {
  font-size: 10px;
  color: rgb(146, 143, 143);
}
.customer-name {
  font-size: 11px;

}
</style>

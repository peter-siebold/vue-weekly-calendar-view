import { createRouter, createWebHistory } from 'vue-router';
import BookingOverview from '../pages/BookingOverview.vue';
import BookingDetails from '../pages/BookingDetails.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/bookings' },
      { path: '/bookings', component: BookingOverview },
      { path: '/stations/:stationId/bookings/:bookingId', component: BookingDetails, props: true },
    ]
  });

  export default router;
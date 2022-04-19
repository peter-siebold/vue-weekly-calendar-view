import { RootState } from "./typings";
import { Booking, Station } from "../api/typings";
import moment from "moment";

export default {
  getFilteredBookings: (state: RootState) => state.filteredBookings,
  getFromDate: (state: RootState) => state.fromDate,
  getToDate: (state: RootState) => state.toDate,
  getStationId: (state: RootState) => state.filterByStationId,
  getBookingDetails: (state: RootState) => state.bookingDetails,
  getStationById: (state: RootState) => (id: number) => {
    const station = state.stations.find(
      (station: Station) => station.id === id
    );
    return station;
  },
  getStationNameById: (state: RootState) => (id: number) => {
    const station = state.stations.find(
      (station: Station) => station.id === id
    );
    return station?.name ?? "";
  },

  getSuggestedStations(state: RootState) {
    const stationNames = [];
    for (let i in state.stations) {
      stationNames.push({
        name: state.stations[i].name,
        id: state.stations[i].id,
      });
    }
    return stationNames;
  },

  getBookingsGroupedByWeekDayOLD: (state: RootState) => {
    const bookings = state.filteredBookings;
    const start = state.fromDate;
    const end = state.toDate;
    const filteredBookings = [...bookings].filter(
      (booking: Booking) =>
        moment(booking.startDate).isBetween(start, end, "day", "[]") ||
        moment(booking.endDate).isBetween(start, end, "day", "[]") ||
        moment(booking.startDate).isSame(start, "day") ||
        moment(booking.endDate).isSame(start, "day") ||
        moment(booking.startDate).isSame(end, "day") ||
        moment(booking.endDate).isSame(end, "day")
    );
    const bookingsGroupedByWeekDay = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    for (let i in filteredBookings) {
      const booking = filteredBookings[i];
      const startDate = moment(booking.startDate);
      const endDate = moment(booking.endDate);
      // const dayOfWeek = startDate.day();
      const dayOfWeek = moment(booking.startDate).format("dddd").toLowerCase();
      const dayOfWeekStartDate = moment(booking.startDate).format("dddd").toLowerCase();
      const dayOfWeekEndDate = moment(booking.endDate).format("dddd").toLowerCase();
      const bookingGroup = {
        id: booking.id,
        customerName: booking.customerName,
        startDate: booking.startDate,
        endDate: booking.endDate,
        pickupStationId: booking.pickupReturnStationId,
        returnStationId: booking.pickupReturnStationId,
        key: booking.key,
      };
      
      try {
        
        bookingsGroupedByWeekDay[dayOfWeek].push(bookingGroup);
      } catch (error) {
        console.log(error);

        debugger
      }
    }

    return bookingsGroupedByWeekDay;
  }
  
};

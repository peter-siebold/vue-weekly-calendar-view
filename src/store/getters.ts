import { RootState } from "./typings";
import { Booking, Station } from "../api/typings";
import moment from "moment";

export default {
  getFilteredBookings: (state: RootState) => state.filteredBookings,
  getFromDate: (state: RootState) => state.fromDate,
  getToDate: (state: RootState) => state.toDate,
  getStationId: (state: RootState) => state.filterByStationId,
  getSelectedStationName: (state: RootState) => state.selectedStationName,
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

  getBookingsOrderByDate(state: RootState) {
    const bookings: Booking[] = [];
    for (let i in state.stations) {
      bookings.push(...state.stations[i].bookings);
    }
    for (let i in bookings) {
      bookings[i]["key"] = btoa(
        `${bookings[i].id}-${bookings[i].pickupReturnStationId}-${bookings[i].startDate}-${bookings[i].endDate}`
      );
    }
    return bookings.sort((a: Booking, b: Booking) => {
      const dateA = moment(a.startDate).unix();
      const dateB = moment(b.startDate).unix();
      return dateA > dateB ? 1 : -1;
    });
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
  
};

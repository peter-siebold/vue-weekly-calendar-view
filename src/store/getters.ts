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
  
};

import { Booking, Station } from "../api/typings";
import { RootState } from "./typings";
import { Moment } from "moment";

export default {
  SET_STATIONS(state: RootState, stations: Station[]) {
    state.stations = stations;
  },
  SET_IS_LOADING(state: RootState, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  SET_HAS_ERROR(state: RootState, hasError: boolean) {
    state.hasError = hasError;
  },
  SET_ERROR(state: RootState, error: string) {
    state.error = error;
  },
  SET_SUGGESTED_STATIONS(state: RootState, suggestedStations: any[]) {
    state.suggestedStations = suggestedStations;
  },


  SET_FILTER_BY_STATION_ID(state: RootState, filterByStationId: number) {
    state.filterByStationId = filterByStationId;
  },
  SET_WEEK(state: RootState, week: { fromDate: Moment, toDate: Moment }) {
    state.fromDate = week.fromDate;
    state.toDate = week.toDate;
  },
  SET_FILTERED_BOOKINGS(state: RootState, filteredBookings: Booking[]) {
    state.filteredBookings = filteredBookings;
  },
  SET_IS_LOADING_BOOKINGS(state: RootState, isLoading: boolean) {
    state.isLoadingBookings = isLoading;
  },
  SET_IS_LOADING_BOOKING_DETAILS(state: RootState, isLoading: boolean) {
    state.isLoadingBookingDetails = isLoading;
  },
  SET_BOOKING_DETAILS(state: RootState, bookingDetails: Booking) {
    state.bookingDetails = bookingDetails;
  },
  

};

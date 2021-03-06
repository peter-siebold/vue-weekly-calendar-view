import moment from "moment";
import { ActionContext } from "vuex";
import { getStations, getBookingDetails, getStationById } from "../api";
import { Booking } from "../api/typings";
import { getWeeklyBookings, sortBookingByStartAndEndDate } from "../utils/bookingHelper";
import { RootState } from "./typings";
export default {
  async requestStations({ commit }: ActionContext<RootState, any>) {
    commit("SET_IS_LOADING", true);
    try {
      const stations = await getStations();

      const pickupStations = stations.map((station: any) => {
        return {
          id: station.id,
          name: station.name,
        };
      });
      commit("SET_SUGGESTED_STATIONS", pickupStations);
      commit("SET_STATIONS", stations);
    } catch (error: any) {
      commit("SET_HAS_ERROR", true);
      commit("SET_ERROR", error.message);
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },


  async fetchBookings({ commit, state }: ActionContext<RootState, any>) {
    commit("SET_IS_LOADING_BOOKINGS", true);
    try {
      let bookings;
      // if we have a selected station, then get the bookings for that station
      // else get the bookings for  all stations
      if(state.filterByStationId !== undefined) {
        const station = await getStationById(state.filterByStationId);
        bookings = station?.bookings ?? [];
      } else {
        const stations = await getStations();
        bookings = [];
        for (let i in stations) {
          bookings.push(...stations[i].bookings);
        }
      }
      
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

      // const filteredBookings = getWeeklyBookings(bookings, start, end)
      
        // Bookings are now prefiltered for the selected week
        // next, we need to sort the bookings by start date and end date 
        // so that the bookings are displayed in the correct order
        
        const sortedBookings = filteredBookings.sort((a: Booking, b: Booking) => {
          if (moment(a.startDate).isBefore(b.startDate) ||  moment(a.endDate).isBefore(b.endDate)) {
            return -1;
          }
          if (moment(a.startDate).isAfter(b.startDate) ||  moment(a.endDate).isAfter(b.endDate)) {
            return 1;
          }
          return 0;
        });

        // const sortedBookings = sortBookingByStartAndEndDate(filteredBookings);
        console.log("sortedBookings", sortedBookings);


      // TODO sort the bookings by start date or end date 


      commit("SET_FILTERED_BOOKINGS", sortedBookings);
    } catch (error: any) {
      commit("SET_HAS_ERROR", true);
      commit("SET_ERROR", error.message);
    } finally {
      commit("SET_IS_LOADING_BOOKINGS", false);
    }
  },

  async fetchBookingDetails({ commit }: ActionContext<RootState, any>, {stationId, bookingId}: {stationId: number, bookingId: number}) {
    commit("SET_IS_LOADING_BOOKING_DETAILS", true);
    try {
      const booking = await getBookingDetails(stationId, bookingId);
      commit("SET_BOOKING_DETAILS", booking);
    }
    catch (error: any) {
      commit("SET_HAS_ERROR", true);
      commit("SET_ERROR", error.message);
    }
    finally {
      commit("SET_IS_LOADING_BOOKING_DETAILS", false);
    }
  }
};

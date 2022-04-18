import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import { RootState } from "./typings";

const state: RootState = {
  isLoading: false,
  hasError: false,
  error: undefined,

  stations: [],
  suggestedStations: [],

  fromDate: undefined,
  toDate: undefined,
  filterByStationId: undefined,
  filteredBookings: [],
  isLoadingBookings: false,
  bookingDetails: undefined,
  isLoadingBookingDetails: false,
  
};

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
  state,
  mutations,
  actions,
  getters,
});

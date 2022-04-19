import { Moment } from "moment";
import { Booking, Station } from "../api/typings";

export interface RootState {
  // application status flags
  isLoading: boolean;
  hasError: boolean;
  error?: string;

  
  stations: Station[];
  
  // filters for autocomplete
  suggestedStations: { name: string; id: number }[];

  fromDate?: Moment;
  toDate?: Moment;
  filterByStationId?: number;
  filteredBookings: Booking[];
  isLoadingBookings: boolean;
  bookingDetails?: Booking;
  isLoadingBookingDetails: boolean;
}

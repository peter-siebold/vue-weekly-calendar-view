import { Moment } from "moment";

export interface Booking {
  id: number;
  pickupReturnStationId: number;
  customerName: string;
  startDate: string;
  endDate: string;
  key: string;

}

export interface GroupedBooking extends Booking {
  dueDate?: Moment;
}
export interface Station {
  id: number;
  name: string;
  bookings: Booking[];
}


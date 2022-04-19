import { Booking, GroupedBooking } from "../api/typings";
import moment, { Moment } from "moment";
import { uuid } from "vue-uuid";

export const getWeeklyBookings = (
  bookings: Booking[],
  startOfWeek?: Moment,
  endOfWeek?: Moment
) => {
  return [...bookings].filter(
    (booking: Booking) =>
      moment(booking.startDate).isBetween(
        startOfWeek,
        endOfWeek,
        "day",
        "[]"
      ) ||
      moment(booking.endDate).isBetween(startOfWeek, endOfWeek, "day", "[]") ||
      moment(booking.startDate).isSame(startOfWeek, "day") ||
      moment(booking.endDate).isSame(startOfWeek, "day") ||
      moment(booking.startDate).isSame(endOfWeek, "day") ||
      moment(booking.endDate).isSame(endOfWeek, "day")
  );
};

export const sortBookingByStartAndEndDate = (bookings: Booking[]) => {
  return [...bookings].sort((a: Booking, b: Booking) => {
    if (
      moment(a.startDate).isBefore(b.startDate) ||
      moment(a.endDate).isBefore(b.endDate)
    ) {
      return -1;
    }
    if (
      moment(a.startDate).isAfter(b.startDate) ||
      moment(a.endDate).isAfter(b.endDate)
    ) {
      return 1;
    }
    return 0;
  });
};

export const isInWeek = (
  booking: Booking,
  startOfWeek?: Moment,
  endOfWeek?: Moment
) => {
  return (
    moment(booking.startDate).isBetween(startOfWeek, endOfWeek, "day", "[]") ||
    moment(booking.endDate).isBetween(startOfWeek, endOfWeek, "day", "[]") ||
    moment(booking.startDate).isSame(startOfWeek, "day") ||
    moment(booking.endDate).isSame(startOfWeek, "day") ||
    moment(booking.startDate).isSame(endOfWeek, "day") ||
    moment(booking.endDate).isSame(endOfWeek, "day")
  );
};
export const isDayInWeek = (
  day: Moment,
  startOfWeek?: Moment,
  endOfWeek?: Moment
) => {
  return (
    moment(day).isBetween(startOfWeek, endOfWeek, "day", "[]") ||
    moment(day).isSame(startOfWeek, "day") ||
    moment(day).isSame(endOfWeek, "day")
  );
};

export const getDaysOfWeek = (dayInWeek?: Moment) => {
  const startOfWeek = moment(dayInWeek).startOf("week");
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = moment(startOfWeek).add(i, "days").format("dddd, DD.MM.YYYY");
    days.push(day);
  }
  return days;
};

export interface GroupedBookings {
  day: string;
  date: moment.Moment;
  bookings: GroupedBooking[];
  key: string;
}

export function getBookingsGroupedByWeekday(
  bookings: Booking[],
  startOfWeek: Moment,
  endOfWeek?: Moment
): GroupedBookings[] {
  const weeklyBookings = getWeeklyBookings(bookings, startOfWeek, endOfWeek);
  const weekdays = moment.weekdays(true);
  const grouped: { [k: string]: GroupedBooking[] } = {};
  for (let i of weekdays) {
    grouped[i] = [];
  }
  for (let i in weeklyBookings) {
    const booking = weeklyBookings[i];
    const startDate = moment(booking.startDate);
    const endDate = moment(booking.endDate);
    const startWeekDay = moment.weekdays(true, startDate.weekday());
    const endWeekDay = moment.weekdays(true, endDate.weekday());

    if (isDayInWeek(startDate, startOfWeek, endOfWeek)) {
      grouped[startWeekDay].push({...booking, key: uuid.v4(), dueDate : startDate});
    }
    if (isDayInWeek(endDate, startOfWeek, endOfWeek)) {
      grouped[endWeekDay].push({...booking, key: uuid.v4(), dueDate : endDate});
    }
  }
  const groupedSorted = Object.keys(grouped).map((key, index) => {
    const sow = startOfWeek.clone();
    return {
      day: key,
      date: sow.add(index, "days"),
      bookings: grouped[key],
      key: uuid.v4(),
    };
  });

  return groupedSorted;
}

export interface Booking {
  id: number;
  pickupReturnStationId: number;
  customerName: string;
  startDate: string;
  endDate: string;
  key: string;
}

export interface Station {
  id: number;
  name: string;
  bookings: Booking[];
}

export const st: Station[] = [
  {
    id: 1,
    name: "Station 1",
    bookings: [
      {
        id: 1,
        pickupReturnStationId: 1,
        customerName: "John Doe",
        startDate: "2020-01-01",
        endDate: "2020-01-02",
        key: "",
      },
      {
        id: 2,
        pickupReturnStationId: 1,
        customerName: "Jane Doe",
        startDate: "2020-01-03",
        endDate: "2020-01-04",
        key: "",
      },
    ],
  },
  {
    id: 2,
    name: "Station 2",
    bookings: [
      {
        id: 3,
        pickupReturnStationId: 2,
        customerName: "John Doe",
        startDate: "2020-01-05",
        endDate: "2020-01-06",
        key: "",
      },
    ],
  },
];

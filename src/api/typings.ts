export interface Booking {
    id: number;
    pickupReturnStationId: number;
    customerName: string;
    startDate: string;
    endDate: string;
}

export interface Station{
    id: number;
    name: string;
    bookings: Booking[];
}

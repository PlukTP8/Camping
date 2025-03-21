
export interface CampingZone {
  id: string;
  name: string;
  description: string;
  capacity: number;
  image: string;
  amenities: string[];
  pricePerNight: number;
}

export interface CampingSpot {
  id: string;
  zoneId: string;
  name: string;
  size: SpotSize;
  status: SpotStatus;
  location: {
    x: number;
    y: number;
  };
}

export enum SpotSize {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

export enum SpotStatus {
  Available = "available",
  Occupied = "occupied",
  Maintenance = "maintenance"
}

export interface Reservation {
  id: string;
  zoneId: string;
  spotId: string;
  startDate: Date;
  endDate: Date;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  totalPrice: number;
  status: ReservationStatus;
}

export enum ReservationStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Canceled = "canceled",
  Completed = "completed"
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

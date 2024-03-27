export interface ASMonth {
  name: string;
  isoFirstDay: string;
  length: number;
}

export interface Accommodation {
  startDate: Date;
  endDate: Date;
  label: string;
}

export interface AccommodationData {
  startDate: Date;
  endDate: Date;
  label: string;
}

export interface SlotWithAccommodations {
  id: number;
  name: string;
  accommodations: AccommodationData[]
}

export interface RoomWithSlots {
  id: number;
  name: string;
  slots: SlotWithAccommodations[];
}

export interface AccommodationsSheet {
  months: ASMonth[];
  dates: Date[]
  rooms: RoomWithSlots[];
}

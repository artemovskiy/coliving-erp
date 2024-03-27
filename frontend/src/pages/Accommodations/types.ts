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

export interface AccommodationsSheet {
  months: ASMonth[];
  dates: Date[]
  slots: {
    name: string;
    accommodations: AccommodationData[]
  }[]
}

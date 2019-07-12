import {Injectable} from '@angular/core';
import {TAxisDates} from '@core/interfaces/xaxis.interface';

@Injectable({
  providedIn: 'root',
})
export class AxisDates {
  private selectedYear: number;

  constructor() {}

  updateYearSelection = (year: number) => {
    this.selectedYear = year;
  };

  getPeriod = (period: TAxisDates): Array<number> => {
    return this[period](this.selectedYear);
  };

  entireYear = (year: number): Array<number> => {
    return [
      Date.UTC(year, 0, 1),
      Date.UTC(year, 0, 15),
      Date.UTC(year, 0, 31),
      Date.UTC(year, 1, 15),
      Date.UTC(year, 1, 28),
      Date.UTC(year, 2, 15),
      Date.UTC(year, 2, 31),
      Date.UTC(year, 3, 15),
      Date.UTC(year, 3, 30),
      Date.UTC(year, 4, 15),
      Date.UTC(year, 4, 31),
      Date.UTC(year, 5, 15),
      Date.UTC(year, 5, 30),
      Date.UTC(year, 6, 15),
      Date.UTC(year, 6, 31),
      Date.UTC(year, 7, 15),
      Date.UTC(year, 7, 31),
      Date.UTC(year, 8, 15),
      Date.UTC(year, 8, 30),
      Date.UTC(year, 9, 15),
      Date.UTC(year, 9, 31),
      Date.UTC(year, 10, 15),
      Date.UTC(year, 10, 30),
      Date.UTC(year, 11, 15),
      Date.UTC(year, 11, 31),
    ];
  };

  firstQuarter = (year: number): Array<number> => {
    return [
      Date.UTC(year, 0, 1),
      Date.UTC(year, 0, 15),
      Date.UTC(year, 0, 31),
      Date.UTC(year, 1, 15),
      Date.UTC(year, 1, 28),
      Date.UTC(year, 2, 15),
      Date.UTC(year, 2, 31),
    ];
  };

  secondQuarter = (year: number): Array<number> => {
    return [
      Date.UTC(year, 3, 15),
      Date.UTC(year, 3, 30),
      Date.UTC(year, 4, 15),
      Date.UTC(year, 4, 31),
      Date.UTC(year, 5, 15),
      Date.UTC(year, 5, 30),
    ];
  };

  thirdQuarter = (year: number): Array<number> => {
    return [
      Date.UTC(year, 6, 15),
      Date.UTC(year, 6, 31),
      Date.UTC(year, 7, 15),
      Date.UTC(year, 7, 31),
      Date.UTC(year, 8, 15),
      Date.UTC(year, 8, 30),
    ];
  };

  fourthQuarter = (year: number): Array<number> => {
    return [
      Date.UTC(year, 9, 15),
      Date.UTC(year, 9, 31),
      Date.UTC(year, 10, 15),
      Date.UTC(year, 10, 30),
      Date.UTC(year, 11, 15),
      Date.UTC(year, 11, 31),
    ];
  };
}

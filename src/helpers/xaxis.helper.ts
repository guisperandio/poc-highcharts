import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AxisDates {
  public selectedYear: number;

  constructor() {}

  set year(currentYear: number) {
    this.selectedYear = currentYear;
  }

  get entireYear(): Array<number> {
    return [
      Date.UTC(this.selectedYear, 0, 1),
      Date.UTC(this.selectedYear, 0, 15),
      Date.UTC(this.selectedYear, 0, 31),
      Date.UTC(this.selectedYear, 1, 15),
      Date.UTC(this.selectedYear, 1, 28),
      Date.UTC(this.selectedYear, 2, 15),
      Date.UTC(this.selectedYear, 2, 31),
      Date.UTC(this.selectedYear, 3, 15),
      Date.UTC(this.selectedYear, 3, 30),
      Date.UTC(this.selectedYear, 4, 15),
      Date.UTC(this.selectedYear, 4, 31),
      Date.UTC(this.selectedYear, 5, 15),
      Date.UTC(this.selectedYear, 5, 30),
      Date.UTC(this.selectedYear, 6, 15),
      Date.UTC(this.selectedYear, 6, 31),
      Date.UTC(this.selectedYear, 7, 15),
      Date.UTC(this.selectedYear, 7, 31),
      Date.UTC(this.selectedYear, 8, 15),
      Date.UTC(this.selectedYear, 8, 30),
      Date.UTC(this.selectedYear, 9, 15),
      Date.UTC(this.selectedYear, 9, 31),
      Date.UTC(this.selectedYear, 10, 15),
      Date.UTC(this.selectedYear, 10, 30),
      Date.UTC(this.selectedYear, 11, 15),
      Date.UTC(this.selectedYear, 11, 31),
    ];
  }

  get firstQuarter(): Array<number> {
    return [
      Date.UTC(this.selectedYear, 0, 1),
      Date.UTC(this.selectedYear, 0, 15),
      Date.UTC(this.selectedYear, 0, 31),
      Date.UTC(this.selectedYear, 1, 15),
      Date.UTC(this.selectedYear, 1, 28),
      Date.UTC(this.selectedYear, 2, 15),
      Date.UTC(this.selectedYear, 2, 31),
    ];
  }

  get secondQuarter(): Array<number> {
    return [
      Date.UTC(this.selectedYear, 3, 15),
      Date.UTC(this.selectedYear, 3, 30),
      Date.UTC(this.selectedYear, 4, 15),
      Date.UTC(this.selectedYear, 4, 31),
      Date.UTC(this.selectedYear, 5, 15),
      Date.UTC(this.selectedYear, 5, 30),
    ];
  }

  get thirdQuarter(): Array<number> {
    return [
      Date.UTC(this.selectedYear, 6, 15),
      Date.UTC(this.selectedYear, 6, 31),
      Date.UTC(this.selectedYear, 7, 15),
      Date.UTC(this.selectedYear, 7, 31),
      Date.UTC(this.selectedYear, 8, 15),
      Date.UTC(this.selectedYear, 8, 30),
    ];
  }

  get fourthQuarter(): Array<number> {
    return [
      Date.UTC(this.selectedYear, 9, 15),
      Date.UTC(this.selectedYear, 9, 31),
      Date.UTC(this.selectedYear, 10, 15),
      Date.UTC(this.selectedYear, 10, 30),
      Date.UTC(this.selectedYear, 11, 15),
      Date.UTC(this.selectedYear, 11, 31),
    ];
  }
}

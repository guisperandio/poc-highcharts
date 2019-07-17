import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AxisDates {
  todayDate: Date = new Date();

  constructor() {}

  get today() {
    return this.todayDate;
  }

  get ticks(): Array<number> {
    const info = 'info';
    const ticks: Array<number> = [];
    const firstTick = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1,
      1
    );
    const secondTick = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      0,
      1
    );
    const thirdTick = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 2,
      0,
      1
    );
    const fourthTick = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 3,
      0,
      1
    );

    ticks.push(
      firstTick.getTime(),
      secondTick.getTime(),
      thirdTick.getTime(),
      fourthTick.getTime()
    );

    ticks[info] = {
      unitName: 'day', // unitName: "day",
      higherRanks: {}, // Omitting this would break things
    };
    return ticks;
  }
}

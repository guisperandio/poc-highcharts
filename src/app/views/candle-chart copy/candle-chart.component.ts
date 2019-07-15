import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './candle-chart.component.html',
})
export class CandleChartComponent implements OnInit {
  chartParams: any;

  constructor() {}

  ngOnInit() {
    this.chartParams = {
      rangeSelector: {
        selected: 1,
      },

      title: {
        text: 'AAPL Stock Price',
      },

      series: [
        {
          type: 'candlestick',
          name: 'AAPL Stock Price',
          data: this.getChartData(10),
          dataGrouping: {
            units: [
              [
                'week', // unit name
                [1], // allowed multiples
              ],
              ['month', [1, 2, 3, 4, 6]],
            ],
          },
        },
      ],
    };
  }

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  getChartData = (arraySize = 50): Array<any> => {
    const data: Array<any> = [];
    [...Array(arraySize).keys()].forEach(num => {
      data.push([
        this.getRandomNum(1500298200000),
        this.getRandomNum(150),
        this.getRandomNum(150),
        this.getRandomNum(150),
        this.getRandomNum(150),
      ]);
    });

    return data;
  };
}

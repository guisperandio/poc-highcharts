import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit {
  chartParams: Highcharts.Options;

  constructor() {}

  ngOnInit() {
    this.chartParams = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Column chart with negative values',
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'column',
          name: 'John',
          data: this.getChartData(10),
        },
        {
          type: 'column',
          name: 'Jane',
          data: this.getChartData(10),
        },
        {
          type: 'column',
          name: 'Joe',
          data: this.getChartData(10),
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
      const yValue = this.getRandomNum(100);
      data.push(yValue);
    });

    return data;
  };
}

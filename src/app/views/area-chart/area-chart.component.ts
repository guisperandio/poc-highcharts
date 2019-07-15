import {Component, OnInit} from '@angular/core';
import {SeriesAreaDataOptions} from 'highcharts';

@Component({
  templateUrl: './area-chart.component.html',
})
export class AreaChartComponent implements OnInit {
  chartParams: Highcharts.Options;

  constructor() {}

  ngOnInit() {
    this.chartParams = {
      chart: {
        type: 'areaspline',
      },
      title: {
        text: 'Average fruit consumption during one week',
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
      },
      xAxis: {
        categories: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        plotBands: [
          {
            // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)',
          },
        ],
      },
      yAxis: {
        title: {
          text: 'Fruit units',
        },
      },
      tooltip: {
        shared: true,
        valueSuffix: ' units',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5,
        },
      },
      series: [
        {
          type: 'area',
          name: 'John',
          data: this.getChartData(50),
        },
        {
          type: 'area',
          name: 'Jane',
          data: this.getChartData(50),
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

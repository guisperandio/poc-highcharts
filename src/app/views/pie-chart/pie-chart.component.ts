import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnInit {
  chartParams: Highcharts.Options;

  constructor() {}

  ngOnInit() {
    this.chartParams = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Browser market shares in January, 2018',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black',
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Brands',
          colorByPoint: true,
          data: this.getChartData(20),
        },
      ],
    };
  }

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  getChartData = (arraySize = 50): Array<any> => {
    const data: Array<any> = [];
    let randomNum = 100;
    [...Array(arraySize).keys()].forEach(num => {
      const yValue = this.getRandomNum(10);
      data.push({
        name: `PTest - ${num}`,
        y: yValue,
        sliced: false,
        selected: false,
      });
      randomNum = randomNum - yValue;
    });

    return data;
  };
}

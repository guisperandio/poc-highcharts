import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './funnel-chart.component.html',
})
export class FunnelChartComponent implements OnInit {
  chartParams: any;

  constructor() {}

  ngOnInit() {
    this.chartParams = {
      chart: {
        type: 'funnel',
      },
      title: {
        text: 'Sales funnel',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            softConnector: true,
          },
          center: ['50%', '50%'],
          neckWidth: '40%',
          neckHeight: '0%',
          width: '80%',
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'funnel',
          name: 'Unique users',
          data: this.getChartData(10),
          reversed: true,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              plotOptions: {
                series: {
                  dataLabels: {
                    inside: true,
                  },
                  center: ['50%', '50%'],
                  width: '100%',
                },
              },
            },
          },
        ],
      },
    };
  }

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  getChartData = (arraySize = 50): Array<any> => {
    const data: Array<any> = [];
    [...Array(arraySize).keys()].forEach(num => {
      const yValue = this.getRandomNum(4000);
      data.push([`PTest-${num}`, yValue]);
    });

    return data;
  };
}
